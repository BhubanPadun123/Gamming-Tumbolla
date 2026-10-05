import React, { useState, useMemo, useCallback, useEffect } from "react"
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    Alert,
} from "react-native";
import {
    Appbar,
    Avatar,
    Button,
    Card,
    Chip,
    Divider,
    FAB,
    Surface,
    Text,
    useTheme,
} from "react-native-paper"
import { useFocusEffect } from "@react-navigation/native"
import GlobalLoader from "../../components/Loader"
import { Storage } from "../../types/localStorage"
import { useRoute } from "@react-navigation/native"
import {
    useLazyGetPlayerTicketBookingQuery,
    useLazyGetGameTicketsQuery,
    useApprovePlayerTGicketMutation,
    useDeletePlayerRequestTicketMutation
} from "../../Redux/Slice/GameRoomApi"
import {
    PlayerBooksApiPayload,
    TicketBookingRequestType,
    PlayerTocketBookingRequest,
    DeleteTicketBookingRequestType,
    TicketData
} from "../../types/dataTypes"
import ws from "../../Websocket/websocket"
import { useAppDispatch, useAppSelector } from "../../Redux/hooks"
import { store } from "../../Redux"
import TambolaTicket from "../../components/TicketData"

type BookingStatus = "Pending" | "Approved" | "Rejected";

interface Booking {
    id: string;
    playerName: string;
    phone: string;
    ticketCount: number;
    totalAmount: number;
    bookingTime: string;
    paymentStatus: "Paid" | "Pending";
    status: BookingStatus;
}

const initialData: Booking[] = [
    {
        id: "1",
        playerName: "Rahul Sharma",
        phone: "9876543210",
        ticketCount: 3,
        totalAmount: 150,
        bookingTime: "10:15 AM",
        paymentStatus: "Paid",
        status: "Pending",
    },
    {
        id: "2",
        playerName: "Priya Das",
        phone: "9123456789",
        ticketCount: 2,
        totalAmount: 100,
        bookingTime: "10:18 AM",
        paymentStatus: "Paid",
        status: "Pending",
    },
    {
        id: "3",
        playerName: "Amit Kumar",
        phone: "9988776655",
        ticketCount: 6,
        totalAmount: 300,
        bookingTime: "10:22 AM",
        paymentStatus: "Pending",
        status: "Pending",
    },
];

