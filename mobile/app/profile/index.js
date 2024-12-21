import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {Stack, useRouter} from "expo-router";
import {COLORS, SIZES} from "../../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {DButton} from "../../components";


const Profile = () => {
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
                    }}>Привіт, User</Text>
                </View>
                <View>
                    <DButton text={"Мій аккаунт"} onPress={() => router.push("/profile/account")} textAlign="left" variant="outline"/>
                    <DButton text={"Мої рецепти"} onPress={() => router.push("/profile/my-recipes")} textAlign="left" variant="outline"/>
                    <DButton text={"Улюблені рецепти"} onPress={() => router.push("/profile/favourites")} textAlign="left" variant="outline"/>
                    <DButton text={"Вийти з аккаунту"}  textAlign="left" variant="danger"/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
