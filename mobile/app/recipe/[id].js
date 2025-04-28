import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from "../../constants";
import { RecipeService } from "../../entities";
import { useStore } from "../../store/store";

const RecipePage = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const user = useStore(state => state.user);
    const fetchToggleLike = useStore(state => state.fetchToggleLike);
    const fetchToggleDislike = useStore(state => state.fetchToggleDislike);
    const [recipe, setRecipe] = useState({});
    const [likes, setLikes] = useState();
    const [dislikes, setDislikes] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const isLiked = user.likes.includes(id);
    const isDisliked = user.dislikes.includes(id);

    const toggleLike = async () => {
        const { likes, dislikes } = await fetchToggleLike(id);
        setLikes(likes);
        setDislikes(dislikes);
    }

    const toggleDislike = async () => {
        const { likes, dislikes } = await fetchToggleDislike(id);
        setDislikes(dislikes);
        setLikes(likes);
    }

    const handleShare = async () => {
        try {
            await Share.share({
                message: `
${recipe.title}
${recipe.description}
Інгредієнти:
${recipe.ingredients.map(ingredient => `${ingredient.ingredient.name} - ${ingredient.amount} ${ingredient.unit}`).join("\n")}
Інструкції:
${recipe.instructions}
                    `
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };


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
            setDislikes(result.data.dislikes.length)
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
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgSecondary }}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "",
                    headerTitleStyle: { fontFamily: "Montserrat-Regular" },
                    headerStyle: { backgroundColor: COLORS.bgSecondary },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            router.back();
                        }}>
                            <MaterialCommunityIcons name="arrow-left-thin" size={24} color={COLORS.secondary} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (

                        <View style={{ flexDirection: "row" }}>
                            {
                                user.id === recipe.authorId ? (
                                    <View style={{ flexDirection: "row" }}>
                                        <TouchableOpacity onPress={() => router.push(`/profile/my-recipes/new-recipe/${recipe._id}`)}>
                                            <MaterialCommunityIcons name="pencil" size={24} color={COLORS.secondary} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginLeft: SIZES.medium }} onPress={fetchDeleteRecipe}>
                                            <MaterialCommunityIcons name="trash-can" size={24} color={COLORS.error} />
                                        </TouchableOpacity>
                                    </View>
                                ) : null
                            }
                            <TouchableOpacity style={{ marginLeft: SIZES.medium }} onPress={handleShare}>
                                <MaterialCommunityIcons name="share-variant" size={24} color={COLORS.secondary} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
            {
                error ? (<Text>{error}</Text>) : null
            }

            {
                !isLoading && !error && (
                    <ScrollView style={{ paddingHorizontal: SIZES.large }}>
                        <Text style={styles.category}>{recipe.category.name} →</Text>
                        <Text style={styles.title}>{recipe.title}</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                source={process.env.EXPO_PUBLIC_SERVER_URL + recipe.image} contentFit="cover" style={styles.image} />
                        </View>
                        <View style={styles.statsBlockContainer}>
                            <View style={styles.statContainer}>
                                <MaterialCommunityIcons name="eye" size={30} color={COLORS.secondary} />
                                <Text style={styles.statText}>{recipe.views}</Text>
                            </View>
                            <TouchableOpacity onPress={toggleDislike}>
                                <View style={styles.statContainer}>
                                    {
                                        isDisliked
                                            ? (<MaterialCommunityIcons name="thumb-down" size={30} color={COLORS.secondary} />)
                                            : (<MaterialCommunityIcons name="thumb-down-outline" size={30} color={COLORS.secondary} />)
                                    }
                                    <Text style={styles.statText}>{dislikes}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleLike}>
                                <View style={styles.statContainer}>
                                    {
                                        isLiked
                                            ? (<MaterialCommunityIcons name="thumb-up" size={30} color={COLORS.secondary} />)
                                            : (<MaterialCommunityIcons name="thumb-up-outline" size={30} color={COLORS.secondary} />)
                                    }
                                    <Text style={styles.statText}>{likes}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            recipe.recommendations && (
                                <View style={styles.recommendationContainer}>
                                    <MaterialCommunityIcons name="assistant" size={24} color={COLORS.tertiary} />
                                    <Text style={styles.recommendationText}>
                                        {recipe.recommendations}
                                    </Text>
                                </View>
                            )

                        }
                        <View>
                            <Text style={styles.blockTitle}>{recipe.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.blockTitle}>Інгредієнти:</Text>
                            <View style={styles.blockContainer}>
                                {
                                    recipe.ingredients.map((ingredient, index) => (
                                        <Text key={index} style={styles.blockText}>{ingredient.ingredient.name} - {ingredient.amount} {ingredient.unit} </Text>
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
                        {
                            recipe.nutritionalValue && (
                                <View>
                                    <Text style={styles.blockTitle}>Харчова цінність:</Text>
                                    <View style={styles.blockContainer}>
                                        <Text style={styles.blockText}>Калорії: {recipe.nutritionalValue?.calories} ккал</Text>
                                        <Text style={styles.blockText}>Білки: {recipe.nutritionalValue?.proteins} г</Text>
                                        <Text style={styles.blockText}>Жири: {recipe.nutritionalValue?.fats} г</Text>
                                        <Text style={styles.blockText}>Вуглеводи: {recipe.nutritionalValue?.carbohydrates} г</Text>
                                    </View>
                                </View>
                            )
                        }
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
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 15,
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

    recommendationContainer: {
        backgroundColor: "rgba(255, 193, 7, 0.5)",
        borderRadius: 10,
        marginTop: 6,
        marginBottom: 10,
        padding: SIZES.xSmall
    },
    recommendationText: {
        fontSize: SIZES.small,
        fontFamily: "Montserrat-Regular",
        textAlign: "justify",
        color: COLORS.textPrimary,
        padding: SIZES.xSmall
    },

    blockContainer: {
        padding: SIZES.small
    },
    blockTitle: {
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        color: COLORS.textPrimary,
        textAlign: "justify",
        marginTop: 7
    },
    blockText: {
        fontSize: 16,
        fontFamily: "Montserrat-Regular",
        textAlign: "justify",
        color: COLORS.textPrimary
    }


});

export default RecipePage;
