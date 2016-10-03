import React, {Component} from 'react';
import {Text,View,Image,StyleSheet} from 'react-native';

import StatusbarHeight from '../shared/statusbarHeight/'

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            item:props.data
        };
    }

    render() {
        return (
            <View style={inline.background}>
                <View style={{height:StatusbarHeight}}/>
                <Image style={inline.image} source={{uri:this.state.item.rate_file}} />
            </View>
        );
    }
}

const inline = StyleSheet.create({
    background:{
        flex:1,
    },
    image:{
        ...StyleSheet.absoluteFillObject,
    },
});