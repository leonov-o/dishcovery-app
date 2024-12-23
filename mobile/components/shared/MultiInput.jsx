import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {View} from "react-native";
import {COLORS, SIZES} from "../../constants";
import {Input} from "./Input";
import {DButton} from "./DButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const MultiInput = ({label, placeholder, disable, value = [], onChange}) => {
    const handleAdd = () => {
        onChange([...value, ""]);
    };

    const handleChange = (index, text) => {
        const newValue = [...value];
        newValue[index] = text;
        onChange(newValue);
    };

    const handleRemove = (index) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange(newValue);
    };

    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            {value.map((item, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Input
                        value={item}
                        onChangeText={(text) => handleChange(index, text)}
                        placeholder={placeholder}
                        disabled={disable}
                        containerStyle={{flex: 1}}
                        maxLength={36}
                    />
                    {!disable && (
                        <TouchableOpacity onPress={() => handleRemove(index)} style={styles.trash}>
                            <MaterialCommunityIcons name="trash-can-outline" size={24} color={COLORS.secondary}/>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
            {!disable && <DButton text="+" variant="outline" style={styles.button} onPress={handleAdd}/>}
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
        justifyContent: "space-between",
    },
    trash: {
        marginLeft: SIZES.small
    }
});
