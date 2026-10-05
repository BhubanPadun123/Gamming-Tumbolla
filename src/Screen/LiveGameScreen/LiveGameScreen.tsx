import React, { useEffect, useState,useRef } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import {
    Appbar,
    Card,
    Chip,
    useTheme,
} from "react-native-paper"
import NumberGenerator from "./helper"

import {
    CurrentNumberCard,
    GameInfoCard,
    HostControls,
    NumberBoard,
    RecentNumbers,
    WinnersCard,
} from "./index"

const winners = [
    {
        id: "1",
        prize: "Early Five",
        player: "Rahul Sharma",
        ticket: "A-104",
        amount: 500,
        time: "07:12 PM",
        status: "Verified",
    },
    {
        id: "2",
        prize: "Top Line",
        player: "Anita Das",
        ticket: "B-212",
        amount: 1000,
        time: "07:19 PM",
        status: "Verified",
    },
    {
        id: "3",
        prize: "Middle Line",
        player: "Sanjay Roy",
        ticket: "C-078",
        amount: 1000,
        time: "07:27 PM",
        status: "Pending",
    },
    {
        id: "4",
        prize: "Four Corners",
        player: "Priya Singh",
        ticket: "A-331",
        amount: 1500,
        time: "07:35 PM",
        status: "Verified",
    },
];
export default function LiveGameScreen({ navigation }: any) {
    const theme = useTheme()
    const generator = new NumberGenerator()

    const [timeInterval, setTimeInterval] = useState(60);
    const [currentTime, setCurrentTime] = useState(timeInterval);

    // Reset countdown whenever the interval changes
    useEffect(() => {
        setCurrentTime(timeInterval);
    }, [timeInterval]);

    // Countdown
    useEffect(() => {
        if (currentTime <= 0){
            if(timeInterval === 0) return
            setTimeInterval(timeInterval - 1)
            return
        }

        const timer = setTimeout(() => {
            setCurrentTime((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [currentTime])


const callNext = () => {
    const number = generator.generateNextNumber();

    if (number == null) {
        alert("Game Completed")
        return;
    }
    generator.speakNumber(number)
}
const game = {
    title: "Sunday Night Tambola",
    roomCode: "RB45892",
    players: 128,
    currentNumber: 57,
    nextNumberIn: 5,
    recentNumbers: [3, 12, 44, 67, 22, 57],
};

return (
    <SafeAreaView
        style={[
            styles.container,
            {
                backgroundColor: theme.colors.background,
            },
        ]}
    >
        <Appbar.Header elevated>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
                title="Live Game"
                subtitle={game.title}
            />

            <Chip
                compact
                icon="circle"
                style={{
                    backgroundColor: "#E8F5E9",
                    marginRight: 16,
                }}
            >
                LIVE
            </Chip>
        </Appbar.Header>

        <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Game Information */}

            <GameInfoCard
                gameName="Sunday Night Tambola"
                roomCode="RB45892"
                status="LIVE"
                totalPlayers={126}
                ticketsSold={348}
                prizePool={25000}
                calledNumbers={37}
                elapsedTime="00:18:32"
            />

            {/* Current Number Placeholder */}

            <Card style={styles.card}>
                <CurrentNumberCard
                    currentNumber={currentTime}
                    countdown={timeInterval}
                    gameStatus="LIVE"
                />
            </Card>
            {/* Number Board Placeholder */}

            <Card style={styles.card}>
                <Card.Title title="Number Board" />

                <Card.Content>
                    <NumberBoard
                        currentNumber={57}
                        calledNumbers={[
                            1,
                            4,
                            8,
                            12,
                            18,
                            22,
                            25,
                            31,
                            39,
                            44,
                            48,
                            50,
                            57,
                        ]}
                    />
                </Card.Content>
            </Card>
            {/* Recent Numbers */}

            <Card style={styles.card}>
                <Card.Content>

                    <RecentNumbers
                        numbers={[
                            3,
                            9,
                            12,
                            18,
                            25,
                            31,
                            44,
                            48,
                            57,
                        ]}
                    />

                </Card.Content>
            </Card>

            {/* Host Controls */}

            <HostControls
                onNextNumber={() => callNext()}
                onPause={() => console.log("Pause")}
                onResume={() => console.log("Resume")}
                onRecall={() => console.log("Recall")}
                onEndGame={() => console.log("End Game")}
            />


            {/* Winners Placeholder */}

            <WinnersCard winners={winners} />

        </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        padding: 16,
        paddingBottom: 40,
        rowGap: 4
    },

    card: {
        marginBottom: 16,
        borderRadius: 18,
    },

    subtitle: {
        marginTop: 6,
    },

    infoRow: {
        flexDirection: "row",
        marginTop: 14,
        gap: 10,
        flexWrap: "wrap",
    },

    center: {
        alignItems: "center",
    },

    numberCircle: {
        marginTop: 20,
        width: 150,
        height: 150,
        borderRadius: 75,
        justifyContent: "center",
        alignItems: "center",
    },

    recentContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    recentChip: {
        margin: 4,
    },

    placeholder: {
        height: 120,
        justifyContent: "center",
        alignItems: "center",
    },

    button: {
        marginTop: 12,
        borderRadius: 12,
    },
});