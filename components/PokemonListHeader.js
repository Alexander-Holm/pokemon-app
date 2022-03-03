import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { typeResources } from '../assets/types/typeResources';

export default function PokemonListHeader({type}){
    const theme = useTheme();
    return(
        <View style={styles.header} >
            <Image style={styles.headerIcon} source={typeResources[type]?.image} /> 
            <Text style={[styles.headerText, theme.headerTitleStyle]}>{type}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
    },
    headerIcon:{
        width:30,
        height:30,
    },
    headerText:{
        textTransform:"capitalize",
        marginLeft:15,
    }
});