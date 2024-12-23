import {Text} from "react-native";
import {COLORS, SIZES} from "../../constants";
import {TouchableOpacity} from "react-native";


export const DButton = ({text, onPress, textAlign = "center", variant = "primary", disabled, style}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={{
            backgroundColor: disabled
                ? COLORS.buttonDisabled
                : variant === "primary" && COLORS.buttonPrimary || variant === "secondary" && COLORS.buttonSecondary || variant === "outline" && COLORS.white || variant === "danger" && COLORS.error,
            padding: SIZES.medium,
            justifyContent: "center",
            borderRadius: SIZES.small,
            marginTop: SIZES.large,
            ...style
        }}>
            <Text style={{
                textAlign: textAlign,
                color: variant === "outline" ? COLORS.textPrimary : COLORS.white,
                fontSize: SIZES.medium,
                fontFamily: "Montserrat-Medium"
            }}>{text}</Text>
        </TouchableOpacity>
    );
};
