import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, Polygon, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';
import { shadeColor } from "../javascript/shadeColor";
import { typeResources } from '../assets/types/typeResources';

// Används för att SvgLinearGradient behöver ett unikt id för varje instans av den här komponenten
let timesCreated = 0; // static

export default function GradientBackground({ 
    children, // automatisk
    types, 
    style, 
    contentContainerStyle 
}){
    
    if(types == null)
        return;    

    useEffect(() => {
        timesCreated++;
    },[])        

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
            <View style={styles.secondBackgroundElement}>
                <Svg style={{width:"100%", height:"100%"}} viewBox="0 0 100 100" preserveAspectRatio="none">
                    <Defs>
                        <SvgLinearGradient id={type + timesCreated} x1="1" x2="0" y1="0.5" y2="0.5">
                            <Stop offset="0" stopColor={gradient[0]} />
                            <Stop offset="1" stopColor={gradient[1]} />
                        </SvgLinearGradient>
                    </Defs>
                    <Polygon points="50,0 100,0 100,100 0,100" fill={`url(#${type + timesCreated})`} />                
                </Svg>
            </View>
        );
    }
    
    return(
        <LinearGradient 
            style={[styles.background, style]}
            colors={primaryGradient} 
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}  
        >
            {/* Negativ zIndex fungerar inte på android så children måste ha en container
                för att ha högre zIndex än andra bakgrundsfärgen  */}
            <View style={[styles.contentContainer, contentContainerStyle]}> 
                {children} 
            </View>
            <SecondBackgroundElement />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {        
        overflow:"hidden",
        position:"relative",
        minHeight:30
    },
    contentContainer:{
        zIndex:2,
        flexDirection:"row",
        // height:"100%",
        // width:"100%",
        flexGrow:1,
    },
    secondBackgroundElement:{
        position:"absolute",
        top:0,
        right:0,
        height: "100%",
        width:"35%",
    },
});