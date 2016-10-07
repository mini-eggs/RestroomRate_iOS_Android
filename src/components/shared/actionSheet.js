import React, {Component} from 'react';
import {View,Text,Image,StyleSheet,Animated} from 'react-native'
import {Actions} from 'react-native-router-flux'
import ActionSheet from 'react-native-actionsheet'

import API from '../../api/'
import {capitalizeFirstLetter} from '../../methods/'

export default class extends Component {

    constructor(props){

        super(props);

        this.state = {
            forms:['Login','Register','About','Cancel'],
            formsAlt:['Logout','About','Cancel'],
            options:['Submit', 'Nearby','Recent','Yours', 'Cancel'],
            report:['Report','Hide','Block','Cancel']
        };
    }

    componentWillReceiveProps(nextProps){

        this.setState({
            forms:['Login','Register','About','Cancel'],
            formsAlt:['Logout','About','Cancel'],
            options:['Submit', 'Nearby','Recent','Yours', 'Cancel'],
            report:['Report Rate','Hide Rate','Block User','Cancel']
        });
    }

    userAction (index) {

        switch(index){
            case 0:
                Actions.FormComp('login');
                break;
            case 1:
                Actions.EulaComp();
                break;
            case 2:
                Actions.AboutComp();
                break;
            case 3:
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
                Actions.AboutComp();
                break;
            case 2:
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

    userReport(index){

      if (index === 3) return

      let msg = '';
      switch(index){
        case 0:
          msg = "Rate has been reported."
          break;
        case 1:
          msg = "Rate will be hidden"
          break;
        case 2:
          msg = "This user has been blocked."
          break;
        default:
          msg = "Moderators will be reviewing this rate."
          break;
      }

      let type = (index == 0) ? 'report' : (index == 1) ? 'hide' : (index == 2) ? 'block' : 'nodata'

      Actions.toggleLoading();

      API.userReportHideBlock(type).then( () => {
        Actions.changeModalMessage(msg);
        Actions.toggleLoading();
        Actions.modal.open();
        Actions.forceListRefresh();
      }).catch( (err) => {
        Actions.toggleLoading();
        console.log(err);
      })
    }

    render() {

        return(
            <View>
                <ActionSheet
                    ref={(o) => Actions.ActionSheet.homepageUserLoggedOut = o}
                    options={this.state.forms}
                    cancelButtonIndex={3}
                    onPress={(index)=>{this.userAction(index)}}
                />
                <ActionSheet
                    ref={(o) => Actions.ActionSheet.homepageUserLoggedIn = o}
                    options={this.state.formsAlt}
                    cancelButtonIndex={2}
                    onPress={(index)=>{this.userActionAlt(index)}}
                />
                <ActionSheet
                    ref={(o) => Actions.ActionSheet.options = o}
                    options={this.state.options}
                    cancelButtonIndex={4}
                    onPress={(index)=>{this.userOptions(index)}}
                />
                <ActionSheet
                    ref={(o) => Actions.ActionSheet.report = o}
                    options={this.state.report}
                    cancelButtonIndex={3}
                    onPress={(index)=>{this.userReport(index)}}
                />
            </View>
        );
    }
}
