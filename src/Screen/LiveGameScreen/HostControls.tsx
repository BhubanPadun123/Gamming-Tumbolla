import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
} from "react-native";
import {
    Button,
    Card,
    Chip,
    Divider,
    SegmentedButtons,
    Switch,
    Text,
    useTheme,
} from "react-native-paper";

interface Props {
    onNextNumber?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onRecall?: () => void;
    onEndGame?: () => void;
    setTimeInterval?:(e:string) => void;
}

export default function HostControls({
    onNextNumber,
    onPause,
    onResume,
    onRecall,
    onEndGame,
    setTimeInterval
}: Props) {
    const theme = useTheme();

    const [paused, setPaused] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [autoMode, setAutoMode] = useState(true);
    const [interval, setInterval] = useState("5");

    

    const handlePauseResume = () => {
        if (paused) {
            onResume?.();
        } else {
            onPause?.();
        }

        setPaused(!paused);
    };

    return (
        <Card
            mode="elevated"
            style={styles.card}
        >
            <Card.Title
                title="🎮 Host Controls"
                subtitle="Manage the live Tambola game"
            />

            <Divider />

            <Card.Content>

                {/* Next Number */}

                <Button
                    mode="contained"
                    icon="cards-playing"
                    style={styles.primaryButton}
                    contentStyle={{
                        height: 58,
                    }}
                    onPress={onNextNumber}
                >
                    Call Next Number
                </Button>

                {/* Pause Resume */}

                <Button
                    mode="outlined"
                    icon={paused ? "play" : "pause"}
                    style={styles.button}
                    onPress={handlePauseResume}
                >
                    {paused ? "Resume Game" : "Pause Game"}
                </Button>

                {/* Recall */}

                <Button
                    mode="contained-tonal"
                    icon="history"
                    style={styles.button}
                    onPress={onRecall}
                >
                    Recall Last Number
                </Button>

                <Text
                    variant="titleMedium"
                    style={{
                        marginBottom: 12,
                    }}
                >
                    Auto Call Interval
                </Text>

                <SegmentedButtons
                    value={interval}
                    onValueChange={(e:string)=> {
                        setInterval(e)
                    }}
                    buttons={[
                        {
                            value: "3",
                            label: "3 sec",
                        },
                        {
                            value: "5",
                            label: "5 sec",
                        },
                        {
                            value: "8",
                            label: "8 sec",
                        },
                        {
                            value: "10",
                            label: "10 sec",
                        },
                    ]}
                />

                <Divider style={styles.divider} />

                <View style={styles.stats}>

                    <Chip icon="numeric">
                        37 / 90
                    </Chip>

                    <Chip icon="clock-outline">
                        18:32
                    </Chip>

                    <Chip icon="account-group">
                        126
                    </Chip>

                </View>

                <Button
                    mode="contained"
                    icon="flag-checkered"
                    buttonColor={theme.colors.error}
                    style={styles.endButton}
                    contentStyle={{
                        height: 54,
                    }}
                    onPress={onEndGame}
                >
                    End Game
                </Button>

            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 22,
    },

    primaryButton: {
        borderRadius: 14,
    },

    button: {
        marginTop: 14,
        borderRadius: 14,
    },

    divider: {
        marginVertical: 20,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },

    stats: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    endButton: {
        borderRadius: 14,
    },
});