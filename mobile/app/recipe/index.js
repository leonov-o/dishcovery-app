import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from "../../constants";
import {Stack, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, TouchableOpacity, View, Text} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Image} from "expo-image";

const mock = {
    "_id": {
        "$oid": "676594b0f25598d0be06274f"
    },
    "title": "Омлет з сиром та овочами",
    "ingredients": [
        "Яйця - 3 шт.",
        "Молоко - 50 мл.",
        "Сир твердий - 50 г.",
        "Помідор - 1 шт.",
        "Болгарський перець - 0.5 шт.",
        "Сіль, перець - за смаком.",
        "Олія - 1 ст.л."
    ],
    "instructions": "1. Збийте яйця з молоком, сіллю та перцем.\n2. Наріжте помідор і перець кубиками.\n3. Натріть сир на тертці.\n4. Розігрійте сковороду з олією, додайте овочі й злегка обсмажте.\n5. Залийте овочі яйцями й посипте сиром.\n6. Готуйте на слабкому вогні під кришкою 5-7 хвилин.",
    "description": "Легкий та швидкий сніданок з сиром і овочами.",
    "authorId": {
        "$oid": "67658cd512f9ede0e2dfac44"
    },
    "categoryId": {
        "$oid": "676560631c5fac2027f91393"
    },
    "isPublic": false,
    "cookTime": 15,
    "difficulty": "Легко",
    "image": "e6572517-0bb5-40c3-b274-5c10bb31fd96.jpg",
    "likes": [],
    "views": 7,
    "createdAt": {
        "$date": "2024-12-20T16:00:48.755Z"
    },
    "updatedAt": {
        "$date": "2024-12-20T16:47:49.050Z"
    },
    "__v": 8
}

const RecipePage = () => {
    const router = useRouter();
    const image = "http://192.168.1.230:5000/e6572517-0bb5-40c3-b274-5c10bb31fd96.jpg"
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bgSecondary}}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "",
                    headerTitleStyle: {fontFamily: "Montserrat-Regular"},
                    headerStyle: {backgroundColor: COLORS.bgSecondary},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            router.back();
                        }}>
                            <MaterialCommunityIcons name="arrow-left-thin" size={24} color={COLORS.secondary}/>
                        </TouchableOpacity>
                    )
                }}
            />

            <ScrollView style={{paddingHorizontal: SIZES.large}}>
                <Text style={styles.category}>{"Сніданки"} →</Text>
                <Text style={styles.title}>{mock.title}</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={image} contentFit="cover" style={styles.image}/>
                </View>
                <View style={styles.statsBlockContainer}>
                    <View style={styles.statContainer}>
                        <MaterialCommunityIcons name="eye" size={30} color={COLORS.secondary}/>
                        <Text style={styles.statText}>{mock.views}</Text>
                    </View>
                    <View style={styles.statContainer}>
                        <MaterialCommunityIcons name="cards-heart-outline" size={30} color={COLORS.secondary}/>
                        <Text style={styles.statText}>{mock.likes.length}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.blockTitle}>{mock.description}</Text>
                </View>
                <View>
                    <Text style={styles.blockTitle}>Інгредієнти:</Text>
                    <View style={styles.blockContainer}>
                        {
                            mock.ingredients.map((ingredient, index) => (
                                <Text key={index} style={styles.blockText}>{ingredient}</Text>
                            ))
                        }
                    </View>
                </View>
                <View>
                    <Text style={styles.blockTitle}>Інструкція:</Text>
                    <View style={styles.blockContainer}>
                        <Text style={styles.blockText}>{mock.instructions}</Text>
                    </View>
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    category: {
        fontSize: 14,
        fontFamily: "Montserrat-Medium",
    },
    title: {
        fontSize: 20,
        fontFamily: "Montserrat-SemiBold",
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
    statsBlockContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    statContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10
    },
    statText: {
        marginLeft: 6,
        fontFamily: "Montserrat-Medium",
        fontSize: SIZES.medium
    },
    blockContainer: {
        marginTop: 5,
        paddingHorizontal: SIZES.small
    },
    blockTitle: {
        fontSize: 15,
        fontFamily: "Montserrat-Medium",
        color: COLORS.textPrimary,
        textAlign: "justify",
        marginTop: 5
    },
    blockText: {
        fontSize: 16,
        fontFamily: "Montserrat-Regular",
        textAlign: "justify",
        color: COLORS.textPrimary
    }


});

export default RecipePage;
