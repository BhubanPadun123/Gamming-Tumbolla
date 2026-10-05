import React, { useMemo, useState } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
} from "react-native";
import {
    Appbar,
    Card,
    Text,
    Searchbar,
    Chip,
    Avatar,
    Button,
    IconButton,
    Divider,
    Surface,
    useTheme,
} from "react-native-paper";

const reports = [
    {
        id: "1",
        title: "Monthly Attendance Report",
        type: "Attendance",
        createdBy: "John Smith",
        date: "10 Jul 2026",
        status: "Completed",
        totalMembers: 65,
        completed: 61,
    },
    {
        id: "2",
        title: "Financial Summary",
        type: "Finance",
        createdBy: "David Roy",
        date: "15 Jul 2026",
        status: "Pending",
        totalMembers: 0,
        completed: 0,
    },
    {
        id: "3",
        title: "Event Performance",
        type: "Event",
        createdBy: "Committee Admin",
        date: "18 Jul 2026",
        status: "Completed",
        totalMembers: 220,
        completed: 198,
    },
    {
        id: "4",
        title: "Member Growth Report",
        type: "Members",
        createdBy: "Secretary",
        date: "19 Jul 2026",
        status: "Completed",
        totalMembers: 340,
        completed: 340,
    },
];

export default function CommitteeReportsScreen() {
    const theme = useTheme();

    const [search, setSearch] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("All");

    const filteredReports = useMemo(() => {
        return reports.filter((item) => {
            const matchSearch =
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.type.toLowerCase().includes(search.toLowerCase());

            const matchFilter =
                selectedFilter === "All"
                    ? true
                    : item.status === selectedFilter;

            return matchSearch && matchFilter;
        });
    }, [search, selectedFilter]);

    const onRefresh = () => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    const SummaryCard = ({
        title,
        value,
        icon,
        color,
    }: any) => (
        <Surface
            style={[
                styles.summaryCard,
                { backgroundColor: theme.colors.surfaceVariant },
            ]}
            elevation={2}
        >
            <Avatar.Icon
                icon={icon}
                size={50}
                style={{ backgroundColor: color }}
            />

            <Text variant="headlineSmall" style={styles.summaryValue}>
                {value}
            </Text>

            <Text variant="bodyMedium">{title}</Text>
        </Surface>
    );

    const renderReport = ({ item }: any) => (
        <Card style={styles.card}>
            <Card.Content>

                <View style={styles.headerRow}>
                    <View style={{ flex: 1 }}>
                        <Text variant="titleMedium">
                            {item.title}
                        </Text>

                        <Text
                            variant="bodySmall"
                            style={{ marginTop: 4 }}
                        >
                            Created by {item.createdBy}
                        </Text>
                    </View>

                    <Chip
                        compact
                        icon={
                            item.status === "Completed"
                                ? "check-circle"
                                : "clock-outline"
                        }
                    >
                        {item.status}
                    </Chip>
                </View>

                <Divider style={{ marginVertical: 12 }} />

                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text variant="labelMedium">Type</Text>
                        <Text>{item.type}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text variant="labelMedium">Date</Text>
                        <Text>{item.date}</Text>
                    </View>
                </View>

                {item.totalMembers > 0 && (
                    <View style={styles.progressBox}>
                        <Text>
                            Completed : {item.completed} / {item.totalMembers}
                        </Text>
                    </View>
                )}

                <View style={styles.actionRow}>
                    <Button
                        mode="contained-tonal"
                        icon="eye"
                        compact
                    >
                        View
                    </Button>

                    <Button
                        mode="outlined"
                        icon="download"
                        compact
                    >
                        Export
                    </Button>

                    <IconButton icon="share-variant" />

                    <IconButton icon="printer" />
                </View>

            </Card.Content>
        </Card>
    );

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background,
                },
            ]}
        >
            <Appbar.Header elevated>
                <Appbar.Content title="Committee Reports" />
                <Appbar.Action icon="filter" />
            </Appbar.Header>

            <FlatList
                data={filteredReports}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListHeaderComponent={
                    <>
                        <Searchbar
                            placeholder="Search reports..."
                            value={search}
                            onChangeText={setSearch}
                            style={styles.search}
                        />

                        <View style={styles.summaryContainer}>
                            <SummaryCard
                                title="Reports"
                                value="24"
                                icon="file-chart"
                                color="#1976D2"
                            />

                            <SummaryCard
                                title="Completed"
                                value="18"
                                icon="check-circle"
                                color="#43A047"
                            />

                            <SummaryCard
                                title="Pending"
                                value="6"
                                icon="clock-outline"
                                color="#FB8C00"
                            />
                        </View>

                        <View style={styles.filterRow}>
                            {["All", "Completed", "Pending"].map((item) => (
                                <Chip
                                    key={item}
                                    selected={selectedFilter === item}
                                    onPress={() => setSelectedFilter(item)}
                                    style={styles.filterChip}
                                >
                                    {item}
                                </Chip>
                            ))}
                        </View>

                        <Text
                            variant="titleMedium"
                            style={styles.sectionTitle}
                        >
                            Recent Reports
                        </Text>
                    </>
                }
                renderItem={renderReport}
                contentContainerStyle={{
                    paddingBottom: 30,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    search: {
        margin: 16,
        borderRadius: 16,
    },

    summaryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        marginBottom: 20,
    },

    summaryCard: {
        width: "31%",
        borderRadius: 18,
        alignItems: "center",
        paddingVertical: 18,
    },

    summaryValue: {
        marginVertical: 8,
        fontWeight: "bold",
    },

    filterRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginBottom: 20,
    },

    filterChip: {
        marginRight: 10,
    },

    sectionTitle: {
        marginHorizontal: 16,
        marginBottom: 10,
        fontWeight: "700",
    },

    card: {
        marginHorizontal: 16,
        marginBottom: 15,
        borderRadius: 18,
    },

    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    infoItem: {
        flex: 1,
    },

    progressBox: {
        marginTop: 16,
    },

    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15,
    },
})