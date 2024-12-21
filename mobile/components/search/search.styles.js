import {StyleSheet} from "react-native";
import {COLORS, SIZES} from "../../constants";

export const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        alignSelf: "center"
    },
    title: {
        marginTop: SIZES.large,
        color: COLORS.textPrimary,
        fontSize: SIZES.large,
        textAlign: "center",
        fontFamily: "Montserrat-Regular"
    },
    input: {
        backgroundColor: COLORS.bgPrimary,
        borderRadius: SIZES.small,
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.small
    }
});
