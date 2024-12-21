import React from 'react';
import {COLORS, SIZES} from "../../../constants";
import {Stack, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ItemList} from "../../../components";

const Favourites = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bgSecondary}}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "Улюблені рецепти",
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
                    )
                }}
            />
            <ScrollView style={{paddingHorizontal: SIZES.xLarge}}>
                <ItemList title="" data={new Array(6).fill(0)}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Favourites;
