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
            username:'',
            password:''
        };
    }

    handleLogin () {

        if(this.state.username.length > 0 && this.state.password.length > 0) {

            Actions.toggleLoading();

            let userInput = {
                username: this.state.username,
                password: this.state.password
            };

            API.login(userInput).then( (user) => {

                this.setState({
                    username:'',
                    password:''
                });


                Actions.toggleLoading();
                Actions.changeUser(user);
                Actions.ListCompRecent();

            }).catch( (err) => {
                Actions.toggleLoading();
                Actions.modal.open();
            });
        } else {
            Actions.modal.open();
        }
    }


    render() {

        return (
            <View>
                <View style={styles.formContainer}>
                    <View style={styles.form}>
                        <View style={styles.formInner}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.formText}>Username</Text>
                                <TextInput maxLength={14}
                                           ref="username"
                                           keyboardType="default"
                                           returnKeyType="next"
                                           onChangeText={ (txt) => {this.setState({username:txt})}}
                                           onSubmitEditing={(event) => {this.refs.password.focus()}}
                                           style={[styles.textInput, {height:50}]}
                                           underlineColorAndroid="transparent"
                                           secureTextEntry = {false}
                                           autoCapitalize="none"/>
                                <View style={styles.divider}/>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.formText}>Password</Text>
                                <TextInput maxLength={14}
                                           ref="password"
                                           keyboardType="default"
                                           returnKeyType="done"
                                           onChangeText={ (txt) => {this.setState({password:txt})}}
                                           onSubmitEditing={(event) => {this.handleLogin()}}
                                           style={[styles.textInput, {height:50}]}
                                           underlineColorAndroid="transparent"
                                           secureTextEntry = {true}
                                           autoCapitalize="none"/>
                                <View style={styles.divider}/>
                            </View>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:0.5, justifyContent:'flex-start'}}>
                                </View>
                                <View style={{flex:0.01}}></View>
                                <View style={{flex:0.5, justifyContent:'flex-end'}}>
                                    <View style={inline.btnShadow}>
                                        <View style={inline.btnView}>
                                            <Button style={inline.btn} onPress={() => {this.handleLogin()}}>next</Button>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height:300,}}></View>
            </View>
        );
    }
}

const inline = StyleSheet.create({
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