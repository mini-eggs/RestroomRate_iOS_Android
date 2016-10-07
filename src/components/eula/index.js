import React, {Component} from 'react';
import {Text,View,Image,ScrollView,StyleSheet,Dimensions,Linking} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Button from 'react-native-button'
import BackgroundImage from '../../assets/sick_img.png'
import StatusbarHeight from '../shared/statusbarHeight/'
import EulaText from './info'

const WINDOW_HEIGHT = Dimensions.get('window').height;

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
        };
    }

    render() {

        return (
            <View style={[inline.background, {flex:1}]}>
                <Image source={BackgroundImage} style={inline.backgroundImage} />
                <View style={inline.container}>
                    <View style={{height:StatusbarHeight}}/>
                    <ScrollView keyboardDismissMode="on-drag"
                                showsVerticalScrollIndicator={false}>

                        <View style ={[inline.offset]}>

                            <View style ={{height:10}}/>

                            {
                              EulaText.map( (item, i) => {
                                return <View key={i}>
                                  <View style={inline.heroContainer}>
                                      <View style={inline.hero}>
                                          <Text style={inline.h1}>{item.title}</Text>
                                      </View>
                                  </View>
                                  <View style={inline.contentContainer}>
                                      <View style ={inline.content}>
                                          <Text style ={[inline.defaultText]}>{item.body}</Text>
                                      </View>
                                  </View>
                                  <View style ={{height:10}}/>
                                  <View style ={{height:10}}/>
                                </View>
                              })
                            }


                            <View style={{flex:1, flexDirection:'row', paddingLeft:10, paddingRight:10,}}>
                                <View style={{flex:0.5,marginRight:2.5}}>
                                    <View style={inline.btnShadow}>
                                        <View style={inline.btnView}>
                                            <Button style={inline.btn} onPress={() => {Actions.pop();}}>DISAGREE</Button>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:0.5,marginLeft:2.5}}>
                                    <View style={inline.btnShadow}>
                                        <View style={inline.btnView}>
                                            <Button style={inline.btn} onPress={() => {Actions.FormComp('Register');}}>AGREE</Button>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style ={{height:150}}/>

                        </View>

                    </ScrollView>
                </View>
            </View>
        );
    }
}

const inline = StyleSheet.create({
    backgroundImage:{
        flex: 1,
        resizeMode: 'cover',
    },
    offset:{
        padding:10,
    },
    container:{
        flex:1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    heroContainer:{
    },
    hero:{
        flexDirection:'column',
        flexWrap:'wrap',
    },
    contentContainer:{
        backgroundColor:'rgba(0,0,0,0.4)',
        padding:10,
    },
    content:{
        padding:5,
        paddingLeft:10,
        paddingRight:10,
    },
    defaultText:{
        color:'#fff',
    },
    h1:{
        backgroundColor:'rgba(0,0,0, 0.3)',
        color:'#fff',
        fontSize:26,
        padding:5,
        paddingLeft:20,
        paddingRight:20,
    },
    h2:{
        backgroundColor:'rgba(0,0,0, 0.2)',
        color:'#fff',
        fontSize:22,
        padding:5,
        paddingLeft:20,
        paddingRight:20,
    },
    link:{
        color:'#f39d73',
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
        backgroundColor:'transparent'
    },
    btnView:{
        borderRadius:2,
        overflow:'hidden',
        backgroundColor:'transparent'
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
