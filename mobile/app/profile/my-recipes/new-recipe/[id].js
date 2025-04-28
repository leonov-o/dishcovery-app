import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { DButton, DDropdown, IngredientSelector, Input } from "../../../../components";
import { COLORS, SIZES } from "../../../../constants";
import { RecipeService } from "../../../../entities";
import { aiGenerateRecipeDetails, uploadImage } from "../../../../shared/utils";
import { useStore } from "../../../../store/store";

const visibilityOptions = [{ label: "Публічний", value: "true" }, { label: "Приватний", value: "false" }];
const difficultyOptions = [{ label: "Легкий", value: "Легкий" }, { label: "Середній", value: "Середній" }, {
    label: "Важкий",
    value: "Важкий"
}];

const NewRecipePage = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [isEdit, setIsEdit] = useState(id !== "create");
    const [imagePicked, setImagePicked] = useState(false);

    const categories = useStore(state => state.categories);
    const categoriesOptions = categories.map((category) => ({ label: category.name, value: category._id }))
    const [isLoading, setIsLoading] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [error, setError] = useState("");

    const [recipeData, setRecipeData] = useState({
        image: null,
        title: "",
        ingredients: [],
        instructions: "",
        description: "",
        cookTime: "",
        category: "",
        difficulty: "",
        visibility: "",
        nutritionalValue: {
            calories: "",
            proteins: "",
            carbohydrates: "",
            fats: ""
        }
    });

    const isValid = recipeData.title &&
        recipeData.ingredients &&
        recipeData.ingredients.length > 0 &&
        recipeData.instructions &&
        recipeData.category &&
        recipeData.difficulty &&
        recipeData.cookTime > 0;

    const handleChangeField = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setRecipeData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setRecipeData(prev => ({
                ...prev,
                [field]: value
            }));
        }
    }


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            handleChangeField("image", result.assets[0].uri);
            setImagePicked(true);
        }
    };

    const generateRecipeDetails = async () => {
        try {
            setIsAiLoading(true);
            const ingredientsRaw = recipeData.ingredients.length > 0
                ? recipeData.ingredients.map((ingredient) => `${ingredient.ingredient.name} - ${ingredient.amount} ${ingredient.unit}`)
                : null;

            const details = await aiGenerateRecipeDetails({
                title: recipeData.title,
                category: recipeData.category,
                ingredients: ingredientsRaw
            });

            if (details) {
                setRecipeData(prev => ({
                    ...prev,
                    instructions: details?.instructions,
                    description: details?.description,
                    nutritionalValue: details?.nutritionalValue,
                    cookTime: details?.cookTime && details?.cookTime.toString()
                }));
            }

        } catch (e) {
            setError("::generateRecipeDetails: ", e.response?.data?.message);
        } finally {
            setIsAiLoading(false);
        }
    }

    const handleSaveRecipe = async () => {
        console.log("::handleSaveRecipe: start");
        try {
            setIsLoading(true);

            let uploadedImage = null;
            if (imagePicked) {
                console.log("::handleSaveRecipe: uploading image");
                uploadedImage = await uploadImage(recipeData.image)
            }

            const recipePayload = {
                ...recipeData,
                ingredients: recipeData.ingredients.map((ingredient) => ({
                    ...ingredient,
                    ingredient: ingredient.ingredient._id
                })),
                image: uploadedImage,
                cookTime: parseInt(recipeData.cookTime),
                isPublic: recipeData.visibility === "true"
            };

            let result;
            if (isEdit) {
                console.log("::handleSaveRecipe: updating recipe");
                result = await RecipeService.updateRecipe(id, recipePayload);
            } else {
                console.log("::handleSaveRecipe: creating recipe");
                result = await RecipeService.createRecipe(recipePayload);
            }
            console.log("result: ", result)
            router.replace(`/recipe/${result.data._id}`);
        } catch (e) {
            setError("::handleSaveRecipe: ", e.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchRecipe = async () => {
        try {
            const result = await RecipeService.getRecipeById(id);
            const { image, title, ingredients, instructions, description, cookTime, category, nutritionalValue, difficulty, isPublic } = result.data;

            setRecipeData({
                title,
                ingredients,
                instructions,
                description,
                category,
                difficulty,
                nutritionalValue,
                image: process.env.EXPO_PUBLIC_SERVER_URL + image,
                cookTime: cookTime.toString(),
                visibility: isPublic.toString()
            });
        } catch (e) {
            setError(e.response?.data?.message)
        }
    }

    useEffect(() => {
        if (isEdit) {
            fetchRecipe()
        }
    }, [isEdit]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgSecondary }}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: isEdit ? "Редагувати рецепт" : "Додати рецепт",
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
                    ),
                    headerRight: () => (
                        <View>
                            {
                                isLoading ? (
                                    <ActivityIndicator size="small" color={COLORS.secondary} />
                                ) : (
                                    <TouchableOpacity disabled={!isValid} onPress={handleSaveRecipe}>
                                        <MaterialCommunityIcons name={isEdit ? "content-save" : "check-circle-outline"} size={24}
                                            color={isValid ? COLORS.secondary : COLORS.buttonDisabled} />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    )
                }}
            />

            <ScrollView>
                <View style={{ paddingHorizontal: SIZES.xLarge, paddingBottom: SIZES.xxLarge }}>
                    <View>
                        <DButton text={"Додати зображення"} onPress={pickImage} textAlign="left"
                            variant="outline" />
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={recipeData.image} contentFit="cover" style={styles.image} />
                    </View>
                    <Input label="Назва рецепту" placeholder="Введіть назву рецепту" value={recipeData.title}
                        onChangeText={(value) => handleChangeField("title", value)} />

                    <View style={styles.dropdownContainer}>
                        <DDropdown mode="modal" style={styles.dropdownHalf} containerStyle={styles.dropdownItems}
                            value={recipeData.category}
                            onChange={(value) => handleChangeField("category", value)}
                            placeholder="Категорія"
                            data={categoriesOptions} />
                        <DDropdown mode="modal" style={styles.dropdownHalf} containerStyle={styles.dropdownItems}
                            value={recipeData.difficulty}
                            onChange={(value) => handleChangeField("difficulty", value)}
                            placeholder="Складність"
                            data={difficultyOptions} />
                    </View>
                    <View>
                        <DDropdown mode="modal" style={styles.dropdown} containerStyle={styles.dropdownItems}
                            value={recipeData.visibility}
                            onChange={(value) => handleChangeField("visibility", value)}
                            placeholder="Видимість"
                            data={visibilityOptions} />
                    </View>

                    <IngredientSelector value={recipeData.ingredients}
                        onChange={(value) => handleChangeField("ingredients", value)} />

                    <View style={{ height: 1, backgroundColor: COLORS.textSecondary, marginTop: SIZES.medium }} />

                    <View style={{ marginTop: SIZES.small, flexDirection: "row", justifyContent: "flex-end" }}>
                        {
                            isAiLoading ? (
                                <ActivityIndicator size="small" color={COLORS.secondary} />
                            ) : (
                                <TouchableOpacity onPress={generateRecipeDetails}>
                                    <MaterialCommunityIcons name="assistant" size={24} color={COLORS.secondary} />
                                </TouchableOpacity>
                            )
                        }
                    </View>

                    <Input label="Інструкція" placeholder="Введіть інструкцію" multiline value={recipeData.instructions}
                        onChangeText={(value) => handleChangeField("instructions", value)} />
                    <Input label="Опис" placeholder="Введіть опис" multiline value={recipeData.description}
                        onChangeText={(value) => handleChangeField("description", value)} />
                    <Input label="Час приготування" placeholder="Введіть час приготування, хв" keyboardType="numeric"
                        multiline
                        value={recipeData.cookTime} onChangeText={(value) => handleChangeField("cookTime", value)} />
                    <Input
                        label="Калорії"
                        placeholder="Введіть кількість калорій"
                        keyboardType="numeric"
                        multiline
                        value={recipeData.nutritionalValue?.calories}
                        onChangeText={(value) => handleChangeField("nutritionalValue.calories", value)} />
                    <Input
                        label="Білки"
                        placeholder="Введіть кількість білків"
                        keyboardType="numeric"
                        multiline
                        value={recipeData.nutritionalValue?.proteins}
                        onChangeText={(value) => handleChangeField("nutritionalValue.proteins", value)} />
                    <Input
                        label="Вуглеводи"
                        placeholder="Введіть кількість вуглеводів"
                        keyboardType="numeric"
                        multiline
                        value={recipeData.nutritionalValue?.carbohydrates}
                        onChangeText={(value) => handleChangeField("nutritionalValue.carbohydrates", value)} />
                    <Input
                        label="Жири"
                        placeholder="Введіть кількість жирів"
                        keyboardType="numeric"
                        multiline
                        value={recipeData.nutritionalValue?.fats}
                        onChangeText={(value) => handleChangeField("nutritionalValue.fats", value)} />
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    imageContainer: {
        width: "100%",
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 15,
        backgroundColor: COLORS.bgPrimary
    },
    image: {
        width: "100%",
        height: "100%"
    },
    dropdownContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },

    dropdown: {
        width: "100%"
    },
    dropdownHalf: {
        width: "45%"
    },
    dropdownItems: {
        width: screenWidth * 0.7
    },
    inputHalf: {
        width: "45%"
    }
});


export default NewRecipePage;
