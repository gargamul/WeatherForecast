import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch} from 'react-redux';
import { getWeatherInfo } from '../redux';

const Location = () => {
    const dispatch = useDispatch();
    const [city, setCity] = useState('');

    return (
        <View>
            <Text>My City</Text>
            <TextInput
                blurOnSubmit={true}
                onChangeText={city => setCity(city)}
                onSubmitEditing={() => {
                    dispatch(getWeatherInfo(city))
                }}
            >
            </TextInput>
        </View>
    )
};

//
// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center', alignItems: 'center'}
// })


export default Location;
