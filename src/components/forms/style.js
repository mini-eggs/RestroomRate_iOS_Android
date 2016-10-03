import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    actionBarMenuBtn:{
      color:"#fff",
    },
    scrollViewContainer:{
      flex:1,
    },
    backBtnContainer:{
        marginTop:8,
        marginLeft:10
    },
    backBtnBtn:{
    },
    backBtnImage:{
    },
    background:{
        backgroundColor:"#f1f1f1",
    },
    fold:{
        backgroundColor:"#4c6ef5",
        paddingTop:47,
        paddingBottom:75,
        marginBottom:-50,
    },
    foldInner:{
        paddingLeft:40,
    },
    foldText:{
        color:"#fff",
        fontSize:26,
        fontWeight:'500',
    },
    foldIcon:{
        height:20,
        width:20,
        marginTop:5,
    },
    formContainer:{
        // marginTop:-50,
        paddingLeft:5,
        paddingRight:5,
        flex:1,
    },
    form:{
        backgroundColor:'#fff',
        margin:5,
        borderRadius:3,
        shadowOffset:{
            width: 3,
            height: 5,
        },
        shadowColor: '#000',
        shadowOpacity: 0.10,
    },
    formInner:{
        padding:50,
    },
    formText:{
        fontSize:16,
        marginBottom:10,
    },
    textInput:{
        fontSize:16,
        height:16,
        marginBottom:10,
        color:'#007aff',
    },
    inputContainer:{
        marginBottom:35,
    },
    divider:{
        height:1,
        backgroundColor:'#d1d1d1'
    },
    btnContainerLeft:{
        flex:1,
        justifyContent: 'flex-start',
        flexDirection:'row',
    },
    btnContainer:{
        flex:1,
        justifyContent: 'flex-end',
        flexDirection:'row',
    },
    btnShadow:{
        shadowOffset:{
            width: 1,
            height: 3,
        },
        shadowColor: '#000',
        shadowOpacity: 0.3,
    },
    btnView:{
        borderRadius:2,
        overflow:'hidden',
    },
    btn:{
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        fontSize:16,
        backgroundColor:'#4c6ef5',
        color:'#fff',
    },
});
