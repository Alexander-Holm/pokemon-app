import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { typeResources } from '../assets/types/typeResources';
import TypeCardSmall from './TypeCardSmall';
import { LinearGradient } from 'expo-linear-gradient';
import { shadeColor } from '../javascript/shadeColor';
import Svg, { Defs, Polygon, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';


function PokemonCard({pokemon, style}) {
    const navigation = useNavigation();
    let SecondBackgroundElement = () => (null);

    // Kan inte använda pokemon.types då den kan innehålla typer som inte finns i gen 1
    const types = []
    let backgroundGradient;

    let type1 = pokemon.types[0].type.name;
    let type2 = pokemon.types[1]?.type.name;
    if(isTypeValid(type1) == false)
        type1 = pokemon.past_types[0].types[0].type.name;
    types.push(type1);
    let color1 = typeResources[type1].color;    

    switch(isTypeValid(type2)){
        case false: 
            backgroundGradient = [color1, shadeColor(color1, 35)];
            break;

        case true:
            types.push(type2);
            // Lite mer gradient för att slutet täcks av andra färgen
            backgroundGradient = [color1, shadeColor(color1, 45)];
            SecondBackgroundElement = () => createSecondBackground(type2);
    }

    function isTypeValid(type){
        if(typeResources[type] != null)
            return true;
        else return false;
    }

    function createSecondBackground(type){
        const color2 = typeResources[type].color;        
        const backgroundGradient2 = [color2, shadeColor(color2, 45)]; 
        return (
            // Svg måste ha en container för att fungera med storlek i procent
            <View style={styles.secondBackgroundColor}>
                <Svg style={{width:"100%", height:"100%"}} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <Defs>
                        <SvgLinearGradient id={type} x1="1" x2="0" y1="0.5" y2="0.5">
                            <Stop offset="0" stopColor={backgroundGradient2[0]} />
                            <Stop offset="1" stopColor={backgroundGradient2[1]} />
                        </SvgLinearGradient>
                    </Defs>
                    <Polygon points="50,0 100,0 100,100 0,100" fill={`url(#${type})`} />                
                </Svg>
            </View>
        );
    }

    return (        
        <TouchableOpacity onPress={() => navigation.navigate("Details", pokemon)} >
            {/* BackgroundColor 1 */}
            <LinearGradient 
                style={[styles.background, style]}
                colors={backgroundGradient} 
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}  
            >
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
                    <View style={styles.typesContainer}>
                        {types.map(type => (
                            <TypeCardSmall type={type} style={{marginRight:5}} key={type}/>
                        ))}
                    </View>
                </View>

                {/* BackgroundColor 2 */}
                <SecondBackgroundElement />

            </LinearGradient>
        </TouchableOpacity>
    );
}

export default memo(PokemonCard);

const styles = StyleSheet.create({
    background: {
        flexDirection:"row",
        minWidth:250,
        margin:5,
        borderRadius: 5,   
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,  
        elevation: 7,
        overflow:"hidden",

        position:"relative"
    },
    secondBackgroundColor:{
        position:"absolute",
        top:0,
        right:0,
        height: "100%",
        width:"35%",
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
        width:80, 
        height: 80,
        padding:7,
        margin: 10,
        borderRadius: 100, 
        borderWidth:1,
        borderColor:"lightgray",
    },
    infoContainer:{
        zIndex:2,
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