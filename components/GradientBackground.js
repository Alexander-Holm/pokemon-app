import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, Polygon, Stop, LinearGradient as SvgLinearGradient } from 'react-native-svg';
import { shadeColor } from "../javascript/shadeColor";
import { typeResources } from '../assets/types/typeResources';

export default function GradientBackground({ types, children, style }){
    if(types == null)
        return;

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

    return(
        <LinearGradient 
            style={[styles.background, style]}
            colors={primaryGradient} 
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}  
        >
            {children}    
            <SecondBackgroundElement />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
        flexDirection:"row",
        overflow:"hidden",
    },
    secondBackgroundColor:{
        position:"absolute",
        top:0,
        right:0,
        height: "100%",
        width:"35%",
    },
});