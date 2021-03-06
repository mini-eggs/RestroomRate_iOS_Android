import React, {Component} from 'react';
import {Text,View,Image,ScrollView,StyleSheet,Dimensions,Linking} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Button from 'react-native-button'
import BackgroundImage from '../../assets/sick_img.png'
import StatusbarHeight from '../shared/statusbarHeight/'
import {AboutText,StepsText,AuthorText} from './info'

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

                            <View style={inline.heroContainer}>
                                <View style={inline.hero}>
                                    <Text style={inline.h1}>about</Text>
                                </View>
                            </View>

                            <View style={inline.contentContainer}>
                                <View style ={inline.content}>
                                    <Text style ={[inline.defaultText]}>{AboutText}</Text>
                                </View>
                            </View>

                            <View style ={{height:10}}/>
                            <View style ={{height:10}}/>

                            <View style={inline.heroContainer}>
                                <View style={inline.hero}>
                                    <Text style={inline.h1}>steps</Text>
                                </View>
                            </View>

                            <View style={inline.contentContainer}>
                                {
                                    StepsText.map((text,i)=>{
                                        return <View key = {i} style ={inline.content}>
                                            <Text style ={[inline.defaultText]}>({i+1}) {text}</Text>
                                        </View>
                                    })
                                }
                            </View>

                            <View style ={{height:10}}/>
                            <View style ={{height:10}}/>

                            <View style={inline.heroContainer}>
                                <View style={inline.hero}>
                                    <Text style={inline.h1}>author</Text>
                                </View>
                            </View>

                            <View style={inline.contentContainer}>
                                <View style ={[inline.content]}>
                                    <Text style ={[inline.defaultText]}>
                                        My name is Evan Jones. I enjoy full-stack web and app development.
                                        You can reach me anytime on
                                        <Text style ={[inline.defaultText, inline.link]}
                                              onPress={() => Linking.openURL('https://twitter.com/minieggs40')}>
                                            &nbsp;Twitter.&nbsp;
                                        </Text>
                                        Tweet at me for support, problems encountered, feedback, or just to talk.
                                        Hope you enjoy the app!
                                    </Text>
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
        flexDirection:'row',
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
});

{/*<View style={{height:StatusbarHeight}} />*/}