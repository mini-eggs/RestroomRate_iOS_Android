import React, {Component} from 'react';
import {Text,View,Image,ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux'
import styles from './style'
import Button from 'react-native-button'
import CloseIcon from '../../assets/close.png'

import CreateComp from './create'
import LoginComp from './login'
import RegisterComp from './register'
import ModalComp from '../modal/'

import {capitalizeFirstLetter} from '../../methods/'

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            title:capitalizeFirstLetter(props.data)
        };
    }

    render() {

        return (
            <View style={[styles.background, {flex:1}]}>
                <ScrollView style={styles.scrollViewContainer}
                            showsVerticalScrollIndicator={false}>
                    <View style={styles.fold}>
                        <View style={styles.foldInner}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex:0.8}}>
                                    <Text style={styles.foldText}>{this.state.title}</Text>
                                </View>
                                <View style={{flex:0.2}}>
                                    <Button onPress={ () => {Actions.pop()}}>
                                        <Image style={styles.foldIcon} source={CloseIcon}/>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        this.state.title == 'Create'
                            ?
                            <CreateComp onComplete={()=>{this.completeCreate()}}/>
                            :
                            this.state.title == 'Login'
                                ?
                                <LoginComp/>
                                :
                                this.state.title == 'Register'
                                    ?
                                    <RegisterComp/>
                                    :
                                    <Text>No data</Text>
                    }
                </ScrollView>
                <ModalComp message="info not complete"/>
            </View>
        );
    }
}
