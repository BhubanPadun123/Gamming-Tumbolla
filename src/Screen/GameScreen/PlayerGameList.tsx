import React, { useMemo, useState, useEffect, useCallback } from "react"
import {
    gameRoomDataType
} from "../../types/dataTypes"
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
} from "react-native";
import {
    Appbar,
    Avatar,
    Badge,
    Button,
    Card,
    Chip,
    FAB,
    Searchbar,
    Text,
    useTheme,
    IconButton,
} from "react-native-paper"
import GlobalLoader from "../../components/Loader"
import { useFocusEffect } from "@react-navigation/native"
import {
    useLazyPlatformAllGameRoomQuery,
    useLazyAllGameRoomsQuery
} from "../../Redux/Slice/GameRoomApi"
import {
    useDeleteGameRoomMutation
} from "../../Redux/Slice/GameRoomApi"
import { Storage } from "../../types/localStorage"

type GameStatus =
    | "Waiting"
    | "Running"
    | "Completed"
    | "Cancelled";

type GameType = "FREE" | "PAID" | "PRIVATE";

interface GameItem {
    id: string;
    title: string;
    roomCode: string;
    host: string;
    players: number;
    maxPlayers: number;
    gameType: GameType;
    status: GameStatus;
    prize: string;
    startTime: string;
}


export default function PlayerGameList({ navigation }: any) {
    const theme = useTheme();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [refreshing, setRefreshing] = useState(false);

    const [getPlatformGameRoomapi, getPlatformGameRoomStatus] = useLazyPlatformAllGameRoomQuery()
    const [deleteGameRoomApi, deleteGameRoomStatus] = useDeleteGameRoomMutation()
    const [getHostGameRoomApi, getHostGameRoomRespose] = useDeleteGameRoomMutation()




    useFocusEffect(
        useCallback(() => {
            getPlatformGameRoomapi(null)
            return () => {
                console.log("Screen unfocused");
            }
        }, [])
    )

    const roomList = useMemo(() => {
        if (getPlatformGameRoomStatus.isSuccess) {
            const list = getPlatformGameRoomStatus.currentData
            return {
                count: list?.count,
                data: list?.data
            }
        } else {
            return {
                count: 0,
                data: []
            }
        }
    }, [getPlatformGameRoomStatus.status])

    // const filtered = useMemo(() => {
    //     return DATA.filter((item) => {
    //         const matchSearch =
    //             item.title.toLowerCase().includes(search.toLowerCase()) ||
    //             item.roomCode.toLowerCase().includes(search.toLowerCase());

    //         const matchStatus =
    //             status === "All" ? true : item.status === status;

    //         return matchSearch && matchStatus;
    //     });
    // }, [search, status]);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const getStatusColor = (status: GameStatus) => {
        switch (status) {
            case "Waiting":
                return "#F9A825";
            case "Running":
                return "#2E7D32";
            case "Completed":
                return "#1565C0";
            case "Cancelled":
                return "#C62828";
            default:
                return theme.colors.primary;
        }
    };

    const getTypeColor = (type: GameType) => {
        switch (type) {
            case "FREE":
                return "#8E24AA";
            case "PRIVATE":
                return "#00897B";
            default:
                return "#5E35B1";
        }
    }

    const handleDelete = async () => {
        try {
            const user = await Storage.getUser()
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    }

    const renderItem = ({ item }: { item: gameRoomDataType }) => (
        <Card style={styles.card} mode="contained" onPress={() => {
            navigation.navigate("NestedTransition", {
                parentNavigator: "Ticket",
                screenName: "TicketList",
                params: item
            })
        }}>
            <Card.Content>

                <View style={styles.headerRow}>
                    <View style={{ flex: 1 }}>
                        <Text variant="titleMedium" style={styles.title}>
                            {item.title}
                        </Text>

                        <Text variant="bodySmall">
                            Room Code : {item.room_code}
                        </Text>
                    </View>

                    {/* <Badge
                        style={{
                            backgroundColor: getStatusColor(item.s),
                        }}
                    >
                        {item.status}
                    </Badge> */}
                </View>

                <View style={styles.divider} />

                <View style={styles.infoRow}>
                    <Avatar.Icon
                        icon="account"
                        size={38}
                    />

                    <View style={{ marginLeft: 12, flex: 1 }}>
                        <Text variant="labelLarge">
                            {item.host_id}
                        </Text>

                        <Text variant="bodySmall">
                            Host
                        </Text>
                    </View>

                    <Chip
                        compact
                        style={{
                            backgroundColor: item?.game_type ? getTypeColor(item?.game_type) : getTypeColor("PAID"),
                        }}
                        textStyle={{
                            color: "white",
                        }}
                    >
                        {item?.game_type}
                    </Chip>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text variant="titleMedium">
                            {item.max_players}/{item.max_players}
                        </Text>
                        <Text variant="bodySmall">
                            Players
                        </Text>
                    </View>

                    <View style={styles.stat}>
                        <Text variant="titleMedium">
                            {item.ticket_price}
                        </Text>
                        <Text variant="bodySmall">
                            Prize Pool
                        </Text>
                    </View>

                    <View style={styles.stat}>
                        {/* <Text variant="titleMedium">
                            {item.startTime}
                        </Text> */}
                        <Text variant="bodySmall">
                            Start
                        </Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Appbar.Header elevated>
                <Appbar.Content title="Tambola Games" />
                <Appbar.Action icon="refresh" />
            </Appbar.Header>

            {/* <Searchbar
                placeholder="Search Game..."
                value={search}
                onChangeText={setSearch}
                style={styles.search}
            /> */}

            {/* <View style={styles.chips}>
                {["All", "Waiting", "Running", "Completed"].map((item) => (
                    <Chip
                        key={item}
                        selected={status === item}
                        onPress={() => setStatus(item)}
                        style={styles.chip}
                    >
                        {item}
                    </Chip>
                ))}
            </View> */}

            <FlatList
                data={roomList.data}
                keyExtractor={(item) => item.room_code}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListEmptyComponent={
                    <Card style={styles.empty}>
                        <Card.Content>
                            <IconButton
                                icon="cards-outline"
                                size={60}
                            />
                            <Text variant="headlineSmall">
                                No Games Found
                            </Text>
                            <Text>
                                Create your first Tambola Game.
                            </Text>
                        </Card.Content>
                    </Card>
                }
            />
            {
                getPlatformGameRoomStatus.isLoading && (
                    <GlobalLoader
                        visible={true}
                        message="Fetching..."
                        title="Game Room List"
                    />
                )
            }
            {
                deleteGameRoomStatus.isLoading && (
                    <GlobalLoader
                        visible={true}
                        message="Deleting game room..."
                        title="Delete"
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    search: {
        margin: 16,
    },

    chips: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginBottom: 10,
        flexWrap: "wrap",
    },

    chip: {
        marginRight: 8,
        marginBottom: 8,
    },

    card: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 18,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    divider: {
        height: 1,
        backgroundColor: "#ECECEC",
        marginVertical: 14,
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },

    stat: {
        alignItems: "center",
        flex: 1,
    },

    actionRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
    },

    title: {
        fontWeight: "700",
    },

    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
    },

    empty: {
        margin: 30,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
});