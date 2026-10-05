import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Surface, Text, useTheme } from "react-native-paper";

interface TransitionSplashProps {
    title?: string;
    subtitle?: string;
    duration?: number;
    onFinish?: () => void;
}

export default function TransitionSplash({
    title = "Committee Management",
    subtitle = "Preparing your dashboard...",
    duration = 800,
    onFinish,
}: TransitionSplashProps) {
    const theme = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish?.();
        }, duration);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.primary },
            ]}
        >
            {/* <Surface style={styles.logoCard} elevation={4}>
                <MaterialCommunityIcons
                    name="account-group"
                    size={70}
                    color={theme.colors.primary}
                />
            </Surface> */}

            <Text variant="headlineMedium" style={styles.title}>
                {title}
            </Text>

            <Text variant="bodyLarge" style={styles.subtitle}>
                {subtitle}
            </Text>

            <ActivityIndicator
                size="large"
                color="white"
                style={{ marginTop: 40 }}
            />

            <Text variant="bodySmall" style={styles.footer}>
                Please wait...
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    logoCard: {
        width: 130,
        height: 130,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: 35,
    },

    title: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
    },

    subtitle: {
        color: "rgba(255,255,255,0.85)",
        marginTop: 10,
        textAlign: "center",
        lineHeight: 24,
    },

    footer: {
        marginTop: 25,
        color: "rgba(255,255,255,0.75)",
    },
});