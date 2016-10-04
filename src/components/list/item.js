import React, {Component} from 'react'
import {Text, View,Image,StyleSheet,Dimensions} from 'react-native'
import Button from 'react-native-button'
import {fixImageURL, truncate} from '../../methods/'
import {Actions} from 'react-native-router-flux'

const IMAGE_PER_PAGE = 3;
const FONT_SIZE = 22;

const WINDOW_HEIGHT = Dimensions.get('window').height - 52;
const WINDOW_WIDTH = Dimensions.get('window').width - 0;
const IMAGE_HEIGHT = (WINDOW_HEIGHT / IMAGE_PER_PAGE) - 10;
const textMargin = ((WINDOW_HEIGHT / (IMAGE_PER_PAGE*2)) * -1 ) - (FONT_SIZE/2);
const textMargin2 = (WINDOW_HEIGHT / (IMAGE_PER_PAGE*2)) - (FONT_SIZE/2);

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            items:props.item
        };
    }

    componentWillReceiveProps (nextProps) {

        //needed for refresh

        this.setState({
            items:nextProps.item
        });
    }

    navigateToRate(item){

        let name = item.rate_name;

        name = truncate(name, 20);

        Actions.SingleComp({title:name, data:item});
    }

    render() {

        return (
            <View style={{flex:1,flexDirection:'row'}}>
                {
                    this.state.items.map( (item, i) => {
                        if(item) {
                            return (
                                <Button key={i}
                                        style={[inline.button, {flex:0.5}]}
                                        onPress={()=> {
                                            this.navigateToRate(item)
                                        }}>
                                    <View style={inline.imageBackground}>
                                        <View style={inline.shadowInner}>
                                            <View style={inline.shadowOuter}>
                                                <View style={inline.overflow}>
                                                    <Image source={{uri: fixImageURL(item.rate_file)}}
                                                           style={[{height: IMAGE_HEIGHT}, inline.image]}/>
                                                    <View style={inline.fontContainer}>
                                                        <Text numberOfLines={1}
                                                              style={inline.font}>{item.rate_name.toLowerCase()}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Button>
                            )
                        }
                    })
                }
            </View>
        );
    }
}

const inline = StyleSheet.create({
    button:{
        flex:1,
    },
    // shadowInner:{
    //     shadowOffset:{
    //         width: 0,
    //         height: 0,
    //     },
    //     shadowColor: '#000',
    //     shadowOpacity: 0.5,
    //     borderRadius:3,
    // },
    // shadowOuter:{
    //     shadowOffset:{
    //         width: 3,
    //         height: 5,
    //     },
    //     shadowColor: '#000',
    //     shadowOpacity: 0.1,
    //     borderRadius:3,  
    // },
    imageBackground:{
        marginLeft:2.5,
        marginRight:2.5,
        marginBottom:5,
        width:WINDOW_WIDTH/2-7.5,
    },
    overflow:{
        flex:1,
        borderRadius:3,
    },
    image:{
        width:WINDOW_WIDTH/2-7.5,
    },
    fontContainer:{
        alignItems: 'center',
        marginTop: textMargin,
        marginBottom: textMargin2,
        width:WINDOW_WIDTH/2-7.5,
    },
    font:{
        textAlign: 'center',
        fontSize:FONT_SIZE,
        marginBottom:-5,
        fontWeight:'500',
        paddingLeft:30,
        paddingRight:30,
        color:"#fff",
        backgroundColor:"transparent",
        shadowOffset:{
            width: 0,
            height: 0,
        },
        shadowColor: '#000',
        shadowOpacity: 1,
        width:WINDOW_WIDTH/2-7.5,
    },
});