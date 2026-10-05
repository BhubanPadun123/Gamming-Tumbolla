import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
    Avatar,
    Card,
    Chip,
    Divider,
    Text,
    useTheme,
    IconButton
} from "react-native-paper";

interface Props {
    gameName: string;
    roomCode: string;
    status: "LIVE" | "PAUSED" | "COMPLETED";
    totalPlayers: number;
    ticketsSold: number;
    prizePool: number;
    calledNumbers: number;
    elapsedTime: string;
}

export default function GameInfoCard({
    gameName,
    roomCode,
    status,
    totalPlayers,
    ticketsSold,
    prizePool,
    calledNumbers,
    elapsedTime,
}: Props) {
    const theme = useTheme()
    const [showInfo, setShowInfo] = useState(true)

    const statusColor =
        status === "LIVE"
            ? "#4CAF50"
            : status === "PAUSED"
                ? "#FB8C00"
                : "#D32F2F";

    return (
        <Card mode="elevated" style={styles.card}>
            <Card.Content>

                {/* Header */}

                <View style={styles.header}>
                    <View style={styles.leftHeader}>
                        <Avatar.Icon
                            size={56}
                            icon="cards-playing"
                            style={{
                                backgroundColor: theme.colors.primaryContainer,
                            }}
                        />

                        <View style={{ marginLeft: 14 }}>
                            <Text variant="titleLarge">
                                {gameName}
                            </Text>

                            <Text
                                variant="bodyMedium"
                                style={{
                                    color: theme.colors.onSurfaceVariant,
                                }}
                            >
                                Room : {roomCode}
                                <IconButton
                                    icon={showInfo ? "eye-off-outline" : "eye-outline"}
                                    onPress={() => setShowInfo(!showInfo)}
                                />
                            </Text>
                        </View>
                    </View>
                </View>
                {showInfo && (
                    <>
                        <Divider style={styles.divider} />

                        {/* Statistics */}

                        <View style={styles.grid}>

                            <View style={styles.item}>
                                <Avatar.Icon
                                    icon="account-group"
                                    size={42}
                                />
                                <Text variant="headlineSmall">
                                    {totalPlayers}
                                </Text>
                                <Text>Players</Text>
                            </View>

                            <View style={styles.item}>
                                <Avatar.Icon
                                    icon="ticket-confirmation"
                                    size={42}
                                />
                                <Text variant="headlineSmall">
                                    {ticketsSold}
                                </Text>
                                <Text>Tickets</Text>
                            </View>

                        </View>

                        <View style={styles.grid}>

                            <View style={styles.item}>
                                <Avatar.Icon
                                    icon="cash"
                                    size={42}
                                />
                                <Text variant="headlineSmall">
                                    ₹{prizePool}
                                </Text>
                                <Text>Prize Pool</Text>
                            </View>

                            <View style={styles.item}>
                                <Avatar.Icon
                                    icon="numeric"
                                    size={42}
                                />
                                <Text variant="headlineSmall">
                                    {calledNumbers}/90
                                </Text>
                                <Text>Called</Text>
                            </View>

                        </View>

                        <Divider style={styles.divider} />

                        <View style={styles.footer}>

                            <Chip icon="timer-outline">
                                {elapsedTime}
                            </Chip>

                            <Chip icon="clock-fast">
                                Live Game
                            </Chip>

                        </View>
                    </>
                )}
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 22,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4
    },

    leftHeader: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    divider: {
        marginVertical: 18,
    },

    grid: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    item: {
        width: "48%",
        alignItems: "center",
        paddingVertical: 14,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },
    headerRight: {
        alignItems: "center",
    }
});