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
  ListView,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

// cell上部分的高度
var cellTopViewHeight = width/375*200;
// cell下部分的高度
var cellBottomViewHeight = 153;

var localData_hom_arts = require('../LocalData/LocalData_home_arts.json');

// 攻略详情页
import StrategyDetails from '../Pages/JYStrategyDetails'

var JYHomeArts = React.createClass({

  getDefaultProps() {
    return {
      url_api: 'http://api.mglife.me/v2/home/5?offset=0&limit=20',
      key_world: 'home_list'
    }
  },

  getInitialState() {
    return {
      // 下面的列表数据
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
          var jsonData = localData_hom_arts['data'];
          this._detailWithData(jsonData);
        }
      })
  },

  // 数据转换
  _detailWithData(jsonData) {
    // 临时 list列表数据
    var tempListDataArr = [];
    // 获取首页中的数据
    var homeListData = jsonData[this.props.key_world];
    // 进行遍历,重组数据
    for (var i = 0; i < homeListData.length; i++) {
      // 单独的数据
      var cellData = homeListData[i];
      // 由于请求回来的数据过多这里进行了过滤
      if (i > 20) {
        break;
      }
      // 列表数据
      tempListDataArr.push(cellData);
    }

    // 刷新状态
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(tempListDataArr)
    })
  },


  // 渲染单个cell
  _renderRow(rowData) {

    var cellPostData = rowData['post'];

    return (
      <View style={styles.cellStyle}>

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

      </View>
    )
  },

})


const styles = StyleSheet.create({
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

module.exports = JYHomeArts;