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
        <View>               
            <SearchBar data={allPokemon} />

            <FlatList
                // Extra paddingBottom annars klipps sista biten av
                contentContainerStyle={{alignSelf:"center", paddingTop:20, paddingBottom:100}}
                data={listPokemon}
                keyExtractor={item => item.id.toString()}
                renderItem={item =>
                    <PokemonCard pokemon={item.item} />
                }
            />

        </View>
   )  
}