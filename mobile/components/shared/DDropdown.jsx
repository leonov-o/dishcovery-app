import {Dropdown} from "react-native-element-dropdown";
import {COLORS, SIZES} from "../../constants";


export const DDropdown = ({data, value, placeholder, style, containerStyle, mode, onChange, disable}) => {
    return (
        <Dropdown
            disable={disable}
            data={data}
            style={{
                backgroundColor: disable ? COLORS.buttonDisabled : COLORS.bgPrimary,
                borderRadius: SIZES.small,
                paddingHorizontal: SIZES.large,
                paddingVertical: SIZES.small,
                marginTop: SIZES.xSmall,
                fontFamily: "Montserrat-Regular",
                ...style
            }}
            mode={mode}
            containerStyle={containerStyle}
            placeholderStyle={{fontFamily: "Montserrat-Regular"}}
            itemTextStyle={{fontFamily: "Montserrat-Light"}}
            selectedTextStyle={{fontFamily: "Montserrat-Regular"}}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value || ""}
            onChange={(item) => onChange(item.value)}
        />
    );
};
