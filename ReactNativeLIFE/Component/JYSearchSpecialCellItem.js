/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 自定的cell的item
 *
 */

import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

export default class JYSearchSpecialCellItem extends Component{
  static propTypes = {
    itemWidth:PropTypes.number,
    itemHeight:PropTypes.number,
    backImgUri:PropTypes.string,
    authorIcon:PropTypes.string,
    authorName: PropTypes.string,
    title: PropTypes.string,
    slogan:PropTypes.string,
    itemsCount:PropTypes.number,
    style: PropTypes.object,
    topImageStyle: PropTypes.object,
    itemPress: PropTypes.func,
  }

  render(){
    return(
      <View

        style={[styles.itemStyle, this.props.style, {width:this.props.itemWidth, height:this.props.itemHeight,}]}
        onPress={this.props.itemPress}
      >
        {/*flex:仅仅是主轴上的空间比例, 交叉轴空间还需自己设置或者内部的控件自动撑开*/}
        <View style={{flex:130}}>
          <Image

            style={{flex:1, width:this.props.itemWidth, borderRadius:10}}
            source={{uri:this.props.backImgUri}}
          >
          </Image>
        </View>

        <View style={{flex:114, justifyContent:'flex-end'}}>
          <Text style={styles.authorNameStyle}>{this.props.authorName}</Text>
          <Text style={styles.titleStyle}>- {this.props.title} -</Text>
          <Text style={styles.sloganStyle}>{this.props.slogan}</Text>
          <Text style={styles.itemsCountStyle}>{this.props.itemsCount}篇攻略</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemStyle:{
    alignItems:'center',
    flexDirection:'column',
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#d7d7d7'
  },
  authorNameStyle:{
    color: "#333333",
    fontSize: 13,
    textAlign:'center',
    marginTop:5,
  },
  titleStyle:{
    color: "#333333",
    fontSize: 15,
    textAlign:'center',
    marginTop:8,
  },

  sloganStyle:{
    color: "#333333",
    fontSize: 11,
    textAlign:'center',
    marginTop:8,
  },
  itemsCountStyle:{
    color: "black",
    fontSize: 10,
    textAlign:'center',
    marginTop:5,
    marginBottom:5,
  }
});
