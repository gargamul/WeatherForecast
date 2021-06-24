import {Text, View, Pressable} from "react-native";
import React, {useState} from "react";
import { useSelector} from "react-redux";

export const Dashboard = () => {
    const state = useSelector(state => state);

    const [tempScale, setTempScale] = useState('Celsius');

    let isError = !!state && state.appError;
    let isVisible = !!state && !isError;

    if (isVisible) {
        const { weather, tempC, tempF, sunrise, sunset } = state;
        return (
            <View>
                <Text>Weather {weather}</Text>
                <Text>Temperature</Text>
                <Text>{tempScale==='Celsius' ? tempC : tempF}</Text>
                <Pressable
                    accessibilityRole="button"
                    onPress={() => setTempScale(tempScale==='Celsius' ? 'Fahrenheit' : 'Celsius')}>
                    <Text>{tempScale}</Text>
                </Pressable>
                <Text>Sunrise {sunrise}</Text>
                <Text>Sunset {sunset}</Text>
            </View>
            )
    } else if (isError) { // need to toggle remove this
        return (
            <Text>error!</Text>
        )
    } else {
        return null
    }
};
