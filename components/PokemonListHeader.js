import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { typeResources } from '../assets/types/typeResources';

export default function PokemonListHeader({type}){
    return(
        <View style={styles.header} >
            <Image style={styles.headerIcon}
                source={typeResources[type]?.image}
            /> 
            <Text style={styles.headerText}>{type}</Text>
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
        width:"30px",
        height:"30px",
    },
    headerText:{
        textTransform:"capitalize",
        marginLeft:"15px",
    }
});