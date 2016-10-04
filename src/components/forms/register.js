import React, {Component} from 'react'
import {Text,View,Image,TextInput,ScrollView,StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Button from 'react-native-button'

import styles from './style'
import API from '../../api/'

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            username:'',
            email:'',
            password:'',
            complete:((user)=>{props.onComplete(user)})
        };
    }

    handleRegister () {

        if(this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0) {

            let userInput = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            };

            Actions.toggleLoading();

            API.register(userInput).then( (user) => {

                this.setState({
                    username:'',
                    password:''
                });

                Actions.toggleLoading();
                Actions.changeUser(user);
                Actions.ListCompRecent();

            }).catch( (err) => {
                Actions.toggleLoading();
                Actions.changeModalMessage('Credentials are in use already.');
                Actions.modal.open();
            })
        } else {
            Actions.changeModalMessage('Please make sure a username, email, and password are set.');
            Actions.modal.open();
        }
    }

    render() {

        return (
            <View>
                <View style={styles.formContainer}>
                    <ScrollView style={styles.scrollViewContainer}>
                        <View style={styles.form}>
                            <View style={styles.formInner}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.formText}>Username</Text>
                                    <TextInput maxLength={14}
                                               keyboardType="default"
                                               ref="username"
                                               returnKeyType="next"
                                               onChangeText={ (txt) => {this.setState({username:txt}); }}
                                               onSubmitEditing={(event) => {this.refs.email.focus()}}
                                               style={[styles.textInput, {height:50}]}
                                               underlineColorAndroid="transparent"
                                               secureTextEntry = {false}
                                               autoCapitalize="none"/>
                                    <View style={styles.divider}/>
                                </View>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.formText}>Email</Text>
                                    <TextInput keyboardType="email-address"
                                               ref="email"
                                               returnKeyType="next"
                                               onChangeText={ (txt) => {this.setState({email:txt}); }}
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
                                               keyboardType="default"
                                               ref="password"
                                               returnKeyType="done"
                                               onChangeText={ (txt) => {this.setState({password:txt}); }}
                                               onSubmitEditing={(event) => {this.handleRegister()}}
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
                                                <Button style={inline.btn} onPress={() => {this.handleRegister()}}>next</Button>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
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