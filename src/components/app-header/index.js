import React, { memo } from 'react';
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import { headerLinks } from "@/services/local-data";

import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import {
  AppHeaderWrapper,
  HeaderLeft,
  HeaderRight
} from "./style";
export default memo(function HYAppHeader() {
  return (
    <AppHeaderWrapper>
      <div className="wrap-v1 top">a
        <HeaderLeft>
          <a className="logo sprite_01" href="#/">网易云音乐</a>
          <div className="select-list">
            {
              headerLinks.map((item, index) => {
                return (
                  <div className={ classnames("select-item") } key={item.title}>
                    {
                      index < 3 ?
                      
                        <NavLink to={item.link}>
                          {item.title}
                          <i className="sprite_01 icon"></i>
                        </NavLink> :
                        <a href={item.link} target="_blank">{item.title}</a>
                    }
                  </div>
                )
              })
            }
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input className="search" placeholder="音乐/视频/电台/用户" prefix={<SearchOutlined />} />
          <div className="center">创作者中心</div>
          <div className="login">登录</div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </AppHeaderWrapper>
  )
})
