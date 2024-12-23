import {ItemList} from "../shared/ItemList";
import {useStore} from "../../store/store";
import {useEffect, useState} from "react";
import {RecipeService} from "../../entities";
import {Text} from "react-native";


export const PopularRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPopularRecipes = async () => {
        try {
            setIsLoading(true)
            const result = await RecipeService.getRecipes({sort: "popular", isPublic: true});
            setRecipes(result.data)
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            setError(e.response?.data?.message)
        }
    }

    useEffect(() => {
        fetchPopularRecipes();
    }, []);

    return isLoading
        ? <ItemList title="Популярні рецепти" data={new Array(6).fill(0)}/>
        : error ? <Text>{error}</Text> : <ItemList title="Популярні рецепти" data={recipes}/>

};
