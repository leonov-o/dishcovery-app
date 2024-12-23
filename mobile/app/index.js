import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Redirect, Stack, useRouter} from "expo-router";
import {COLORS, SIZES} from "../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {CategoryCards, ItemList, PopularRecipes, Search} from "../components";
import {useStore} from "../store/store";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Home = () => {
    const router = useRouter();
    const isAuth = useStore(state => state.isAuth);
    const fetchUserRefresh = useStore(state => state.fetchUserRefresh);

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
            if(!isAuth) await fetchUserRefresh();
        } else {
            router.push("/login");
        }
    }

    useEffect(() => {
        checkAuth()
    }, []);


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bgSecondary}}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "",
                    headerStyle: {backgroundColor: COLORS.bgSecondary},
                    headerShadowVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                            router.push("/profile");
                        }}>
                            <MaterialCommunityIcons name="account" size={24} color={COLORS.secondary}/>
                        </TouchableOpacity>
                    )
                }}
            />
            <ScrollView style={{paddingHorizontal: SIZES.xLarge}}>
                <Search/>
                <CategoryCards/>
                <PopularRecipes/>
            </ScrollView>

        </SafeAreaView>
    );
};

export default Home;
