import React, { memo, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {  useNavigation } from '@react-navigation/native';
import { getTypes } from '../assets/types/typeResources';
import TypeCardSmall from './TypeCardSmall';
import { LinearGradient } from 'expo-linear-gradient';
import GradientBackground from './GradientBackground';


function PokemonCard({ pokemon, style }) {
    const navigation = useNavigation();   
    // Kan inte använda pokemon.types då den kan innehålla typer som inte finns i gen 1
    const types = getTypes(pokemon);

    return (        
        <TouchableOpacity onPress={() => navigation.navigate("Details", pokemon)} >
            <GradientBackground types={types} style={[styles.background, style]} >
                {/* Image */}
                <LinearGradient colors={["white", "#ededed"]} style={styles.imageContainer}>
                    <Image 
                        style={{width: "100%", height: "100%"}}
                        source={{ uri: pokemon.sprites.other["official-artwork"].front_default}}
                    />
                </LinearGradient>

                {/* Info */}
                <View style={styles.infoContainer}>
                    <View style={{flexDirection:"row", alignItems:"flex-start"}}>
                        <Text style={styles.text}>{pokemon.name}</Text>                        
                        <Text style={styles.id}>#{pokemon.id}</Text>
                    </View>  
                    {/* Types */}
                    <View style={styles.typesContainer}>
                        {types.map(type => (
                            <TypeCardSmall type={type} style={{marginRight:5}} key={type}/>
                        ))}
                    </View>
                </View>            
            </GradientBackground>
        </TouchableOpacity>
    );
}

export default memo(PokemonCard);

const styles = StyleSheet.create({
    background: {
        flexDirection:"row",
        minWidth:250,
        maxWidth: "100%",
        margin: 7,
        borderRadius: 5,   
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,  
        elevation: 7,
        overflow:"hidden",
    },
    text:{
        fontSize:20,
        color:"white", 
        fontWeight:"bold",
        textTransform:"capitalize",
        textShadowColor:"black",
        textShadowOffset :{height:0, width:0},
        textShadowRadius:5,
        marginTop:10,
        flexGrow:1,
    },
    id:{
        marginTop:5,
        marginRight:5,
        marginLeft:10,
        paddingHorizontal: 5,
        paddingVertical:3,
        fontSize:13,
        fontWeight:"bold",
        color:"#333333",
        backgroundColor:"rgba(255, 255, 255, 0.4)",
        borderRadius:2,        
    },
    imageContainer:{
        alignSelf:"center",
        width: 90, 
        height: 90,
        padding: 5,
        margin: 10,
        borderRadius: 100, 
        borderWidth:1,
        borderColor:"gray",
    },
    infoContainer:{
        flexGrow:1,
        justifyContent:"space-between",
        paddingBottom:10,
        paddingLeft:5,
    },
    typesContainer:{
        flexDirection:"row",
        marginVertical: 3,
        marginRight:5,
    }
});