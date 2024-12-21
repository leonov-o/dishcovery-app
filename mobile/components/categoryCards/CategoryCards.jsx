import {SIZES} from "../../constants";
import {View, Text} from "react-native";
import {styles} from "./categoryCards.styles";


export const CategoryCards = () => {
    return (
        <View style={{marginTop: SIZES.large}}>
            <Text
                style={styles.title}>Категорії</Text>
            <View style={styles.cardsContainer}>
                {
                    new Array(6).fill(0).map((_, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.carText}>Всі рецепти</Text>
                        </View>
                    ))
                }
            </View>
        </View>
    );
};
