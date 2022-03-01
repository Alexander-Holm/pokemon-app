import { ActivityIndicator, Button, StyleSheet, Text, TextInput, Image, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

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
            <View style={styles.SearchBar}>
                <TextInput placeholder="Search..." onChangeText={(text) => updateSearchResults(text)} value={searchValue}
                    style={styles.InputField}
                />
                {searchValue != "" &&
                    <TouchableOpacity style={styles.ButtonClear}
                        onPress={() => clearSearch()} >
                        <Text style={styles.ButtonClearText}>X</Text>
                    </TouchableOpacity> 
                }
            </View>

            <FlatList data={filteredPokemon} keyExtractor={item => item.name} renderItem={({item}) =>
                <TouchableOpacity onPress={() => navigation.navigate("Details", item)}
                    style={styles.ResultRow}>
                    <Image 
                        style={styles.ResultImage}
                        source={{ uri: item.sprites.other["official-artwork"].front_default}}
                    />
                    <Text style={styles.ResultText}>{item.name}</Text>
                </TouchableOpacity>
            } />            
        </View>
        
    )
}

const styles = StyleSheet.create({
    SearchBar:{
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"center",
        borderColor:"black", 
        borderWidth:1, 
        borderRadius:10,
        padding:5,
        margin: 5,
        marginBottom:0,
        height: 45
    },
    InputField:{
        flex:1,
        fontSize:22,
    },
    ResultRow:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",       
        padding: 10, 
        borderColor:"black", 
        borderBottomWidth:1, 
    },
    ResultImage:{
        width: 50, 
        height: 50,
    },
    ResultText:{        
        fontSize:20,
        padding:16,
    },    
    ButtonClear:{
        marginHorizontal:3,        
        padding:7,
        backgroundColor:"#457B9D",
        borderRadius:10,
        alignContent:"center",
        justifyContent:"center",
        width:40,
        height: 40,
    },
    ButtonClearText:{
        fontSize:20, 
        color:"white",
        textAlign:"center"
    },    
  });