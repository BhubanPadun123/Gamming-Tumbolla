import React from "react";
import { StyleSheet, View } from "react-native";
import {
    Button,
    Dialog,
    Icon,
    Portal,
    Text,
    useTheme,
} from "react-native-paper";

type AlertType = "success" | "error" | "warning" | "info";

interface AppAlertProps {
    visible: boolean;
    type?: AlertType;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    dismissable?: boolean;
}

const AppAlert: React.FC<AppAlertProps> = ({
    visible,
    type = "info",
    title,
    message,
    confirmText = "OK",
    cancelText,
    onConfirm,
    onCancel,
    dismissable = true,
}) => {
    const theme = useTheme();

    const config = {
        success: {
            icon: "check-circle",
            color: "#2E7D32",
        },
        error: {
            icon: "close-circle",
            color: "#D32F2F",
        },
        warning: {
            icon: "alert-circle",
            color: "#ED6C02",
        },
        info: {
            icon: "information",
            color: theme.colors.primary,
        },
    }[type];

    return (
        <Portal>
            <Dialog
                visible={visible}
                dismissable={dismissable}
                onDismiss={onCancel}
                style={styles.dialog}
            >
                <Dialog.Content>
                    <View style={styles.iconContainer}>
                        <Icon
                            source={config.icon}
                            size={72}
                            color={config.color}
                        />
                    </View>

                    <Text
                        variant="headlineSmall"
                        style={styles.title}
                    >
                        {title}
                    </Text>

                    <Text
                        variant="bodyMedium"
                        style={[
                            styles.message,
                            { color: theme.colors.onSurfaceVariant },
                        ]}
                    >
                        {message}
                    </Text>
                </Dialog.Content>

                <Dialog.Actions style={styles.actions}>
                    {cancelText && (
                        <Button
                            mode="outlined"
                            onPress={onCancel}
                        >
                            {cancelText}
                        </Button>
                    )}

                    <Button
                        mode="contained"
                        onPress={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default AppAlert;

const styles = StyleSheet.create({
    dialog: {
        borderRadius: 24,
    },

    iconContainer: {
        alignItems: "center",
        marginBottom: 16,
    },

    title: {
        textAlign: "center",
        fontWeight: "700",
        marginBottom: 10,
    },

    message: {
        textAlign: "center",
        lineHeight: 22,
    },

    actions: {
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 10,
    },
});