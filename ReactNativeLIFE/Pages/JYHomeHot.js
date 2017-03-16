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
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

var localData_hom_hot = require('../LocalData/LocalData_home_hot.json');

import CellItem from '../Component/JYHomeNewCellItem';

// 清单详情页
import ListDetails from './JYListDetails'

var JYHomeHot = React.createClass({

  getDefaultProps() {
    return {
      url_api: 'http://api.mglife.me/v2/home/1?offset=0&limit=20',
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
          var jsonData = localData_hom_hot['data'];
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


  // 渲染listVie的单行
  _renderRow(rowData) {

    var cellData = rowData.fav_list;

    var botTitleData = cellData.user_info;

    var botItemsData = cellData.items_info;

    return(
      <View style={styles.cellStyle}>

        <TouchableOpacity
          style = {styles.cellTopViewStyle}
          activeOpacity={0.8}
          onPress={()=>{
            const { navigator } = this.props;
            if(navigator) {
              navigator.push({
                name: 'ListDetails',
                component: ListDetails,
                params: {
                  id:cellData.id
                }
              })
            }
          }}
        >
          {/*cell的头部上半部分*/}
          <View style={styles.cellTopTitleViewStyle}>
            <Text
              style={styles.cellLeftTitleStyle}
              numberOfLines={1}
            >
              {cellData.name}
            </Text>

            <View style={styles.cellRightTitleStyle}>
              <Text
                style={styles.cellSubTitleStyle}
              >
                {cellData.items_count}个单品
              </Text>
              <Image
                source={require('../Images/Home/icon_goinArraw_6x8_.png')}
              />
            </View>
          </View>
          {/*cell的头部下半部分*/}
          <View style={styles.cellBotTitleViewStyle}>
            <Image
              style={{width:28, height:28, marginLeft:15, borderRadius:14}}
              source={{uri:botTitleData.avatar_url}}
            />
            <Text style={{paddingLeft:10, fontSize:12, color:'#8888'}}>
              {botTitleData.nickname}
            </Text>

          </View>
        </TouchableOpacity>
        {/*cell的尾部横向滚动列表*/}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal:5}}
        >
          {this._renderCellBotItems(botItemsData)}
        </ScrollView>

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
          title={itemData.name} 
          priceTitle={itemData.price}
          topImageStyle={{height:88, width: 88, borderRadius:44}}
          style={{padding: 5}}
          navigator={this.props.navigator}
        />
      )
    }
    return cellBotItems;
  },

})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cellStyle:{
    // backgroundColor:'pink',
    borderTopWidth:14,
    borderTopColor:'#f5f5f5'
  },

  cellTopTitleViewStyle:{
    flexDirection:'row',
    paddingVertical:20,
    paddingHorizontal:15,
    paddingTop:20,
    paddingBottom:10,
  },

  cellLeftTitleStyle:{
    fontSize:18,
    lineHeight:25,
    color:'black',
    flex:0.7,
  },

  cellRightTitleStyle:{
    flex:0.3,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },

  cellSubTitleStyle:{
    // backgroundColor:'blue',
    fontSize:13,
    lineHeight:25,
    color:'#888888',
    paddingHorizontal:10,
  },
  cellBotTitleViewStyle:{
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:5,
    borderBottomColor:'#cccccc',
    borderBottomWidth:0.5,
  }

});

module.exports = JYHomeHot;