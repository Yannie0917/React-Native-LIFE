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
  TouchableHighlight,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

import Swiper from 'react-native-swiper';
import CellItem from '../Component/JYHomeNewCellItem';

var localData_hom_new = require('../LocalData/LocalData_home_new.json');

// 顶部的banner图的高度
var bannerHeight = width/375*200;
// banner图下面的重点产品高度
var focusViewHeight = width/375*178;
// cell上部分的高度
var cellTopViewHeight = width/375*200;
// cell上部分的高度
var cellBottomViewHeight = 153;

// 商品详情
import ProductDetails from '../Pages/JYProductDetails';
import StrategyDetails from '../Pages/JYStrategyDetails'

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
        style={{flex:1}}
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
        this._detailWithData(jsonData);
      })
      .catch((error) => {
        if (error) {
          console.log('错误信息:' + error);
          var jsonData = localData_hom_new['data'];
          this._detailWithData(jsonData);
        }
      })
  },

  // 数据转换
  _detailWithData(jsonData) {

    // 临时banner数据  与  临时 list列表数据
    var tempBannerDataArr = [], tempFocusDataArr=[], tempListDataArr = [];

    // 获取首页中的数据
    var homeListData = jsonData[this.props.key_world];

    // 进行遍历,重组数据
    for (var i = 0; i < homeListData.length; i++) {
      // 单独的数据
      var cellData = homeListData[i];

      // 进行判断 区分数据
      if (cellData.cell_type === 'banners') {
        // banners数据
        tempBannerDataArr = cellData.banners;
        // 重点产品数据
      } else if(cellData.cell_type === 'focus_product') {
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
            <View style={{borderTopWidth:0.5, borderBottomWidth:0.5, borderTopColor:'black', borderBottomColor:'black', padding:5}}>
              <Text style={{color:'#383838', fontSize:14, lineHeight:20}}>{focusData.introduction}</Text>
              <Text style={{color:'#383838', fontSize:19, lineHeight:27, marginTop:5}}>{focusData.title}</Text>
            </View>
            <Text style={{color:'#383838', fontSize:13, lineHeight:18, padding:5}}>{focusData.sub_title}</Text>
          </View>

        </View>
      )
    }
    return focusItems;
  },

  // 渲染单个cell
  _renderRow(rowData) {

    var cellPostData = rowData['post'];

    // // 刷新状态
    // this.setState({
    //   postDataSource:this.state.postDataSource.cloneWithRows(cellPostData.post_items)
    // })

    return (
      <View style={styles.cellStyle}>

        {/*cell上半部分的展示图*/}
        <TouchableOpacity
          style = {styles.cellTopViewStyle}
          activeOpacity={0.8}
          onPress={()=>{
            const { navigator } = this.props;
            if(navigator) {
              navigator.push({
                name: 'StrategyDetails',
                component: StrategyDetails,
                params: {
                  id:cellPostData.id
                }
              })
            }
          }}
        >
          {/*cell的上部分背景图*/}
          <Image
            style={styles.cellTopViewBackImgStyle}
            source={{uri:cellPostData.new_cover_image_url}}
          />

          {/*cell的上部分背景图上面的文字*/}
          <View style={styles.cellTopViewContentStyle}>
            {/*channel_icon*/}
            <Image
              style={{width:27, height:27, bottom:10}}
              source={{uri:cellPostData.channel_icon}}
            />
            {/*title*/}
            <View style={{borderTopWidth:0.5, borderTopColor:'white', borderBottomWidth:0.5, borderBottomColor:'white', padding:5}}>
              <Text
                style={{color:'white', fontSize:19}}
              >{cellPostData.title}</Text>
            </View>
            <Text
              style={{color:'white', fontSize:19, paddingTop:5}}
            >[{cellPostData.channel_title}]</Text>

          </View>


          {/*cell右上角的喜欢数量*/}
          <View style={styles.cellLikeCountViewStyle}>
            {/*上面的指纹图片*/}
            <Image source={require('../Images/Home/icon_post_favorite_21x21_.png')} style={{width:21, height: 21}} />
            {/*下面的喜欢数*/}
            <Text style={{fontSize:10, color:'white'}}>{cellPostData.likes_count}</Text>
          </View>

        </TouchableOpacity>

        {/*cell下半部分的横向滚动列表*/}
        <View style={styles.cellBottomViewStyle}>
          <ScrollView
            style={{flex:1}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:5}}
            automaticallyAdjustContentInsets={false}
          >
            {this._renderCellBotItems(cellPostData.post_items)}
          </ScrollView>
        </View>

      </View>
    )
  },

  // 渲染cell下半部分的横向滚动
  _renderCellBotItems(dataArr){
    var cellBotItems = [];
    for (var i = 0; i < dataArr.length; i++) {
      var itemData = dataArr[i];
      cellBotItems.push(
        // 自定义的一个item组件
        <CellItem 
          key={i}
           topImageSource={itemData.cover_image_url} 
          title={itemData.name}   priceTitle={itemData.price} 
          topImageStyle={{height:88, width: 88, borderRadius:10}} 
          style={{padding: 5}} 
          navigator={this.props.navigator}
        />
      )
    }
    return cellBotItems;
  },

  // cell 的点击事件
  _cellItemPress(rowData) {
    const { navigator } = this.props;

    console.log('导航栏:' + navigator);

    alert('哈哈哈');

    // if(navigator) {
    //   navigator.push({
    //     name: 'Mine',
    //     component: Mine,
    //   })
    // }
  },

})


const styles = StyleSheet.create({
  // ListView 的headerView (包括banner和下面的重点产品图)
  listHeaderStyle: {
    alignItems: 'center',
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

  // cell的样式
  cellStyle:{
    // backgroundColor:'pink',
    borderTopWidth:15,
    borderTopColor:'#f5f5f5'
  },

  // cell的topView
  cellTopViewStyle:{
    height:cellTopViewHeight,
  },

  // cell的bottomView
  cellBottomViewStyle:{
    height:cellBottomViewHeight,
    width:width,
  },

  // cell的topView的背景图
  cellTopViewBackImgStyle:{
    flex:1,
    height:cellTopViewHeight,
  },

  // cell右上角的喜欢数量view
  cellLikeCountViewStyle:{
    position:'absolute',
    alignItems: 'center',
    width:35,
    height:40,
    right:10,
    paddingTop:5,
    backgroundColor:'rgba(0,0,0,.2)',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
  },

  // cell上半部分的背景图上的黑色蒙层及文字信息
  cellTopViewContentStyle:{
    position:'absolute',
    alignItems:'center',
    height:cellTopViewHeight,
    width:width,
    top:0,
    left:0,
    backgroundColor:'rgba(0,0,0,.2)',
    justifyContent:'center'
  },

});

module.exports = JYHomeNew;