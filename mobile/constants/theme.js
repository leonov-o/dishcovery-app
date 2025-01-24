const COLORS = {
    primary: "#FF4500",
    secondary: "#FFA500",
    tertiary: "#4CAF50",

    bgPrimary: "#FFFFFF",
    bgSecondary: "#F5F5F5",

    textPrimary: "#333333",
    textSecondary: "#666666",
    textHighlight: "#FF4500",

    buttonPrimary: "#FF6347",
    buttonSecondary: "#4CAF50",
    buttonDisabled: "#D3D3D3",

    border: "#E0E0E0",
    shadow: "rgba(0, 0, 0, 0.1)",

    error: "#FF0000",
    success: "#4CAF50",
    warning: "#FFC107",

    white: "#FFFFFF",
    lightWhite: "#FAFAFC",
};

const SIZES = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
};

const SHADOWS = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    large: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.30,
        shadowRadius: 6.68,
        elevation: 10,
    }
};

export { COLORS, SIZES, SHADOWS };
