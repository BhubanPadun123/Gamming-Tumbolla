import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Avatar,
    Button,
    Card,
    Chip,
    Divider,
    List,
    Surface,
    Text,
    useTheme,
} from "react-native-paper";

const committee = {
    name: "TMPK Central Committee",
    code: "TMPK-001",
    type: "Central Committee",
    level: "State",
    status: "Active",

    president: "John Doe",
    secretary: "Bhuban Padun",
    treasurer: "David Roy",

    formedOn: "15 Jan 2023",

    email: "committee@gmail.com",
    phone: "+91 9876543210",

    address:
        "Kadri, Mangalore, Karnataka",

    description:
        "Responsible for managing committee activities, organizing cultural events, handling memberships, and supervising district committees.",

    totalMembers: 48,
    executives: 8,
    events: 12,
    budget: "₹2,50,000",
};

export default function CommitteeDetailsScreen() {
    const theme = useTheme();

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <Surface
                style={[
                    styles.header,
                    {
                        backgroundColor: theme.colors.primaryContainer,
                    },
                ]}
            >
                <Avatar.Icon
                    size={80}
                    icon="account-group"
                />

                <Text
                    variant="headlineSmall"
                    style={styles.title}
                >
                    {committee.name}
                </Text>

                <Chip icon="check-circle">
                    {committee.status}
                </Chip>
            </Surface>

            {/* Statistics */}

            <Card style={styles.card}>
                <Card.Title title="Committee Statistics" />

                <Card.Content>
                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Text variant="headlineMedium">
                                {committee.totalMembers}
                            </Text>
                            <Text>Members</Text>
                        </View>

                        <View style={styles.stat}>
                            <Text variant="headlineMedium">
                                {committee.executives}
                            </Text>
                            <Text>Executives</Text>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.stat}>
                            <Text variant="headlineMedium">
                                {committee.events}
                            </Text>
                            <Text>Events</Text>
                        </View>

                        <View style={styles.stat}>
                            <Text variant="headlineMedium">
                                {committee.budget}
                            </Text>
                            <Text>Budget</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            {/* Information */}

            <Card style={styles.card}>
                <Card.Title title="Committee Information" />

                <Card.Content>
                    <List.Item
                        title={committee.name}
                        description="Committee Name"
                        left={() => (
                            <List.Icon icon="office-building" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={committee.code}
                        description="Committee Code"
                        left={() => (
                            <List.Icon icon="identifier" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={committee.type}
                        description="Committee Type"
                        left={() => (
                            <List.Icon icon="shape" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={committee.level}
                        description="Level"
                        left={() => (
                            <List.Icon icon="layers" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={committee.formedOn}
                        description="Formation Date"
                        left={() => (
                            <List.Icon icon="calendar" />
                        )}
                    />
                </Card.Content>
            </Card>

            {/* Office Bearers */}

            <Card style={styles.card}>
                <Card.Title title="Office Bearers" />

                <Card.Content>
                    <List.Item
                        title={committee.president}
                        description="President"
                        left={() => (
                            <List.Icon icon="account-star" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={committee.secretary}
                        description="Secretary"
                        left={() => (
                            <List.Icon icon="account-tie" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={committee.treasurer}
                        description="Treasurer"
                        left={() => (
                            <List.Icon icon="cash" />
                        )}
                    />
                </Card.Content>
            </Card>

            {/* Contact */}

            <Card style={styles.card}>
                <Card.Title title="Contact Information" />

                <Card.Content>
                    <List.Item
                        title={committee.email}
                        description="Email"
                        left={() => (
                            <List.Icon icon="email" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={committee.phone}
                        description="Phone"
                        left={() => (
                            <List.Icon icon="phone" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={committee.address}
                        description="Office Address"
                        left={() => (
                            <List.Icon icon="map-marker" />
                        )}
                    />
                </Card.Content>
            </Card>

            {/* Description */}

            <Card style={styles.card}>
                <Card.Title title="Description" />

                <Card.Content>
                    <Text>{committee.description}</Text>
                </Card.Content>
            </Card>

            {/* Actions */}

            <Button
                mode="contained"
                icon="pencil"
                style={styles.button}
            >
                Edit Committee
            </Button>

            <Button
                mode="contained-tonal"
                icon="account-group"
                style={styles.button}
            >
                Manage Members
            </Button>

            <Button
                mode="contained-tonal"
                icon="calendar"
                style={styles.button}
            >
                View Events
            </Button>

            <Button
                mode="contained"
                buttonColor={theme.colors.error}
                icon="delete"
                style={styles.button}
            >
                Delete Committee
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6FA",
    },

    header: {
        alignItems: "center",
        paddingVertical: 28,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        marginBottom: 16,
    },

    title: {
        marginVertical: 12,
        fontWeight: "700",
    },

    card: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 18,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },

    stat: {
        width: "47%",
        backgroundColor: "#F8F9FC",
        borderRadius: 14,
        padding: 18,
        alignItems: "center",
    },

    button: {
        marginHorizontal: 16,
        marginBottom: 14,
        borderRadius: 12,
    },
})