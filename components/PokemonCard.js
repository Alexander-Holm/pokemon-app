import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { typeResources } from '../assets/types/typeResources';
import TypeCardSmall from './TypeCardSmall';
import { LinearGradient } from 'expo-linear-gradient';
import { shadeColor } from '../javascript/shadeColor';
import Svg, { Defs, Polygon, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';


function PokemonCard({pokemon}) {
    const navigation = useNavigation();
    let SecondBackgroundColor = () => (null);
    
    const backgroundGradient1 = [typeResources[pokemon.types[0].type.name].color];
    const secondType = pokemon.types[1]?.type.name;
    const backgroundGradient2 = [typeResources[secondType]?.color];
    if(backgroundGradient2[0] != null) { 
        backgroundGradient1.push(shadeColor(backgroundGradient1[0], 35)); // Lite mer gradient för att slutet täcks av andra färgen
        backgroundGradient2.push(shadeColor(backgroundGradient2[0], 35));
        SecondBackgroundColor = () => (
            <View style={styles.secondBackgroundColor}>
                {/* Svg måste ha en container för att fungera med storlek i procent */}
                <Svg style={{width:"100%", height:"100%"}} viewBox="0 0 100 100" preserveAspectRatio='none'>
                    <Defs>
                        <SvgLinearGradient id={secondType} x1="1" x2="0" y1="0.5" y2="0.5">
                            <Stop offset="0" stopColor={backgroundGradient2[0]} />
                            <Stop offset="1" stopColor={backgroundGradient2[1]} />
                        </SvgLinearGradient>
                    </Defs>
                    <Polygon points="50,0 100,0 100,100 0,100" fill={`url(#${secondType})`} />                
                </Svg>
            </View>
        );
    }
    else{
        backgroundGradient1.push(shadeColor(backgroundGradient1[0], 25)); // Lite mindre gradient med bara en färg
    }

    return (
        <LinearGradient 
            style={styles.background}
            colors={backgroundGradient1} 
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
        >
            <TouchableOpacity onPress={() => navigation.navigate("Details", pokemon)} style={styles.container}>
                <LinearGradient colors={["white", "#ededed"]} style={styles.imageContainer}>
                    <Image 
                        style={{width: "100%", height: "100%"}}
                        source={{ uri: pokemon.sprites.other["official-artwork"].front_default}}
                    />
                </LinearGradient>
                <View style={styles.centerContainer}>                    
                    <Text style={styles.id}>#{pokemon.id}</Text>
                    <View style={styles.infoContainer}>
                            <Text style={styles.text}>{pokemon.name}</Text>
                        <View style={styles.typesContainer}>
                            {pokemon.types.map(item => (
                                <TypeCardSmall type={item.type.name} style={{marginRight:"5px"}} key={item.type.name}/>
                            ))}
                        </View>
                    </View>
                </View>

                {/* position absolute */}
                <SecondBackgroundColor />

            </TouchableOpacity>
        </LinearGradient>
    );
}

export default memo(PokemonCard);

const styles = StyleSheet.create({
    background: {
        minWidth:200,
        margin:5,
        borderRadius: 5,   
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,  
        elevation: 7,
        overflow:"hidden",
    },
    secondBackgroundColor:{
        position:"absolute",
        top:0,
        right:0,
        height: "100%",
        width:"35%",
    },
    container:{
        display:"flex",
        flexDirection:"row",
    },
    text:{
        fontSize:20,
        color:"white", 
        fontWeight:"bold",
        textTransform:"capitalize",
        textShadowColor:"black",
        textShadowOffset :{height:0, width:0},
        textShadowRadius:5,
    },
    id:{
        marginLeft:"auto",
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
    centerContainer:{
        zIndex:2,
        display:"flex",   
        flexGrow:1,
    },
    infoContainer:{
        display:"flex",
        flexGrow:1,
        justifyContent:"space-between",
        paddingBottom:10,
        paddingRight:10,
        paddingLeft:5,
        marginTop:-10,
    },
    typesContainer:{
        marginVertical: 3,
        display:"flex",
        flexDirection:"row",
    }
});