import { DefaultTheme } from '@react-navigation/native'

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#F1FAEE',
        card: '#1D3557',
        text: 'white',    
    },
    headerTitleStyle: {
        fontSize: 20,
        fontWeight:"600",      
        color:"white",
        textTransform:"capitalize",
    }
};