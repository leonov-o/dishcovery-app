import {useStore} from "../store/store";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

export const withCheckAuth = (Component) => (props) => {
    const {isAuth} = useStore(state => state.isAuth);
    const fetchUserRefresh = useStore(state => state.fetchUserRefresh);

    const checkAuth = async () => {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
            if(!isAuth) await fetchUserRefresh();
        } else {
            router.replace("/login");
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return <Component {...props} />;
};
