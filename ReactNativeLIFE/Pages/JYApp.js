// 入口
import React, { Component } from 'react'
import {
  Navigator,
  View,
  StatusBar,
  Platform,
  Text
} from 'react-native'

import Wrapper from './JYWrapper'

export default class JYApp extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <Navigator
        initialRoute={{
          component: Wrapper
        }}
        configureScene={() => Navigator.SceneConfigs.FloatFromRight}
        renderScene={(route, navigator) => {
           return <route.component navigator={navigator} {...route.args}/>
          }
        }
      />
    )
  }
}
