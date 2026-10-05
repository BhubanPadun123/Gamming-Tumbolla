import React, { useMemo, useState } from "react";
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
    Searchbar,
    Surface,
    Text,
    useTheme,
} from "react-native-paper"

// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const committeeMembers = [
    {
        id: "1",
        name: "Bhuban Padun",
        designation: "President",
        phone: "+91 9876543210",
        email: "bhuban@gmail.com",
        committee: "TMPK Central Committee",
    },
    {
        id: "2",
        name: "Rahul Das",
        designation: "Vice President",
        phone: "+91 9876543211",
        email: "rahul@gmail.com",
        committee: "TMPK Central Committee",
    },
    {
        id: "3",
        name: "Rakesh Sharma",
        designation: "Secretary",
        phone: "+91 9876543212",
        email: "rakesh@gmail.com",
        committee: "TMPK Central Committee",
    },
    {
        id: "4",
        name: "Amit Kumar",
        designation: "Treasurer",
        phone: "+91 9876543213",
        email: "amit@gmail.com",
        committee: "TMPK Central Committee",
    },
];

export default function CommitteeMembersScreen({ navigation }: any) {
    const theme = useTheme();

    const [search, setSearch] = useState("");

    const filteredMembers = useMemo(() => {
        return committeeMembers.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const getChipColor = (designation: string) => {
        switch (designation) {
            case "President":
                return "#2E7D32";

            case "Vice President":
                return "#1565C0";

            case "Secretary":
                return "#F57C00";

            case "Treasurer":
                return "#8E24AA";

            default:
                return "#607D8B";
        }
    };

    return (
        <View style={styles.container}>
            <Surface style={styles.header} elevation={2}>
                <Text variant="headlineSmall" style={styles.title}>
                    Committee Members
                </Text>

                <Text variant="bodyMedium">
                    {filteredMembers.length} Members
                </Text>
            </Surface>

            <Searchbar
                placeholder="Search Member"
                value={search}
                onChangeText={setSearch}
                style={styles.search}
            />

            <FlatList
                data={filteredMembers}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 40,
                }}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 12 }} />
                )}
                renderItem={({ item }) => (
                    <Card mode="contained" style={styles.card}
                        onPress={() => {
                            navigation.navigate("NestedTransition", {
                                parentNavigator: "Committee",
                                screenName: "MemberDetails",
                            })
                        }}
                    >
                        <Card.Content>

                            <View style={styles.topRow}>

                                <Avatar.Text
                                    size={58}
                                    label={item.name
                                        .split(" ")
                                        .map((x) => x[0])
                                        .join("")}
                                />

                                <View style={{ flex: 1, marginLeft: 16 }}>

                                    <Text
                                        variant="titleMedium"
                                        style={{
                                            fontWeight: "700",
                                        }}
                                    >
                                        {item.name}
                                    </Text>

                                    <Text
                                        variant="bodyMedium"
                                        style={{
                                            color: theme.colors.onSurfaceVariant,
                                        }}
                                    >
                                        {item.committee}
                                    </Text>

                                </View>

                                <Chip
                                    compact
                                    textStyle={{
                                        color: "#fff",
                                    }}
                                    style={{
                                        backgroundColor: getChipColor(
                                            item.designation
                                        ),
                                    }}
                                >
                                    {item.designation}
                                </Chip>

                            </View>

                            <Divider
                                style={{
                                    marginVertical: 14,
                                }}
                            />

                            <View style={styles.infoRow}>
                                {/* <MaterialCommunityIcons
                                    name="email-outline"
                                    size={20}
                                    color={theme.colors.primary}
                                /> */}

                                <Text style={styles.infoText}>
                                    {item.email}
                                </Text>
                            </View>

                            <View style={styles.infoRow}>
                                {/* <MaterialCommunityIcons
                                    name="phone-outline"
                                    size={20}
                                    color={theme.colors.primary}
                                /> */}

                                <Text style={styles.infoText}>
                                    {item.phone}
                                </Text>
                            </View>

                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 14,
    },

    title: {
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 8
    },

    search: {
        margin: 16,
        borderRadius: 16,
    },

    card: {
        borderRadius: 18,
    },

    topRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },

    infoText: {
        marginLeft: 12,
        fontSize: 15,
    },
});