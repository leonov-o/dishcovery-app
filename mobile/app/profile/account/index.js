import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from "react-native";
import {COLORS, SIZES} from "../../../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Stack, useRouter} from "expo-router";
import {DButton, Input} from "../../../components";

const Account = () => {
    const router = useRouter();

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
                        }}>
                            <MaterialCommunityIcons name="pencil" size={24} color={COLORS.secondary}/>
                        </TouchableOpacity>
                    )

                }}
            />
            <View style={{paddingHorizontal: SIZES.xLarge}}>
                <Input placeholder="Ім'я"/>
                <Input placeholder="Електронна пошта"/>
                <Input placeholder="Пароль"/>

                <DButton text={"Зберегти"} variant="secondary"/>
            </View>
        </SafeAreaView>
    );
};

export default Account;
