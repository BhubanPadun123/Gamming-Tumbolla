import React, { useState, useEffect, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { useRoute } from "@react-navigation/native"
import {
    ScrollView,
    StyleSheet,
    View,
    FlatList,
} from "react-native"
import GlobalLoader from "../../components/Loader"
import {
    TicketData
} from "../../types/dataTypes"
import {
    useLazyGetGameTicketsQuery
} from "../../Redux/Slice/GameRoomApi"
import TambolaTicket from "../../components/TicketData"
import {
    Appbar,
    Avatar,
    Button,
    Card,
    Chip,
    FAB,
    ProgressBar,
    Searchbar,
    Surface,
    Text,
    useTheme,
} from "react-native-paper";

const players = [
    {
        id: "1",
        name: "Rahul Sharma",
        tickets: ["01", "15", "42"],
        time: "10:15 AM",
    },
    {
        id: "2",
        name: "Anjali Das",
        tickets: ["08", "63"],
        time: "10:18 AM",
    },
    {
        id: "3",
        name: "John Peter",
        tickets: ["11"],
        time: "10:22 AM",
    },
];

const StatCard = ({
    icon,
    title,
    value,
}: {
    icon: string;
    title: string;
    value: string;
}) => {
    return (
        <Surface style={styles.statCard} elevation={2}>
            <Avatar.Icon size={46} icon={icon} />
            <Text variant="titleMedium" style={{ marginTop: 10 }}>
                {value}
            </Text>
            <Text variant="bodyMedium">{title}</Text>
        </Surface>
    );
};

export default function HostTicketScreen({navigation}:any) {
    const router = useRoute()
    const params = router.params as any
    const theme = useTheme();
    const [search, setSearch] = useState("")

    const [getGameRoomTicket, getGameRoomTicketResponse] = useLazyGetGameTicketsQuery()

    const data = getGameRoomTicketResponse.isSuccess ? getGameRoomTicketResponse.currentData?.tickets : []

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

    return (
        <>
            <Appbar.Header elevated>
                <Appbar.BackAction onPress={() => { navigation.goBack()}} />
                <Appbar.Content title="Host Dashboard" />
                <Appbar.Action icon="dots-vertical" onPress={() => { }} />
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
                    />
                )}
            />

            {
                getGameRoomTicketResponse.isLoading && (
                    <GlobalLoader
                        visible={true}
                        message="Fetching Game Room Ticket"
                        title="Tickets"
                    />
                )
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },

    gameCard: {
        borderRadius: 18,
        marginBottom: 18,
    },

    row: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    statCard: {
        width: "48%",
        borderRadius: 18,
        alignItems: "center",
        paddingVertical: 20,
        marginBottom: 14,
    },

    progressCard: {
        borderRadius: 18,
        marginBottom: 18,
    },

    search: {
        marginBottom: 20,
        borderRadius: 14,
    },

    playerHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    ticketContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 18,
    },

    ticketChip: {
        marginRight: 8,
        marginBottom: 8,
    },

    startButton: {
        marginTop: 25,
        borderRadius: 14,
    },

    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
    },
});