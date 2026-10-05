import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Share,
    Linking,
} from "react-native"
import {
    inviteLink
} from "../../types/constant"
import {
    Appbar,
    Avatar,
    Button,
    Card,
    Chip,
    Divider,
    IconButton,
    Surface,
    Switch,
    Text,
    TouchableRipple,
    useTheme,
} from "react-native-paper";

export default function InviteCandidateScreen({ navigation }: any) {
    const theme = useTheme();

    const [allowGuest, setAllowGuest] = useState(true);
    const [autoApprove, setAutoApprove] = useState(true);
    const [notifyJoin, setNotifyJoin] = useState(true);

    const roomCode = "Rainbow45892";

    const shareInvite = async () => {
        try {
            await Share.share({
                message: `🎲 Join Rainbow Tambola Game!

Room Code: ${roomCode}

Join Here:
${inviteLink}`,
            });
        } catch (e) {
            console.log(e);
        }
    };

    const openWhatsApp = async () => {
        const url = `https://wa.me/?text=${encodeURIComponent(
            `🎲 Join Rainbow Tambola Game!\n\nRoom Code: ${roomCode}\n\n${inviteLink}`
        )}`;

        Linking.openURL(url);
    };

    const inviteCards = [
        {
            title: "WhatsApp",
            icon: "whatsapp",
            color: "#25D366",
            onPress: openWhatsApp,
        },
        {
            title: "Share",
            icon: "share-variant",
            color: "#1565C0",
            onPress: shareInvite,
        },
        // {
        //     title: "Email",
        //     icon: "email-outline",
        //     color: "#E53935",
        //     onPress: () => { },
        // },
        // {
        //     title: "SMS",
        //     icon: "message-text-outline",
        //     color: "#FB8C00",
        //     onPress: () => { },
        // },
        // {
        //     title: "QR Code",
        //     icon: "qrcode",
        //     color: "#5E35B1",
        //     onPress: () => { },
        // },
        // {
        //     title: "Copy Link",
        //     icon: "content-copy",
        //     color: "#00897B",
        //     onPress: () => { },
        // },
    ];

    return (
        <>
            <Appbar.Header elevated>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content
                    title="Invite Players"
                    subtitle="Share your Tambola game"
                />
            </Appbar.Header>

            <ScrollView
                style={[
                    styles.container,
                    {
                        backgroundColor: theme.colors.background,
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Card */}

                <Card mode="elevated" style={styles.heroCard}>
                    <Card.Content style={styles.heroContent}>
                        <Avatar.Icon
                            icon="cards-playing"
                            size={80}
                            style={{
                                backgroundColor: theme.colors.primaryContainer,
                            }}
                        />

                        <Text
                            variant="headlineSmall"
                            style={styles.title}
                        >
                            Sunday Night Tambola
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={{
                                color: theme.colors.onSurfaceVariant,
                            }}
                        >
                            Invite players and start your exciting game.
                        </Text>

                        <View style={styles.chipRow}>
                            <Chip icon="account-group">
                                150 Players
                            </Chip>

                            <Chip icon="currency-inr">
                                ₹100 Entry
                            </Chip>
                        </View>

                        <View style={styles.chipRow}>
                            <Chip icon="clock-outline">
                                Today • 7:30 PM
                            </Chip>
                        </View>
                    </Card.Content>
                </Card>

                {/* Room Card */}

                <Card style={styles.card}>
                    <Card.Title
                        title="Game Room"
                        left={(props) => (
                            <Avatar.Icon
                                {...props}
                                icon="key"
                                size={42}
                            />
                        )}
                    />

                    <Card.Content>

                        <Surface
                            style={styles.roomCode}
                            elevation={1}
                        >
                            <Text variant="headlineMedium">
                                {roomCode}
                            </Text>
                        </Surface>

                        <Text
                            style={styles.link}
                            selectable
                        >
                            {inviteLink}
                        </Text>

                        <Button
                            mode="contained-tonal"
                            icon="content-copy"
                            style={styles.copyButton}
                        >
                            Copy Invite Link
                        </Button>

                    </Card.Content>
                </Card>

                {/* Invite Methods */}

                <Text
                    variant="titleLarge"
                    style={styles.sectionTitle}
                >
                    Invite Via
                </Text>

                <View style={styles.grid}>
                    {inviteCards.map((item) => (
                        <TouchableRipple
                            key={item.title}
                            style={styles.gridItem}
                            borderless
                            onPress={item.onPress}
                        >
                            <Card
                                mode="contained"
                                style={styles.inviteCard}
                            >
                                <Card.Content
                                    style={styles.inviteContent}
                                >
                                    <Avatar.Icon
                                        icon={item.icon}
                                        size={56}
                                        style={{
                                            backgroundColor: item.color,
                                        }}
                                    />

                                    <Text
                                        variant="titleSmall"
                                        style={styles.inviteText}
                                    >
                                        {item.title}
                                    </Text>
                                </Card.Content>
                            </Card>
                        </TouchableRipple>
                    ))}
                </View>

                {/* Settings */}

                {/* <Card style={styles.card}>
                    <Card.Title title="Invitation Settings" />

                    <Divider />

                    <Card.Content>

                        <View style={styles.settingRow}>
                            <Text variant="bodyLarge">
                                Allow Guest Join
                            </Text>

                            <Switch
                                value={allowGuest}
                                onValueChange={setAllowGuest}
                            />
                        </View>

                        <View style={styles.settingRow}>
                            <Text variant="bodyLarge">
                                Auto Approve Players
                            </Text>

                            <Switch
                                value={autoApprove}
                                onValueChange={setAutoApprove}
                            />
                        </View>

                        <View style={styles.settingRow}>
                            <Text variant="bodyLarge">
                                Notify When Joined
                            </Text>

                            <Switch
                                value={notifyJoin}
                                onValueChange={setNotifyJoin}
                            />
                        </View>

                    </Card.Content>
                </Card> */}

                {/* Statistics */}

                {/* <Card style={styles.card}>
                    <Card.Title title="Invitation Summary" />

                    <Card.Content>

                        <View style={styles.summaryRow}>

                            <View style={styles.summaryItem}>
                                <Text variant="headlineMedium">
                                    128
                                </Text>

                                <Text>
                                    Invited
                                </Text>
                            </View>

                            <View style={styles.summaryItem}>
                                <Text variant="headlineMedium">
                                    87
                                </Text>

                                <Text>
                                    Joined
                                </Text>
                            </View>

                            <View style={styles.summaryItem}>
                                <Text variant="headlineMedium">
                                    41
                                </Text>

                                <Text>
                                    Pending
                                </Text>
                            </View>

                        </View>

                    </Card.Content>
                </Card> */}

                <Button
                    mode="contained"
                    icon="send"
                    style={styles.bottomButton}
                    contentStyle={{
                        height: 58,
                    }}
                    onPress={shareInvite}
                >
                    Send Invitation
                </Button>

                <View style={{ height: 30 }} />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    heroCard: {
        margin: 16,
        borderRadius: 22,
    },

    heroContent: {
        alignItems: "center",
        paddingVertical: 10,
    },

    title: {
        marginTop: 16,
        fontWeight: "700",
    },

    chipRow: {
        flexDirection: "row",
        marginTop: 14,
        gap: 10,
        flexWrap: "wrap",
        justifyContent: "center",
    },

    card: {
        marginHorizontal: 16,
        marginTop: 18,
        borderRadius: 20,
    },

    roomCode: {
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: "center",
        marginBottom: 18,
    },

    link: {
        textAlign: "center",
        marginBottom: 18,
    },

    copyButton: {
        borderRadius: 14,
    },

    sectionTitle: {
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 14,
        fontWeight: "700",
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 12,
    },

    gridItem: {
        width: "48%",
        marginBottom: 14,
        borderRadius: 18,
    },

    inviteCard: {
        borderRadius: 18,
    },

    inviteContent: {
        alignItems: "center",
        paddingVertical: 18,
    },

    inviteText: {
        marginTop: 12,
        fontWeight: "600",
    },

    settingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 14,
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    summaryItem: {
        alignItems: "center",
        flex: 1,
    },

    bottomButton: {
        marginHorizontal: 16,
        marginTop: 24,
        borderRadius: 30,
    },
});