import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    navbar:{
        backgroundColor:'#4c6ef5',
        borderBottomColor: 'transparent',
        borderBottomWidth: 65
    },
    navbarNaked:{
        backgroundColor:'rgba(0,0,0,0.2)',
        borderBottomColor: 'transparent',
        borderBottomWidth: 65
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
        fontSize:35,
        marginTop:-5,
    },
    optionRight:{
        color:'#fff',
        fontWeight:"600",
        fontSize:26,
        marginTop:-2,
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
    reportIcon:{
          height: 28,
          resizeMode: 'contain',
          marginRight:0,
    },
});
