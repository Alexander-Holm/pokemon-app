import React from 'react';
import { Image, StyleSheet, Text,TouchableOpacity } from 'react-native';
import {typeResources} from "../assets/types/typeResources.js";

export default function TypeCard({type, onPress}){
    return(
        <TouchableOpacity onPress={onPress} 
            style={[styles.typeButton, typeResources[type]?.color && {shadowColor:typeResources[type].color}]} 
        >
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
        width:"160px",  
        margin:"10px",
        padding:"10px",
        borderWidth:1,
        borderColor:"lightgray",
        borderRadius:3,
        backgroundColor:"white",

        shadowColor: "gray", //fallback
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,  
        elevation: 6,
    },
    typeIcon:{        
        width:"50px",
        height:"50px",
        borderRadius: 100,
        borderColor:"black",
        borderWidth:2,
        // Måste ha backgroundColor för att inte ha ett glapp mellan border och bilden
        backgroundColor: "black",
        overflow:"hidden",
    },
    buttonText:{
        fontSize:18,
        fontWeight:"600",
        textTransform:"capitalize",
        marginLeft:"10px",
        width:"100%",
        textAlign:"center",
        color:"black"
    },    
});