import React, { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    View,
} from "react-native";
import {
    Card,
    Chip,
    Icon,
    Surface,
    Text,
    useTheme,
} from "react-native-paper";

interface Props {
    currentNumber: number | string;
    countdown: number | string;
    gameStatus?: "LIVE" | "PAUSED";
}

export default function CurrentNumberCard({
    currentNumber,
    countdown,
    gameStatus = "LIVE",
}: Props) {
    const theme = useTheme();

    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 1.15,
                duration: 220,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.spring(scale, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            }),
        ]).start();
    }, [currentNumber]);

    return (
        <Card
            mode="elevated"
            style={styles.card}
        >
            <Card.Content>

                <View style={styles.header}>

                    <View>

                        <Text variant="titleLarge">
                            🎤 Now Calling
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={{
                                color: theme.colors.onSurfaceVariant,
                            }}
                        >
                            Listen carefully for the next number
                        </Text>

                    </View>

                    <Chip
                        icon="circle"
                        compact
                        style={{
                            backgroundColor:
                                gameStatus === "LIVE"
                                    ? "#C8E6C9"
                                    : "#FFE082",
                        }}
                    >
                        {gameStatus}
                    </Chip>

                </View>

                <View style={styles.center}>

                    <Animated.View
                        style={{
                            transform: [{ scale }],
                        }}
                    >
                        <Surface
                            elevation={5}
                            style={[
                                styles.ball,
                                {
                                    backgroundColor:
                                        theme.colors.primary,
                                },
                            ]}
                        >
                            <Text
                                variant="displayLarge"
                                style={styles.number}
                            >
                                {currentNumber}
                            </Text>
                        </Surface>
                    </Animated.View>

                </View>

                <View style={styles.footer}>

                    <View style={styles.infoBox}>
                        <Icon
                            source="timer-outline"
                            size={22}
                        />

                        <Text
                            variant="bodyLarge"
                            style={styles.infoText}
                        >
                            Next Number
                        </Text>

                        <Text variant="headlineSmall">
                            {countdown}s
                        </Text>

                    </View>

                    <View style={styles.infoBox}>
                        <Icon
                            source="volume-high"
                            size={22}
                        />

                        <Text
                            variant="bodyLarge"
                            style={styles.infoText}
                        >
                            Voice Call
                        </Text>

                        <Text variant="headlineSmall">
                            ON
                        </Text>

                    </View>

                </View>

            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 22,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    center: {
        alignItems: "center",
        marginVertical: 30,
    },

    ball: {
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: "center",
        alignItems: "center",
    },

    number: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 74,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    infoBox: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 14,
    },

    infoText: {
        marginTop: 8,
        marginBottom: 6,
    },
});