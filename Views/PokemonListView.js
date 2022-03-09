import React, { useEffect, useState, useReducer } from 'react';
import { ActivityIndicator, Button, Dimensions, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';

export default function PokemonListView({route}) {
    
    const [listPokemon] = useState(route.params.listPokemon);

    return (
        <View>               
            <FlatList
                // Extra paddingBottom annars klipps sista biten av
                contentContainerStyle={{alignSelf:"center", paddingTop:20, paddingBottom:100 }}
                data={listPokemon}
                keyExtractor={item => item.id}
                renderItem={ ({item}) =>
                    <PokemonCard pokemon={item} />
                }
            />
        </View>
   )  
}