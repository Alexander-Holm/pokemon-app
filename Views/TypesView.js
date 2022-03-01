import React, {useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, Image, Button, Dimensions, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import customRef from '../javascript/customRef';
import SearchBar from '../components/SearchBar';
import TypeCard from '../components/TypeCard';

export default function TypesView({navigation, route}) {

    const [isLoading, setIsLoading] = useState(true);
    const allPokemonDelegate = useRef();
    const [allPokemonRef, setAllPokemonRef] = customRef();
    useEffect(() => {
        allPokemonDelegate.current?.call();
    }, [allPokemonRef.current])
    
    const [types, setTypes] = useState({});
    const [errors, setErrors] = useState([]);

    function checkHttpResponse(httpResponse){ 
        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        if(httpResponse.ok === false){  
            let errorMessage =
                `code: ${httpResponse.status} - ${httpResponse.statusText}\n` 
                +`url: ${httpResponse.url}`;
            throw Error(errorMessage);
        }
        // return för att kunna länka flera 'then()', ex: fetch(url).then().then().catch()
        else return httpResponse;
    }
    function httpErrorHandler(error){
        setErrors(prevState => [...prevState, error.message]);
    }

    useEffect(() => {
        async function fetchTypes(){
            const res = await fetch("https://pokeapi.co/api/v2/generation/1");
            try {checkHttpResponse(res)} 
            catch(e) {httpErrorHandler(e)};
            const json = await res.json();

            let typesDictionary = { all: {pokemon: []} };
            json.types.forEach(type => {
                typesDictionary[type.name] =  {pokemon: []}
            });
            setTypes(typesDictionary)
        }
        async function fetchAllPokemon(){
            const apiCalls = [];
            for(let i = 0; i < route.params.numberOfPokemon; i++){                
                const promise = 
                    fetch("https://pokeapi.co/api/v2/pokemon/" + (i+1))
                        .then(res => checkHttpResponse(res))
                        .then(res => res.json())                   
                        .catch(e => httpErrorHandler(e));
                apiCalls.push(promise);
            }
            // Vänta på att alla fetch ska bli klara innan setState
            const fetchedPokemon = await Promise.all(apiCalls);
            setTypes(prevState => ({...prevState, all: {pokemon: fetchedPokemon}}))
            setAllPokemonRef(fetchedPokemon);
        }

        fetchTypes().then(setIsLoading(false));
        // Vyn kan visas innan fetchAllPokemon() är klar
        fetchAllPokemon();
    },[])

    function typeButtonOnPress(type){
        const allPokemon = allPokemonRef.current;        
        setIsLoading(true);
        if(allPokemon == null){
            // Vänta tills pokemon finns och kör sedan den här funktionen igen.
            allPokemonDelegate.current = () => typeButtonOnPress(type);
            return;
        }
        allPokemonDelegate.current = null;
        const pokemonOfType = types[type].pokemon;               
        // Sparar alla pokemon av typen i en array för att inte behöva söka igenom alla igen nästa gång.
        if(pokemonOfType.length < 1){            
            allPokemon.forEach(pokemon => {
                for (let i = 0; i < pokemon.types.length; i++) {
                    if(pokemon.types[i].type.name === type){
                        pokemonOfType.push(pokemon);
                        break;
                    }            
                }
            });            
            setTypes(prevState => ({
                ...prevState,
                [type] : {pokemon: pokemonOfType}
            }));
        }
        setIsLoading(false);
        navigation.navigate("PokemonList", {allPokemon: allPokemon, listPokemon: pokemonOfType, type: type})
    };

   

    const loadingOverlay =
        <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
        </View>

    if(errors.length > 0){
        return(
            <View>
                <Text style={{marginBottom:"10px"}}>Something went wrong while fetching the data</Text>
                {errors.map((error, index) => {
                    return(
                        <View key={index} style={{marginVertical:"10px"}}>
                            <Text>{index + 1}.</Text>
                            <Text>                                
                                {error}
                            </Text>
                        </View>
                    )
                })}
            </View>
        )
    }
    return(
        <View >
            {isLoading && loadingOverlay}

            <SearchBar data={allPokemonRef.current} />

            {/* ScrollView istället för FlatList för att kunna ha flex-wrap */}
            <ScrollView contentContainerStyle={styles.container}>
                {Object.keys(types).map(item => (
                    <TypeCard type={item} onPress={() => typeButtonOnPress(item)} key={item} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexWrap:"wrap",
        flexDirection:"row",
        justifyContent:"flex-start",
        margin:20,
    },
    loadingOverlay:{
        zIndex:99,
        position:"absolute",
        height:"100vh", 
        width:"100vw", 
        backgroundColor: 'rgba(50, 50, 50, 0.2)', 
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
    },
});