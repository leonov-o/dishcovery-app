import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SIZES } from "../../constants";
import { useStore } from "../../store/store";
import { styles } from "./categoryCards.styles";


export const CategoryCards = () => {
    const router = useRouter();
    const categories = useStore(state => state.categories);
    const isLoading = useStore(state => state.isLoading);
    const fetchAllCategories = useStore(state => state.fetchAllCategories);
    useEffect(() => {
        fetchAllCategories();
    }, []);

    return (
        <View style={{ marginTop: SIZES.large }}>
            <Text
                style={styles.title}>Категорії</Text>
            <View style={styles.cardsContainer}>
                <TouchableOpacity onPress={() => router.push("/search")}>
                    <View style={styles.card}>
                        <Text style={styles.carText}>Всі рецепти</Text>
                    </View>
                </TouchableOpacity>

                {
                    isLoading
                        ? (
                            new Array(5).fill(0).map((item, index) => (
                                <View key={index} style={styles.card}>
                                    <Text style={styles.carText}>{item.name}</Text>
                                </View>))
                        )
                        : (
                            categories.slice(0, 5).map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => router.push(`/search/?categoryCard=${item._id}`)}>
                                    <View key={index} style={styles.card}>
                                        <Text style={styles.carText}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )
                }
            </View>
        </View>
    );
};
