import {COLORS, SIZES} from "../../../../constants";
import {Stack, useLocalSearchParams, useRouter} from "expo-router";
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {useEffect, useState} from "react";
import {DButton, DDropdown, Input, MultiInput} from "../../../../components";
import {Image} from "expo-image";
import {useStore} from "../../../../store/store";
import {uploadImage} from "../../../../shared/utils";
import {RecipeService} from "../../../../entities";

const visibilityOptions = [{label: "Публічний", value: "true"}, {label: "Приватний", value: "false"}];
const difficultyOptions = [{label: "Легкий", value: "Легкий"}, {label: "Середній", value: "Середній"}, {
    label: "Важкий",
    value: "Важкий"
}];

const NewRecipePage = () => {
    const router = useRouter();
    const {id} = useLocalSearchParams();
    const [isEdit, setIsEdit] = useState(id !== "create");
    const [imagePicked, setImagePicked] = useState(false);

    const categories = useStore(state => state.categories);
    const categoriesOptions = categories.map((category) => ({label: category.name, value: category.name}))
    const [isLoading, setIsLoading] = useState(false);
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
    });

    const isValid = recipeData.title &&
        recipeData.ingredients &&
        recipeData.ingredients.length > 0 &&
        recipeData.instructions &&
        recipeData.category &&
        recipeData.difficulty &&
        recipeData.cookTime > 0;

    const handleChangeField = (field, value) => {
        setRecipeData(prev => ({
            ...prev,
            [field]: value
        }))
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

    const handleSaveRecipe = async () => {
        try {
            setIsLoading(true);

            let uploadedImage = null;
            if(imagePicked) {
                uploadedImage = await uploadImage(recipeData.image)
            }

            const recipePayload = {
                ...recipeData,
                image: uploadedImage,
                cookTime: parseInt(recipeData.cookTime),
                isPublic: recipeData.visibility === "true"
            };

            let result;
            if (isEdit) {
                result = await RecipeService.updateRecipe(id, recipePayload);
            } else {
                result = await RecipeService.createRecipe(recipePayload);
            }
            console.log(result)
            router.replace(`/recipe/${result.data._id}`);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setError(e.response?.data?.message);
        }
    };

    const fetchRecipe = async () => {
        try {
            setIsLoading(true);
            const result = await RecipeService.getRecipeById(id);
            const {image, title, ingredients, instructions, description, cookTime, category, difficulty, isPublic} = result.data;

            setRecipeData({
                title,
                ingredients,
                instructions,
                description,
                category,
                difficulty,
                image: process.env.EXPO_PUBLIC_SERVER_URL + image,
                cookTime: cookTime.toString(),
                visibility: isPublic.toString()
            });
            setIsLoading(false);
        } catch (e) {
            setError(e.response?.data?.message)
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (isEdit) {
            fetchRecipe()
        }
    }, [isEdit]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bgSecondary}}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: isEdit ? "Редагувати рецепт" : "Додати рецепт",
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
                        <View>
                            <TouchableOpacity disabled={!isValid} onPress={handleSaveRecipe}>
                                <MaterialCommunityIcons name={isEdit ? "content-save" : "check-circle-outline"} size={24}
                                                        color={isValid ? COLORS.secondary : COLORS.buttonDisabled}/>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />

            <ScrollView>
                <View style={{paddingHorizontal: SIZES.xLarge, paddingBottom: SIZES.xxLarge}}>
                    <View>
                        <DButton text={"Додати зображення"} onPress={pickImage} textAlign="left"
                                 variant="outline"/>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            source={recipeData.image} contentFit="cover" style={styles.image}/>
                    </View>
                    <Input label="Назва рецепту" placeholder="Введіть назву рецепту" value={recipeData.title}
                           onChangeText={(value) => handleChangeField("title", value)}/>

                    <MultiInput label="Інгредієнти" placeholder="Введіть інгредієнт" value={recipeData.ingredients}
                                onChange={(value) => handleChangeField("ingredients", value)}/>

                    <Input label="Інструкція" placeholder="Введіть інструкцію" multiline value={recipeData.instructions}
                           onChangeText={(value) => handleChangeField("instructions", value)}/>
                    <Input label="Опис" placeholder="Введіть опис" multiline value={recipeData.description}
                           onChangeText={(value) => handleChangeField("description", value)}/>
                    <Input label="Час приготування" placeholder="Введіть час приготування, хв" keyboardType="numeric"
                           multiline
                           value={recipeData.cookTime} onChangeText={(value) => handleChangeField("cookTime", value)}/>

                    <View style={styles.dropdownContainer}>
                        <DDropdown mode="modal" style={styles.dropdownHalf} containerStyle={styles.dropdownItems}
                                   value={recipeData.category}
                                   onChange={(value) => handleChangeField("category", value)}
                                   placeholder="Категорія"
                                   data={categoriesOptions}/>
                        <DDropdown mode="modal" style={styles.dropdownHalf} containerStyle={styles.dropdownItems}
                                   value={recipeData.difficulty}
                                   onChange={(value) => handleChangeField("difficulty", value)}
                                   placeholder="Складність"
                                   data={difficultyOptions}/>
                    </View>
                    <View>
                        <DDropdown mode="modal" style={styles.dropdown} containerStyle={styles.dropdownItems}
                                   value={recipeData.visibility}
                                   onChange={(value) => handleChangeField("visibility", value)}
                                   placeholder="Видимість"
                                   data={visibilityOptions}/>
                    </View>
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
