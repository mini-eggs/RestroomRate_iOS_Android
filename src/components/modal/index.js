import React, {Component} from 'react'
import {Text,View,Image,StyleSheet,Dimensions} from 'react-native'
import Modal from 'react-native-modalbox'
import {Actions} from 'react-native-router-flux'
import Button from 'react-native-button'

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            message:props.message
        };
    }

    render() {
        return (
            <Modal position={"center"}
                   ref={ (o) => Actions.modal = o}
                   style={[inline.modalGeneral, inline.modalSpecific]}
                   isDisabled={false}>
                <View style={{flex:1}}>
                    <View style={{flex:1, textAlign:'center', justifyContent:'center'}}>
                        <Text style={inline.modalText}>{this.state.message}</Text>
                        <View style={{height:20,}}></View>
                        <View style={inline.btnShadow}>
                            <View style={inline.btnView}>
                                <Button style={inline.btn} onPress={() => {Actions.modal.close()}}>dismiss</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

const inline = StyleSheet.create({
    modalGeneral: {
        backgroundColor:"#fff",
        borderRadius:3,
        justifyContent: 'center',
        alignItems: 'center',
        padding:15,
    },
    modalSpecific: {
        height: WINDOW_HEIGHT/3,
        width: WINDOW_WIDTH-100,
    },
    modalText:{
        fontSize:22,
        textAlign:'center',
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
