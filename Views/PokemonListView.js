import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, Button, Dimensions, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';

export default function PokemonListView({route}) {

    const [allPokemon, setAllPokemon] = useState(route.params.allPokemon);
    const [listPokemon, setListPokemon] = useState(route.params.listPokemon);

    return (
        <View style={{flex:1, justifyContent:"flex-start", alignItems:"center"}}>   
            
            <SearchBar data={allPokemon} />

            <FlatList
                data={listPokemon}
                keyExtractor={item => item.id.toString()}
                renderItem={item =>
                    <PokemonCard pokemon={item.item} />
                }
            />
        </View>
   )  
}