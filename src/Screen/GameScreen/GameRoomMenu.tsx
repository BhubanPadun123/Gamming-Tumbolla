import React, { useMemo, useState, useCallback } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import {
    Avatar,
    Card,
    Searchbar,
    Surface,
    Text,
    Icon
} from "react-native-paper"
import { useRoute } from "@react-navigation/native"
import {
    gameRoomDataType
} from "../../types/dataTypes"
import { useFocusEffect } from "@react-navigation/native"

const menuItems = [
    {
        id: "1",
        title: "Players",
        subtitle: "Manage joined players",
        icon: "account-group",
        color: "#1976D2",
        screen: "PlayerListScreen",
    },
    {
        id: "2",
        title: "Tickets",
        subtitle: "View sold tickets",
        icon: "ticket-confirmation",
        color: "#43A047",
        screen: "TicketListScreen",
    },
    {
        id: "3",
        title: "Live Game",
        subtitle: "Open live Tambola game",
        icon: "gamepad-variant",
        color: "#F57C00",
        screen: "LiveGameScreen",
    },
    {
        id: "4",
        title: "Winners",
        subtitle: "View prize winners",
        icon: "trophy",
        color: "#8E24AA",
        screen: "WinnerScreen",
    },
    {
        id: "5",
        title: "Reports",
        subtitle: "Sales & analytics",
        icon: "chart-bar",
        color: "#0097A7",
        screen: "GameReportScreen",
    },
    {
        id: "6",
        title: "Announcements",
        subtitle: "Send notification to players",
        icon: "bullhorn",
        color: "#E53935",
        screen: "AnnouncementScreen",
    },
    {
        id: "7",
        title: "Invite Players",
        subtitle: "Share room invitation",
        icon: "share-variant",
        color: "#5E35B1",
        screen: "InvitePlayerScreen",
    }
];

export default function GameRoomDashboard({ navigation }: any) {
    const route = useRoute()
    const [roomData, setRoomData] = useState<gameRoomDataType | null>(null)
    const [search, setSearch] = useState("")

    useFocusEffect(
        useCallback(() => {
            if (route?.params) {
                const data = route.params as gameRoomDataType
                setRoomData(data)
            }

            return () => {
                setSearch("")
                setRoomData(null)
            }
        }, [])
    )

    const filteredMenu = useMemo(() => {
        return menuItems.filter(
            (item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.subtitle.toLowerCase().includes(search.toLowerCase())
        )
    }, [search])

    const renderItem = ({ item }: any) => (
        <Card
            mode="elevated"
            style={styles.card}
            onPress={() => {
                if (!roomData) return
                navigation.navigate("NestedTransition", {
                    parentNavigator: "Update",
                    screenName: item.screen,
                    params: roomData
                })
            }}
        >
            <Card.Content>
                <View style={styles.row}>
                    <Icon
                        source={item.icon}
                        size={34}
                        color={item.color}
                    />

                    <View style={styles.content}>
                        <Text variant="titleMedium" style={styles.title}>
                            {item.title}
                        </Text>

                        <Text variant="bodyMedium" style={styles.subtitle}>
                            {item.subtitle}
                        </Text>
                    </View>

                    {/* <MaterialCommunityIcons
                        name="chevron-right"
                        size={28}
                        color="#999"
                    /> */}
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Surface elevation={1} style={styles.header}>
                <Text variant="headlineMedium" style={styles.headerTitle}>
                    🎲 Game Room
                </Text>

                <Text variant="bodyMedium" style={styles.headerSubtitle}>
                    Manage your Tambola game room
                </Text>

                <Searchbar
                    placeholder="Search menu..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.search}
                />
            </Surface>

            <FlatList
                data={filteredMenu}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    header: {
        paddingTop: 55,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        backgroundColor: "#fff",
    },

    headerTitle: {
        fontWeight: "700",
    },

    headerSubtitle: {
        marginTop: 6,
        color: "#666",
    },

    search: {
        marginTop: 18,
        borderRadius: 14,
    },

    list: {
        padding: 16,
        paddingBottom: 30,
    },

    card: {
        borderRadius: 18,
        marginBottom: 14,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    content: {
        flex: 1,
        marginLeft: 16,
    },

    title: {
        fontWeight: "700",
    },

    subtitle: {
        marginTop: 4,
        color: "#777",
    },
});