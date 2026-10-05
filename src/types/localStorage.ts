import * as SecureStore from "expo-secure-store"
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "access_token"
const USER_KEY = "user"

export const Storage = {
    // Token
    async saveToken(token: string) {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
    },

    async getToken() {
        return await SecureStore.getItemAsync(TOKEN_KEY);
    },

    async removeToken() {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
    },

    // User
    async saveUser(user: any) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    async getUser() {
        const data = await AsyncStorage.getItem(USER_KEY);

        if (!data) return null;

        return JSON.parse(data);
    },

    async removeUser() {
        await AsyncStorage.removeItem(USER_KEY);
    },

    async logout() {
        await this.removeToken();
        await this.removeUser();
    },
}