import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch} from 'react-redux';
import { getWeatherInfo } from '../redux';

const Location = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');

    return (
        <View  style={LocationStyles.container}>
            <Text style={LocationStyles.text}>My Location</Text>
            <TextInput
                autoCorrect={false}
                blurOnSubmit={true}
                onChangeText={city => setCity(city)}
                onSubmitEditing={() => {
                    dispatch(getWeatherInfo(city))
                }}
                style={LocationStyles.textInput}
            >
            </TextInput>
        </View>
    )
};

const LocationStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1

    }
})

export default Location;
