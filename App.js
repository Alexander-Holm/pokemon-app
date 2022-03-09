import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack';
import PokemonListView from './views/PokemonListView';
import DetailsView from './views/DetailsView';
import TypesView from './views/TypesView';
import PokemonListHeader from './components/PokemonListHeader';
import { theme } from './theme';

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
                    initialParams={{numberOfPokemon: 151}} 
                />
                <Stack.Screen 
                    name="PokemonList" component={PokemonListView} 
                    options={ ({route}) => ({ headerTitle: <PokemonListHeader type={route.params.type} /> }) } 
                />
                <Stack.Screen 
                    name="Details" component={DetailsView} 
                    options= { ({route}) => ({ title: route.params.name  }) }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
