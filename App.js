import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import {store} from './redux';

import Location from './components/Location';
import {Dashboard} from "./components/Dashboard";

const App = () =>  {
    return (
        <Provider store={store}>
            <View style={AppStyles.root}>
                <Text style={AppStyles.title}>Weather Forecast POC</Text>
                <Location style={AppStyles.rowContainer}/>
                <Dashboard style={AppStyles.rowContainer}/>
                <StatusBar style="auto" />
            </View>
        </Provider>
    );
};

const AppStyles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        margin: 40,
        fontSize: 20
    },
    rowContainer: {
    },
})


export default App;
