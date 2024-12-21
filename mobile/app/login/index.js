import {SafeAreaView, View, Text} from "react-native";
import {Stack} from "expo-router";
import {Link} from "expo-router";
import {COLORS, SIZES} from "../../constants";
import {DButton, Input} from "../../components";

const Login = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <View style={{justifyContent: "center", height: "75%", paddingHorizontal: SIZES.xxLarge}}>
                <Text style={{fontSize: SIZES.xLarge, textAlign: "center", fontFamily: "Montserrat-Light"}}>Вітаємо!</Text>
                <Input placeholder="Email"/>
                <Input placeholder="Пароль"/>

                <DButton text={"Увійти"}/>

                <Text style={{color: COLORS.textSecondary, marginTop: SIZES.small, fontFamily: "Montserrat-Regular"}}>
                    Немає акаунта?
                    <Link push href={"/register"}>
                        <Text style={{color: COLORS.primary}}> Зареєструватися</Text>
                    </Link>
                </Text>

            </View>
        </SafeAreaView>
    );
};

export default Login;
