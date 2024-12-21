import {View, Text} from 'react-native';
import {Image} from "expo-image"

import {SIZES} from "../../constants";
import {styles} from "./search.styles";
import {Input} from "../shared";
import {useRouter} from "expo-router";
const mainBg = require("../../assets/mainBg.png");

export const Search = () => {
    const router = useRouter();

    return (
        <View>
            <Image source={mainBg} style={styles.image}/>
                <View>
                    <Text style={styles.title}>Оберіть свій
                        ідеальний рецепт</Text>
                </View>
                <View style={{marginTop: SIZES.small}}>
                    <Input placeholder="Пошук" onSubmitEditing={() => router.push("/search")} style={styles.input}/>
                </View>

        </View>
    );
};
