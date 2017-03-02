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
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');

import Swiper from 'react-native-swiper';

var localData_hom_new = require('../LocalData/LocalData_home_new.json');

var JYHomeNew = React.createClass({

  getDefaultProps() {
    return {
      url_api: 'http://api.mglife.me/v2/home/0?offset=0&limit=20',
      key_world: 'home_list'
    }
  },

  getInitialState() {
    return {
      bannerDataArr: [],
      dataSource: new  ListView.DataSource({
        rowHasChanged:(row1, row2) => row1 !== row2
      })
    }
  },

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.bannerStyle}>
          {/*创建banner*/}
          {this._renderBanner()}
        </View>
      </View>

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
    var tempBannerDataArr = [], tempListDataArr = [];

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

      } else {
        tempListDataArr.push(cellData);
      }
    }
    console.log('banners数据:' + tempBannerDataArr);
    console.log('list数据:' + tempListDataArr);

    this.setState({
      bannerDataArr:tempBannerDataArr,
      dataSource:this.state.dataSource.cloneWithRows(tempListDataArr)
    })


  },

  // 渲染顶部的banner
  _renderBanner() {
    return(
      <Swiper
        height={200}
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={2}
        autoplayDirection={true}
        paginationStyle={{ bottom: 5 }}
        dotStyle={{backgroundColor:'rgba(255,255,255,.5)', width: 6, height: 6}}
        activeDotStyle={{backgroundColor:'rgba(255,255,255,1)', width: 6, height: 6}}
      >
        
        {this._renderSwiperItems()}

      </Swiper>
    )
  },

  // 循环创建轮播图
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

  _renderRow(rowData) {
    return (
      <TouchableHighlight
        activeOpacity={1.0}
        underlayColor={'#ececec'}
        onPress={()=>{this.cellPress(rowData)}}
      >
        <View style = {styles.cellViewStyle}>
          <Image source={{uri:rowData.imgsrc}} style={styles.leftImageStyle}/>
          <View style={styles.rightViewStyle}>
            <Text style = {styles.rightTitleStyle}>{rowData.title}</Text>
            <Text style={styles.rightSubTitleStyle}>{rowData.digest}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  },

})


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  //
  bannerStyle:{
    width:width,
    height:width/375*200,
  },

  bannerImageStyle:{
    width:width,
    height:width/375*200
  },

});

module.exports = JYHomeNew;