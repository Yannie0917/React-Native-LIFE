// 入口
import React, { Component } from 'react'
import {
  Navigator,
  View,
  StatusBar,
  Platform,
} from 'react-native'

import Wrapper from './JYWrapper'

export default class JYApp extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Navigator
        initialRoute={{ component: Wrapper }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator={navigator} />
        }} />
    )
  }
}
