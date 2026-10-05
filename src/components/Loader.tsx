// components/GlobalLoader.tsx

import React from "react";
import { StyleSheet, View } from "react-native";
import {
    ActivityIndicator,
    Portal,
    Surface,
    Text,
    useTheme,
} from "react-native-paper";

interface GlobalLoaderProps {
    visible: boolean;
    title?: string;
    message?: string;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({
    visible,
    title = "Loading...",
    message = "Please wait a moment",
}) => {
    const theme = useTheme();

    if (!visible) return null;

    return (
        <Portal>
            <View style={styles.overlay}>
                <Surface
                    elevation={5}
                    style={[
                        styles.container,
                        { backgroundColor: theme.colors.surface },
                    ]}
                >
                    <ActivityIndicator
                        animating
                        size={50}
                        color={theme.colors.primary}
                    />

                    <Text
                        variant="titleLarge"
                        style={styles.title}
                    >
                        🎲 {title}
                    </Text>

                    <Text
                        variant="bodyMedium"
                        style={{
                            color: theme.colors.onSurfaceVariant,
                            textAlign: "center",
                        }}
                    >
                        {message}
                    </Text>
                </Surface>
            </View>
        </Portal>
    );
};

export default GlobalLoader;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
    },

    container: {
        width: 260,
        padding: 24,
        borderRadius: 24,
        alignItems: "center",
    },

    title: {
        marginTop: 18,
        marginBottom: 8,
        fontWeight: "700",
    },
});