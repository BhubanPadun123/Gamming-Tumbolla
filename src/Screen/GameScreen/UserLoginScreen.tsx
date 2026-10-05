import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {
    Avatar,
    Button,
    Card,
    Divider,
    IconButton,
    Surface,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper"
import {
    useUserLoginMutation
} from "../../Redux/Slice/UserApi"
import { ApiError } from "../../types/dataTypes"
import { Storage } from "../../types/localStorage"
import GlobalLoader from "../../components/Loader"
import AppAlert from "../../components/GlobalAlert"
import socketServices from "../../Websocket/websocket"

export default function LoginScreen({ navigation }: any) {
    const theme = useTheme()

    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [secureText, setSecureText] = useState(true)
    const [showAlet, setShowAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState("")

    const [loginUserApi, loginUserResponse] = useUserLoginMutation()


    const handleLogin = async () => {
        try {
            const response = await loginUserApi({
                mobile_number: mobile,
                password_hash: password,
            }).unwrap();

            await Storage.saveToken(response.access_token)
            await Storage.saveUser(response.user)
            socketServices.connect(response.access_token)

            setAlertMessage("Login successful");
            setShowAlert(true);

            // or navigate directly
            navigation.replace("TransitionScreen",{
                screenName:"Home"
            });
        } catch (err: any) {

            setAlertMessage(
                err?.data?.detail || "Invalid mobile number or password"
            );
            setShowAlert(true);
        }
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}

                <View style={styles.header}>
                    <Surface
                        style={[
                            styles.logoContainer,
                            { backgroundColor: theme.colors.primaryContainer },
                        ]}
                        elevation={3}
                    >
                        <Avatar.Icon
                            icon="dice-multiple"
                            size={70}
                            style={{ backgroundColor: theme.colors.primary }}
                        />
                    </Surface>

                    <Text variant="headlineMedium" style={styles.title}>
                        Rainbow Tambola
                    </Text>

                    <Text
                        variant="bodyLarge"
                        style={{
                            color: theme.colors.onSurfaceVariant,
                            marginTop: 8,
                            textAlign: "center",
                        }}
                    >
                        Play • Win • Celebrate Together 🎉
                    </Text>
                </View>

                {/* Hero Card */}

                <Card style={styles.heroCard} mode="contained">
                    <Card.Content style={{ alignItems: "center" }}>
                        <Avatar.Icon
                            size={90}
                            icon="trophy"
                            style={{
                                backgroundColor: "#F4B400",
                                marginBottom: 15,
                            }}
                        />

                        <Text variant="titleLarge" style={{ fontWeight: "700" }}>
                            Welcome Back!
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={{
                                textAlign: "center",
                                marginTop: 8,
                                color: theme.colors.onSurfaceVariant,
                            }}
                        >
                            Join live Tambola games, invite friends and win exciting prizes.
                        </Text>
                    </Card.Content>
                </Card>

                {/* Login Form */}

                <Card style={styles.loginCard}>
                    <Card.Content>

                        <TextInput
                            mode="outlined"
                            label="Mobile Number"
                            keyboardType="phone-pad"
                            value={mobile}
                            onChangeText={setMobile}
                            left={<TextInput.Icon icon="phone" />}
                            style={styles.input}
                        />

                        <TextInput
                            mode="outlined"
                            label="Password"
                            value={password}
                            secureTextEntry={secureText}
                            onChangeText={setPassword}
                            left={<TextInput.Icon icon="lock" />}
                            right={
                                <TextInput.Icon
                                    icon={secureText ? "eye-off" : "eye"}
                                    onPress={() => setSecureText(!secureText)}
                                />
                            }
                            style={styles.input}
                        />

                        <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                            <Text
                                style={{
                                    color: theme.colors.primary,
                                    fontWeight: "600",
                                }}
                            >
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <Button
                            mode="contained"
                            icon="login"
                            style={styles.loginButton}
                            contentStyle={{
                                height: 52,
                            }}
                            onPress={handleLogin}
                        >
                            Login
                        </Button>

                        <View style={styles.dividerContainer}>
                            <Divider style={{ flex: 1 }} />

                            <Text
                                style={{
                                    marginHorizontal: 10,
                                    color: theme.colors.onSurfaceVariant,
                                }}
                            >
                                OR
                            </Text>

                            <Divider style={{ flex: 1 }} />
                        </View>

                        <Button
                            mode="outlined"
                            icon="account-outline"
                            style={styles.guestButton}
                            contentStyle={{
                                height: 50,
                            }}
                        >
                            Continue as Guest
                        </Button>
                    </Card.Content>
                </Card>

                {/* Bottom */}

                <View style={styles.bottom}>
                    <Text>Don't have an account?</Text>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.replace("Register")
                        }}
                    >
                        <Text
                            style={{
                                color: theme.colors.primary,
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            Create Account
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}

                <View style={{ marginTop: 40 }}>
                    <Text
                        variant="bodySmall"
                        style={{
                            textAlign: "center",
                            color: theme.colors.onSurfaceVariant,
                        }}
                    >
                        Version 1.0.0
                    </Text>
                </View>
            </ScrollView>
            <AppAlert
                visible={showAlet}
                message={alertMessage}
                title="User Login"
                onCancel={() => {
                    setAlertMessage("")
                    setShowAlert(false)
                    if (loginUserResponse.isSuccess) {
                        loginUserResponse.reset()
                        navigation.navigate("TransitionScreen", {
                            screenName: "Home"
                        })
                    } else {
                        loginUserResponse.reset()
                    }
                }}
                onConfirm={() => {
                    setAlertMessage("")
                    setShowAlert(false)
                    if (loginUserResponse.isSuccess) {
                        loginUserResponse.reset()
                        navigation.navigate("TransitionScreen", {
                            screenName: "Home"
                        })
                    } else {
                        loginUserResponse.reset()
                    }
                }}
            />
            {
                (
                    loginUserResponse.isLoading
                ) && (
                    <GlobalLoader
                        visible={true}
                        title="Login"
                        message="user login loading..."
                    />
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scroll: {
        padding: 22,
        paddingBottom: 40,
    },

    header: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 25,
    },

    logoContainer: {
        width: 110,
        height: 110,
        borderRadius: 55,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontWeight: "bold",
        marginTop: 20,
    },

    heroCard: {
        borderRadius: 24,
        marginBottom: 25,
        paddingVertical: 15,
    },

    loginCard: {
        borderRadius: 24,
        paddingVertical: 10,
        elevation: 4,
    },

    input: {
        marginBottom: 18,
    },

    loginButton: {
        marginTop: 20,
        borderRadius: 30,
    },

    guestButton: {
        borderRadius: 30,
    },

    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 22,
    },

    bottom: {
        alignItems: "center",
        marginTop: 30,
    },
});