import { ActivityIndicator, Button, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { typeResources, getTypes } from '../assets/types/typeResources';

export default function SearchBar({data}){
    const navigation = useNavigation()
    const [filteredPokemon, setFilteredPokemon] = useState([])
    const [searchValue, setSearchValue] = useState("")

    function updateSearchResults(searchString){
        // setSearchValue för att uppdatera värdet i TextInput value
        setSearchValue(searchString)        
        let filteredArray = []
        if(searchString.length < 1){
            setFilteredPokemon(filteredArray);
            return;
        }
        data.forEach(item => {
            let pokemonName = item.name.toLowerCase();
            searchString = searchString.toLowerCase();
            if( pokemonName.search(searchString) != -1)
                filteredArray.push(item)
        })
        setFilteredPokemon(filteredArray)
    }

    function clearSearch(){
        let tempArray = []
        setSearchValue("")      
        setFilteredPokemon(tempArray)
    }

    useFocusEffect(        
        React.useCallback(() => {
            clearSearch()
        },[])
    )

    return (        
        <View>
            <View style={styles.searchBar}>
                <TextInput placeholder="Search..." onChangeText={(text) => updateSearchResults(text)} value={searchValue}
                    style={styles.inputField}
                />
                {searchValue != "" &&
                    <TouchableOpacity style={styles.buttonClear}
                        onPress={() => clearSearch()} >
                        <Text style={styles.buttonClearText}>X</Text>
                    </TouchableOpacity> 
                }
            </View>

            <FlatList data={filteredPokemon} keyExtractor={item => item.name} renderItem={ ({item: pokemon }) => 
                <TouchableOpacity onPress={() => navigation.navigate("Details", pokemon)} style={styles.resultRow}>
                    <Image 
                        style={styles.pokemonImage}
                        source={{ uri: pokemon.sprites.other["official-artwork"].front_default}}
                    />
                    <View style={styles.pokemonTypesContainer}>
                        {getTypes(pokemon).map(type => (
                            <Image source={typeResources[type]?.image} style={styles.pokemonTypeImage} key={type}/>
                        ))}
                    </View>
                    <Text style={styles.pokemonName}>{pokemon.name}</Text>
                </TouchableOpacity>
            } />            
        </View>
        
    )
}

const styles = StyleSheet.create({
    searchBar:{
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"center",
        borderColor:"black", 
        borderWidth:1, 
        borderRadius:0,
        padding:5,
        margin: 5,
        marginBottom:0,
        height: 45
    },
    inputField:{
        flex:1,
        fontSize:22,
    },
    resultRow:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",       
        padding: 10, 
        borderColor:"black", 
        borderBottomWidth:1, 
    },
        pokemonImage:{
            width: 50, 
            height: 50,
        },
        pokemonTypesContainer:{
            justifyContent:"center",
            marginHorizontal:5,
        },
            pokemonTypeImage:{
                height: 18,
                width: 18,
                margin: 2,
            },
        pokemonName:{        
            fontSize:20,
            textTransform:"capitalize",
            marginLeft:5,
        },    
    buttonClear:{
        marginHorizontal:3,        
        padding:7,
        backgroundColor:"#457B9D",
        borderRadius:10,
        alignContent:"center",
        justifyContent:"center",
        width:40,
        height: 40,
    },
        buttonClearText:{
            fontSize:20, 
            color:"white",
            textAlign:"center"
        },    
  });