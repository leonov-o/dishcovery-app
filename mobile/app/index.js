import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { CategoryCards, PopularRecipes, Search } from "../components";
import { COLORS, SIZES } from "../constants";
import { withCheckAuth } from "../providers/withAuth";
import { useStore } from "../store/store";

const Home = () => {
    const router = useRouter();
    const navigationState = useRootNavigationState()
    const isAuth = useStore(state => state.isAuth);



    useEffect(() => {
        if (!navigationState?.key) return;
        if (!isAuth) router.replace("/login");
    }, [isAuth]);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgSecondary }}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: { backgroundColor: COLORS.bgSecondary },
                    headerShadowVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                            router.push("/profile");
                        }}>
                            <MaterialCommunityIcons name="account" size={24} color={COLORS.secondary} />
                        </TouchableOpacity>
                    )
                }}
            />
            <ScrollView style={{ paddingHorizontal: SIZES.xLarge }}>
                <Search />
                <CategoryCards />
                <PopularRecipes />
            </ScrollView>

        </SafeAreaView>
    );
};

export default withCheckAuth(Home);
