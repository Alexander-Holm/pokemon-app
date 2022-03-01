import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View, } from 'react-native';
import { useFocusEffect, useLinkProps } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function DetailsView({navigation, route}){

    const [isLoading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(route.params);
    const [evolutions, setEvolutions] = useState([]);

    useFocusEffect(        
        React.useCallback(() => {
            // Finns id så finns alla properties 
            if("id" in pokemon)
               setLoading(false)
            else{                
                fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon.name.toLowerCase())
                .then(res => res.json())
                .then(data =>{
                    setPokemon(data)                    
                })
                .finally(() => setLoading(false))
            }

            
            fetch(pokemon.species.url)
                .then(res => res.json())
                .then(json => {
                    fetch(json.evolution_chain.url)
                        .then(res => res.json())
                            .then(json => {
                                const evolutionsTemp = [];
                                evolutionsTemp.push(json.chain.species.name);
                                function addNextEvolutionRecursively(evolves_to){
                                    evolves_to?.map(item => {
                                        evolutionsTemp.push(item.species.name);
                                        if(item.evolves_to.length > 0)
                                            addNextEvolutionRecursively(item.evolves_to);    
                                    })
                                };
                                addNextEvolutionRecursively(json.chain.evolves_to);
                                setEvolutions(evolutionsTemp);
                            })
                })
            

        },[])
    )

    if(isLoading)
        return <ActivityIndicator size="large" />

    return(
        <ScrollView>                  
            <View style={{alignItems:"center"}}>

                {/* Bild */}
                <Image style={styles.image}
                    resizeMode="contain"
                    source={{ uri: pokemon.sprites.other["official-artwork"].front_default}} 
                />

                {/* Banner */}
                <View style={styles.titleContainer}>
                    <Text style={{fontSize:24, fontWeight:"normal", color:"white"}}>#{pokemon.id} - </Text>
                    <Text style={{fontSize:36, fontWeight:"bold", color:"white"}}>{pokemon.name}</Text>
                </View>
                

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <Text style={{padding:5, borderBottomWidth:2, borderColor:"#1D3557", textAlign:"center", fontSize:24, fontWeight:"bold"}}>Base-stats</Text>

                    {pokemon.stats.map((item) => {
                        return(
                            <View key={item.stat.name} style={styles.statRow}>
                                <Text style={{fontSize:20}}>{item.stat.name}: </Text>
                                <Text style={{fontSize:20}}>{item.base_stat}</Text>
                            </View>
                        )
                    })}
                </View>

                <FlatList
                    data={evolutions}
                    keyExtractor={item => item}
                    renderItem={item =>
                        <Text>{item.item}</Text>
                }
                />
            </View>     
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer:{
        flexDirection:"row", 
        alignSelf:"stretch", 
        justifyContent:"center", 
        alignItems:"center", 
        marginVertical:0, 
        backgroundColor:"#E63946",
        borderColor:"#1D3557",
        borderBottomWidth:3,
        borderTopWidth:3,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    image: {
        alignSelf:"center",
        width: "85%",
        maxWidth:600,
        maxHeight:"50%",
        aspectRatio:1,
    },
    statsContainer:{
        marginVertical:15,
        width:"85%",
        maxWidth: 600,
        backgroundColor:"#A8DADC",
        borderColor:"#1D3557",
        borderWidth:2,
        borderRadius:15,
    },
    statRow:{
        flexDirection:"row",
        marginVertical:5,  
        alignItems:"center", 
        justifyContent:"space-between",
        marginHorizontal:40,
    }
  });