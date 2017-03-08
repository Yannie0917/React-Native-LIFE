/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 首页 - 问答
 *
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');

// 重点产品高度
var focusViewHeight = width/375*178;

// 本地假数据
var localData_hom_timelimit = require('../LocalData/LocalData_home_timelimit.json');

var JYHomeTimeLimit = React.createClass({

  getDefaultProps() {
    return {
      url_api: 'https://api.mglife.me/v2/home/3?offset=0&limit=20',
      key_world: 'home_list'
    }
  },

  getInitialState() {
    return {
      // 列表数据
      dataSource: new  ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2
      }),
    }
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
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
        this._detailWithData(jsonData);
      })
      .catch((error) => {
        if (error) {
          console.log('错误信息:' + error);
          var jsonData = localData_hom_timelimit['data'];
          this._detailWithData(jsonData);
        }
      })
  },

  // 数据转换
  _detailWithData(jsonData) {

    // 临时 list列表数据
    var tempFocusDataArr=[];

    // 获取首页中的数据
    var homeListData = jsonData[this.props.key_world];

    console.log('homeListData数据' + homeListData);

    // 进行遍历,重组数据
    for (var i = 0; i < homeListData.length; i++) {
      // 单独的数据
      var cellData = homeListData[i];

      // 进行判断 区分数据
      if(cellData.cell_type === 'focus_product') {
        // 由于请求回来的数据过多这里进行了过滤
        if (tempFocusDataArr.length > 20) {
          break;
        }
        tempFocusDataArr.push(cellData);
      }
    }

    // 刷新状态
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(tempFocusDataArr)
    })
  },

  // 渲染单个cell
  _renderRow(rowData) {
    var focusData = rowData['focus_product'];

    console.log('重点产品数据' + focusData);

    return (
      <View style={styles.focusViewStyle}
      >
        {/*背景图*/}
        <Image
          style={styles.focusImageStyle}
          source={{uri:focusData.image_url}}
        >
        </Image>
        {/*左边的文字*/}
        <View style={styles.focusLeftTextViewStyle}>
          <View style={{borderTopWidth:0.5, borderBottomWidth:0.5, borderTopColor:'black', borderBottomColor:'black', padding:5, alignItems:'center'}}>
            <Text style={{color:'#383838', fontSize:14, lineHeight:20}}>{focusData.introduction}</Text>
            <Text style={{color:'#383838', fontSize:19, lineHeight:27, marginTop:5}}>{focusData.title}</Text>
          </View>
          <Text style={{color:'#383838', fontSize:13, lineHeight:18, padding:5}}>{focusData.sub_title}</Text>
        </View>

      </View>
    )
  },


})


const styles = StyleSheet.create({

  // 重点产品
  focusViewStyle:{
    width:width,
    height:focusViewHeight,
    paddingTop:15,
    backgroundColor: '#f5f5f5',
  },

  // 重点产品的内部图片
  focusImageStyle:{
    width:width,
    flex:1,
  },

  // 重点产品的左边的文字view
  focusLeftTextViewStyle:{
    alignItems: 'center',
    position:'absolute',
    left: 19,
    top: 15+34*width/375,
    backgroundColor: 'transparent',
  },

});

module.exports = JYHomeTimeLimit;