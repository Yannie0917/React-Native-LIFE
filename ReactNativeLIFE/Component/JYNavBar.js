/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 * 自定的头部导航栏
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
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

export default class JYNavBar extends Component{
  static propTypes = {
    title: PropTypes.string,
    leftIcon: PropTypes.string,
    rightIcon: PropTypes.string,
    leftPress: PropTypes.func,
    rightPress: PropTypes.func,
    style: PropTypes.object
  }
  static topbarHeight = (Platform.OS === 'ios' ? 64 : 42)
  renderBtn(pos){
    let render = (obj) => {
      const { name, onPress } = obj
      if(Platform.OS === 'android'){
        return (
          <TouchableNativeFeedback onPress={onPress} style={styles.btn}>
            <Icon name={name} size={26} color="#262626" />
          </TouchableNativeFeedback>
        )
      }else{
        return (
          <TouchableOpacity onPress={onPress} style={styles.btn}>
            <Icon name={name} size={26} color="#262626" />
          </TouchableOpacity>
        )
      }
    }
    if(pos == "left"){
      if(this.props.leftIcon){
        return render({
          name: this.props.leftIcon,
          onPress: this.props.leftPress
        })
      }else{
        return (<View style={styles.btn}></View>)
      }
    }else if(pos == "right"){
      if(this.props.rightIcon){
        return render({
          name: this.props.rightIcon,
          onPress: this.props.rightPress
        })
      }else{
        return (<View style={styles.btn}></View>)
      }
    }
  }
  render(){
    return(
      <View style={[styles.topbar, this.props.style]}>
        {this.renderBtn("left")}
        <Animated.Text numberOfLines={1} style={[styles.title, this.props.titleStyle]}>{this.props.title}</Animated.Text>
        {this.renderBtn("right")}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topbar: {
    height: JYNavBar.topbarHeight,
    backgroundColor: "#fac821",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    paddingHorizontal: 10
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title:{
    color: "#262626",
    fontSize: 16,
    marginLeft: 5,
  }
});
