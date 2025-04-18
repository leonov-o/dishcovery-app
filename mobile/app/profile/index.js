import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {COLORS, SIZES} from "../../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {DButton} from "../../components";
import {useStore} from "../../store/store";
import {useEffect} from "react";


const Profile = () => {
    const router = useRouter();
    const user = useStore(state => state.user);
    const fetchMyUser = useStore(state => state.fetchMyUser);
    const fetchUserLogout = useStore(state => state.fetchUserLogout);

    const handleLogout = async () => {
        await fetchUserLogout();
        router.replace("/login");
    }

    useEffect(() => {
        fetchMyUser();
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
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            router.back();
                        }}>
                            <MaterialCommunityIcons name="arrow-left-thin" size={24} color={COLORS.secondary}/>
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={{paddingHorizontal: SIZES.xLarge}}>
                <View>
                    <Text style={{
                        fontSize: SIZES.xLarge,
                        fontFamily: "Montserrat-Regular",
                    }}>Привіт, {user.name}</Text>
                </View>
                <View>
                    <DButton text={"Мій аккаунт"} onPress={() => router.push("/profile/account")} textAlign="left" variant="outline"/>
                    <DButton text={"Мої рецепти"} onPress={() => router.push("/profile/my-recipes")} textAlign="left" variant="outline"/>
                    <DButton text={"Улюблені рецепти"} onPress={() => router.push("/profile/favourites")} textAlign="left" variant="outline"/>
                    <DButton text={"Вийти з аккаунту"}  textAlign="left" variant="danger" onPress={handleLogout}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
