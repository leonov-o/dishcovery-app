import {SIZES} from "../../constants";
import {View, Text, TouchableOpacity} from "react-native";
import {styles} from "./categoryCards.styles";
import {useStore} from "../../store/store";
import {useEffect} from "react";
import {useRouter} from "expo-router";


export const CategoryCards = () => {
    const router = useRouter();
    const categories = useStore(state => state.categories);
    const isLoading = useStore(state => state.isLoading);
    const fetchAllCategories = useStore(state => state.fetchAllCategories);
    useEffect(() => {
        fetchAllCategories();
    }, []);

    return (
        <View style={{marginTop: SIZES.large}}>
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
                                <TouchableOpacity key={index} onPress={() => router.push(`/search/?categoryCard=${item.name}`)}>
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
