import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View, } from 'react-native';
import { useFocusEffect, useLinkProps } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TypeCardSmall from "../components/TypeCardSmall";
import { getTypes } from '../assets/types/typeResources';

export default function DetailsView({navigation, route}){

    const [pokemon] = useState(route.params);
    // Kan inte använda pokemon.types då den kan innehålla typer som inte finns i gen 1
    const [types] = useState(getTypes(route.params))

    return(
        <ScrollView>                  
            <View style={{alignItems:"center"}}>

                {/* Bild */}
                <View style={styles.imageContainer}>
                    <Text style={styles.id} >#{pokemon.id}</Text>
                    <Image style={styles.image}
                        resizeMode="contain"
                        source={{ uri: pokemon.sprites.other["official-artwork"].front_default}} 
                    />
                </View>

                {/* Banner */}
                <View style={styles.titleContainer}>
                    <Text style={{fontSize:36, fontWeight:"bold", color:"white"}}>{pokemon.name}</Text>
                </View>

                <View style={{flexDirection:"row"}}>
                    {types.map(type => (
                        <TypeCardSmall type={type} style={{marginRight:5}} key={type}/>
                    ))}
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
                
            </View>     
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageContainer:{
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
    },
    image: {
        margin: 20,
        width: "85%",
        maxWidth:400,
        maxHeight:"50%",
        aspectRatio:1,
        backgroundColor:"white",
        borderRadius:"50%",
    },
    id:{
        position:"absolute",
        top:0,
        left:0,
        fontSize:20,
    },
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