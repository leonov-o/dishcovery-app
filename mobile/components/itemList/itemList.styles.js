import {StyleSheet} from "react-native";
import {COLORS, SIZES} from "../../constants";

export const styles = StyleSheet.create({
    title: {
        color: COLORS.textPrimary,
        fontSize: SIZES.large,
        fontFamily: "Montserrat-SemiBold",
    },
    listItem: {
        backgroundColor: COLORS.bgPrimary,
        borderRadius: SIZES.small,
        padding: SIZES.small,
        height: 155,
        marginTop: SIZES.small,
        justifyContent: "center"
    },
    listTitle: {
        color: COLORS.textPrimary,
        fontSize: SIZES.medium,
        textAlign: "center",
        fontFamily: "Montserrat-Regular"
    }
});
