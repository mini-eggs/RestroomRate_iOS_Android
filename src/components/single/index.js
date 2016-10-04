import React, {Component} from 'react'
import {Text, View,Image,StyleSheet,ListView,RefreshControl,Dimensions,ScrollView} from 'react-native'
import {fixImageURL, formatDate} from '../../methods'
import Button from 'react-native-button'
import {Actions} from 'react-native-router-flux'

import API from '../../api/'

const WINDOW_HEIGHT = Dimensions.get('window').height;
const IMAGE_HEIGHT = WINDOW_HEIGHT / 2.5;

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            item:props.data
        };
    }

    componentWillReceiveProps(nextProps){

        this.setState({item:nextProps.data});
    }

    goToMap(){

        Actions.MapComp({data:this.state.item, title:this.state.item.rate_name});
    }

    goToPhoto(){

        Actions.PhotoComp({data:this.state.item, title:this.state.item.rate_name});
    }

    goToDelete(item){
        Actions.toggleLoading();
        API.deleteItem({rate_id:item.rate_id}).then( (data) => {
            Actions.toggleLoading();
            Actions.ListCompRecent();
            console.log(data);
        }).catch( (err) => {
            Actions.toggleLoading();
            console.log(err);
        })
    }

    render () {
        return (
            <View style={inline.background}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={inline.background}>
                        <Image style={[{height:IMAGE_HEIGHT}, inline.image]} source={{uri:fixImageURL(this.state.item.rate_file)}} />
                        <View style={inline.center}>
                            <View style={inline.circle}>
                                <Text style={inline.circleText}>{this.state.item.rate_rate}/5</Text>
                            </View>
                        </View>
                        <View style={inline.paddingTop}>
                            <View style={inline.card}>
                                <Text style={{fontSize:28,marginBottom:10,}}>{this.state.item.rate_name}</Text>
                                <Text style={{fontSize:18,marginBottom:10,color:'#898989'}}>{formatDate(this.state.item.rate_time)}</Text>
                                <Text style={{fontSize:18,marginBottom:20,}}>{this.state.item.rate_desc}</Text>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:0.5,marginRight:2.5}}>
                                        <View style={inline.btnShadow}>
                                            <View style={inline.btnView}>
                                                <Button style={inline.btn} onPress={() => {this.goToPhoto()}}>PHOTO</Button>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{flex:0.5,marginLeft:2.5}}>
                                        <View style={inline.btnShadow}>
                                            <View style={inline.btnView}>
                                                <Button style={inline.btn} onPress={() => {this.goToMap()}}>MAP</Button>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {
                                    parseInt(this.state.item.rate_user) == parseInt( (Actions.user) ? Actions.user.users_id : -1 )
                                        ?
                                        <View style={{flex:1, flexDirection:'row'}}>
                                            <View style={{flex:1, justifyContent:'center'}}>
                                                <View style={inline.btnShadow}>
                                                    <View style={inline.btnView}>
                                                        <Button style={inline.btnDelete} onPress={() => {this.goToDelete(this.state.item)}}>DELETE</Button>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View></View>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{height:150}}></View>
                </ScrollView>
            </View>
        )
    }
}

const inline = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'#f1f1f1',
    },
    paddingTop:{
        paddingTop:75,
    },
    card:{
        backgroundColor:"#fff",
        padding:20,
        marginLeft:10,
        marginRight:10,
        borderRadius:1,
        shadowOffset:{
            width: 1,
            height: 3,
        },
        shadowColor: '#000',
        shadowOpacity: 0.3,
    },
    image:{
    },
    center:{
        transform: [{'translate':[0,0,1]}],
        alignItems:'center',
    },
    circle:{
        borderWidth:4,
        marginTop:-50,
        marginBottom:-50,
        borderColor:'#fff',
        borderRadius:50,
        backgroundColor:'#4c6ef5',
        width:100,
        height:100,
        alignItems:'center',
        justifyContent:'center'
    },
    circleText:{
        color:'#fff',
        fontSize:38,
        marginTop:-5,
        fontWeight:'700'
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
    btnDelete:{
        marginTop:2.5,
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        fontSize:16,
        backgroundColor:'#cc0000',
        color:'#fff',
    }
});