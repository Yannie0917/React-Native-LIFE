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

// cellTopImage   375 : 165
var cellTopImageWidth = width;
var cellTopImageHeight = cellTopImageWidth*165/375;

// item组件
import SearchSpecialItem from '../Component/JYSearchSpecialCellItem';

// 本地假数据
var localData_search_singleItem = require('../LocalData/LocalData_search_singleItem.json');

var JYSearchSingleItem = React.createClass({

  getDefaultProps() {
    return {
      url_api: 'https://api.mglife.me/v2/item_categories/tree?limit=20&offset=0',
      key_world: 'categories'
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
          var jsonData = localData_search_singleItem['data'];
          this._detailWithData(jsonData);
        }
      })
  },

  // 数据转换
  _detailWithData(jsonData) {

    // 获取数据
    var categoryListData = jsonData[this.props.key_world];

    // 刷新状态
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(categoryListData)
    })
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow(rowData) {
    return(
      <View>

        <View style={styles.cellTopImageStyle}>
          <Image
            style={{flex:1, width:width}}
            source={{uri:rowData.icon_url}}
          />
        </View>

        <View style={{flexDirection:'row', flexWrap:'wrap', alignItems:'center'}}>
          {this._renderTagItems(rowData.subcategories)}
        </View>

      </View>
    )
  },

  _renderTagItems(tagItemsData) {
    var tagItems = [];
    for (var i = 0; i < tagItemsData.length; i++) {
      var tagData = tagItemsData[i];
      tagItems.push(
        <Text
          key={i}
          style={{padding:10, color:'#333333', fontSize:13}}>
          {tagData.name}
        </Text>
      )
    }
    return tagItems;
  },
})


const styles = StyleSheet.create({
  cellTopImageStyle:{
    height:cellTopImageHeight,
    width:cellTopImageWidth
  },
});

module.exports = JYSearchSingleItem;