/**
 * T50 电影排行榜前50
 * 基于豆瓣的电影列表
 */
'use strict';

import React from 'react-native';

import styles from  './app/Styles/Main';
import icons from   './app/Assets/Icons';
import MovieList from './app/Components/MovieList';
import USBox from     './app/Components/USBox';
import Featured from  './app/Components/Featured';
import Search from    './app/Components/Search';


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TabBarIOS,
  ScrollView,
} = React;

let REQUEST_URL = 'https://api.douban.com/v2/movie/top250?count=20&start=0';

class T50 extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      selectedTab:'featured',
    };
  }

  renderT50(){
    return(
      <TabBarIOS barTintColor = "darkslateblue" tintColor = "white">
        <TabBarIOS.Item
          icon = {{uri: icons.star, scale: 4.6}}
          title = "推荐电影"
          selectedIcon = {{uri: icons.starActive, scale: 4.6}}
          selected = {this.state.selectedTab === 'featured'}
          onPress={() => {
            this.setState({
              selectedTab: 'featured'
            })
          }}>
          <Featured />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon = {{uri: icons.board, scale: 4.6}}
          title = "北美票房"
          selectedIcon = {{uri: icons.boardActive, scale: 4.6}}
          selected = {this.state.selectedTab === 'us_box'}
          onPress={() => {
            this.setState({
              selectedTab: 'us_box'
            })
          }}>
          <USBox />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          icon = {{uri: icons.search, scale: 4.6}}
          title = "搜索"
          selected = {this.state.selectedTab === 'search'}
          onPress={()=>{
            this.setState({
              selectedTab: 'search'
            })
          }}>
          <Search />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }

  render(){
   return this.renderT50();
  }
}

let sty = StyleSheet.create({
  sItem:{
    borderWidth:1, borderColor:'red', height:100, width:70,
    backgroundColor:'#fff',margin:5,
  }
});

AppRegistry.registerComponent('T50', () => T50);
