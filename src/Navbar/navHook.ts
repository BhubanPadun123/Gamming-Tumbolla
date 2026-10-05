import {
    createNavigationContainerRef,
    StackActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

/**
 * Reset navigation to Splash
 */
export function resetToSplash() {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [
                {
                    name: "Splash",
                },
            ],
        });
    }
}

/**
 * Get current screen name
 */
export function getCurrentScreen() {
    if (!navigationRef.isReady()) return null;

    return navigationRef.getCurrentRoute()?.name;
}

/**
 * Get complete navigation state
 */
export function getNavigationState() {
    if (!navigationRef.isReady()) return null;

    return navigationRef.getRootState();
}

/**
 * Print all routes in the navigation stack
 */
export function printNavigationStack() {
    if (!navigationRef.isReady()) return;

    const state = navigationRef.getRootState();

    console.log("========== Navigation Stack ==========");

    state.routes.forEach((route, index) => {
        console.log(`${index + 1}. ${route.name}`);
    });

    console.log("Current Index:", state.index);
    console.log("Current Screen:", state.routes[state.index].name);
    console.log("======================================");
}