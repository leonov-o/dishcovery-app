import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { IngredientService } from "../../entities";
import { Input } from "../shared/Input";



export const IngredientPickModal = ({ visible, skipedValues = [], onSubmit, onClose }) => {
    const [search, setSearch] = useState("");

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["ingredients", search],
        queryFn: ({ pageParam }) => IngredientService.getIngredients({ page: pageParam, search }),
        getNextPageParam: (lastPage) => lastPage.page + 1 ?? undefined,
    });

    const flatListData = data?.pages.flatMap(page => page.data) || [];

    return (
        <Modal
            visible={visible}
            statusBarTranslucent={true}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.content}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                            <MaterialCommunityIcons name="close" size={24} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    </View>

                    <Input style={styles.input} onChangeText={setSearch} placeholder="Оберіть інгредієнт" />
                    {isLoading ? (
                        <Text>Loading...</Text>
                    ) : flatListData.length === 0 ? (
                        <Text>No found</Text>
                    ) : (
                        <FlatList
                            data={flatListData}
                            renderItem={({ item }) => (
                                skipedValues.includes(item._id) ? null : (
                                    <TouchableOpacity
                                        key={item._id}
                                        style={styles.item}
                                        onPress={() => onSubmit(item)}
                                    >
                                        <Text style={styles.item}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            )}
                            onEndReached={() => {
                                if (hasNextPage && !isFetchingNextPage) {
                                    fetchNextPage();
                                }
                            }}
                            onEndReachedThreshold={0.5}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },

    card: {
        width: "90%",
        maxHeight: 300,
        padding: 10,
        backgroundColor: COLORS.bgPrimary,
        borderRadius: 8,
    },

    header: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },

    input: {
        borderBottomWidth: 1,
        borderColor: COLORS.textSecondary
    },

    item: {
        fontFamily: "Montserrat-Medium",
        fontSize: SIZES.small,
        color: COLORS.textPrimary,
        paddingHorizontal: 10,
        marginTop: 5
    }
});
