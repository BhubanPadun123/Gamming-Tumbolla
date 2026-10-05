import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

interface Props {
    calledNumbers: number[];
    currentNumber?: number;
}

const TOTAL_NUMBERS = Array.from({ length: 99 }, (_, i) => i + 1);

export default function NumberBoard({
    calledNumbers,
    currentNumber,
}: Props) {
    const theme = useTheme();

    const renderItem = ({ item }: { item: number }) => {
        const isCalled = calledNumbers.includes(item);
        const isCurrent = currentNumber === item;

        return (
            <Surface
                elevation={isCurrent ? 5 : 1}
                style={[
                    styles.numberBox,

                    isCalled && {
                        backgroundColor: theme.colors.primary,
                    },

                    isCurrent && {
                        backgroundColor: "#E53935",
                        transform: [{ scale: 1.05 }],
                    },
                ]}
            >
                <Text
                    variant="titleMedium"
                    style={[
                        styles.number,

                        isCalled && {
                            color: "#fff",
                        },

                        isCurrent && {
                            color: "#fff",
                            fontWeight: "bold",
                        },
                    ]}
                >
                    {item}
                </Text>
            </Surface>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={TOTAL_NUMBERS}
                keyExtractor={(item) => item.toString()}
                renderItem={renderItem}
                numColumns={9}
                scrollEnabled={false}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },

    row: {
        justifyContent: "space-between",
    },

    numberBox: {
        width: 34,
        height: 34,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 8,
    },

    number: {
        fontWeight: "600",
    },
});