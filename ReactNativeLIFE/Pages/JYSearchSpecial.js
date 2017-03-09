/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 首页 - 歪果志
 *
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ListView
} from 'react-native';

const { width, height } = Dimensions.get('window');

// 封面图的高度
var CoverHeight = 10 + width/375*123;
// titleBar的高度
var TitleBarHeight = 60;
// item的宽度 和 高度  173   244
var ItemWidth = (width-30)/2;
var ItemHeight = ItemWidth*244/173;

// tobeTalent   375 : 149
var tobeTalentWidth = width;
var tobeTalentHeight = tobeTalentWidth*149/375;

// item组件
import SearchSpecialItem from '../Component/JYSearchSpecialCellItem';

// 本地假数据
var localData_search_special = require('../LocalData/LocalData_search_special.json');

var JYHomeArts = React.createClass({

  getDefaultProps() {
    return {
      url_api: 'http://api.mglife.me/v2/special_channel',
      key_world: 'channel'
    }
  },

  getInitialState() {
    return {
      // 列表数据源
      dataSource: new  ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2
      }),
    }
  },

  componentDidMount() {
    this._loadDataFromNet();
  },

  // 获取网络数据
  _loadDataFromNet() {
    fetch(this.props.url_api)
      .then((response) => response.json())
      .then(responseData => {
        var jsonData = responseData['data'];
        console.log('jsonData' + jsonData);
        this._detailWithData(jsonData);
      })
      .catch((error) => {
        if (error) {
          console.log('错误信息:' + error);
          var jsonData = localData_search_special['data'];
          this._detailWithData(jsonData);
        }
      })
  },

  // 数据转换
  _detailWithData(jsonData) {

    // 定义临时变量
    var tempDataSource = [];

    // 获取数据
    var channelListData = jsonData[this.props.key_world];

    // 进行遍历,重组数据
    for (var i = 0; i < channelListData.length; i++) {
      // 单独的数据
      var itemData = channelListData[i];

      // 数据过滤
      if (itemData.cell_type === 'life_sir_fav_list' || itemData.cell_type === 'talent_channel' || itemData.cell_type === 'to_be_talent' || itemData.cell_type === 'life_channel'){
        tempDataSource.push(itemData);
      }
    }

    // 刷新状态
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(tempDataSource)
    })
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      >

      </ListView>
    );
  },

  _renderLifeSirFav(rowData){

    var itemData = rowData.life_sir_fav_list;

    return(
      <View style={styles.lifeSirFavStyle}>
        <Image
          style={{flex:1}}
          source={{uri:itemData.cover_image_url}}
        >
        </Image>
      </View>
    )
  },

  _renderTalentChannel(rowData){
    var itemListData = rowData.talent_channel;

    return (
      <View>
        {/*上面的titleBar*/}
        <View style={styles.titleBarStyle}>
          <Text style={styles.titleBarLeftStyle}>达人栏目</Text>
          <View style={styles.titleBarRightStyle}>
            <Text style={styles.titleBarLookAllStyle}>查看全部</Text>
            <Image source={require('../Images/Home/icon_goinArraw_6x8_.png')}/>
          </View>
        </View>
        {/*下面的列表*/}
        <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, backgroundColor:'white'}}>
          {this._renderItems(itemListData)}
        </View>

      </View>
    )
  },

  _renderItems(itemListData){
    var items = [];
    for (var i = 0; i < itemListData.length; i++) {

      var itemData = itemListData[i];

      items.push(
        <SearchSpecialItem
          key={i}
          style={{marginBottom:10}}
          backImgUri={itemData.cover_image_url}
          itemWidth={ItemWidth}
          itemHeight={ItemHeight}
          authorName={itemData.author_name}
          title={itemData.name}
          slogan={itemData.slogan}
          itemsCount={itemData.items_count}
        >
        </SearchSpecialItem>
      )
    }
    return items;
  },

  _renderTobeTalent(rowData){
    var itemData = rowData.to_be_talent;

    return(
      <View style={styles.tobeTalentStyle}>
        <Image
          style={{flex:1, borderRadius: 10, borderWidth:0.5, borderColor:'#d7d7d7'}}
          source={{uri:itemData.cover_image_url}}
        />
      </View>
    )
  },

  _renderLifeChannel(rowData){
    var itemData = rowData.life_channel;

    return(
      <View>

        {/*上面的titleBar*/}
        <View style={styles.titleBarStyle}>
          <Text style={styles.titleBarLeftStyle}>LIEF栏目</Text>
          <View style={styles.titleBarRightStyle}>
            <Text style={styles.titleBarLookAllStyle}>查看全部</Text>
            <Image source={require('../Images/Home/icon_goinArraw_6x8_.png')}/>
          </View>
        </View>
        {/*下面的列表*/}
        <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, backgroundColor:'white'}}>
          {this._renderItems(itemData)}
        </View>

      </View>
    )
  },

  _renderRow(rowData) {

    if (rowData.cell_type === 'life_sir_fav_list') {
      return(
        this._renderLifeSirFav(rowData)
      )
    } else if (rowData.cell_type === 'talent_channel') {
      return(
        this._renderTalentChannel(rowData)
      )
    } else if (rowData.cell_type === 'to_be_talent') {
      return(
        this._renderTobeTalent(rowData)
      )
    } else if (rowData.cell_type === 'life_channel') {
      return(
        this._renderLifeChannel(rowData)
      )
    } else {
      return(
        <View></View>
      )
    }
  }
})


const styles = StyleSheet.create({
  lifeSirFavStyle:{
    width:width,
    height:CoverHeight,
    borderTopWidth:10,
    borderTopColor:'#f5f5f5',
  },
  titleBarStyle:{
    flexDirection:'row',
    height:TitleBarHeight,
    width:width,
    backgroundColor:'white',
    borderTopWidth:10,
    borderTopColor:'#f5f5f5',
    alignItems:'center',
    paddingHorizontal:10,
  },
  titleBarLeftStyle:{
    flex:0.7,
    fontSize:14,
  },
  titleBarRightStyle:{
    flex:0.3,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
  },
  titleBarLookAllStyle:{
    fontSize:13,
    color:'#888888',
    marginRight:5,
  },
  tobeTalentStyle:{
    width:tobeTalentWidth,
    height:tobeTalentHeight,
    paddingHorizontal:10,
    paddingTop:8,
    paddingBottom:18,
  },

});

module.exports = JYHomeArts;