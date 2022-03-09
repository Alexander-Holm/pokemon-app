import { ActivityIndicator, Button, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { typeResources, getTypes } from '../assets/types/typeResources';
import { theme } from '../theme';

export default function SearchBar({data, style}){
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

    // useFocusEffect istället för useEffect för att rensa input varje gång komponenten visas på nytt.
    useFocusEffect(
        React.useCallback(() => {
            clearSearch()
        },[])
    )

    return (        
        <View style={[styles.container, style]}>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Search..." 
                    value={searchValue}
                    onChangeText={(text) => updateSearchResults(text)} 
                    style={styles.inputField}
                >
                </TextInput>
                {searchValue != "" &&
                    <TouchableOpacity style={styles.buttonClear}
                        onPress={() => clearSearch()} >
                        <Text style={styles.buttonClearText}>X</Text>
                    </TouchableOpacity> 
                }
            </View>

            <FlatList 
                data={filteredPokemon} 
                keyExtractor={item => item.name} 
                contentContainerStyle={styles.resultContainer}
                renderItem={ ({item: pokemon }) => 
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
                    <Text style={styles.id}>#{pokemon.id}</Text>
                </TouchableOpacity>
            } />            
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        margin: 20,
        marginBottom:0,
        elevation: 15,
    },
    inputContainer:{
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"center",
        borderColor:"black", 
        borderWidth:1, 
        borderRadius:0,
        padding:5,
        height: 45
    },
    inputField:{
        flexGrow: 1,
        fontSize:22,
    },
    resultContainer:{
        backgroundColor:"white",
    },
    resultRow:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",       
        padding: 10, 
        borderColor:"gray", 
        borderWidth: 1,
        borderTopWidth: 0, 

    },        
        pokemonImage:{
            width: 50, 
            height: 50,
            marginHorizontal: 10,
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
            marginHorizontal:10,
        }, 
        id:{
            paddingVertical: 0,
            paddingHorizontal: 5,
            
            color: "black",
            fontSize: 14,
            fontWeight:"600",
            backgroundColor:"lightgray",
            elevation: 3,            
        },   
    buttonClear:{
        width:35,
        height:35,
        margin: 5,
        backgroundColor:"gray",
        borderRadius:99,
        alignItems:"center",
        justifyContent:"center",
        
    },
        buttonClearText:{
            fontSize:20, 
            color:"white",
        },    
  });