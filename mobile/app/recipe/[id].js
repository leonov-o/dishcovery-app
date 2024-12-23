import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from "../../constants";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, TouchableOpacity, View, Text} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Image} from "expo-image";
import {useEffect, useState} from "react";
import {RecipeService} from "../../entities";
import {useStore} from "../../store/store";

const RecipePage = () => {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    const user = useStore(state => state.user);
    const fetchToggleLike = useStore(state => state.fetchToggleLike);
    const [recipe, setRecipe] = useState({});
    const [likes, setLikes] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const isLiked = user.likes.includes(id)

    const toggleLike = async () => {
        const likes = await fetchToggleLike(id);
        setLikes(likes)
    }

    const fetchDeleteRecipe = async () => {
        try {
            await RecipeService.deleteRecipe(id);
            router.replace("/profile/my-recipes")
        } catch (e) {
            setError(e.response?.data?.message)
        }
    }

    const fetchRecipe = async () => {
        try {
            setIsLoading(true)
            const result = await RecipeService.getRecipeById(id);
            setRecipe(result.data)
            setLikes(result.data.likes.length)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setError(e.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchRecipe();
    }, []);


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bgSecondary}}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "",
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
                    headerRight: () => {
                        if (user.id === recipe.authorId) return (
                            <View style={{flexDirection: "row"}}>
                                <TouchableOpacity onPress={() => router.push(`/profile/my-recipes/new-recipe/${recipe._id}`)}>
                                    <MaterialCommunityIcons name="pencil" size={24} color={COLORS.secondary}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginLeft: SIZES.medium}} onPress={fetchDeleteRecipe}>
                                    <MaterialCommunityIcons name="trash-can" size={24} color={COLORS.error}/>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                }}
            />
            {
                error ? (<Text>{error}</Text>) : null
            }

            {
                !isLoading && !error && (
                    <ScrollView style={{paddingHorizontal: SIZES.large}}>
                        <Text style={styles.category}>{recipe.category} →</Text>
                        <Text style={styles.title}>{recipe.title}</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                source={process.env.EXPO_PUBLIC_SERVER_URL + recipe.image} contentFit="cover" style={styles.image}/>
                        </View>
                        <View style={styles.statsBlockContainer}>
                            <View style={styles.statContainer}>
                                <MaterialCommunityIcons name="eye" size={30} color={COLORS.secondary}/>
                                <Text style={styles.statText}>{recipe.views}</Text>
                            </View>
                            <TouchableOpacity onPress={toggleLike}>
                                <View style={styles.statContainer}>
                                    {
                                        isLiked
                                            ? (<MaterialCommunityIcons name="cards-heart" size={30} color={COLORS.secondary}/>)
                                            : (<MaterialCommunityIcons name="cards-heart-outline" size={30} color={COLORS.secondary}/>)
                                    }
                                    <Text style={styles.statText}>{likes}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.blockTitle}>{recipe.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.blockTitle}>Інгредієнти:</Text>
                            <View style={styles.blockContainer}>
                                {
                                    recipe.ingredients.map((ingredient, index) => (
                                        <Text key={index} style={styles.blockText}>{ingredient}</Text>
                                    ))
                                }
                            </View>
                        </View>
                        <View>
                            <Text style={styles.blockTitle}>Інструкція:</Text>
                            <View style={styles.blockContainer}>
                                <Text style={styles.blockText}>{recipe.instructions}</Text>
                            </View>
                        </View>


                    </ScrollView>
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    category: {
        fontSize: 14,
        fontFamily: "Montserrat-Medium",
    },
    title: {
        fontSize: 20,
        fontFamily: "Montserrat-SemiBold",
    },
    imageContainer: {
        width: "100%",
        height: 200,
        borderRadius: 20, // Закругленные углы
        overflow: 'hidden', // Чтобы изображение не выходило за рамки
        marginVertical: 15, // Отступы сверху и снизу
    },
    image: {
        width: "100%",
        height: "100%"
    },
    statsBlockContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    statContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10
    },
    statText: {
        marginLeft: 6,
        fontFamily: "Montserrat-Medium",
        fontSize: SIZES.medium
    },
    blockContainer: {
        marginTop: 5,
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.large
    },
    blockTitle: {
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        color: COLORS.textPrimary,
        textAlign: "justify",
        marginTop: 5
    },
    blockText: {
        fontSize: 16,
        fontFamily: "Montserrat-Regular",
        textAlign: "justify",
        color: COLORS.textPrimary
    }


});

export default RecipePage;
