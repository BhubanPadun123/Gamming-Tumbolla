import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Surface, Text, useTheme } from "react-native-paper"

export type TicketRow = [
    number, number, number,
    number, number, number,
    number, number, number
];

export type TicketData = [TicketRow, TicketRow, TicketRow];

interface TambolaTicketProps {
    ticket: TicketData;
    ticketNo?: string;
    markedNumbers?: number[];
    onSelectTicket?: (index: number) => void
    selectedCardList?: number[]
    soldCardList?: number[]
}

const TambolaTicket = ({
    ticket,
    ticketNo,
    markedNumbers = [],
    onSelectTicket,
    soldCardList,
    selectedCardList
}: TambolaTicketProps) => {
    const theme = useTheme()

    const status =
        soldCardList?.includes(Number(ticketNo))
            ? "sold"
            : selectedCardList?.includes(Number(ticketNo))
                ? "selected"
                : "available";

    const backgroundColor = {
        sold: "#EF5350",       // Red
        selected: "#42A5F5",   // Blue
        available: "#66BB6A",  // Green
    }[status]


    return (
        <Card mode="contained" style={[
            styles.card,
            {
                backgroundColor,
            },
        ]}
            onPress={() => {
                if (onSelectTicket && ticketNo && status !== "sold") {
                    onSelectTicket(Number(ticketNo))
                }
            }}
        >
            <Card.Content>

                {ticketNo && (
                    <Text
                        variant="titleMedium"
                        style={styles.ticketTitle}
                    >
                        Ticket #{ticketNo}
                    </Text>
                )}

                <Surface style={styles.grid} elevation={0}>
                    {ticket.map((row, rowIndex) => (
                        <View key={rowIndex} style={styles.row}>
                            {row.map((value, columnIndex) => {
                                const marked = markedNumbers.includes(value);

                                return (
                                    <View
                                        key={columnIndex}
                                        style={[
                                            styles.cell,
                                            {
                                                backgroundColor:
                                                    value === 0
                                                        ? "#F5F5F5"
                                                        : marked
                                                            ? theme.colors.primaryContainer
                                                            : "white",
                                            },
                                        ]}
                                    >
                                        {value !== 0 && (
                                            <Text
                                                variant="titleMedium"
                                                style={{
                                                    fontWeight: "700",
                                                    color: marked
                                                        ? theme.colors.primary
                                                        : theme.colors.onSurface,
                                                }}
                                            >
                                                {value}
                                            </Text>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </Surface>

            </Card.Content>
        </Card>
    );
};

export default React.memo(TambolaTicket)

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        marginVertical: 10,
    },

    ticketTitle: {
        textAlign: "center",
        marginBottom: 12,
        fontWeight: "700",
    },

    grid: {
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 12,
        overflow: "hidden",
    },

    row: {
        flexDirection: "row",
    },

    cell: {
        flex: 1,
        aspectRatio: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#D8D8D8",
        justifyContent: "center",
        alignItems: "center",
    },
});