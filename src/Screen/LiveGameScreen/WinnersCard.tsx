import React from "react";
import {
    FlatList,
    StyleSheet,
    View,
} from "react-native";
import {
    Avatar,
    Card,
    Chip,
    Divider,
    Text,
    useTheme,
} from "react-native-paper";

interface Winner {
    id: string;
    prize: string;
    player: string;
    ticket: string;
    amount: number;
    time: string;
    status: "Verified" | "Pending";
}

interface Props {
    winners: any;
}

export default function WinnersCard({
    winners,
}: Props) {
    const theme = useTheme();

    const renderItem = ({ item }: { item: Winner }) => {
        const verified = item.status === "Verified";

        return (
            <View style={styles.item}>

                <Avatar.Icon
                    size={48}
                    icon="trophy"
                    style={{
                        backgroundColor: verified
                            ? "#FFD54F"
                            : "#90CAF9",
                    }}
                />

                <View style={styles.details}>

                    <Text
                        variant="titleMedium"
                        style={styles.prize}
                    >
                        {item.prize}
                    </Text>

                    <Text variant="bodyMedium">
                        👤 {item.player}
                    </Text>

                    <Text variant="bodySmall">
                        🎫 Ticket : {item.ticket}
                    </Text>

                    <Text
                        variant="bodySmall"
                        style={{
                            color: theme.colors.onSurfaceVariant,
                        }}
                    >
                        ⏰ {item.time}
                    </Text>

                </View>

                <View style={styles.right}>

                    <Chip
                        compact
                        icon={
                            verified
                                ? "check-circle"
                                : "clock-outline"
                        }
                        style={{
                            backgroundColor: verified
                                ? "#C8E6C9"
                                : "#FFE082",
                        }}
                    >
                        {item.status}
                    </Chip>

                    <Text
                        variant="titleMedium"
                        style={styles.amount}
                    >
                        ₹{item.amount}
                    </Text>

                </View>

            </View>
        );
    };

    return (
        <Card
            mode="elevated"
            style={styles.card}
        >
            <Card.Title
                title="🏆 Winners"
                subtitle={`${winners.length} Prize Claimed`}
            />

            <Divider />

            <FlatList
                data={winners}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                scrollEnabled={false}
                ItemSeparatorComponent={() => (
                    <Divider />
                )}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 22,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
    },

    details: {
        flex: 1,
        marginLeft: 14,
    },

    prize: {
        fontWeight: "700",
        marginBottom: 4,
    },

    right: {
        alignItems: "flex-end",
    },

    amount: {
        marginTop: 8,
        fontWeight: "bold",
    },
});