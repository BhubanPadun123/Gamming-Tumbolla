import React, { useEffect, useRef } from "react";
import {
    FlatList,
    StyleSheet,
    View,
} from "react-native";
import {
    Surface,
    Text,
    useTheme,
} from "react-native-paper";

interface Props {
    numbers: number[];
}

export default function RecentNumbers({
    numbers,
}: Props) {
    const theme = useTheme();

    const flatListRef = useRef<FlatList<number>>(null);

    useEffect(() => {
        if (numbers.length > 0) {
            flatListRef.current?.scrollToEnd({
                animated: true,
            });
        }
    }, [numbers]);

    const renderItem = ({
        item,
        index,
    }: {
        item: number;
        index: number;
    }) => {
        const isLatest = index === numbers.length - 1;

        return (
            <Surface
                elevation={isLatest ? 5 : 2}
                style={[
                    styles.ball,

                    {
                        backgroundColor: isLatest
                            ? theme.colors.primary
                            : theme.colors.surfaceVariant,
                    },
                ]}
            >
                <Text
                    variant="titleLarge"
                    style={{
                        color: isLatest
                            ? "#fff"
                            : theme.colors.onSurfaceVariant,
                        fontWeight: "bold",
                    }}
                >
                    {item}
                </Text>
            </Surface>
        );
    };

    return (
        <View>

            <Text
                variant="titleMedium"
                style={styles.title}
            >
                Recently Called
            </Text>

            <FlatList
                ref={flatListRef}
                horizontal
                data={numbers}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        marginBottom: 12,
        fontWeight: "700",
    },

    list: {
        paddingBottom: 4,
    },

    ball: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
});