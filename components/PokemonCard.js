import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getTypes, typeResources } from '../assets/types/typeResources';
import TypeCardSmall from './TypeCardSmall';
import { LinearGradient } from 'expo-linear-gradient';
import { shadeColor } from '../javascript/shadeColor';
import Svg, { Defs, Polygon, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';


function PokemonCard({pokemon, style}) {
    const navigation = useNavigation();   
    // Kan inte använda pokemon.types då den kan innehålla typer som inte finns i gen 1
    const [types] = useState(getTypes(pokemon))
    let SecondBackgroundElement = () => (null);

    let primaryGradient;
    let primaryColor = typeResources[types[0]].color;   
    switch(types.length){
        case 1: 
            primaryGradient = [primaryColor, shadeColor(primaryColor, 35)];
            break;

        case 2:
            // Lite mer gradient för att slutet täcks av andra färgen
            primaryGradient = [primaryColor, shadeColor(primaryColor, 45)];
            SecondBackgroundElement = () => createSecondBackground(types[1]);
            break;
    }

    function createSecondBackground(type){
        const color = typeResources[type].color;        
        const gradient = [color, shadeColor(color, 45)]; 
        return (
            // Svg måste ha en container för att fungera med storlek i procent
            <View style={styles.secondBackgroundColor}>
                <Svg style={{width:"100%", height:"100%"}} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <Defs>
                        <SvgLinearGradient id={type} x1="1" x2="0" y1="0.5" y2="0.5">
                            <Stop offset="0" stopColor={gradient[0]} />
                            <Stop offset="1" stopColor={gradient[1]} />
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
                colors={primaryGradient} 
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