export default function TicketBookingApprovalScreen({ navigation }: any) {
    const theme = useTheme()
    const router = useRoute()
    const params = router.params as any

    const game = useAppSelector((state) => state.game);


    const [refreshing, setRefreshing] = useState(false)
    const [bookings, setBookings] = useState(initialData)

    const [getBookingPlay, getBookingPlayResponse] = useLazyGetPlayerTicketBookingQuery()
    const [getGameRoomTicket, getGameRoomTicketResponse] = useLazyGetGameTicketsQuery()
    const [ticketRequests, setTicketRequests] = useState<TicketBookingRequestType[]>([])

    const [approveTicket, approveTicketResponse] = useApprovePlayerTGicketMutation()
    const [deleteTicketRequest, deleteTicketRequestResponse] = useDeletePlayerRequestTicketMutation()





    useEffect(() => {
        if (approveTicketResponse.isSuccess) {
            if (params) {
                if (params?.room_code && params?.id) {
                    getGameRoomTicket(params.room_code)
                }
            }
            Alert.alert("Approved success")
            approveTicketResponse.reset()
        }
        if (approveTicketResponse.isError) {
            Alert.alert("Error while approve!")
            approveTicketResponse.reset()
        }
    }, [approveTicketResponse.status])

    useEffect(() => {
        if (deleteTicketRequestResponse.isSuccess) {
            if (ticketID && roomCode) {
                const data: PlayerBooksApiPayload = {
                    room_code: roomCode,
                    ticket_id: Number(ticketID)
                }
                getBookingPlay(data)
            }
            deleteTicketRequestResponse.reset()
        }
        if (deleteTicketRequestResponse.isError) {
            Alert.alert("Error while delete!Please try again")
            deleteTicketRequestResponse.reset()
        }
    }, [deleteTicketRequestResponse.status])


    useEffect(() => {
        const callback = (data: any) => {
            console.log("Host received", data)
        }

        ws.addCallbacks("REQUEST_BOOKING", callback)

        return () => {
            ws.removeCallbacks("REQUEST_BOOKING", callback)
        }
    }, [])


    useFocusEffect(
        useCallback(() => {
            if (params) {
                if (params?.room_code && params?.id) {
                    getGameRoomTicket(params.room_code)
                }
            }
        }, [params, ws])
    )

    const ticketID = useMemo(() => {
        if (getGameRoomTicketResponse.isSuccess) {
            return getGameRoomTicketResponse.currentData?.ticket_id
        } else {
            return null
        }
    }, [getGameRoomTicketResponse.status])
    const roomCode = useMemo(() => {
        if (getGameRoomTicketResponse.isSuccess) {
            return getGameRoomTicketResponse.currentData?.room_id
        } else {
            return null
        }
    }, [getGameRoomTicketResponse.status])


    const bookingTickets = useMemo(() => {
        if (!getBookingPlayResponse.isSuccess) return {};

        const data = getBookingPlayResponse.currentData?.data;

        const result: Record<string, number[]> = {};

        data?.forEach((item) => {
            const ticketAllocation = item.ticket_allocation as Record<string, number[]>;

            Object.entries(ticketAllocation).forEach(([key, value]) => {
                if (!result[key]) {
                    result[key] = [];
                }

                result[key] = [...new Set([...result[key], ...value])];
            });
        });

        return result;
    }, [getBookingPlayResponse.status])
    const allotatedTickets = useMemo(() => {
        if(!getBookingPlayResponse.isSuccess) return {}
        if (getGameRoomTicketResponse.isSuccess) {
            return getGameRoomTicketResponse?.currentData?.generated_ticket
        } else {
            return {}
        }
    }, [getGameRoomTicketResponse.status])

    const getPlayerBookingTicket = useCallback((ticket_number: number) => {
        const findPlayer = {
            playerId: "",
            ticket_number,
            status: false,
        };

        if (!bookingTickets) return findPlayer

        for (const [playerId, tickets] of Object.entries(bookingTickets)) {
            if (Array.isArray(tickets) && tickets.includes(ticket_number)) {
                return {
                    playerId,
                    ticket_number,
                    status: true,
                }
            }
        }
        return findPlayer
    }, [bookingTickets])
    const getPlayerAllotatedTicket = useCallback((ticket_number: number) => {
        const findPlayer = {
            playerId: "",
            ticket_number,
            status: false,
        }

        if (!allotatedTickets) return findPlayer

        for (const [playerId, tickets] of Object.entries(allotatedTickets)) {
            if (Array.isArray(tickets) && tickets.includes(ticket_number)) {
                return {
                    playerId,
                    ticket_number,
                    status: true,
                }
            }
        }
        return findPlayer
    }, [allotatedTickets])


    const bookingList = useMemo(() => {
        return Object.entries(bookingTickets).map(([userId, tickets]) => ({
            userId,
            tickets,
        }))
    }, [bookingTickets])

    const soldTicket = useMemo(() => {
        if (!getBookingPlayResponse.isSuccess) return [];

        const data = getBookingPlayResponse.currentData?.data;
        const sold = new Set<number>();

        if (data && data.length > 0) {
            data.forEach((item) => {
                const ticketAllocation = item.ticket_allocation as Record<string, number[]>;

                Object.values(ticketAllocation).forEach((ticketNumbers) => {
                    ticketNumbers.forEach((ticketNo) => sold.add(ticketNo));
                })
            })
        }

        return [...sold];
    }, [getBookingPlayResponse.status])

    const mainTicketList = useMemo(() => {
        if (getGameRoomTicketResponse.isSuccess) {
            return getGameRoomTicketResponse.currentData?.tickets
        } else {
            return []
        }
    }, [getGameRoomTicketResponse])


    useEffect(() => {
        if (ticketID && roomCode) {
            const data: PlayerBooksApiPayload = {
                room_code: roomCode,
                ticket_id: Number(ticketID)
            }
            getBookingPlay(data)
        }
    }, [ticketID, roomCode])

    const onApprove = (index: number, userId: string) => {
        if (!params || !mainTicketList) return
        const tickets = mainTicketList[index]
        console.log(tickets)
        if (!tickets) return
        const data: PlayerTocketBookingRequest = {
            user_id: userId,
            room_code: params.room_code,
            tickets: [index],
        }
        approveTicket(data)
    }

    const onReject = (index: number, userId: string) => {
        if (!params || !bookingList || !ticketID || !mainTicketList) return
        const ticket = mainTicketList[index]
        if (!ticket) return
        const data: DeleteTicketBookingRequestType = {
            user_id: userId,
            room_code: params.room_code,
            ticket_id: Number(ticketID)
        }
        deleteTicketRequest(data)
    }

    const refresh = () => {
        setRefreshing(true)

        setTimeout(() => {
            setRefreshing(false)
        }, 1000)
    }


    return (
        <View style={styles.container}>
            <Appbar.Header elevated>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }} />
                <Appbar.Content
                    title="Ticket Bookings"
                    subtitle={`${bookingList.length} Requests`}
                />
            </Appbar.Header>
            <FlatList
                data={mainTicketList}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 40,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                renderItem={({ item, index }: { item: TicketData; index: number }) => {
                    const ticketPlayer = getPlayerBookingTicket(index + 1)
                    const alloted = getPlayerAllotatedTicket(index+1)
                    return (
                        <Card style={[styles.ticketCard,{
                            backgroundColor:alloted?.status ? "#11646eff" : "#FFFF"
                        }]} mode="elevated">
                            <Card.Content>
                                {/* Header */}
                                <View style={styles.header}>
                                    <View style={styles.userInfo}>
                                        <Avatar.Icon
                                            size={42}
                                            icon="account"
                                        />
                                        <View style={{ marginLeft: 12 }}>
                                            <Text variant="titleMedium">
                                                Player ID
                                            </Text>
                                            <Text variant="bodySmall" style={{ opacity: 0.7 }}>
                                                {
                                                    ticketPlayer?.status ? ticketPlayer.playerId : "NOT YET BOOKING"
                                                }
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <Divider style={{ marginVertical: 16 }} />

                                {/* Ticket */}
                                <TambolaTicket
                                    ticket={item}
                                    ticketNo={(index + 1).toString()}
                                    markedNumbers={[]}
                                    soldCardList={soldTicket}
                                />

                                <Divider style={{ marginVertical: 8 }} />

                                {/* Action Buttons */}
                                <View style={styles.buttonRow}>
                                    <Button
                                        mode="contained-tonal"
                                        icon="close-circle-outline"
                                        buttonColor="#FDECEC"
                                        textColor="#D32F2F"
                                        style={styles.actionButton}
                                        disabled = {alloted?.status ? true : false}
                                        onPress={()=> ticketPlayer?.playerId && onReject(index + 1, ticketPlayer.playerId)}
                                    >
                                        Reject
                                    </Button>

                                    <Button
                                        mode="contained"
                                        icon="check-circle"
                                        style={styles.actionButton}
                                        disabled = {alloted?.status ? true : false}
                                        onPress={() => ticketPlayer?.playerId && onApprove(index + 1, ticketPlayer.playerId)}
                                    >
                                        Approve
                                    </Button>
                                </View>
                            </Card.Content>
                        </Card>
                    )
                }}
            />

            <FAB
                icon="refresh"
                style={styles.fab}
                onPress={refresh}
            />
            {
                (
                    getBookingPlayResponse.isLoading ||
                    getGameRoomTicketResponse.isLoading
                ) && (
                    <GlobalLoader
                        visible={true}
                        message="Booking player list fetching..."
                        title="Load"
                    />
                )
            }
            {
                approveTicketResponse.isLoading && (
                    <GlobalLoader
                        visible={true}
                        message="Approving player ticket..."
                        title="Ticket"
                    />
                )
            }
            {
                deleteTicketRequestResponse.isLoading && (
                    <GlobalLoader
                        visible={true}
                        message="Deleting request ticket..."
                        title="Ticket"
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },
    summary: {
        margin: 16,
        borderRadius: 18,
        padding: 18,
        alignItems: "center",
        elevation: 1,
    },
    card: {
        borderRadius: 20,
        elevation: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
        alignItems: "center",
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 2,
        gap: 4,
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
    },
    ticketCard: {
        borderRadius: 18,
        overflow: "hidden",
        elevation: 3,
    },

    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    actionButton: {
        flex: 1,
        borderRadius: 12,
    },
});