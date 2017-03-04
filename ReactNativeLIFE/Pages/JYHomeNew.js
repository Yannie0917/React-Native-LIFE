/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 首页 - 最新
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
  Image,
  TouchableHighlight
} from 'react-native';

const { width, height } = Dimensions.get('window');

import Swiper from 'react-native-swiper';

var localData_hom_new = require('../LocalData/LocalData_home_new.json');

// 顶部的banner图的高度
var bannerHeight = width/375*200;
// banner图下面的重点产品高度
var focusViewHeight = width/375*148;
// cell上部分的高度
var cellTopViewHeight = width/375*200;

var JYHomeNew = React.createClass({

  getDefaultProps() {
    return {
      url_api: 'http://api.mglife.me/v2/home/0?offset=0&limit=20',
      key_world: 'home_list'
    }
  },

  getInitialState() {
    return {
      // 顶部的banner数据
      bannerDataArr: [],
      // banner下面的重点产品数据
      focusProductArr: [],
      // 下面的列表数据
      dataSource: new  ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2
      })
    }
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderHeader={this._renderListViewHeader}
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
        this._detailWithDada(jsonData);
      })
      .catch((error) => {
        if (error) {
          console.log('错误信息:' + error);
          var jsonData = localData_hom_new['data'];
          this._detailWithDada(jsonData);
        }
      })
  },

  // 数据转换
  _detailWithDada(jsonData) {

    // 临时banner数据  与  临时 list列表数据
    var tempBannerDataArr = [], tempFocusDataArr=[], tempListDataArr = [];

    // 获取首页中的数据
    var homeListData = jsonData[this.props.key_world];

    // 进行遍历,重组数据
    for (var i = 0; i < homeListData.length; i++) {
      // 单独的数据
      var cellData = homeListData[i];

      // 进行判断 区分数据
      if (cellData.cell_type == 'banners') {
        // banners数据
        tempBannerDataArr = cellData.banners;
        // 重点产品数据
      } else if(cellData.cell_type == 'focus_product') {
        tempFocusDataArr.push(cellData);
      } else {

        // 由于请求回来的数据过多这里进行了过滤
        if (i > 21) {
          break;
        }

        // 列表数据
        tempListDataArr.push(cellData);
      }
    }

    // 刷新状态
    this.setState({
      bannerDataArr:tempBannerDataArr,
      focusProductArr: tempFocusDataArr,
      dataSource:this.state.dataSource.cloneWithRows(tempListDataArr)
    })
  },

  // 渲染ListView的HeaderView
  _renderListViewHeader() {
    return (
      <View style={styles.listHeaderStyle}>
        {/*上面的banner*/}
        {this._renderBanner()}
        {/*下面的重点产品图*/}
        {this._renderFocusProduct()}
      </View>
    )
  },

  // 渲染顶部的banner
  _renderBanner() {
    return(
      <Swiper
        height={bannerHeight}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={4}
        autoplayDirection={true}
        paginationStyle={{ bottom: 5 }}
        dotStyle={{backgroundColor:'rgba(255,255,255,.5)', width: 6, height: 6}}
        activeDotStyle={{backgroundColor:'rgba(255,255,255,1)', width: 6, height: 6}}
      >
        {this._renderSwiperItems()}
      </Swiper>
    )
  },

  // 渲染banner图 --> 循环创建轮播图
  _renderSwiperItems() {
    var items = [];
    for (var i=0; i<this.state.bannerDataArr.length; i++) {
      var bannerData = this.state.bannerDataArr[i];
      console.log('i=' + i);
      items.push(
        <Image
          key={i}
          style={styles.bannerImageStyle}
          source={{uri:bannerData.image_url}}
        >
        </Image>
      )
    }
    return items;
  },

  // 渲染重点产品
  _renderFocusProduct() {
    var focusItems = [];
    for (var i=0; i<this.state.focusProductArr.length; i++) {
      var focusData = this.state.focusProductArr[i]['focus_product'];
      focusItems.push(
        <View style={styles.focusViewStyle}
              key={i}
        >
          {/*背景图*/}
          <Image
            style={styles.focusImageStyle}
            source={{uri:focusData.image_url}}
          >
          </Image>
          {/*左边的文字*/}
          <View style={styles.focusLeftTextViewStyle}>
            <Text style={{color:'#383838', fontSize:14, lineHeight:20}}>{focusData.introduction}</Text>
            <Text style={{color:'#383838', fontSize:19, lineHeight:27}}>{focusData.title}</Text>
            <Text style={{color:'#383838', fontSize:13, lineHeight:18}}>{focusData.sub_title}</Text>
          </View>

        </View>
      )
    }
    return focusItems;
  },

  // 渲染单个cell
  _renderRow(rowData) {

    var cellPostData = rowData['post'];

    return (
      <TouchableHighlight
        activeOpacity={1.0}
        underlayColor={'#ececec'}
        onPress={()=>{this._cellPress(rowData)}}
      >
        <View style = {styles.cellTopViewStyle}>
          {/*cell的上部分背景图*/}
          <Image
            style={styles.cellTopViewBackImgStyle}
            source={{uri:cellPostData.new_cover_image_url}}
          >

          </Image>

          <View style={styles.cellListViewStyle}>
            <Text >{cellPostData.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

  // cell 的点击事件
  _cellPress(rowData) {
    alert(rowData.cell_type)
  }

})


const styles = StyleSheet.create({
  container: {
    // flex:1,
    height:300,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  // ListView 的headerView (包括banner和下面的重点产品图)
  listHeaderStyle: {
    alignItems: 'center',
    backgroundColor: 'red',
  },

  // banner的内部的图片
  bannerImageStyle:{
    flex:1,
    width:width,
  },

  // 重点产品
  focusViewStyle:{
    width:width,
    height:focusViewHeight,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor: '#f5f5f5'
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
    top: 15+34,
    backgroundColor: 'transparent',
    borderTopWidth:0.5,
    borderBottomWidth:0.5,
    borderTopColor:'black',
    borderBottomColor:'black',
    paddingTop:5,
    paddingLeft:6,
    paddingRight:6,
    paddingBottom:5,
  },

  // cell的topView
  cellTopViewStyle:{
    height:cellTopViewHeight,
    backgroundColor:'red',
  },

  // cell的topView的背景图
  cellTopViewBackImgStyle:{
    flex:1,
    height:cellTopViewHeight,
    backgroundColor:'gray',
  },

});

module.exports = JYHomeNew;