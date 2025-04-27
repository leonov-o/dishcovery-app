import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DDropdown, ItemList } from "../../components";
import { IngredientFilter } from "../../components/ingredientFilter/IngredientFilter";
import { COLORS, SIZES } from "../../constants";
import { RecipeService } from "../../entities";
import { useStore } from "../../store/store";


const SearchPage = () => {
    const router = useRouter();
    const categories = useStore(state => state.categories);
    const { search, categoryCard } = useLocalSearchParams();
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [category, setCategory] = useState(categoryCard || "");
    const [sort, setSort] = useState("likesDesc");

    const fetchRecipes = async () => {
        try {
            setIsLoading(true);
            const result = await RecipeService.getRecipes({
                search,
                category,
                ingredients: ingredients.map(item => item._id),
                sort,
                isPublic: true
            });

            setRecipes(result.data);
            setIsLoading(false);
        } catch (e) {
            setError(e.response?.data?.message)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchRecipes();
    }, [search, ingredients, category, sort]);

    const handleSelectIngredient = (item) => {
        setIngredients([...ingredients, item])
    }

    const handleRemoveIngredient = (id) => {
        setIngredients(ingredients.filter(item => item._id !== id));
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgSecondary }}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "Результати пошуку",
                    headerTitleAlign: "center",
                    headerTitleStyle: { fontFamily: "Montserrat-Regular" },
                    headerStyle: { backgroundColor: COLORS.bgSecondary },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            router.back();
                        }}>
                            <MaterialCommunityIcons name="arrow-left-thin" size={24} color={COLORS.secondary} />
                        </TouchableOpacity>
                    )
                }}
            />
            <View style={{ paddingHorizontal: SIZES.xLarge, flexDirection: "row", width: "100%", justifyContent: "center" }}>
                <IngredientFilter selected={ingredients} onSelect={handleSelectIngredient} onRemove={handleRemoveIngredient} />
            </View>
            <View style={{ paddingHorizontal: SIZES.xLarge, flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                <DDropdown
                    data={[
                        { label: "Всі рецепти", value: "" },
                        ...categories.map(item => ({ label: item.name, value: item._id })),
                    ]}
                    style={{ width: "48%" }}
                    placeholder="Категорія"
                    value={category}
                    onChange={(value) => setCategory(value)}
                />
                <DDropdown
                    data={[
                        { label: "Кращі", value: "likesDesc" },
                        { label: "Популярні", value: "popular" },
                        { label: "Нові", value: "newest" },
                    ]}
                    style={{ width: "48%" }}
                    placeholder="Сортування"
                    value={sort}
                    onChange={(value) => setSort(value)}
                />
            </View>
            <ScrollView style={{ paddingHorizontal: SIZES.xLarge }}>
                {
                    isLoading
                        ? <ItemList title="" data={new Array(6).fill(0)} />
                        : error ? <Text>{error}</Text> : <ItemList title="" data={recipes} />
                }
            </ScrollView>

        </SafeAreaView>
    );
};

export default SearchPage;
