import React, { useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PokemonCard from '../components/PokemonCard';

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