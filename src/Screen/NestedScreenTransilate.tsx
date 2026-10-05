import { useRoute } from "@react-navigation/native";
import TransitionSplash from "../components/customSplash";

export default function NestedTransitionScreen({ navigation }: any) {
    const route = useRoute<any>();

    const {
        screenName,
        parentNavigator,
        params,
    } = route.params || {};

    const handleNavigation = () => {
        if (parentNavigator) {
            navigation.replace(parentNavigator, {
                screen: screenName,
                params,
            });
        } else {
            navigation.replace(screenName, params);
        }
    };

    return (
        <TransitionSplash
            title={screenName}
            subtitle="Loading..."
            duration={700}
            onFinish={handleNavigation}
        />
    );
}