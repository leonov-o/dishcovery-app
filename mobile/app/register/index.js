import {SafeAreaView, View, Text} from "react-native";
import {Link, Stack, useRouter} from "expo-router";
import {COLORS, SIZES} from "../../constants";
import {DButton, Input} from "../../components";
import {useStore} from "../../store/store";
import {useEffect, useState} from "react";

const Register = () => {
    const router = useRouter();
    const isAuth = useStore(state => state.isAuth);
    const error = useStore(state => state.error);
    const fetchUserRegister = useStore(state => state.fetchUserRegister);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validData, setValidData] = useState({
        email: false,
        name: false,
        password: false,
        confirmPassword: false
    });

    const isValid = Object.values(validData).every(value => value === true);

    const handleValid = (field, value) => {
        setValidData({
            ...validData,
            [field]: value
        })
    }


    const handleRegister = async () => {
        if (isValid) {
            await fetchUserRegister({email: email, name: name, password: password});
        }
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
            <View style={{justifyContent: "flex-end", paddingTop: SIZES.xxLarge, paddingHorizontal: SIZES.xxLarge}}>
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
                <Input placeholder="Email" value={email} onChangeText={(value) => setEmail(value)}
                       regex={/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi} validationMessage="Невірний email"
                       setValid={(value) => handleValid("email", value)}/>

                <Input placeholder="Ім'я" value={name} onChangeText={(value) => setName(value)}
                       regex={/(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/gm} validationMessage="Невірне ім'я"
                       setValid={(value) => handleValid("name", value)}/>

                <Input secure={true} placeholder="Пароль" value={password} onChangeText={(value) => setPassword(value)}
                       regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/}
                       validationMessage="Мінімум шість символів, принаймні одна буква і одна цифра"
                       setValid={(value) => handleValid("password", value)}/>

                <Input secure={true} placeholder="Підтвердження пароль" value={confirmPassword}
                       onChangeText={(value) => setConfirmPassword(value)} regex={new RegExp(`^${password}$`)}
                       validationMessage="Паролі не співпадають"
                       setValid={(value) => handleValid("confirmPassword", value)}/>

                <DButton disabled={!isValid} onPress={handleRegister} text={"Зареєструватися"}/>

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
