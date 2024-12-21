import {COLORS, SIZES} from "../../constants";
import {Stack, useRouter} from "expo-router";
import {SafeAreaView, ScrollView, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {DDropdown, ItemList} from "../../components";


const SearchPage = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.bgSecondary}}>
            <Stack.Screen
                options={{
                    statusBarTranslucent: false,
                    headerShown: true,
                    headerTitle: "Результати пошуку",
                    headerTitleAlign: "center",
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
            <View style={{paddingHorizontal: SIZES.xLarge, paddingVertical: SIZES.xSmall, flexDirection: "row", width: "100%", justifyContent: "space-around"}}>
                <DDropdown
                    data={[
                        {label: "Всі рецепти", value: "fdfdf"},
                        {label: "Всі рецепти", value: "dfdf"},
                    ]}
                    style={{width: "45%"}}
                    placeholder="Категорія"
                    onChange={(item) => console.log(item)}
                />
                <DDropdown
                    data={[
                        {label: "Кращі", value: "likesDesc"},
                        {label: "Популярні", value: "popular"},
                        {label: "Нові", value: "newest"},
                    ]}
                    style={{width: "45%"}}
                    placeholder="Сортування"
                    onChange={(item) => console.log(item)}
                />
            </View>
            <ScrollView style={{paddingHorizontal: SIZES.xLarge}}>
                <ItemList title="" data={new Array(6).fill(0)}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchPage;
