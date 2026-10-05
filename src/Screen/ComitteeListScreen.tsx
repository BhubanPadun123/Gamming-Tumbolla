import React, { useMemo, useState } from "react";
import {
    View,
    FlatList,
    StyleSheet,
} from "react-native";
import {
    Avatar,
    Card,
    Chip,
    Searchbar,
    Surface,
    Text,
    useTheme,
} from "react-native-paper";

const committees = [
    {
        id: "1",
        name: "TMPK Central Committee",
        president: "Mr Tilak Doley",
        members: 145,
        events: 12,
        status: "Active",
        color: "#E91E63",
    },
    {
        id: "2",
        name: "TMPK Silapother Committee",
        president: "ABCD Doley",
        members: 98,
        events: 7,
        status: "Active",
        color: "#3F51B5",
    },
    {
        id: "3",
        name: "TMPK Ramdhan Dikhari Committee",
        president: "ABCD Padun",
        members: 76,
        events: 15,
        status: "Upcoming",
        color: "#4CAF50",
    },
    {
        id: "4",
        name: "TMPK Laimakuri Committee",
        president: "ABCD Kumbang",
        members: 120,
        events: 10,
        status: "Completed",
        color: "#FF9800",
    },
    {
        id: "5",
        name: "TMPK Telem Committee",
        president: "ABCD Patir",
        members: 84,
        events: 9,
        status: "Active",
        color: "#009688",
    },
];

export default function CommitteeListScreen({ navigation }: any) {
    const theme = useTheme();
    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return committees.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const renderItem = ({ item }: any) => (
        <Card
            mode="elevated"
            style={styles.card}
            onPress={() => {
                navigation.navigate("NestedTransition", {
                    parentNavigator: "Committee",
                    screenName: "CommitteeHome",
                })
            }}
        >
            <Card.Content>

                <View style={styles.row}>

                    <Avatar.Text
                        size={60}
                        label={item.name.substring(0, 2).toUpperCase()}
                        style={{ backgroundColor: item.color }}
                    />

                    <View style={{ flex: 1, marginLeft: 16 }}>
                        <Text variant="titleMedium" style={{ fontWeight: "700" }}>
                            {item.name}
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={styles.subtitle}
                        >
                            👤 President : {item.president}
                        </Text>

                        <View style={styles.infoRow}>
                            <Chip compact icon="account-group">
                                {item.members}
                            </Chip>

                            <Chip compact icon="calendar">
                                {item.events} Events
                            </Chip>

                            <Chip
                                compact
                                icon="check-circle"
                                style={{
                                    backgroundColor:
                                        item.status === "Active"
                                            ? "#DFF7E5"
                                            : item.status === "Upcoming"
                                                ? "#FFF4D5"
                                                : "#ECECEC",
                                }}
                            >
                                {item.status}
                            </Chip>
                        </View>
                    </View>

                </View>

            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>

            <Surface elevation={0} style={styles.header}>
                <Text variant="headlineMedium" style={styles.title}>
                    Committees
                </Text>

                <Text
                    variant="bodyMedium"
                    style={styles.desc}
                >
                    Manage all registered committees
                </Text>

                <Searchbar
                    placeholder="Search committee..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.search}
                />
            </Surface>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 30,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F8FC",
    },

    header: {
        paddingTop: 55,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        backgroundColor: "#fff",
    },

    title: {
        fontWeight: "700",
    },

    desc: {
        marginTop: 6,
        color: "#777",
    },

    search: {
        marginTop: 18,
        borderRadius: 16,
    },

    card: {
        marginBottom: 16,
        borderRadius: 20,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    subtitle: {
        marginTop: 5,
        color: "#666",
    },

    infoRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12,
        gap: 8,
    },
});