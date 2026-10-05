import React, { useMemo, useState, useCallback, useEffect } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useRoute } from "@react-navigation/native"
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
    Linking,
    Share,
    Alert
} from "react-native"
import {
    inviteLink
} from "../../types/constant"
import {
    useLazyGetGameTicketsQuery,
    usePlayerTicketBookMutation,
    useLazyGetPlayerTicketBookingQuery
} from "../../Redux/Slice/GameRoomApi"
import {
    Appbar,
    Button,
    Card,
    Chip,
    ProgressBar,
    Surface,
    Text,
    useTheme,
} from "react-native-paper"
import GlobalLoader from "../../components/Loader"
import TambolaTicket from "../../components/TicketData"
import { Storage } from "../../types/localStorage"
import {
    TicketData,
    PlayerTicketRequestApiPayload,
    PlayerBooksApiPayload
} from "../../types/dataTypes"
import ws from "../../Websocket/websocket"

type TicketStatus = "available" | "booked" | "mine"

interface Ticket {
    id: number;
    status: TicketStatus;
}

const TOTAL_TICKETS = 100;
const TICKET_PRICE = 100;

const generateTickets = (): Ticket[] => {
    return Array.from({ length: TOTAL_TICKETS }, (_, index) => {
        let status: TicketStatus = "available";

        // Demo booked tickets
        if (
            [
                2, 5, 7, 8, 13, 18, 22, 24, 28, 35, 39, 41, 44, 49, 51, 56, 63, 68,
                70, 72, 74, 81, 84, 90, 95,
            ].includes(index + 1)
        ) {
            status = "booked";
        }

        return {
            id: index + 1,
            status,
        };
    });
};

