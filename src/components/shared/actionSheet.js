import React, {Component} from 'react';
import {View,Text,Image,StyleSheet,Animated} from 'react-native'
import {Actions} from 'react-native-router-flux'
import ActionSheet from 'react-native-actionsheet'

import {capitalizeFirstLetter} from '../../methods/'

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            forms:['Login','Register','Cancel'],
            formsAlt:['Logout','Cancel'],
            options:['Submit', 'Nearby','Recent','Yours','Switch to Map', 'Cancel']
        };
    }

    componentWillReceiveProps(nextProps){

        this.setState({
            forms:['Login','Register','Cancel'],
            formsAlt:['Logout','Cancel'],
            options:['Submit', 'Nearby','Recent','Yours', 'Cancel']
        });
    }

    userAction (index) {

        switch(index){
            case 0:
                Actions.FormComp('login');
                break;
            case 1:
                Actions.FormComp('Register');
                break;
            case 2:
                break;
        }
    }

    userActionAlt (index) {

        switch(index){
            case 0:
                Actions.logoutUser();
                Actions.ListCompRecent();
                break;
            case 1:
                break;
        }
    }

    userOptions (index) {

        switch(index){
            case 0:
                Actions.FormComp('create');
                break;
            case 1:
                Actions.ListCompNearby();
                break;
            case 2:
                Actions.ListCompRecent();
                break;
            case 3:
                Actions.ListCompYours();
                break;
            case 4:
                //cancel
                break;
        }
    }

    render() {

        return(
            <View>
                <ActionSheet
                    ref={(o) => Actions.ActionSheet.homepageUserLoggedOut = o}
                    options={this.state.forms}
                    cancelButtonIndex={2}
                    onPress={(index)=>{this.userAction(index)}}
                />
                <ActionSheet
                    ref={(o) => Actions.ActionSheet.homepageUserLoggedIn = o}
                    options={this.state.formsAlt}
                    cancelButtonIndex={1}
                    onPress={(index)=>{this.userActionAlt(index)}}
                />
                <ActionSheet
                    ref={(o) => Actions.ActionSheet.options = o}
                    options={this.state.options}
                    cancelButtonIndex={4}
                    onPress={(index)=>{this.userOptions(index)}}
                />
            </View>
        );
    }
}