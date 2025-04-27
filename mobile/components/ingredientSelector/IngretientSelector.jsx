import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { IngredientPickModal } from "../ingredientPickModal/IngredientPickModal";
import { DDropdown } from "../shared";
import { DButton } from "../shared/DButton";
import { Input } from "../shared/Input";

export const IngredientSelector = ({ disable, value = [], onChange }) => {
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit, setIsEdit] = useState("");
    const [ingredients, setIngredients] = useState(value);

    useEffect(() => {
        setIngredients(value);
    }, [value]);

    const handleAdd = () => {
        setIsAdd(true);
    };

    const handleEdit = (id) => {
        setIsEdit(id);
    }

    const handleSubmit = () => {
        setIsEdit("");
        onChange(ingredients);
    }

    const handleSelect = (ingredient) => {
        setIngredients([...ingredients, {
            ingredient,
            amount: "1",
            unit: ingredient.defaultUnit
        }]);
        setIsAdd(false);
        setIsEdit(ingredient._id);
    }

    const handleChangeAmount = (ingredientId, amount) => {
        const newIngredients = ingredients.map(item => item.ingredient._id === ingredientId ? { ...item, amount } : item);
        setIngredients(newIngredients);
    }

    const handleChangeUnit = (ingredientId, unit) => {
        const newIngredients = ingredients.map(item => item.ingredient._id === ingredientId ? { ...item, unit } : item);
        setIngredients(newIngredients);
    }

    const handleRemove = (id) => {
        const newIngredients = ingredients.filter(item => item.ingredient._id !== id);
        setIngredients(newIngredients);
        onChange(newIngredients);
    };

    return (
        <View>
            <Text style={styles.label}>Інгредієнти</Text>
            {ingredients.map((item) => (
                <View key={item.ingredient._id} style={styles.inputContainer}>
                    <Text style={styles.ingredientName}>{item.ingredient.name}</Text>
                    <Input
                        value={item.amount}
                        inputMode="decimal"
                        containerStyle={{ width: "23%" }}
                        onChangeText={(text) => handleChangeAmount(item.ingredient._id, text)}
                        placeholder={"К-сть"}
                        disabled={disable || item.ingredient._id !== isEdit}
                        maxLength={5}
                    />
                    <DDropdown mode="modal" style={styles.dropdownHalf} containerStyle={styles.dropdownItems}
                        value={item.unit}
                        onChange={(value) => handleChangeUnit(item.ingredient._id, value)}
                        placeholder="Категорія"
                        disable={disable || item.ingredient._id !== isEdit}
                        data={item.ingredient.possibleUnits.map(unit => ({ label: unit, value: unit }))}
                    />
                    <View style={styles.actionContainer}>
                        {!disable && item.ingredient._id !== isEdit && (
                            <TouchableOpacity onPress={() => handleEdit(item.ingredient._id)} style={styles.trash}>
                                <MaterialCommunityIcons name="pencil" size={24} color={COLORS.secondary} />
                            </TouchableOpacity>
                        )}
                        {!disable && item.ingredient._id !== isEdit && (
                            <TouchableOpacity onPress={() => handleRemove(item.ingredient._id)} style={styles.trash}>
                                <MaterialCommunityIcons name="trash-can-outline" size={24} color={COLORS.error} />
                            </TouchableOpacity>
                        )}
                        {!disable && item.ingredient._id === isEdit && (
                            <TouchableOpacity onPress={handleSubmit} style={styles.trash}>
                                <MaterialCommunityIcons name="check" size={24} color={COLORS.secondary} />
                            </TouchableOpacity>
                        )}

                    </View>
                </View>
            ))}
            {!disable && <DButton text="+" variant="outline" style={styles.button} onPress={handleAdd} />}
            <IngredientPickModal visible={isAdd} onSubmit={handleSelect} onClose={() => setIsAdd(false)} />
        </View>
    );
};


const styles = StyleSheet.create({
    label: {
        color: COLORS.textPrimary,
        fontFamily: "Montserrat-Medium",
        marginTop: SIZES.small,
        marginLeft: SIZES.small
    },

    button: {
        height: 30,
        padding: 0,
        marginTop: SIZES.small
    },

    inputContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    actionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "15%",
        gap: 3
    },

    ingredientName: {
        backgroundColor: COLORS.bgPrimary,
        borderRadius: SIZES.small,
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.small,
        marginTop: SIZES.xSmall,
        fontFamily: "Montserrat-Regular",
        fontSize: SIZES.small,
        width: "30%"
    },

    dropdownHalf: {
        width: "25%",
    },

    dropdownItems: {
        color: COLORS.textPrimary
    },

});
