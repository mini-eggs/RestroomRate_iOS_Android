import React, {Component} from 'react'
import {Text, View,Image,StyleSheet,ListView,RefreshControl} from 'react-native'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import {Actions} from 'react-native-router-flux'

import StatusbarHeight from '../shared/statusbarHeight/'
import ItemComp from './item'
import {getItems} from '../../methods/'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class extends Component {

    constructor(props){

        super(props);

        Actions.toggleLoading();

        this.state = {
            sort:props.title,
            page:-1,
            length:10,
            items:([]),
            isRefreshing:false, //load up
            canLoadMore:false //load down
        };
    }

    componentDidMount(){

        this.setState({
            canLoadMore:true
        });

        this.loadMore();
    }

    refresh(){
        this.setState({
            canLoadMore:false,
            page:0,
        });

        getItems(this.state.sort.toLowerCase(), 0, this.state.length).then( (data) => {

            if(data.length > 0) {

                this.setState({
                    items:(data),
                    ableToLoadMore:true,
                    canLoadMore:true
                });
            }
        });
    }

    loadMore(){

        this.setState({
            canLoadMore:false
        });

        let items = this.state.items;

        getItems(this.state.sort.toLowerCase(), (this.state.page + 1), this.state.length).then( (data) => {

            if(this.state.page == -1) {Actions.toggleLoading();}

            if(data.length > 0) {

                data.map( (item,i) => {
                   items.push(item);
                });

                this.setState({
                    page: (this.state.page + 1),
                    items: (items),
                    canLoadMore:true
                });
            }
        });
    }

    isEven(n) {
        return n % 2 == 0;
    }

    render () {

        let count = 0;

        let addCount = function(){
            count++;
            return <View></View>
        };

        return (
            <View style={inline.background}>
                <View style={{height:StatusbarHeight}}></View>
                <ListView enableEmptySections={true}
                          style={inline.listView}
                          dataSource={ds.cloneWithRows(this.state.items)}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.state.isRefreshing}
                                  onRefresh={() => {this.refresh()}}
                              />
                          }
                          showsVerticalScrollIndicator={false}
                          renderScrollComponent={props => <InfiniteScrollView {...props} />}
                          canLoadMore={this.state.canLoadMore}
                          onLoadMoreAsync={()=>{this.loadMore()}}
                          renderRow={(item,i) => <View>
                              {
                                  item == this.state.items[0] ? <View style={inline.topMargin}></View> : <View></View>
                              }
                              {addCount()}
                              {
                                  !(this.isEven(count)) ? <ItemComp item={[item, this.state.items[count]]} /> : <View></View>
                              }
                          </View>}/>
            </View>
        )
    }
}

const inline = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor:'#fff',
    },
    listView:{
        marginLeft:2.5,
        marginRight:2.5,
    },
    topMargin:{
        marginTop:5,
    },
});