import {SafeAreaView, View, Text} from "react-native";
import {Link, Stack} from "expo-router";
import {COLORS, SIZES} from "../../constants";
import {DButton, Input} from "../../components";

const Register = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <View style={{justifyContent: "flex-end", height: "75%", paddingHorizontal: SIZES.xxLarge}}>
                <Text style={{fontSize: SIZES.xLarge, textAlign: "center", fontFamily: "Montserrat-Light"}}>Вітаємо!</Text>
                <Input placeholder="Email"/>
                <Input placeholder="Ім'я"/>
                <Input placeholder="Пароль"/>
                <Input placeholder="Підтвердження пароль"/>

                <DButton text={"Зареєструватися"}/>

                <Text style={{color: COLORS.textSecondary, marginTop: SIZES.small, fontFamily: "Montserrat-Regular"}}>
                    Вже маєте акаунт?
                    <Link push href={"/login"}>
                        <Text style={{color: COLORS.primary}}> Увійти</Text>
                    </Link>
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Register;
