import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

export default function SettingsScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">Settings Screen</Text>

            <Button
                mode="contained"
                style={{ marginTop: 20 }}
                onPress={() => navigation.goBack()}
            >
                Go Back
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})