import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Surface,
  Text,
  useTheme,
} from "react-native-paper"

export default function ComingSoonScreen({ navigation }: any) {
  const theme = useTheme()
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Surface
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface },
        ]}
        elevation={3}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          {/* <MaterialCommunityIcons
            name="rocket-launch-outline"
            size={90}
            color={theme.colors.primary}
          /> */}
        </View>

        <Text
          variant="headlineMedium"
          style={styles.title}
        >
          Feature Coming Soon
        </Text>

        <Text
          variant="bodyLarge"
          style={[
            styles.description,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          We're working hard to bring this feature to you.
        </Text>

        <Text
          variant="bodyMedium"
          style={[
            styles.subDescription,
            { color: theme.colors.outline },
          ]}
        >
          This page isn't available yet, but it will be included in a future update.
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            icon="home"
            style={styles.button}
            onPress={() => {
              navigation.navigate("TransitionScreen", {
                screenName: "Home",
              })
            }}
          >
            Go Home
          </Button>

          <Button
            mode="outlined"
            icon="arrow-left"
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            Go Back
          </Button>
        </View>
      </Surface>

      <Text
        variant="bodySmall"
        style={[
          styles.footer,
          { color: theme.colors.outline },
        ]}
      >
        Thank you for your patience ❤️
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  card: {
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
  },

  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },

  description: {
    textAlign: "center",
    lineHeight: 28,
  },

  subDescription: {
    textAlign: "center",
    marginTop: 12,
    lineHeight: 24,
    marginBottom: 32,
  },

  buttonContainer: {
    width: "100%",
  },

  button: {
    marginBottom: 14,
    borderRadius: 14,
  },

  footer: {
    textAlign: "center",
    marginTop: 24,
  },
})