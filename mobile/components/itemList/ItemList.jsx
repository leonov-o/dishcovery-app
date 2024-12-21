import {View, Text, TouchableOpacity} from 'react-native';
import {SIZES} from "../../constants";
import {styles} from "./itemList.styles"
import {useRouter} from "expo-router";

const Item = ({index}) => {
    const router = useRouter();
    return (
        <TouchableOpacity key={index} onPress={() => router.push("/recipe")} style={styles.listItem}>
            <Text
                style={styles.listTitle}>Всі
                рецепти</Text>
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
                    data.map((_, index) => (
                        <Item key={index}/>
                    ))
                }
            </View>
        </View>
    );
};
