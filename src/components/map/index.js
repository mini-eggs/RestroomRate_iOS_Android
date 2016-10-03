import React, {Component} from 'react'
import {Text,View,Image,StyleSheet} from 'react-native'
import MapView from 'react-native-maps';

import StatusbarHeight from '../shared/statusbarHeight/'

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            item:props.data,
            region:{
                latitude:parseFloat(props.data.rate_lat),
                longitude:parseFloat(props.data.rate_long),
                latitudeDelta:1,
                longitudeDelta:1
            }
        };
    }

    render() {
        return (
            <View style={[inline.background, {flex:1}]}>
                <View style={{height:StatusbarHeight}}/>
                <MapView style={inline.map} initialRegion={this.state.region}>
                    <MapView.Marker
                        coordinate={this.state.region}
                        title={this.state.item.rate_name}
                        description={this.state.item.rate_desc}
                    />
                </MapView>
            </View>
        );
    }
}


const inline = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    backBtnContainer:{
        marginTop:8,
        marginLeft:10
    },
    backBtnBtn:{
    },
    backBtnImage:{
    },
});
