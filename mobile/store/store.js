import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import {immer} from "zustand/middleware/immer";
import {CategoryService, RecipeService, UserService} from "../entities";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useStore = create()(immer(persist((set, get) => ({
    user: {},
    isAuth: false,
    isLoading: true,
    error: "",
    categories: [],

    fetchAllCategories: async () => {
        try {
            const result = await CategoryService.getCategories();
            set(state => {
                state.categories = result.data
                state.error = ""
                state.isLoading = false
            })
        }catch (e) {
            console.log(e.response?.data?.message)
            set(state => {
                state.error = e.response?.data?.message
                state.isLoading = false
            })
        }
    },

    fetchMyUser: async () => {
        try {
            const result = await UserService.getUserById(get().user.id);
            set(state => {
                state.user = result.data
                state.error = ""
            })
        }catch (e) {
            console.log(e.response?.data?.message)
            set(state => {
                state.error = e.response?.data?.message
            })
        }
    },

    fetchUserLogin: async ({email, password}) => {
        try {
            const result = await UserService.login({email, password});
            const {accessToken, refreshToken, user} = result.data;
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);

            set(state => {
                state.user = user
                state.isAuth = true
                state.error = ""
            })
        }catch (e) {
            console.log(e.response?.data?.message)
            set(state => {
                state.error = e.response?.data?.message
            })
        }
    },

    fetchUserRegister: async ({email, name, password}) => {
        try {
            const result = await UserService.register({email, name, password});
            const {accessToken, refreshToken, user} = result.data;
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);

            set(state => {
                state.user = user
                state.isAuth = true
                state.error = ""
            })
        }catch (e) {
            console.log(e.response?.data?.message)
            set(state => {
                state.error = e.response?.data?.message
            })
        }
    },

    fetchUserUpdate: async (id, data) => {
        try {

            const result = await UserService.update(id, data);
            set(state => {
                state.user = result.data
                state.error = ""
            })
        }catch (e) {
            console.log(e.response?.data?.message)
            set(state => {
                state.error = e.response?.data?.message
            })
        }
    },

    fetchUserLogout: async () => {
        try {
            const result = await UserService.logout(await AsyncStorage.getItem('refreshToken'));
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');

            set(state => {
                state.user = {}
                state.isAuth = false
                state.error = ""
            })
        }catch (e) {
            console.log(e.response?.data?.message)
            set(state => {
                state.error = e.response?.data?.message
            })
        }
    },

    fetchUserRefresh: async () => {
        try {
            const result = await UserService.refresh(await AsyncStorage.getItem('refreshToken'));
            const {accessToken, refreshToken, user} = result.data;
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);

            set(state => {
                state.user = user
                state.isAuth = true
                state.error = ""
            })
        }catch (e) {
            console.log(e.response?.data)
            set(state => {
                state.error = e.response?.data?.message
                state.isAuth = false
            })
        }
    },

    fetchToggleLike: async (id) => {
        try {
            const result = await RecipeService.toggleLike(id);
            set(state => {
                state.user.likes = result.data.userLikes
                state.error = ""
            })
            return result.data.recipeLikes;
        }catch (e) {
            console.log(e.response?.data?.message)
            set(state => {
                state.error = e.response?.data?.message
            })
        }
    }



}), {
    name: 'dishcovery-storage',
    storage: createJSONStorage(() => AsyncStorage),
    partialize: (state) => ({
        user: state.user,
    })
})));
