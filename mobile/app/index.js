import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {Stack, useRouter} from "expo-router";
import {COLORS, SIZES} from "../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {CategoryCards, ItemList, Search} from "../components";


const Home = () => {
    const router = useRouter();

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
                <ItemList title="Популярні рецепти" data={new Array(6).fill(0)}/>
            </ScrollView>

        </SafeAreaView>
    );
};

export default Home;
