import React, { useMemo, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import {
    Button,
    Card,
    Chip,
    Divider,
    List,
    Searchbar,
    Surface,
    Switch,
    Text,
    useTheme,
} from "react-native-paper"

const ROLES = [
    {
        id: "1",
        name: "Super Admin",
        description: "Complete system access",
    },
    {
        id: "2",
        name: "Committee President",
        description: "Manage committee operations",
    },
    {
        id: "3",
        name: "Secretary",
        description: "Manage members & registrations",
    },
    {
        id: "4",
        name: "Treasurer",
        description: "Manage donations & finance",
    },
    {
        id: "5",
        name: "Volunteer",
        description: "Limited operational access",
    },
]

const PRIVILEGES = [
    {
        module: "Committee",
        icon: "account-group",
        permissions: [
            "View Committee",
            "Create Committee",
            "Edit Committee",
            "Delete Committee",
        ],
    },
    {
        module: "Members",
        icon: "account-multiple",
        permissions: [
            "View Members",
            "Add Member",
            "Edit Member",
            "Delete Member",
        ],
    },
    {
        module: "Registration",
        icon: "account-plus",
        permissions: [
            "Approve Registration",
            "Reject Registration",
            "Print Receipt",
        ],
    },
    {
        module: "Finance",
        icon: "cash",
        permissions: [
            "View Donation",
            "Add Donation",
            "Approve Payment",
            "Export Report",
        ],
    },
    {
        module: "Events",
        icon: "calendar",
        permissions: [
            "Create Event",
            "Update Event",
            "Delete Event",
        ],
    },
    {
        module: "Reports",
        icon: "file-chart",
        permissions: [
            "View Reports",
            "Download Reports",
        ],
    },
]

export default function RolePermissionScreen() {
    const theme = useTheme()

    const [selectedRole, setSelectedRole] = useState("1")
    const [search, setSearch] = useState("")

    const [permissions, setPermissions] = useState<Record<string, boolean>>({
        "View Committee": true,
        "Create Committee": true,
        "Edit Committee": true,
        "Delete Committee": true,

        "View Members": true,
        "Add Member": true,
        "Edit Member": true,
        "Delete Member": false,

        "Approve Registration": true,
        "Reject Registration": false,
        "Print Receipt": true,

        "View Donation": true,
        "Add Donation": true,
        "Approve Payment": false,
        "Export Report": true,

        "Create Event": true,
        "Update Event": true,
        "Delete Event": false,

        "View Reports": true,
        "Download Reports": true,
    });

    const selectedRoleData = useMemo(
        () => ROLES.find((item) => item.id === selectedRole),
        [selectedRole]
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}

            <Surface style={styles.header} elevation={1}>
                <Text variant="headlineMedium" style={styles.headerTitle}>
                    Roles & Privileges
                </Text>

                <Text
                    variant="bodyMedium"
                    style={styles.headerSubtitle}
                >
                    Assign permissions to different user roles.
                </Text>
            </Surface>

            {/* Roles */}

            <Card style={styles.card}>
                <Card.Title
                    title="Available Roles"
                    subtitle="Select a role to manage permissions"
                    left={(props) => (
                        <List.Icon {...props} icon="shield-account" />
                    )}
                />

                <Card.Content>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {ROLES.map((role) => (
                            <Chip
                                key={role.id}
                                selected={selectedRole === role.id}
                                mode={
                                    selectedRole === role.id
                                        ? "flat"
                                        : "outlined"
                                }
                                onPress={() => setSelectedRole(role.id)}
                                style={styles.roleChip}
                            >
                                {role.name}
                            </Chip>
                        ))}
                    </ScrollView>

                    <View style={styles.roleInfo}>
                        <Text variant="titleMedium">
                            {selectedRoleData?.name}
                        </Text>

                        <Text
                            variant="bodyMedium"
                            style={{ color: "#666", marginTop: 4 }}
                        >
                            {selectedRoleData?.description}
                        </Text>
                    </View>
                </Card.Content>
            </Card>

            {/* Search */}

            <Searchbar
                placeholder="Search privilege..."
                value={search}
                onChangeText={setSearch}
                style={styles.search}
            />

            {/* Permission Groups */}

            {PRIVILEGES.map((group) => {
                const filteredPermissions = group.permissions.filter(
                    (item) =>
                        item
                            .toLowerCase()
                            .includes(search.toLowerCase())
                );

                if (filteredPermissions.length === 0) return null;

                return (
                    <Card
                        key={group.module}
                        style={styles.permissionCard}
                    >
                        <Card.Title
                            title={group.module}
                            left={(props) => (
                                <List.Icon
                                    {...props}
                                    icon={group.icon}
                                />
                            )}
                        />

                        <Divider />

                        {filteredPermissions.map((item) => (
                            <List.Item
                                key={item}
                                title={item}
                                left={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="shield-check"
                                    />
                                )}
                                right={() => (
                                    <Switch
                                        value={permissions[item]}
                                        onValueChange={() =>
                                            setPermissions((prev) => ({
                                                ...prev,
                                                [item]: !prev[item],
                                            }))
                                        }
                                    />
                                )}
                            />
                        ))}
                    </Card>
                );
            })}

            <Button
                mode="contained"
                icon="content-save"
                style={styles.saveButton}
                contentStyle={{
                    height: 54,
                }}
                onPress={() => {
                    console.log(selectedRole, permissions);
                }}
            >
                Save Role Permissions
            </Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    header: {
        paddingHorizontal: 20,
        paddingTop: 55,
        paddingBottom: 25,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    headerTitle: {
        fontWeight: "700",
    },

    headerSubtitle: {
        marginTop: 6,
        color: "#666",
    },

    card: {
        marginHorizontal: 16,
        marginTop: 18,
        borderRadius: 18,
    },

    roleChip: {
        marginRight: 10,
        marginBottom: 6,
    },

    roleInfo: {
        marginTop: 18,
        backgroundColor: "#F7F9FC",
        borderRadius: 12,
        padding: 14,
    },

    search: {
        marginHorizontal: 16,
        marginTop: 18,
        marginBottom: 10,
        borderRadius: 14,
    },

    permissionCard: {
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 18,
        overflow: "hidden",
    },

    saveButton: {
        marginHorizontal: 20,
        marginTop: 28,
        borderRadius: 14,
    },
})