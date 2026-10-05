import React, { useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    View,
} from "react-native";
import {
    Appbar,
    Avatar,
    Button,
    Card,
    Chip,
    FAB,
    Searchbar,
    SegmentedButtons,
    Text,
    useTheme,
} from "react-native-paper";

const events = [
    {
        id: "1",
        title: "Annual General Meeting",
        committee: "Central Committee",
        venue: "TMPK Hall",
        date: "25 Jul 2026",
        time: "10:00 AM",
        status: "Published",
        members: 120,
    },
    {
        id: "2",
        title: "Youth Cultural Program",
        committee: "Youth Committee",
        venue: "Community Hall",
        date: "30 Jul 2026",
        time: "05:00 PM",
        status: "Draft",
        members: 35,
    },
    {
        id: "3",
        title: "Sports Competition",
        committee: "Sports Committee",
        venue: "Town Stadium",
        date: "15 Aug 2026",
        time: "09:00 AM",
        status: "Completed",
        members: 280,
    },
    {
        id: "4",
        title: "Women's Awareness Meeting",
        committee: "Women Committee",
        venue: "Conference Hall",
        date: "20 Aug 2026",
        time: "02:00 PM",
        status: "Upcoming",
        members: 58,
    },
];

export default function CommitteeEventListScreen({ navigation }: any) {
    const theme = useTheme();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredEvents = useMemo(() => {
        return events.filter((item) => {
            const matchSearch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.committee.toLowerCase().includes(search.toLowerCase());

            const matchFilter =
                filter === "All" || item.status === filter;

            return matchSearch && matchFilter;
        });
    }, [search, filter]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Published":
                return "#2E7D32";
            case "Draft":
                return "#F9A825";
            case "Completed":
                return "#1565C0";
            case "Upcoming":
                return "#6A1B9A";
            default:
                return theme.colors.primary;
        }
    };

    const renderItem = ({ item }: any) => (
        <Card 
            style={styles.card}
            onPress={() => {
                navigation.navigate("NestedTransition", {
                    parentNavigator: "Committee",
                    screenName: "EventAttendance",
                })
            }}
        >
            <Card.Content>

                <View style={styles.header}>

                    <Avatar.Icon
                        size={52}
                        icon="calendar-month"
                    />

                    <View style={{ flex: 1, marginLeft: 14 }}>

                        <Text variant="titleMedium">
                            {item.title}
                        </Text>

                        <Text variant="bodySmall">
                            {item.committee}
                        </Text>

                    </View>

                    <Chip
                        textStyle={{ color: "#fff" }}
                        style={{
                            backgroundColor: getStatusColor(item.status),
                        }}
                    >
                        {item.status}
                    </Chip>

                </View>

                <View style={styles.infoRow}>
                    <Text>📍 {item.venue}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text>
                        🕒 {item.date} • {item.time}
                    </Text>
                </View>

                <View style={styles.infoRow}>
                    <Text>
                        👥 {item.members} Registered
                    </Text>
                </View>

                <View style={styles.actions}>

                    <Button
                        icon="eye-outline"
                        mode="outlined"
                        compact
                    >
                        Details
                    </Button>

                    <Button
                        icon="pencil"
                        mode="contained"
                        compact
                    >
                        Edit
                    </Button>

                </View>

            </Card.Content>
        </Card>
    );

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Committee Events" />
            </Appbar.Header>

            <View style={styles.container}>

                <Searchbar
                    placeholder="Search event..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.search}
                />

                <SegmentedButtons
                    value={filter}
                    onValueChange={setFilter}
                    buttons={[
                        { value: "All", label: "All" },
                        { value: "Upcoming", label: "Upcoming" },
                        { value: "Published", label: "Published" },
                        { value: "Draft", label: "Draft" },
                        { value: "Completed", label: "Completed" },
                    ]}
                    style={{ marginHorizontal: 15 }}
                />

                <FlatList
                    data={filteredEvents}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        padding: 15,
                        paddingBottom: 100,
                    }}
                    showsVerticalScrollIndicator={false}
                />

                <FAB
                    icon="plus"
                    label="Create Event"
                    style={styles.fab}
                    onPress={() => { }}
                />

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6FA",
    },

    search: {
        margin: 15,
    },

    card: {
        marginBottom: 16,
        borderRadius: 18,
        elevation: 2,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    infoRow: {
        marginTop: 12,
    },

    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
        gap: 10,
    },

    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
    },
});