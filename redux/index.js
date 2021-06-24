import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import moment from "moment";

const  APPID = '022541eab00dcaac99c380f8432acbae'; // not ideal

//actions

export const getWeatherInfo = (city) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APPID}&units=metric`);

            console.log('response', response.data);
            dispatch({type: 'SET_CITY', payload: city});
            dispatch({type: 'SET_WEATHER', payload: response.data.weather[0].main});
            dispatch({type: 'SET_TEMP', payload: response.data.main.temp});
            dispatch({type: 'SET_TIMEZONE', payload: response.data.timezone});
            dispatch({type: 'SET_SUNRISE', payload: response.data.sys.sunrise});
            dispatch({type: 'SET_SUNSET', payload: response.data.sys.sunset});

        } catch (error) {
            dispatch({ type: 'ON_ERROR', payload: error.response.data.message });
        }
    }
}

const initialState = {
    city: '',
    weather: '',
    temp: '',
    sunrise: '',
    sunset: '',
    timezone: ''
};

//reducers

const weatherDashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CITY':
            return {
                ...state,
                city: action.payload
            };
        case 'SET_WEATHER':
            return {
                ...state,
                weather: action.payload
            };
        case 'SET_TEMP':
            return {
                ...state,
                tempC: action.payload,
                tempF: convertToFahrenheit(action.payload)
            };
        case 'SET_SUNRISE':
            return {
                ...state,
                sunrise: formatDateTime(action.payload, state.timezone)
            };
        case 'SET_SUNSET':
            return {
                ...state,
                sunset: formatDateTime(action.payload, state.timezone)
            };
        case 'SET_TIMEZONE':
            return {
                ...state,
                timezone: action.payload
            };
         case 'ON_ERROR':
            return {
                ...state,
                appError: action.payload
            };

            return state
    }
};


//store
export const store = createStore(weatherDashboardReducer, applyMiddleware(thunk));

// helper function
const formatDateTime = (dt, timezone) => {
    return moment(dt*1000).utc().utcOffset(timezone/60).format('h:mm a');
}

const convertToFahrenheit = (temp) => {
    return (temp * 9 / 5 + 32).toFixed(2);
}
