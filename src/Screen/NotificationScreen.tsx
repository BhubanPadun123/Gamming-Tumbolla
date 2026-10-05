import React, { useMemo, useState } from "react";
import {
    FlatList,
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
    Divider,
    Searchbar,
    Surface,
    Text,
} from "react-native-paper";

type NotificationType =
    | "Event"
    | "Attendance"
    | "Committee"
    | "Announcement";

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    unread: boolean;
    type: NotificationType;
}

const initialNotifications: NotificationItem[] = [
    {
        id: "1",
        title: "Annual Meeting",
        message: "Annual General Meeting starts tomorrow at 10:00 AM.",
        time: "10 min ago",
        unread: true,
        type: "Event",
    },
    {
        id: "2",
        title: "Attendance Submitted",
        message: "Attendance for the Youth Committee event has been submitted.",
        time: "1 hour ago",
        unread: true,
        type: "Attendance",
    },
    {
        id: "3",
        title: "Committee Updated",
        message: "A new member has been added to the Central Committee.",
        time: "Yesterday",
        unread: false,
        type: "Committee",
    },
    {
        id: "4",
        title: "New Announcement",
        message: "Monthly committee review meeting scheduled for next week.",
        time: "2 days ago",
        unread: false,
        type: "Announcement",
    },
];

export default function NotificationScreen() {
    const [notifications, setNotifications] = useState(
        initialNotifications
    );

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState<
        "All" | "Unread" | NotificationType
    >("All");

    const unreadCount = notifications.filter(
        (n) => n.unread
    ).length;

    const filteredNotifications = useMemo(() => {
        return notifications.filter((item) => {
            const searchMatch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.message.toLowerCase().includes(search.toLowerCase());

            const filterMatch =
                filter === "All"
                    ? true
                    : filter === "Unread"
                        ? item.unread
                        : item.type === filter;

            return searchMatch && filterMatch;
        });
    }, [notifications, search, filter]);

    const markRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, unread: false }
                    : item
            )
        );
    };

    const markAllRead = () => {
        setNotifications((prev) =>
            prev.map((item) => ({
                ...item,
                unread: false,
            }))
        );
    };

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case "Event":
                return "calendar";
            case "Attendance":
                return "account-check";
            case "Committee":
                return "account-group";
            case "Announcement":
                return "bullhorn";
            default:
                return "bell";
        }
    };

    const renderItem = ({
        item,
    }: {
        item: NotificationItem;
    }) => (
        <Card
            style={[
                styles.card,
                item.unread && styles.unreadCard,
            ]}
        >
            <Card.Content>

                <View style={styles.header}>

                    <Avatar.Icon
                        icon={getIcon(item.type)}
                        size={48}
                    />

                    <View
                        style={{
                            flex: 1,
                            marginLeft: 12,
                        }}
                    >
                        <Text variant="titleMedium">
                            {item.title}
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={{ marginTop: 4 }}
                        >
                            {item.message}
                        </Text>

                        <Text
                            variant="bodySmall"
                            style={{
                                marginTop: 8,
                                opacity: 0.6,
                            }}
                        >
                            {item.time}
                        </Text>
                    </View>

                    {item.unread && (
                        <Badge size={12} />
                    )}
                </View>

                <Divider
                    style={{
                        marginVertical: 12,
                    }}
                />

                <View style={styles.footer}>
                    <Chip compact>{item.type}</Chip>

                    {item.unread && (
                        <Button
                            compact
                            onPress={() =>
                                markRead(item.id)
                            }
                        >
                            Mark Read
                        </Button>
                    )}
                </View>

            </Card.Content>
        </Card>
    );

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Notifications" />
            </Appbar.Header>

            <FlatList
                ListHeaderComponent={
                    <>
                        <Surface style={styles.summary}>
                            <Text variant="headlineMedium">
                                {unreadCount}
                            </Text>

                            <Text>
                                Unread Notifications
                            </Text>

                            <Button
                                mode="contained"
                                style={{
                                    marginTop: 16,
                                }}
                                onPress={markAllRead}
                            >
                                Mark All Read
                            </Button>
                        </Surface>

                        <Searchbar
                            placeholder="Search notifications..."
                            value={search}
                            onChangeText={setSearch}
                            style={styles.search}
                        />

                        <View style={styles.filterRow}>
                            {[
                                "All",
                                "Unread",
                                "Event",
                                "Attendance",
                                "Committee",
                                "Announcement",
                            ].map((item) => (
                                <Chip
                                    key={item}
                                    selected={filter === item}
                                    onPress={() =>
                                        setFilter(item as any)
                                    }
                                    style={styles.chip}
                                >
                                    {item}
                                </Chip>
                            ))}
                        </View>
                    </>
                }
                data={filteredNotifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 40,
                }}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 12 }} />
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    summary: {
        borderRadius: 16,
        padding: 20,
        alignItems: "center",
        marginBottom: 20,
        elevation: 2,
    },

    search: {
        marginBottom: 16,
    },

    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },

    chip: {
        marginRight: 8,
        marginBottom: 8,
    },

    card: {
        borderRadius: 16,
        elevation: 2,
    },

    unreadCard: {
        borderLeftWidth: 4,
        borderLeftColor: "#1976D2",
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
})