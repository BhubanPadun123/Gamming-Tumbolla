import React, { useEffect, useRef, useState } from 'react';
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
} from 'react-native-paper';

const { width } = Dimensions.get('window');

const BANNERS = [
    {
        id: '1',
        image:
            'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200',
    },
    {
        id: '2',
        image:
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200',
    },
    {
        id: '3',
        image:
            'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200',
    },
];

const MENU_LIST = [
    {
        id: "1",
        title: "Members",
        icon: "account-group",
        color: "#1565C0",
        route: "CommitteeMembers",
    },
    {
        id: "2",
        title: "Add Member",
        icon: "account-plus",
        color: "#2E7D32",
        route: "AddCommitteeMember",
    },
    {
        id: "3",
        title: "Committee Info",
        icon: "office-building",
        color: "#EF6C00",
        route: "CommitteeInfo",
    },
    {
        id: "4",
        title: "Roles",
        icon: "shield-account",
        color: "#5E35B1",
        route: "Privileges",
    },
    {
        id: "5",
        title: "Events",
        icon: "calendar-month",
        color: "#D81B60",
        route: "CommitteeEvents",
    },
    {
        id: "6",
        title: "Attendance",
        icon: "clipboard-check",
        color: "#00897B",
        route: "Attendance",
    },
    {
        id: "7",
        title: "Notices",
        icon: "bullhorn",
        color: "#F9A825",
        route: "Notices",
    },
    {
        id: "8",
        title: "Reports",
        icon: "file-chart",
        color: "#3949AB",
        route: "Reports",
    },
    {
        id: "9",
        title: "Settings",
        icon: "cog",
        color: "#546E7A",
        route: "CommitteeSettings",
    },
];

export default function ComitteeHomeScreen({ navigation }: any) {
    const theme = useTheme();

    const bannerRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState(0);

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
                navigation.navigate("NestedTransition", {
                    parentNavigator: "Committee",
                    screenName: item.route,
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
                            source={{ uri: item.image }}
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
                        Committee Dashboard
                    </Text>
                    <Text
                        variant="bodyMedium"
                        style={{ marginTop: 4 }}
                    >
                        Manage members, roles, events and committee activities.
                    </Text>
                </Card.Content>
            </Card>

            {/* Quick Access */}
            <Text variant="titleLarge" style={styles.sectionTitle}>
                Quick Access
            </Text>

            <FlatList
                data={MENU_LIST}
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