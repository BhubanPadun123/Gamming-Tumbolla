import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
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

type AttendanceStatus = "Present" | "Absent" | "Pending" | "Late";

interface Member {
    id: string;
    name: string;
    role: string;
    phone: string;
    status: AttendanceStatus;
}

const initialMembers: Member[] = [
    {
        id: "1",
        name: "Rahul Sharma",
        role: "President",
        phone: "+91 9876543210",
        status: "Present",
    },
    {
        id: "2",
        name: "Priya Das",
        role: "Secretary",
        phone: "+91 9123456780",
        status: "Absent",
    },
    {
        id: "3",
        name: "Rohit Kumar",
        role: "Treasurer",
        phone: "+91 9870011223",
        status: "Pending",
    },
    {
        id: "4",
        name: "Anita Roy",
        role: "Volunteer",
        phone: "+91 9877777777",
        status: "Late",
    },
    {
        id: "5",
        name: "Ajay Singh",
        role: "Member",
        phone: "+91 9000000001",
        status: "Pending",
    },
];

export default function CommitteeEventAttendanceScreen({ navigation }: any) {
    const theme = useTheme()

    const [members, setMembers] = useState(initialMembers)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState<
        "All" | AttendanceStatus
    >("All");

    const filteredMembers = useMemo(() => {
        return members.filter((m) => {
            const searchMatch =
                m.name.toLowerCase().includes(search.toLowerCase()) ||
                m.role.toLowerCase().includes(search.toLowerCase());

            const filterMatch =
                filter === "All" || m.status === filter;

            return searchMatch && filterMatch;
        });
    }, [members, search, filter]);

    const updateStatus = (
        id: string,
        status: AttendanceStatus
    ) => {
        setMembers((prev) =>
            prev.map((m) =>
                m.id === id ? { ...m, status } : m
            )
        );
    };

    const present = members.filter(
        (m) => m.status === "Present"
    ).length;

    const absent = members.filter(
        (m) => m.status === "Absent"
    ).length;

    const late = members.filter(
        (m) => m.status === "Late"
    ).length;

    const pending = members.filter(
        (m) => m.status === "Pending"
    ).length;

    const progress = present / members.length;

    const renderMember = ({ item }: { item: Member }) => (
        <Card
            style={styles.card}
            // onPress={() => {
            //     navigation.navigate("NestedTransition", {
            //         parentNavigator: "Committee",
            //         screenName: "EventAttendance",
            //     })
            // }}
        >
            <Card.Content>

                <View style={styles.row}>

                    <Avatar.Text
                        size={48}
                        label={item.name.substring(0, 2)}
                    />

                    <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text variant="titleMedium">
                            {item.name}
                        </Text>

                        <Text variant="bodySmall">
                            {item.role}
                        </Text>

                        <Text variant="bodySmall">
                            {item.phone}
                        </Text>
                    </View>

                    <Chip>{item.status}</Chip>

                </View>

                <View style={styles.actions}>
                    <Button
                        compact
                        mode={
                            item.status === "Present"
                                ? "contained"
                                : "outlined"
                        }
                        onPress={() =>
                            updateStatus(item.id, "Present")
                        }
                    >
                        Present
                    </Button>

                    <Button
                        compact
                        mode={
                            item.status === "Late"
                                ? "contained"
                                : "outlined"
                        }
                        onPress={() =>
                            updateStatus(item.id, "Late")
                        }
                    >
                        Late
                    </Button>

                    <Button
                        compact
                        mode={
                            item.status === "Absent"
                                ? "contained"
                                : "outlined"
                        }
                        onPress={() =>
                            updateStatus(item.id, "Absent")
                        }
                    >
                        Absent
                    </Button>
                </View>

            </Card.Content>
        </Card>
    );

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Event Attendance" />
            </Appbar.Header>

            <FlatList
                ListHeaderComponent={
                    <>
                        <Card style={styles.summaryCard}>
                            <Card.Content>

                                <Text variant="headlineSmall">
                                    Annual General Meeting
                                </Text>

                                <Text>
                                    📅 25 Jul 2026 • 10:00 AM
                                </Text>

                                <Text>
                                    📍 TMPK Community Hall
                                </Text>

                                <ProgressBar
                                    progress={progress}
                                    style={{ marginTop: 15 }}
                                />

                                <Text
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    {present} / {members.length} Present
                                </Text>

                            </Card.Content>
                        </Card>

                        <View style={styles.statsRow}>
                            <Surface style={styles.stat}>
                                <Text variant="headlineSmall">
                                    {present}
                                </Text>
                                <Text>Present</Text>
                            </Surface>

                            <Surface style={styles.stat}>
                                <Text variant="headlineSmall">
                                    {late}
                                </Text>
                                <Text>Late</Text>
                            </Surface>

                            <Surface style={styles.stat}>
                                <Text variant="headlineSmall">
                                    {absent}
                                </Text>
                                <Text>Absent</Text>
                            </Surface>

                            <Surface style={styles.stat}>
                                <Text variant="headlineSmall">
                                    {pending}
                                </Text>
                                <Text>Pending</Text>
                            </Surface>
                        </View>

                        <Searchbar
                            placeholder="Search member..."
                            value={search}
                            onChangeText={setSearch}
                            style={styles.search}
                        />

                        <View style={styles.filterRow}>
                            {["All", "Present", "Late", "Absent", "Pending"].map(
                                (item) => (
                                    <Chip
                                        key={item}
                                        selected={filter === item}
                                        onPress={() => setFilter(item as any)}
                                        style={styles.filterChip}
                                    >
                                        {item}
                                    </Chip>
                                )
                            )}
                        </View>

                        <Button
                            mode="contained-tonal"
                            icon="check-all"
                            style={styles.markAll}
                            onPress={() =>
                                setMembers((prev) =>
                                    prev.map((m) => ({
                                        ...m,
                                        status: "Present",
                                    }))
                                )
                            }
                        >
                            Mark All Present
                        </Button>
                    </>
                }
                data={filteredMembers}
                keyExtractor={(item) => item.id}
                renderItem={renderMember}
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 120,
                }}
            />

            <FAB
                icon="content-save"
                label="Save Attendance"
                style={styles.fab}
                onPress={() => { }}
            />
        </>
    );
}

const styles = StyleSheet.create({
    summaryCard: {
        marginBottom: 16,
        borderRadius: 16,
    },

    search: {
        marginBottom: 12,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    stat: {
        flex: 1,
        marginHorizontal: 4,
        padding: 12,
        borderRadius: 14,
        alignItems: "center",
        elevation: 1,
    },

    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 16,
    },

    filterChip: {
        marginRight: 8,
        marginBottom: 8,
    },

    card: {
        marginBottom: 12,
        borderRadius: 16,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },

    markAll: {
        marginBottom: 16,
    },

    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
    },
});