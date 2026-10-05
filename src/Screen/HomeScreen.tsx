import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {
    Card,
    Icon,
    Text,
    TouchableRipple,
    useTheme,
} from 'react-native-paper'
import image1 from "../Images/images.jpeg"
import image2 from "../Images/images _2.jpeg"
import image3 from "../Images/images _3.jpeg"
import { Storage } from '../types/localStorage'

const { width } = Dimensions.get('window')
import ws from "../Websocket/websocket"

const BANNERS = [
    {
        id: '1',
        image: image1
    },
    {
        id: '2',
        image: image2
    },
    {
        id: '3',
        image: image3
    },
];

const MENU_LIST = [
    // { id: '1', title: 'Home', icon: 'home', color: '#D32F2F' },
    { id: '2', title: 'Live', icon: 'gamepad-variant', color: '#1565C0' },
    { id: '3', title: 'Upcoming', icon: 'gamepad-variant', color: '#2E7D32' },

    { id: '4', title: 'Ticket', icon: 'ticket', color: '#673AB7' },
    { id: '5', title: 'Register', icon: 'registered-trademark', color: '#FB8C00' },
    { id: '9', title: 'Contact', icon: 'phone', color: '#1976D2' },
    { id: '9', title: 'JointGroup', icon: 'whatsapp', color: '#1976D2' },
]
const OWNER_MENU_LIST = [
    { id: '6', title: 'Create', icon: 'auto-fix', color: '#8D6E63' },

    { id: '7', title: 'Update', icon: 'autorenew', color: '#0097A7' },
]

export default function HomeScreen({ navigation }: any) {
    const theme = useTheme();

    const bannerRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState(0)

    useFocusEffect(
        useCallback(() => {
            const reconnectWS = async () => {
                const token = await Storage.getToken()
                if (token) {
                    ws.connect(token)
                }
            }
            reconnectWS()

        }, [])
    )

    // Auto slide
    useEffect(() => {
        const timer = setInterval(() => {
            const nextIndex = (activeIndex + 1) % BANNERS.length;

            bannerRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setActiveIndex(nextIndex);
        }, 3000);

        return () => clearInterval(timer);
    }, [activeIndex]);

    const renderMenuItem = ({ item }: any) => (
        <TouchableRipple
            borderless
            style={styles.menuItemContainer}
            onPress={() => {
                navigation.navigate("TransitionScreen", {
                    screenName: item.title,
                })
            }}
        >
            <Card mode="contained" style={styles.menuCard}>
                <View
                    style={[
                        styles.iconContainer,
                        { backgroundColor: item.color },
                    ]}
                >
                    <Icon source={item.icon} size={28} color="#fff" />
                </View>

                <Text
                    variant="labelMedium"
                    style={[
                        styles.menuTitle,
                        { color: theme.colors.onSurface },
                    ]}
                >
                    {item.title}
                </Text>
            </Card>
        </TouchableRipple>
    )

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
            showsVerticalScrollIndicator={false}
        >
            {/* Banner Slider */}
            <View style={styles.bannerWrapper}>
                <FlatList
                    ref={bannerRef}
                    data={BANNERS}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Image
                            source={item.image}
                            style={styles.bannerImage}
                            resizeMode="cover"
                        />
                    )}
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(
                            event.nativeEvent.contentOffset.x / width
                        );
                        setActiveIndex(index);
                    }}
                />

                {/* Pagination dots */}
                <View style={styles.pagination}>
                    {BANNERS.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor:
                                        activeIndex === index
                                            ? theme.colors.primary
                                            : '#ccc',
                                },
                            ]}
                        />
                    ))}
                </View>
            </View>

            {/* Welcome Card */}
            <Card mode="contained" style={styles.welcomeCard}>
                <Card.Content>
                    <Text variant="headlineSmall">
                        Welcome to Rainbow
                    </Text>
                    <Text
                        variant="bodyMedium"
                        style={{ marginTop: 4 }}
                    >
                        Stay connected. Earn real money.
                    </Text>
                </Card.Content>
            </Card>

            {/* Quick Access */}
            <Text variant="titleLarge" style={styles.sectionTitle}>
                Quick Access
            </Text>

            <FlatList
                data={MENU_LIST.concat(OWNER_MENU_LIST)}
                keyExtractor={(item) => item.id}
                renderItem={renderMenuItem}
                numColumns={3}
                scrollEnabled={false}
                contentContainerStyle={styles.grid}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    bannerWrapper: {
        marginTop: 12,
    },

    bannerImage: {
        width: width,
        height: 220,
    },

    pagination: {
        position: 'absolute',
        bottom: 12,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },

    welcomeCard: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16,
    },

    sectionTitle: {
        marginHorizontal: 16,
        marginTop: 20,
        marginBottom: 12,
        fontWeight: '700',
    },

    grid: {
        paddingHorizontal: 8,
        paddingBottom: 24,
    },

    menuItemContainer: {
        flex: 1,
        margin: 8,
    },

    menuCard: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 18,
    },

    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    menuTitle: {
        textAlign: 'center',
        fontWeight: '600',
    },
})