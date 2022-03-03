import React from 'react';
import { Image, StyleSheet, Text,TouchableOpacity } from 'react-native';
import {typeResources} from "../assets/types/typeResources.js";

export default function TypeCard({type, onPress}){
    return(
        <TouchableOpacity onPress={onPress} style={styles.typeButton} >
            <Image 
                style={styles.typeIcon}
                resizeMode="cover"
                source={typeResources[type].image} 
            />
            <Text style={styles.buttonText}>{type}</Text>
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    typeButton:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",      
        width:160,  
        margin:10,
        padding:10,
        borderWidth:1,
        borderColor:"lightgray",
        borderRadius:3,
        backgroundColor:"white",

        shadowColor: "black", 
        elevation: 10,
    },
    typeIcon:{        
        width:50,
        height:50,
        borderRadius: 100,
        borderColor:"black",
        borderWidth:2,
        // Måste ha backgroundColor för att inte ha ett glapp mellan border och bilden
        // backgroundColor: "black",
        overflow:"hidden",
    },
    buttonText:{
        flex:1,
        fontSize:18,
        fontWeight:"600",
        textTransform:"capitalize",
        marginLeft:10,
        textAlign:"center",
        color:"black",
    },    
});