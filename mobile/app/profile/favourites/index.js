import React, {useEffect, useState} from 'react';
import {COLORS, SIZES} from "../../../constants";
import {Stack, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, Text, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ItemList} from "../../../components";
import {useStore} from "../../../store/store";
import {RecipeService} from "../../../entities";

const Favourites = () => {
    const router = useRouter();
    const user = useStore(state => state.user);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const fetchLikedRecipes = async () => {
        try {
            setIsLoading(true)

            const result = (await Promise.all(
                user.likes.map(async (id) => {
                    try {
                        const res = await RecipeService.getRecipeById(id);
                        return res.data;
                    } catch (e) {
                    }
                })
            )).filter(item => item !== undefined);
            setRecipes(result)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setError(e.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchLikedRecipes();
    }, []);

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
                {
                    isLoading
                        ? <ItemList title="" data={new Array(6).fill(0)}/>
                        : error ? <Text>{error}</Text> : <ItemList title="" data={recipes.reverse()}/>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default Favourites;
