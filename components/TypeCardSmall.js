import { disableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from 'react-native';
import { typeResources } from '../assets/types/typeResources';

export default function TypeCardSmall({type, style}){

    return(
        <View style={[styles.container, style]}>
            <Image source={typeResources[type]?.image} style={styles.icon} />
            <Text style={styles.text}>{type}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {        
        minWidth:70,
        backgroundColor: "white",
        borderColor:"lightgray",
        borderWidth:1,
        borderRadius:2,
        padding: 5,
        display:"flex",
        flexDirection:"row"
    },
    icon:{
        width: 20,
        height: 20,        
    },
    text:{
        fontWeight:"bold",
        textAlign:"center",
        textTransform:"capitalize",
        marginLeft:3,
        flex:1,
    }
});