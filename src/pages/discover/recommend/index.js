import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import TopBanner from './components/top-banner';
import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight
} from "./style";
export default memo(function Recommend() {

  return (
    <RecommendWraper>
      <TopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
        </RecommendLeft>
        <RecommendRight>
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
})