export default function TicketBookingScreen({ navigation }: any) {
    const theme = useTheme()
    const router = useRoute()
    const params = router.params as any
    const [tickets] = useState(generateTickets());
    const [selected, setSelected] = useState<number[]>([])


    const [getSoldTicket, getSoldTicketResponse] = useLazyGetPlayerTicketBookingQuery()
    const [getGameRoomTicket, getGameRoomTicketResponse] = useLazyGetGameTicketsQuery()
    const [sendTicketBookingRequest, sendTicketBookingRequestResponse] = usePlayerTicketBookMutation()



    useEffect(() => {
        if (getGameRoomTicketResponse.isSuccess) {
            fetchSoldTickets()
        }
    }, [getGameRoomTicketResponse.status])

    useEffect(() => {
        if (sendTicketBookingRequestResponse.isError) {
            const errorData = sendTicketBookingRequestResponse.error as any
            if (errorData?.data) {
                Alert.alert(errorData?.data || "Error while send request!")
            }
            sendTicketBookingRequestResponse.reset()
        }
        if (sendTicketBookingRequestResponse.isSuccess) {
            openWhatsApp()
            sendTicketBookingRequestResponse.reset()
        }
    }, [sendTicketBookingRequestResponse.status])
    const data = useMemo(() => {
        if (getGameRoomTicketResponse.isSuccess) {
            return getGameRoomTicketResponse.currentData?.tickets
        } else {
            return []
        }
    }, [getGameRoomTicketResponse.status])

    const roomCode = useMemo(() => {
        if (getGameRoomTicketResponse.isSuccess) {
            return getGameRoomTicketResponse.currentData?.room_id
        } else {
            return null
        }
    }, [getGameRoomTicketResponse.status])
    const ticketID = useMemo(() => {
        if (getGameRoomTicketResponse.isSuccess) {
            return getGameRoomTicketResponse.currentData?.ticket_id
        } else {
            return null
        }
    }, [getGameRoomTicketResponse.status])
    const soldTicket = useMemo(() => {
        if (!getSoldTicketResponse.isSuccess) return [];

        const data = getSoldTicketResponse.currentData?.data;
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
    }, [getSoldTicketResponse.status])


    const shareInvite = async () => {
        if (!roomCode) return
        try {
            await Share.share({
                message: `🎲 Join Rainbow Tambola Game!
    
    Room Code: ${roomCode}
    
    Join Here:
    ${inviteLink}`,
            });
        } catch (e) {
            console.log(e);
        }
    }

    const bookingTicket = async () => {
        try {
            const user = await Storage.getUser()
            if (!user) {
                await Storage.logout()
                navigation.replace("TransitionScreen", {
                    screenName: "Login"
                })
            }
            if (!roomCode || selected.length === 0 || !ticketID) return
            const data: PlayerTicketRequestApiPayload = {
                user_id: user.id,
                ticket_allocation: selected,
                room_code: roomCode,
                ticket_id: Number(ticketID)
            }
            sendTicketBookingRequest(data)
        } catch (error) {
            console.log(error)
        }
    }

    const openWhatsApp = async () => {
        try {
            const user = await Storage.getUser()
            if (!user) {
                await Storage.logout()
                navigation.replace("TransitionScreen", {
                    screenName: "Login"
                })
            }
            if (!roomCode || selected.length === 0) return
            if(ws.isConnected()){
                let wsPayloadData = {
                    "user_id":user?.id,
                    "room_code":roomCode,
                    "tickets":selected
                }
                ws.send({
                    type:"REQUEST_BOOKING",
                    payload:wsPayloadData
                })
            }
            const tickets =
                selected && selected.length > 0
                    ? selected.join(", ")
                    : "None";

            const message = `🎲 Hey! I'm selecting this tickets

            🏠 Room Code: ${roomCode}

            🎫 Selected Tickets: ${tickets}

            🔗 UserID:
            ${user?.id}`

            const url = `https://wa.me/?text=${encodeURIComponent(message)}`

            // await Linking.openURL(url)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchSoldTickets() {
        try {
            const user = await Storage.getUser()
            if (!user) {
                await Storage.logout()
                navigation.replace("TransitionScreen", {
                    screenName: "Login"
                })
            }
            if (!roomCode || !ticketID) return
            const data: PlayerBooksApiPayload = {
                ticket_id: Number(ticketID),
                room_code: roomCode
            }
            getSoldTicket(data)
        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(
        useCallback(() => {
            try {
                if (params && params?.room_code) {
                    const room_code = params?.room_code
                    if (room_code) {
                        getGameRoomTicket(room_code)
                    }
                }
            } catch (error) {
                console.log(error)
            }

            return () => {
                console.log("Unmount")
            }
        }, [])
    )


    const sold = tickets.filter((x) => x.status === "booked").length;

    const available = TOTAL_TICKETS - sold;

    const toggleTicket = (ticket: Ticket) => {
        if (ticket.status === "booked") return;

        setSelected((prev) => {
            if (prev.includes(ticket.id)) {
                return prev.filter((id) => id !== ticket.id);
            }

            return [...prev, ticket.id];
        });
    };

    const totalAmount = selected.length * TICKET_PRICE;

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header elevated>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }} />
                <Appbar.Content
                    title="Book Tickets"
                    subtitle="Rainbow Tambola"
                />
            </Appbar.Header>

            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 15 }} />
                )}
                renderItem={({ item, index }: { item: TicketData, index: number }) => (
                    <TambolaTicket
                        ticket={item}
                        ticketNo={(index + 1).toString()}
                        markedNumbers={[]}
                        onSelectTicket={(e) => {
                            setSelected((prev) => {
                                if (prev.includes(e)) {
                                    return prev.filter((id) => id !== e);
                                }

                                return [...prev, e]
                            });
                        }}
                        selectedCardList={selected ? selected : []}
                        soldCardList={soldTicket}
                    />
                )}
                contentContainerStyle={{
                    paddingBottom: 200
                }}
            />

            <Surface style={styles.bottomCard}>
                <View>
                    <Text
                        variant="bodySmall"
                        style={{
                            marginTop: 4,
                            textAlign: "center"
                        }}
                    >
                        {selected.length} Ticket(s)
                    </Text>

                    <Text
                        variant="bodySmall"
                        style={{
                            marginTop: 5,
                            color: theme.colors.primary,
                            fontWeight: "bold",
                            textAlign: "center"
                        }}
                    >
                        ₹{totalAmount}
                    </Text>
                </View>

                <Button
                    mode="contained"
                    disabled={selected.length === 0}
                    style={{
                        marginTop: 10,
                        borderRadius: 10,
                        marginBottom: 30
                    }}
                    contentStyle={{
                        height: 52,
                    }}
                    onPress={bookingTicket}
                >
                    Book {selected.length || ""} Ticket
                    {selected.length > 1 ? "s" : ""}
                </Button>
            </Surface>
            {
                getGameRoomTicketResponse.isLoading || getSoldTicketResponse.isLoading && (
                    <GlobalLoader
                        visible={true}
                        message="Fetching Game Room Ticket"
                        title="Tickets"
                    />
                )
            }
            {
                sendTicketBookingRequestResponse.isLoading && (
                    <GlobalLoader
                        visible={true}
                        message="Sending ticket booking request...."
                        title="Tickets"
                    />
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F7FB",
    },

    roomCard: {
        borderRadius: 18,
    },

    legend: {
        marginTop: 18,
        borderRadius: 15,
        padding: 14,
        flexDirection: "row",
        justifyContent: "space-around",
    },

    ticket: {
        width: 78,
        height: 78,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
    },

    bottomCard: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: 8,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: "#fff",
    },

    space: {
        height: 18,
    },
});