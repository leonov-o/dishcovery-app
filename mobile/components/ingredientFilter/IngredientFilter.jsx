import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { IngredientPickModal } from "../ingredientPickModal/IngredientPickModal";



export const IngredientFilter = ({ selected, onSelect, onRemove }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (item) => {
        onSelect(item)
        setModalVisible(false)
    };

    const handleRemove = (id) => {
        onRemove(id);
    }

    return (
        <View style={styles.container}>
            <View style={styles.selected}>
                {
                    selected.map((item) => (
                        <View key={item._id} style={styles.selectedItem}>
                            <Text style={styles.selectedText}>{item.name}</Text>
                            <TouchableOpacity onPress={() => handleRemove(item._id)}>
                                <MaterialCommunityIcons name="close" size={24} color={COLORS.secondary} />
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
            <TouchableOpacity style={styles.action} onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="food-variant" size={24} color={COLORS.secondary} />
                <Text style={styles.title}>Пошук за інгредієнтами</Text>
            </TouchableOpacity>
            <IngredientPickModal visible={modalVisible} skipedValues={selected.map(item => item._id)} onSubmit={handleSelect} onClose={() => setModalVisible(false)} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",

    },

    selected: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: SIZES.small,
        marginTop: SIZES.small,
        paddingHorizontal: SIZES.small
    },

    selectedItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: SIZES.small
    },

    selectedText: {
        fontSize: SIZES.small,
        fontFamily: "Montserrat-Regular"
    },

    action: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: SIZES.small,
        backgroundColor: COLORS.bgPrimary,
        borderRadius: SIZES.small,
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.small,
        marginTop: SIZES.xSmall,
    },

    title: {
        fontFamily: "Montserrat-Regular",
        fontSize: SIZES.medium,
        // width: "100%"
    }
});