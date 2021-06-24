import {Text, View, Pressable, Button, StyleSheet} from "react-native";
import React, {useState} from "react";
import { useSelector} from "react-redux";

export const Dashboard = () => {
    const state = useSelector(state => state);

    const [tempScale, setTempScale] = useState('deg. C');

    let isError = !!state && state.appError;
    let isVisible = !!state && !isError;

    if (isVisible) {
        const { weather, tempC, tempF, sunrise, sunset } = state;
        return (
            <View style={DashboardStyles.root}>
                <View style={DashboardStyles.rowContainer}>
                    <Text style={DashboardStyles.cell}>Weather</Text>
                    <Text style={DashboardStyles.cell}>{weather}</Text>
                </View>
                <View style={DashboardStyles.rowContainer}>
                    <Text style={DashboardStyles.cell}>Temperature</Text>
                    <View style={[DashboardStyles.cell, DashboardStyles.rowContainer]}>
                        <Text>{tempScale==='deg. C' ? tempC : tempF} </Text>
                        <Button title={tempScale} color='grey' onPress={() => setTempScale(tempScale==='deg. C' ? 'deg. F' : 'deg. C')}/>
                    </View>
                </View>
                <View style={DashboardStyles.rowContainer}>
                    <Text style={DashboardStyles.cell}>Sunrise</Text>
                    <Text style={DashboardStyles.cell}>{sunrise}</Text>
                </View>
                <View style={DashboardStyles.rowContainer}>
                    <Text style={DashboardStyles.cell}>Sunset</Text>
                    <Text style={DashboardStyles.cell}>{sunset}</Text>
                </View>
            </View>
            )
    } else if (isError) { // need to toggle remove this
        return (
            <View style={DashboardStyles.root}>
                <Text style={DashboardStyles.errorMessage}>{state.appError}</Text>
                <Text style={DashboardStyles.errorMessage}>Please refresh the app</Text>
            </View>
        )
    } else {
        return (
            <View style={DashboardStyles.root}>
                <Text>Please enter a city or country</Text>
            </View>
        )
    }
};

const DashboardStyles = StyleSheet.create({
    root: {
        margin: 20,
        flexDirection: "column",
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    cell: {
        fontSize: 15,
        margin: 5
    },
    errorMessage: {
        color: 'red',
    }
})
