// app/TransitionScreen.tsx

import { useEffect } from "react"
import { useRoute } from "@react-navigation/native"
import TransitionSplash from "../components/customSplash"

export default function TransitionScreen({ navigation }: any) {
    const route = useRoute<any>()

    const { screenName } = route.params

    return (
        <TransitionSplash
            title={screenName}
            subtitle="Loading..."
            duration={700}
            onFinish={() => navigation.replace(screenName)}
        />
    )
}