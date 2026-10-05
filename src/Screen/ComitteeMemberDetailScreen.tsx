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
} from "react-native-paper"

const member = {
    id: "1",
    firstName: "Bhuban",
    lastName: "Padun",
    role: "Secretary",

    phone: "+91 9876543210",
    email: "bhuban@gmail.com",

    gender: "Male",
    dob: "15 March 1998",
    bloodGroup: "O+",

    committee: "TMPK Central Committee",
    joiningDate: "12 Jan 2023",
    membershipId: "TMPK-2023-001",

    address:
        "Kadri, Mangalore, Karnataka - 575002",

    emergencyName: "Rahul Padun",
    emergencyPhone: "+91 9123456789",
};

export default function CommitteeMemberDetailsScreen() {
    const theme = useTheme();

    const initials =
        member.firstName.charAt(0) + member.lastName.charAt(0);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <Surface
                style={[
                    styles.header,
                    { backgroundColor: theme.colors.primaryContainer },
                ]}
                elevation={2}
            >
                <Avatar.Text
                    size={90}
                    label={initials}
                    style={{
                        backgroundColor: theme.colors.primary,
                    }}
                />

                <Text
                    variant="headlineSmall"
                    style={styles.name}
                >
                    {member.firstName} {member.lastName}
                </Text>

                <Chip
                    icon="account-star"
                    style={styles.roleChip}
                >
                    {member.role}
                </Chip>
            </Surface>

            {/* Contact */}
            <Card style={styles.card}>
                <Card.Title title="Contact Information" />

                <Card.Content>

                    <List.Item
                        title={member.phone}
                        description="Phone Number"
                        left={() => (
                            <List.Icon icon="phone-outline" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={member.email}
                        description="Email Address"
                        left={() => (
                            <List.Icon icon="email-outline" />
                        )}
                    />

                </Card.Content>
            </Card>

            {/* Personal */}
            <Card style={styles.card}>
                <Card.Title title="Personal Information" />

                <Card.Content>

                    <List.Item
                        title={member.gender}
                        description="Gender"
                        left={() => (
                            <List.Icon icon="human-male" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={member.dob}
                        description="Date of Birth"
                        left={() => (
                            <List.Icon icon="calendar" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={member.bloodGroup}
                        description="Blood Group"
                        left={() => (
                            <List.Icon icon="water" />
                        )}
                    />

                </Card.Content>
            </Card>

            {/* Committee */}
            <Card style={styles.card}>
                <Card.Title title="Committee Details" />

                <Card.Content>

                    <List.Item
                        title={member.committee}
                        description="Committee"
                        left={() => (
                            <List.Icon icon="account-group-outline" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={member.membershipId}
                        description="Membership ID"
                        left={() => (
                            <List.Icon icon="card-account-details-outline" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={member.joiningDate}
                        description="Joining Date"
                        left={() => (
                            <List.Icon icon="calendar-check" />
                        )}
                    />

                </Card.Content>
            </Card>

            {/* Address */}
            <Card style={styles.card}>
                <Card.Title title="Address" />

                <Card.Content>

                    <List.Item
                        title={member.address}
                        left={() => (
                            <List.Icon icon="map-marker-outline" />
                        )}
                    />

                </Card.Content>
            </Card>

            {/* Emergency */}
            <Card style={styles.card}>
                <Card.Title title="Emergency Contact" />

                <Card.Content>

                    <List.Item
                        title={member.emergencyName}
                        description="Contact Person"
                        left={() => (
                            <List.Icon icon="account-heart-outline" />
                        )}
                    />

                    <Divider />

                    <List.Item
                        title={member.emergencyPhone}
                        description="Phone Number"
                        left={() => (
                            <List.Icon icon="phone-alert-outline" />
                        )}
                    />

                </Card.Content>
            </Card>

            {/* Actions */}

            <Text
                variant="titleMedium"
                style={styles.actionTitle}
            >
                Actions
            </Text>

            <Button
                mode="contained"
                icon="pencil"
                style={styles.button}
                onPress={() => { }}
            >
                Edit Member
            </Button>

            <Button
                mode="contained-tonal"
                icon="account-switch"
                style={styles.button}
                onPress={() => { }}
            >
                Change Role
            </Button>

            <Button
                mode="contained-tonal"
                icon="swap-horizontal"
                style={styles.button}
                onPress={() => { }}
            >
                Change Committee
            </Button>

            <Button
                mode="contained"
                buttonColor={theme.colors.error}
                // icon={() => (
                //     <MaterialCommunityIcons
                //         name="delete-outline"
                //         size={22}
                //         color="white"
                //     />
                // )}
                style={styles.button}
                onPress={() => { }}
            >
                Delete Member
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
        marginBottom: 15,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },

    name: {
        marginTop: 15,
        fontWeight: "700",
    },

    roleChip: {
        marginTop: 10,
    },

    card: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 18,
        overflow: "hidden",
    },

    actionTitle: {
        marginHorizontal: 20,
        marginBottom: 12,
        fontWeight: "700",
    },

    button: {
        marginHorizontal: 20,
        marginBottom: 14,
        borderRadius: 12,
        paddingVertical: 4,
    },
});