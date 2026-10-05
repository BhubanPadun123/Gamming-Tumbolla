import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import {
    Appbar,
    Button,
    Card,
    HelperText,
    SegmentedButtons,
    Switch,
    Text,
    TextInput,
    useTheme,
} from "react-native-paper"
import GlobalLoader from "../../components/Loader"
import AppAlert from "../../components/GlobalAlert"
import {
    useCreateGameRoomMutation
} from "../../Redux/Slice/GameRoomApi"
import {
    formFill
} from "../../Redux/Slice/gameSlice"
import { useAppDispatch, useAppSelector } from "../../Redux/hooks"
import {
    gameRoomCreatePayload
} from "../../types/dataTypes"

export default function CreateGameScreen({ navigation }: any) {
    const dispatch = useAppDispatch()
    const theme = useTheme()

    const [gameType, setGameType] = useState("FREE")
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [alertTitle, setAlertTitle] = useState<string>("")

    const store = useAppSelector((state) => state.game)

    const [createGameApi, createGameResponse] = useCreateGameRoomMutation()

    async function onCreateGame() {
        const formState = store.formState
        const {
            title,
            description,
            max_players,
            max_tickets_per_player,
            ticket_price,
            auto_call,
            auto_call_interval,
            game_type
        } = formState
        if (!title || !description || !max_players || !max_tickets_per_player || !ticket_price || !game_type) {
            setShowAlert(true)
            setAlertMessage("Please fill all fields data")
            setAlertTitle("Info")
        }
        let data: gameRoomCreatePayload = {
            ...formState
        }
        try {
            const res = await createGameApi(data).unwrap()
            setShowAlert(true)
            setAlertMessage("Game Room created success")
            setAlertTitle("Room Create")

        } catch (error) {
            setShowAlert(true)
            setAlertMessage("Error while create game room!please try again after sometime")
            setAlertTitle("Game room create error")
        }
    }

    return (
        <>
            <Appbar.Header elevated>
                <Appbar.BackAction onPress={() => { }} />
                <Appbar.Content title="Create Tambola Game" />
            </Appbar.Header>

            <ScrollView
                style={styles.container}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                <Card style={styles.card}>
                    <Card.Content>

                        <Text variant="titleMedium">
                            Game Information
                        </Text>

                        <TextInput
                            label="Game Title"
                            mode="outlined"
                            style={styles.input}
                            value={store.formState.title}
                            onChangeText={(text) => {
                                dispatch(formFill({
                                    fieldName: "title",
                                    fieldValue: text
                                }))
                            }}
                        />

                        <TextInput
                            label="Description"
                            mode="outlined"
                            multiline
                            numberOfLines={5}
                            style={styles.input}
                            value={store.formState.description}
                            onChangeText={(text) => {
                                dispatch(formFill({
                                    fieldName: "description",
                                    fieldValue: text
                                }))
                            }}
                        />

                        <SegmentedButtons
                            value={store.formState.game_type}
                            onValueChange={(e) => {
                                setGameType(e)
                                dispatch(formFill({
                                    fieldName: "game_type",
                                    fieldValue: e ? e : ""
                                }))
                            }}
                            buttons={[
                                {
                                    value: "FREE",
                                    label: "Free",
                                },
                                {
                                    value: "PAID",
                                    label: "Paid",
                                },
                                {
                                    value: "PRIVATE",
                                    label: "Private",
                                },
                            ]}
                        />

                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>

                        <Text variant="titleMedium">
                            Game Configuration
                        </Text>

                        <TextInput
                            label="Ticket Price"
                            mode="outlined"
                            keyboardType="numeric"
                            style={styles.input}
                            value={store.formState.ticket_price.toString()}
                            onChangeText={(e) => {
                                dispatch(formFill({
                                    fieldName: "ticket_price",
                                    fieldValue: Number(e)
                                }))
                            }}
                        />

                        <TextInput
                            label="Maximum Players"
                            mode="outlined"
                            keyboardType="numeric"
                            style={styles.input}
                            value={store.formState.max_players.toString()}
                            onChangeText={(e) => {
                                dispatch(formFill({
                                    fieldName: "max_players",
                                    fieldValue: e
                                }))
                            }}
                        />

                        <TextInput
                            label="Tickets Per Player"
                            mode="outlined"
                            keyboardType="numeric"
                            style={styles.input}
                            value={store.formState.max_tickets_per_player.toString()}
                            onChangeText={(e) => {
                                dispatch(formFill({
                                    fieldName: "max_tickets_per_player",
                                    fieldValue: e
                                }))
                            }}
                        />

                        {/* <TextInput
                            label="Prize Pool"
                            mode="outlined"
                            keyboardType="numeric"
                            style={styles.input}
                        /> */}

                    </Card.Content>
                </Card>

                {/* <Card style={styles.card}>
                    <Card.Content>

                        <Text variant="titleMedium">
                            Settings
                        </Text>

                        <View style={styles.row}>
                            <Text>Enable Chat</Text>

                            <Switch
                                value={chat}
                                onValueChange={setChat}
                            />
                        </View>

                        <View style={styles.row}>
                            <Text>Voice Calling</Text>

                            <Switch
                                value={voice}
                                onValueChange={setVoice}
                            />
                        </View>

                        <View style={styles.row}>
                            <Text>Auto Start</Text>

                            <Switch
                                value={autoStart}
                                onValueChange={setAutoStart}
                            />
                        </View>

                    </Card.Content>
                </Card> */}

                <Button
                    mode="contained"
                    icon="plus-circle"
                    style={styles.button}
                    onPress={onCreateGame}
                >
                    Create Game
                </Button>

            </ScrollView>
            <AppAlert
                visible={showAlert}
                message={alertMessage}
                title={alertTitle}
                onCancel={() => {
                    setShowAlert(false)
                    setAlertMessage("")
                    setAlertTitle("")
                }}
                onConfirm={() => {
                    setShowAlert(false)
                    setAlertMessage("")
                    setAlertTitle("")
                    if (createGameResponse.isSuccess) {
                        createGameResponse.reset()
                        navigation.replace("TransitionScreen", {
                            screenName: "Update"
                        })
                    }
                    if(createGameResponse.isError){
                        createGameResponse.reset()
                    }
                }}
            />
            {
                createGameResponse.isLoading && (
                    <GlobalLoader
                        visible={true}
                        message="Creating new game room"
                        title="Create"
                    />
                )
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    card: {
        margin: 16,
        borderRadius: 18,
    },

    input: {
        marginTop: 14,
    },

    row: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    button: {
        marginHorizontal: 16,
        marginTop: 20,
        borderRadius: 30,
        paddingVertical: 6,
    },
});