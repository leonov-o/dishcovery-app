import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from "../../../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Stack, useRouter} from "expo-router";
import {DButton, Input} from "../../../components";
import {useStore} from "../../../store/store";

const Account = () => {
    const router = useRouter();
    const user = useStore(state => state.user);
    const error = useStore(state => state.error);
    const fetchUserUpdate = useStore(state => state.fetchUserUpdate);
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState(user.email || "");
    const [name, setName] = useState(user.name || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validData, setValidData] = useState({});

    const isValid = Object.values(validData).every(value => value === true);

    const handleValid = (field, value) => {
        setValidData({
            ...validData,
            [field]: value
        })
    }

    const handleUpdate = async () => {
        if (isValid) {
            await fetchUserUpdate(user.id, {
                email: email,
                name: name,
                password: password
            });
            setIsEditing(false);
        }
    }

    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
        setPassword("");
        setConfirmPassword("");
    }, [isEditing]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bgSecondary}}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "Мій аккаунт",
                    headerTitleAlign: "center",
                    headerTitleStyle: {fontFamily: "Montserrat-Regular"},
                    headerStyle: {backgroundColor: COLORS.bgSecondary},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            router.back();
                        }}>
                            <MaterialCommunityIcons name="arrow-left-thin" size={24} color={COLORS.secondary}/>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {
                            setIsEditing(!isEditing)
                        }}>
                            <MaterialCommunityIcons name="pencil" size={24} color={COLORS.secondary}/>
                        </TouchableOpacity>
                    )

                }}
            />
            <View style={{paddingHorizontal: SIZES.xLarge}}>
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
                <Input disabled={!isEditing} placeholder="Email" value={email} onChangeText={(value) => setEmail(value)}
                       regex={/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi} validationMessage="Невірний email"
                       setValid={(value) => handleValid("email", value)}/>

                <Input disabled={!isEditing} placeholder="Ім'я" value={name} onChangeText={(value) => setName(value)}
                       regex={/(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/gm} validationMessage="Невірне ім'я"
                       setValid={(value) => handleValid("name", value)}/>

                {
                    isEditing && (
                        <Input disabled={!isEditing} secure={true} placeholder="Пароль" value={password}
                               onChangeText={(value) => setPassword(value)}
                               regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/}
                               validationMessage="Мінімум шість символів, принаймні одна буква і одна цифра"
                               setValid={(value) => handleValid("password", value)}/>
                    )
                }
                {
                    isEditing && (
                        <Input disabled={!isEditing} secure={true} placeholder="Підтвердження пароль" value={confirmPassword}
                               onChangeText={(value) => setConfirmPassword(value)} regex={new RegExp(`^${password}$`)}
                               validationMessage="Паролі не співпадають"
                               setValid={(value) => handleValid("confirmPassword", value)}/>
                    )
                }
                {
                    isEditing && <DButton disabled={!isValid} text={"Зберегти"} variant="secondary" onPress={handleUpdate}/>
                }
            </View>
        </SafeAreaView>
    );
};

export default Account;
