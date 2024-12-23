import {SafeAreaView, View, Text, ScrollView} from "react-native";
import {Redirect, Stack, useRouter} from "expo-router";
import {Link} from "expo-router";
import {COLORS, SIZES} from "../../constants";
import {DButton, Input} from "../../components";
import {useEffect, useState} from "react";
import {useStore} from "../../store/store";

const Login = () => {
    const router = useRouter();
    const isAuth = useStore(state => state.isAuth);
    const error = useStore(state => state.error);
    const fetchUserLogin = useStore(state => state.fetchUserLogin);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await fetchUserLogin({email: email, password: password});
    }


    useEffect(() => {
        if (isAuth) router.push("/");
    }, [isAuth]);

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />

            <View style={{justifyContent: "center", paddingHorizontal: SIZES.xxLarge, paddingTop: SIZES.xxLarge}}>
                <Text style={{
                    fontSize: SIZES.xLarge,
                    textAlign: "center",
                    fontFamily: "Montserrat-Light"
                }}>Вітаємо!</Text>

                {
                    error && (
                        <Text style={{
                            color: COLORS.error,
                            marginTop: SIZES.small,
                            fontSize: SIZES.medium,
                            fontFamily: "Montserrat-Regular",
                            borderWidth: 1,
                            borderColor: COLORS.error,
                            padding: SIZES.xSmall,
                            borderRadius: SIZES.small
                        }}>{error}</Text>
                    )
                }

                <Input placeholder="Email" value={email} onChangeText={(value) => setEmail(value)}/>
                <Input secure={true} placeholder="Пароль" value={password} onChangeText={(value) => setPassword(value)}/>

                <DButton text={"Увійти"} onPress={handleLogin}/>

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
