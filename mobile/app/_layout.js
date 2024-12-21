import {useEffect} from 'react';
import {useFonts} from 'expo-font';
import {Stack} from "expo-router";

import * as SplashScreen from "expo-splash-screen";

const Layout = () => {
    const [loaded, error] = useFonts({
        'Montserrat-Black': require('../assets/fonts/Montserrat-Black.ttf'),
        'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.ttf'),
        'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return <Stack/>
};

export default Layout;
