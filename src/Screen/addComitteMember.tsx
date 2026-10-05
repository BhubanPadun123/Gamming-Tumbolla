import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import {
    Avatar,
    Button,
    Card,
    Divider,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper"

export default function AddCommitteeMemberScreen() {
    const theme = useTheme()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}

            <View
                style={[
                    styles.header,
                    { backgroundColor: theme.colors.primary },
                ]}
            >
                <Text
                    variant="headlineMedium"
                    style={styles.headerTitle}
                >
                    Add Committee Member
                </Text>

                <Text
                    variant="bodyMedium"
                    style={styles.headerSubtitle}
                >
                    Register a new committee member
                </Text>
            </View>

            {/* Profile */}

            <Card style={styles.card}>
                <Card.Content
                    style={{ alignItems: "center" }}
                >
                    <Avatar.Icon
                        size={110}
                        icon="account"
                    />

                    <Button
                        mode="outlined"
                        icon="camera"
                        style={{ marginTop: 15 }}
                    >
                        Upload Photo
                    </Button>
                </Card.Content>
            </Card>

            {/* Personal */}

            <Card style={styles.card}>
                <Card.Title
                    title="Personal Information"
                    left={(props) => (
                        <Avatar.Icon
                            {...props}
                            size={40}
                            icon="account"
                        />
                    )}
                />

                <Divider />

                <Card.Content>

                    <TextInput
                        mode="outlined"
                        label="First Name"
                        left={<TextInput.Icon icon="account" />}
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Last Name"
                        left={<TextInput.Icon icon="account-outline" />}
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Gender"
                        left={<TextInput.Icon icon="human-male-female" />}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Date of Birth"
                        left={<TextInput.Icon icon="calendar" />}
                    />

                </Card.Content>
            </Card>

            {/* Contact */}

            <Card style={styles.card}>
                <Card.Title
                    title="Contact Information"
                    left={(props) => (
                        <Avatar.Icon
                            {...props}
                            size={40}
                            icon="phone"
                        />
                    )}
                />

                <Divider />

                <Card.Content>

                    <TextInput
                        mode="outlined"
                        label="Phone Number"
                        keyboardType="phone-pad"
                        left={<TextInput.Icon icon="phone" />}
                        value={phone}
                        onChangeText={setPhone}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Email"
                        keyboardType="email-address"
                        left={<TextInput.Icon icon="email" />}
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Address"
                        multiline
                        numberOfLines={3}
                        left={<TextInput.Icon icon="map-marker" />}
                        value={address}
                        onChangeText={setAddress}
                    />

                </Card.Content>
            </Card>

            {/* Committee */}

            <Card style={styles.card}>
                <Card.Title
                    title="Committee Information"
                    left={(props) => (
                        <Avatar.Icon
                            {...props}
                            size={40}
                            icon="account-group"
                        />
                    )}
                />

                <Divider />

                <Card.Content>

                    <TextInput
                        mode="outlined"
                        label="Committee"
                        right={<TextInput.Icon icon="chevron-down" />}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Role"
                        right={<TextInput.Icon icon="chevron-down" />}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Joining Date"
                        left={<TextInput.Icon icon="calendar" />}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Membership ID"
                        left={<TextInput.Icon icon="identifier" />}
                    />

                </Card.Content>
            </Card>

            {/* Additional */}

            <Card style={styles.card}>
                <Card.Title
                    title="Additional Information"
                    left={(props) => (
                        <Avatar.Icon
                            {...props}
                            size={40}
                            icon="information"
                        />
                    )}
                />

                <Divider />

                <Card.Content>

                    <TextInput
                        mode="outlined"
                        label="Occupation"
                        left={<TextInput.Icon icon="briefcase" />}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Blood Group"
                        left={<TextInput.Icon icon="water" />}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Emergency Contact"
                        left={<TextInput.Icon icon="phone-alert" />}
                        style={styles.input}
                    />

                    <TextInput
                        mode="outlined"
                        label="Remarks"
                        multiline
                        numberOfLines={3}
                    />

                </Card.Content>
            </Card>

            <Button
                mode="contained"
                icon="content-save"
                style={styles.button}
                contentStyle={{
                    height: 58,
                }}
            >
                Save Committee Member
            </Button>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FC",
    },

    header: {
        paddingTop: 55,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    headerTitle: {
        color: "#fff",
        fontWeight: "700",
    },

    headerSubtitle: {
        color: "#E8EAF6",
        marginTop: 6,
    },

    card: {
        marginHorizontal: 16,
        marginTop: 18,
        borderRadius: 20,
    },

    input: {
        marginBottom: 15,
    },

    button: {
        marginHorizontal: 20,
        marginTop: 25,
        borderRadius: 14,
    },
})