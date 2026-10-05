import React, { useState } from "react"
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import {
    Appbar,
    Avatar,
    Button,
    Card,
    Chip,
    Divider,
    HelperText,
    Menu,
    Switch,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper"

type Props = {
    route?: {
        params?: {
            mode?: "create" | "manage";
        };
    };
};

const committeeList = [
    "Central Committee",
    "Youth Committee",
    "Sports Committee",
    "Cultural Committee",
    "Women Committee",
]

export default function CommitteeEventScreen({
    route,
}: Props) {
    const theme = useTheme();

    const mode = route?.params?.mode ?? "create";

    const [title, setTitle] = useState("");
    const [venue, setVenue] = useState("");
    const [date, setDate] = useState("25 July 2026");
    const [time, setTime] = useState("10:00 AM");
    const [description, setDescription] = useState("");

    const [committee, setCommittee] = useState(committeeList[0]);

    const [menuVisible, setMenuVisible] = useState(false);

    const [registration, setRegistration] = useState(true);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => { }} />

                <Appbar.Content
                    title={
                        mode === "create"
                            ? "Create Event"
                            : "Manage Committee Event"
                    }
                />
            </Appbar.Header>

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Banner */}

                <Card style={styles.bannerCard}>
                    <Card.Content
                        style={{
                            alignItems: "center",
                        }}
                    >
                        <Avatar.Icon
                            size={80}
                            icon="calendar-star"
                        />

                        <Text
                            variant="headlineSmall"
                            style={{ marginTop: 12 }}
                        >
                            {title || "Committee Event"}
                        </Text>

                        <Chip
                            style={{ marginTop: 10 }}
                            icon="check-circle"
                        >
                            Draft
                        </Chip>
                    </Card.Content>
                </Card>

                {/* Event Details */}

                <Card style={styles.card}>
                    <Card.Title title="Event Information" />

                    <Divider />

                    <Card.Content>

                        <TextInput
                            label="Event Title"
                            mode="outlined"
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                        />

                        <TextInput
                            label="Venue"
                            mode="outlined"
                            value={venue}
                            onChangeText={setVenue}
                            style={styles.input}
                        />

                        <TextInput
                            label="Event Date"
                            mode="outlined"
                            value={date}
                            onChangeText={setDate}
                            right={<TextInput.Icon icon="calendar" />}
                            style={styles.input}
                        />

                        <TextInput
                            label="Event Time"
                            mode="outlined"
                            value={time}
                            onChangeText={setTime}
                            right={<TextInput.Icon icon="clock-outline" />}
                            style={styles.input}
                        />

                        {/* Committee */}

                        <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={
                                <Button
                                    mode="outlined"
                                    icon="account-group"
                                    onPress={() => setMenuVisible(true)}
                                    style={{
                                        marginTop:4
                                    }}
                                >
                                    {committee}
                                </Button>
                            }
                        >
                            {committeeList.map((item) => (
                                <Menu.Item
                                    key={item}
                                    title={item}
                                    onPress={() => {
                                        setCommittee(item);
                                        setMenuVisible(false);
                                    }}
                                />
                            ))}
                        </Menu>

                        <TextInput
                            mode="outlined"
                            label="Description"
                            multiline
                            numberOfLines={5}
                            value={description}
                            onChangeText={setDescription}
                            style={styles.input}
                        />

                        <HelperText type="info">
                            Add complete information about this committee event.
                        </HelperText>

                    </Card.Content>
                </Card>

                {/* Registration */}

                <Card style={styles.card}>
                    <Card.Title title="Registration" />

                    <Divider />

                    <Card.Content>

                        <View style={styles.row}>
                            <Text variant="titleMedium">
                                Allow Registration
                            </Text>

                            <Switch
                                value={registration}
                                onValueChange={setRegistration}
                            />
                        </View>

                    </Card.Content>
                </Card>

                {/* Action Buttons */}

                <Card style={styles.card}>
                    <Card.Title title="Actions" />

                    <Divider />

                    <Card.Content>

                        {mode === "create" ? (
                            <>
                                <Button
                                    mode="contained"
                                    icon="plus-circle"
                                    style={styles.button}
                                    onPress={() => { }}
                                >
                                    Create Event
                                </Button>

                                <Button
                                    mode="outlined"
                                    icon="content-save"
                                    style={styles.button}
                                    onPress={() => { }}
                                >
                                    Save Draft
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    mode="contained"
                                    icon="content-save"
                                    style={styles.button}
                                    onPress={() => { }}
                                >
                                    Update Event
                                </Button>

                                <Button
                                    mode="outlined"
                                    icon="send"
                                    style={styles.button}
                                    onPress={() => { }}
                                >
                                    Publish Event
                                </Button>

                                <Button
                                    mode="outlined"
                                    icon="content-copy"
                                    style={styles.button}
                                    onPress={() => { }}
                                >
                                    Duplicate Event
                                </Button>

                                <Button
                                    mode="outlined"
                                    icon="account-off"
                                    style={styles.button}
                                    onPress={() => { }}
                                >
                                    Close Registration
                                </Button>

                                <Button
                                    mode="contained-tonal"
                                    buttonColor={theme.colors.errorContainer}
                                    textColor={theme.colors.error}
                                    icon="delete"
                                    style={styles.button}
                                    onPress={() => { }}
                                >
                                    Delete Event
                                </Button>
                            </>
                        )}

                    </Card.Content>
                </Card>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6FA",
    },

    bannerCard: {
        margin: 16,
        borderRadius: 18,
        elevation: 3,
    },

    card: {
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 18,
        elevation: 2,
    },

    input: {
        marginTop: 16,
    },

    button: {
        marginTop: 14,
    },

    row: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 10,
    },
})