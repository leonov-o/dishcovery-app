import {COLORS, SIZES} from "../../constants";
import {TextInput, View, Text} from "react-native";
import {useState} from "react";


export const Input = ({label, placeholder, value, style, containerStyle, onChangeText, onSubmitEditing, disabled, secure, regex,validationMessage, setValid, ...props}) => {
    const [showMessage, setShowMessage] = useState(false);
    const handleTextChange = (input) => {
        onChangeText(input);

        if (validationMessage) {
            validate(input);
        }
    };

    const validate = (input) => {
        const isValid = regex.test(input);
        if (!isValid) {
            setShowMessage(true);
            setValid(false);
        } else {
            setShowMessage(false);
            setValid(true);
        }
    };

    return (
        <View style={containerStyle}>
            {showMessage && <Text style={{color: COLORS.error, fontFamily: "Montserrat-Regular", marginTop: SIZES.xSmall, marginLeft: SIZES.small}}>{validationMessage}</Text>}
            {label && <Text style={{color: COLORS.textPrimary, fontFamily: "Montserrat-Medium", marginTop: SIZES.small, marginLeft: SIZES.small}}>{label}</Text>}
            <TextInput
                secureTextEntry={secure}
                placeholder={placeholder}
                value={value}
                editable={!disabled}
                onChangeText={handleTextChange}
                onSubmitEditing={onSubmitEditing}
                style={{
                    backgroundColor: disabled ? COLORS.buttonDisabled : COLORS.bgPrimary,
                    borderRadius: SIZES.small,
                    paddingHorizontal: SIZES.large,
                    paddingVertical: SIZES.small,
                    marginTop: SIZES.xSmall,
                    fontFamily: "Montserrat-Regular",
                    ...style
                }}
                {...props}
            />
        </View>
    );
};
