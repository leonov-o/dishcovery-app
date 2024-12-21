import {Dimensions, StyleSheet} from "react-native";
import {COLORS, SIZES} from "../../constants";

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 3 * SIZES.large) / 2;
export const styles = StyleSheet.create({
    title: {
        color: COLORS.textPrimary,
        fontSize: SIZES.large,
        fontFamily: "Montserrat-SemiBold",
    },
    cardsContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    card: {
        backgroundColor: COLORS.bgPrimary,
        borderRadius: SIZES.small,
        padding: SIZES.small,
        width: cardWidth,
        height: cardWidth,
        marginTop: SIZES.small,
        justifyContent: "center"
    },
    carText: {
        color: COLORS.textPrimary,
        fontSize: SIZES.medium,
        textAlign: "center",
        fontFamily: "Montserrat-Regular"
    }
});
