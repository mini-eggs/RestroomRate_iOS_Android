import React, { Component } from 'react'
import {StatusBar,View,StyleSheet,Navigator} from 'react-native'
import {Scene, Router, Actions} from 'react-native-router-flux'
import Spinner from 'react-native-loading-spinner-overlay'
import ActionSheet from 'react-native-actionsheet'

import ListComp from './components/list/'
import SingleComp from './components/single'
import FormComp from './components/forms/'
import MapComp from './components/map/'
import ActionSheetComp from './components/shared/actionSheet'
import PhotoComp from './components/photo/'
import AboutComp from './components/about/'
import EulaComp from './components/eula/'

import inline from './style'
import AccountIcon from './assets/ic_account_circle_white_3x.png'
import MenuIcon from './assets/ic_menu_white_3x.png'
import ReportIcon from './assets/ic_feedback_white_24dp/web/ic_feedback_white_24dp_1x.png'
import API from './api/'

export default class restrate extends Component {

    constructor(props){

        super(props);

        this.componentWillRenderActions();

        this.componentWillRenderStatusbar();

        this.state = {
            user:null,
            loading:false,
            sort:'recent'
        };
    }

    componentWillRenderStatusbar(){

        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor('#4c6ef5');
    }

    componentWillRenderActions(){

        Actions['currentContent'] = null;

        Actions['modal'] = null;

        Actions['location'] = null;

        Actions['toggleLoading'] = () => {
            this.setState({loading:!(this.state.loading)})
        };

        Actions['changeUser'] = (usr) => {
            Actions.user = usr;
            this.setState({user:usr})
        };

        Actions['ActionSheet'] = {
            homepageUserLoggedIn:null,
            homepageUserLoggedOut:null,
            options:null,
            report:null
        };

        Actions['logoutUser'] = () => {
            Actions.toggleLoading();
            API.logout({username:this.state.user.users_username}).then( () => {
                Actions.toggleLoading();
                Actions.changeUser(null);
            });
        };

    }

    componentDidMount(){

        API.autoLogin().then( (usr) => {

            Actions.changeUser(usr);
        }).catch((err)=>{});
    }

    handleMenuClick(){

        if(this.state.user) {
            Actions.ActionSheet.homepageUserLoggedIn.show();
        }
        else {
            Actions.ActionSheet.homepageUserLoggedOut.show();
        }
    }

    handleMapClick(){

        Actions.ActionSheet.options.show();
    }

    handleReportClick(){

        Actions.ActionSheet.report.show();
    }

    render() {

        return (
            <View style={{flex:1}}>
                <Spinner visible={this.state.loading} />
                <ActionSheetComp/>
                <Router>
                    <Scene key="root">
                        <Scene key="ListCompRecent"                                 //LIST COMPONENT
                               title="Recent"
                               type="reset"
                               component={ListComp}
                               onRight={() => this.handleMenuClick()}
                               onLeft={() => this.handleMapClick()}
                               titleStyle={inline.title}
                               navigationBarStyle={inline.navbar}
                               leftButtonIconStyle={inline.leftIcon}
                               rightButtonIconStyle={inline.rightIcon}
                               leftButtonImage={MenuIcon}
                               rightButtonImage={AccountIcon}
                               initial/>
                        <Scene key="ListCompNearby"                                 //LIST COMPONENT
                               title="Nearby"
                               type="reset"
                               component={ListComp}
                               onRight={() => this.handleMenuClick()}
                               onLeft={() => this.handleMapClick()}
                               titleStyle={inline.title}
                               navigationBarStyle={inline.navbar}
                               leftButtonIconStyle={inline.leftIcon}
                               rightButtonIconStyle={inline.rightIcon}
                               leftButtonImage={MenuIcon}
                               rightButtonImage={AccountIcon}/>
                        <Scene key="ListCompYours"                                  //LIST COMPONENT
                               title="Yours"
                               type="reset"
                               component={ListComp}
                               onRight={() => this.handleMenuClick()}
                               onLeft={() => this.handleMapClick()}
                               titleStyle={inline.title}
                               navigationBarStyle={inline.navbar}
                               leftButtonIconStyle={inline.leftIcon}
                               rightButtonIconStyle={inline.rightIcon}
                               leftButtonImage={MenuIcon}
                               rightButtonImage={AccountIcon}/>
                        <Scene key="SingleComp"                                     //SINGLE COMPONENT
                               navigationBarStyle={inline.navbar}
                               leftButtonIconStyle={inline.back}
                               titleStyle={inline.title}
                               rightButtonIconStyle={inline.reportIcon}
                               rightButtonImage={ReportIcon}
                               onRight={() => this.handleReportClick()}
                               component={SingleComp}/>
                        <Scene titleStyle={inline.title}                            //MAP COMPONENT
                               key="MapComp"
                               hideNavBar={false}
                               navigationBarStyle={inline.navbarNaked}
                               component={MapComp}
                               leftButtonIconStyle={inline.back}/>
                        <Scene titleStyle={inline.title}                            //PHOTO COMPONENT
                               key="PhotoComp"
                               hideNavBar={false}
                               navigationBarStyle={inline.navbarNaked}
                               component={PhotoComp}
                               leftButtonIconStyle={inline.back}/>
                        <Scene key="FormComp"                                       //FORM COMPONENT
                               hideNavBar={true}
                               component={FormComp}/>
                        <Scene titleStyle={inline.title}                            //ABOUT COMPONENT
                               key="AboutComp"
                               title="About"
                               hideNavBar={false}
                               navigationBarStyle={inline.navbar}
                               component={AboutComp}
                               leftButtonIconStyle={inline.back}/>
                        <Scene titleStyle={inline.title}                            //EULA COMPONENT
                               key="EulaComp"
                               title="EULA"
                               hideNavBar={false}
                               navigationBarStyle={inline.navbar}
                               component={EulaComp}
                               leftButtonIconStyle={inline.back}/>
                    </Scene>
                </Router>
            </View>
        );
    }
}
