import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    navbar:{
        backgroundColor:'#4c6ef5',
        borderBottomColor: 'transparent',
    },
    navbarNaked:{
        backgroundColor:'rgba(0,0,0,0.2)',
        borderBottomColor: 'transparent',
    },
    title:{
        color:'#fff',
        fontWeight:"600"
    },
    option:{
        color:'#fff',
        fontWeight:"600",
    },
    optionLeft:{
        color:'#fff',
        fontWeight:"600",
        fontSize:42,
        marginTop:-17,
    },
    optionRight:{
        color:'#fff',
        fontWeight:"600",
        fontSize:30,
        marginTop:-12,
    },
    back:{
        tintColor:'#fff',
    },
    leftIcon:{
        height: 32,
        resizeMode: 'contain',
        marginLeft:-24,
        marginTop:2,
    },
    rightIcon:{
        height: 28,
        resizeMode: 'contain',
        marginRight:-24,
    },
});