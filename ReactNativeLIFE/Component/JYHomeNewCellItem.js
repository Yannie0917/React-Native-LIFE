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

export default class JYHomeNewCellItem extends Component{
  static propTypes = {
    topImageSource:PropTypes.object,
    title: PropTypes.string,
    priceTitle: PropTypes.string,
    style: PropTypes.object,
    topImageStyle: PropTypes.object,
    itemPress: PropTypes.func,
  }

  render(){
    return(
      <View style={[styles.itemStyle, this.props.style]}>
        <Image
          style={this.props.topImageStyle}
          source={{uri:this.props.topImageSource}}
        ></Image>

        <Text style={styles.titleStyle}>
          {this.props.title}
        </Text>

        <Text style={styles.priceStyle}>
          {this.props.priceTitle}
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  itemStyle:{
    alignItems:'center',
    justifyContent:'center'
  },
  titleStyle:{

    color: "black",
    fontSize: 12,
    width:60,
    height:30
  },
  priceStyle:{
    color: "#f84e4e",
    fontSize: 12,
  }
});
