import React, { Component } from 'react';

import {
  UserLoginWrapper
} from "./style";

export default class HYUserLogin extends Component {
  constructor() {
    super()
    this.state = {
      message: "你好啊,李银河"
    }
  }
  render() {
    return (
      <UserLoginWrapper className="sprite_02">
        <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
        <a href="/login" className="sprite_02">用户登录</a>
      </UserLoginWrapper>
    )
  }

}

