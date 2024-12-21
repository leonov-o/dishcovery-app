import {COLORS, SIZES} from "../../constants";
import {TextInput} from "react-native";


export const Input = ({placeholder, onSubmitEditing,disabled}) => {
    return (
        <TextInput
            placeholder={placeholder}
            editable={!disabled}
            onSubmitEditing={onSubmitEditing}
            style={{
                backgroundColor: disabled ? COLORS.buttonDisabled : COLORS.bgPrimary,
                borderRadius: SIZES.small,
                paddingHorizontal: SIZES.large,
                paddingVertical: SIZES.small,
                marginTop: SIZES.small,
                fontFamily: "Montserrat-Regular"
            }}
        />
    );
};
