import {Dropdown} from "react-native-element-dropdown";


export const DDropdown = ({data, value, placeholder, style, onChange}) => {
    return (
        <Dropdown
            data={data}
            style={style}
            placeholderStyle={{fontFamily: "Montserrat-Regular"}}
            itemTextStyle={{fontFamily: "Montserrat-Light"}}
            selectedTextStyle={{fontFamily: "Montserrat-Regular"}}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={value || ""}
            onChange={onChange}/>
    );
};
