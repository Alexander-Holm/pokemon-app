import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, Text, View} from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import PokemonListView from './Views/PokemonListView';
import DetailsView from './Views/DetailsView';
import TypesView from './Views/TypesView';
import PokemonListHeader from './components/PokemonListHeader';

// Färgschema
// https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557

// https://reactnavigation.org/docs/themes/
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F1FAEE',
    card: '#1D3557',
    text: 'white',    
  },
  headerTitleStyle: {
      fontSize: 20,
      fontWeight:"600",      
      color:"white",
  }
};

export default function App() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer theme={theme} >
            <Stack.Navigator 
                initialRouteName="Types" 
                screenOptions={theme}
            >
                <Stack.Screen 
                    name="Types" component={TypesView} 
                    options={{title:"Pokemon-app"}} 
                    initialParams={{numberOfPokemon: 10}} 
                />
                <Stack.Screen 
                    name="PokemonList" component={PokemonListView} 
                    options={({route}) => ({ headerTitle: <PokemonListHeader type={route.params.type} /> }) } 
                />
                <Stack.Screen name="Details" component={DetailsView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
