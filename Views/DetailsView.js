import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TypeCardSmall from "../components/TypeCardSmall";
import { getTypes } from '../assets/types/typeResources';
import GradientBackground from '../components/GradientBackground';
import { theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function DetailsView({route}){

    const [pokemon] = useState(route.params);
    // Kan inte använda pokemon.types då den kan innehålla typer som inte finns i gen 1
    const [types] = useState(getTypes(route.params))

    return(             
        <ScrollView >

            {/* Id */}
            <Text style={styles.id}>#{pokemon.id}</Text>


            {/* Bild */}
            {/* <Image 
                style={styles.image}
                resizeMode="cover"
                source={{ uri: pokemon.sprites.other["official-artwork"].front_default}} 
            /> */}

            <LinearGradient colors={["white", "white"]} style={styles.imageContainer}>
                <Image 
                    style={{width: "100%", height: "100%"}}
                    source={{ uri: pokemon.sprites.other["official-artwork"].front_default}}
                />
            </LinearGradient>

            {/* Banner */}
            <GradientBackground types={types} contentContainerStyle={styles.banner}>
                {/* Namn */}
                <Text style={styles.name}>{pokemon.name}</Text>
                {/* Typer */}
                <View style={{flexDirection:"row"}}>
                    {types.map(type => (
                        <TypeCardSmall type={type} style={{margin:10}} key={type}/>
                    ))}
                </View>
            </GradientBackground>            

            {/* Stats */}
            <View style={styles.statsContainer}>
                <Text style={{padding:5, textAlign:"center", fontSize:24, fontWeight:"bold"}}>Base-stats</Text>
                {pokemon.stats.map((item) => {
                    return(
                        <View key={item.stat.name} style={styles.statRow}>
                            <Text style={{fontSize:20, fontWeight:"600", textTransform:"capitalize"}}>{item.stat.name}: </Text>
                            <Text style={{fontSize:18}}>{item.base_stat}</Text>
                        </View>
                    )
                })}
            </View>

        </ScrollView>     
    )
}

const styles = StyleSheet.create({ 
    id:{
        zIndex: 2,
        position:"absolute",
        top:0,
        left:0,
        margin: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: "white",
        fontSize: 18,
        backgroundColor:"gray",
        elevation: 1,        
    },
    imageContainer: {
        alignSelf:"center",
        margin: 15,
        padding:15,
        width: 300,
        maxWidth: "100%",
        aspectRatio: 1,
        backgroundColor:"white",
        borderColor: theme?.colors.card || "black",
        borderRadius: 252,
        borderWidth: 3,
    },
    banner:{
        alignItems:"center",
        flexDirection:"column",      
        borderColor: theme?.colors.card || "black",
        borderTopWidth: 3,
        borderBottomWidth: 3,
    },
    name:{
        fontSize: 28,
        color:"white",
        fontWeight:"bold",
        textTransform:"capitalize",
        textShadowColor:"black",
        textShadowOffset: {height:0, width:0},
        textShadowRadius:5,
    },

    statsContainer:{
        alignSelf:"center",
        alignItems:"center",
        marginVertical:15,
        marginHorizontal:5,        
    },
    statRow:{
        flexDirection:"row",
        marginVertical:5,  
        alignItems:"center", 
        justifyContent:"space-between",
        width:250,
        maxWidth:"100%",
    }
  });