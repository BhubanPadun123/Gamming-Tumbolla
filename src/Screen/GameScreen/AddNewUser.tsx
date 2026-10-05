import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import {
    Text,
    TextInput,
    Button,
    Card,
    Avatar,
    HelperText,
    useTheme,
} from "react-native-paper";

export default function AddNewUser() {
    const theme = useTheme();

    const [committeeName, setCommitteeName] = useState("");
    const [chairman, setChairman] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [secure, setSecure] = useState(true);

    const onRegister = () => {
        console.log({
            committeeName,
            chairman,
            email,
            phone,
            address,
            password,
        });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Avatar.Icon
                    size={90}
                    icon="account-group"
                    style={{
                        backgroundColor: theme.colors.primaryContainer,
                        alignSelf: "center",
                        marginBottom: 20,
                    }}
                />

                <Text
                    variant="headlineMedium"
                    style={styles.title}
                >
                    Committee Registration
                </Text>

                <Text
                    variant="bodyMedium"
                    style={styles.subtitle}
                >
                    Register your committee to manage members, events and activities.
                </Text>

                <Card style={styles.card} mode="elevated">
                    <Card.Content>

                        <TextInput
                            mode="outlined"
                            label="Committee Name"
                            left={<TextInput.Icon icon="office-building" />}
                            value={committeeName}
                            onChangeText={setCommitteeName}
                            style={styles.input}
                        />

                        <TextInput
                            mode="outlined"
                            label="Chairman / President"
                            left={<TextInput.Icon icon="account" />}
                            value={chairman}
                            onChangeText={setChairman}
                            style={styles.input}
                        />

                        <TextInput
                            mode="outlined"
                            label="Email Address"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            left={<TextInput.Icon icon="email-outline" />}
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />

                        <TextInput
                            mode="outlined"
                            label="Phone Number"
                            keyboardType="phone-pad"
                            left={<TextInput.Icon icon="phone-outline" />}
                            value={phone}
                            onChangeText={setPhone}
                            style={styles.input}
                        />

                        <TextInput
                            mode="outlined"
                            label="Office Address"
                            multiline
                            numberOfLines={3}
                            left={<TextInput.Icon icon="map-marker-outline" />}
                            value={address}
                            onChangeText={setAddress}
                            style={styles.input}
                        />

                        <TextInput
                            mode="outlined"
                            label="Password"
                            secureTextEntry={secure}
                            left={<TextInput.Icon icon="lock-outline" />}
                            right={
                                <TextInput.Icon
                                    icon={secure ? "eye-off" : "eye"}
                                    onPress={() => setSecure(!secure)}
                                />
                            }
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />

                        <HelperText type="info">
                            Password should contain at least 8 characters.
                        </HelperText>

                        <Button
                            mode="contained"
                            onPress={onRegister}
                            icon="account-plus"
                            contentStyle={{ height: 52 }}
                            style={styles.button}
                        >
                            Register Committee
                        </Button>
                    </Card.Content>
                </Card>

                <Text
                    variant="bodySmall"
                    style={styles.footer}
                >
                    Already registered? Login to continue.
                </Text>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F7FC",
    },
    content: {
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
    },
    title: {
        textAlign: "center",
        fontWeight: "700",
    },
    subtitle: {
        textAlign: "center",
        marginTop: 8,
        marginBottom: 25,
        color: "#666",
        lineHeight: 22,
    },
    card: {
        borderRadius: 24,
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 10,
        borderRadius: 14,
    },
    footer: {
        textAlign: "center",
        marginTop: 25,
        color: "#666",
    },
});