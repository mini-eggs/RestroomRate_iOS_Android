import React, {Component} from 'react'
import {Text,View,Image,TextInput,StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Button from 'react-native-button'

import API from '../../api/'
import styles from './style'

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            name:'',
            desc:'',
            rate:'',
            image:'',
            complete:props.onComplete
        };
    }

    handleCreate () {

        this.componentWillProcessState().then( () => {
            this.componentWillCreateRate();
        }).catch( (err) => {
            Actions.modal.open();
        })
    }

    componentWillCreateRate(){

        Actions.toggleLoading();

        API.create({
            name:this.state.name,
            description:this.state.desc,
            rate:this.state.rate,
            image:this.state.image,
        }).then( () => {

            this.setState({name:'', desc:'', rate:'', image:'',});

            Actions.toggleLoading();
            Actions.ListCompRecent();

        }).catch( (err) => {
            Actions.toggleLoading();
            Actions.modal.open();
        })
    }

    componentWillProcessState(){
        return new Promise((yes,no)=>{
            if(this.state.name.length > 0 && this.state.desc.length > 0) {                      //check strings
                if(parseInt(this.state.rate) == this.state.rate) {                              //check rate
                    if(parseInt(this.state.rate) > 0 && parseInt(this.state.rate) < 6) {        //check rate
                        if(this.state.image.indexOf('https://i.imgur.com/') > -1) {             //check image
                            yes();
                        } else {no();}
                    } else {no();}
                } else {no();}
            } else {no();}
        })
    }

    uploadImage(file){

        let url = 'https://api.imgur.com/3/upload';

        let post = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Client-ID a069290170bbd8a'
            },
            body:JSON.stringify({image:file})
        };

        Actions.toggleLoading();

        fetch(url, post).then( (response) => {
            response.json().then( (data) => {

                let img = data.data.link.replace('http://', 'https://');

                this.setState({image:img});

                Actions.toggleLoading();
            });
        });
    }

    chooseImage(){

        let ImagePicker = require('react-native-image-picker');

        let options = {
            title: null,
            storageOptions: {
                skipBackup: true,
                cameraRoll:true
            },
            maxWidth:800,
            maxHeight:800,
            quality:0.4,
            mediaType:'photo'
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {}
            else if (response.error) {}
            else {
                this.uploadImage(response.data);
            }
        });
    }

    render() {

        return (
            <View>
                <View style={styles.formContainer}>
                    <View style={styles.form}>
                        <View style={styles.formInner}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.formText}>Name</Text>
                                <TextInput ref="nameInput"
                                           returnKeyType="next"
                                           maxLength={28}
                                           keyboardType="default"
                                           onChangeText={ (txt) => {this.setState({name:txt})}}
                                           onSubmitEditing={(event) => {this.refs.rateInput.focus()}}
                                           style={[styles.textInput, {height:50}]}
                                           underlineColorAndroid="transparent"
                                           secureTextEntry = {false}
                                           autoCapitalize="none"/>
                                <View style={styles.divider}/>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.formText}>Rate</Text>
                                <TextInput ref="rateInput"
                                           returnKeyType="next"
                                           maxLength={1}
                                           keyboardType="default"
                                           onChangeText={ (txt) => {this.setState({rate:txt})}}
                                           onSubmitEditing={(event) => {this.refs.descInput.focus()}}
                                           style={[styles.textInput, {height:40}]}
                                           secureTextEntry = {false}
                                           underlineColorAndroid="transparent"
                                           autoCapitalize="none"/>
                                <View style={styles.divider}/>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.formText}>Description</Text>
                                <TextInput ref="descInput"
                                           returnKeyType="done"
                                           keyboardType="default"
                                           onChangeText={ (txt) => {this.setState({desc:txt})}}
                                           onSubmitEditing={(event) => {this.chooseImage()}}
                                           multiline={true}
                                           style={[styles.textInput, {height:100}]}
                                           secureTextEntry = {false}
                                           underlineColorAndroid="transparent"
                                           autoCapitalize="none"/>
                                <View style={styles.divider}/>
                            </View>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:0.5, justifyContent:'flex-start'}}>
                                    <View style={inline.btnShadow}>
                                        <View style={inline.btnView}>
                                            <Button style={inline.btn} onPress={() => {this.chooseImage()}}>IMAGE</Button>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:0.01}}></View>
                                <View style={{flex:0.5, justifyContent:'flex-end'}}>
                                    <View style={inline.btnShadow}>
                                        <View style={inline.btnView}>
                                            <Button style={inline.btn} onPress={() => {this.handleCreate()}}>NEXT</Button>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {
                    this.state.image.length > 0
                        ?
                        <View style={inline.imageContainer}>
                            <View style={inline.imageShadow}>
                                <View style={inline.image}>
                                    <Image style={[{ ...StyleSheet.absoluteFillObject, },inline.imageInner]} source={{uri:this.state.image}} />
                                </View>
                            </View>
                        </View>
                        :
                        <View></View>
                }
                <View style={{height:300,}}></View>
            </View>
        );
    }
}

const inline = StyleSheet.create({
    imageInner:{
        height:300,
    },
    image:{
        backgroundColor:'#fff',
        height:300,
        borderRadius:3,
        overflow:'hidden',
    },
    imageShadow:{
        borderRadius:3,
        shadowOffset:{
            width: 3,
            height: 5,
        },
        shadowColor: '#000',
        shadowOpacity: 0.10,
    },
    imageContainer:{
        paddingLeft:5,
        paddingRight:5,
        margin:5,
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