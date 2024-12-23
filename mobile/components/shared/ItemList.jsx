import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, SIZES} from "../../constants";
import {useRouter} from "expo-router";
import {useStore} from "../../store/store";
import {Image} from "expo-image";

const Item = ({index, item}) => {
    const router = useRouter();

    return (
        <TouchableOpacity key={index} onPress={() => router.push(`/recipe/${item._id}`)} style={styles.listItem}>
            <View>
                <Text
                    style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={process.env.EXPO_PUBLIC_SERVER_URL + item.image} contentFit="cover" style={styles.image}/>
            </View>
        </TouchableOpacity>
    )
}

export const ItemList = ({title, data}) => {
    return (
        <View style={{marginTop: SIZES.large, paddingBottom: SIZES.large}}>
            {
                title && <Text style={styles.title}>{title}</Text>
            }
            <View>
                {
                    data.map((item, index) => (
                        <Item key={index} item={item}/>
                    ))
                }
            </View>
        </View>
    );
};

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

        marginTop: SIZES.small,
    },
    itemTitle: {
        color: COLORS.textPrimary,
        fontSize: SIZES.medium,
        fontFamily: "Montserrat-Regular"
    },
    itemCategory: {
        color: COLORS.textSecondary,
        fontSize: SIZES.small,
        fontFamily: "Montserrat-Medium"
    },
    imageContainer: {
        width: "100%",
        height: 200,
        borderRadius: 20, // Закругленные углы
        overflow: 'hidden', // Чтобы изображение не выходило за рамки
        marginVertical: 15, // Отступы сверху и снизу
    },
    image: {
        width: "100%",
        height: "100%"
    },
});
