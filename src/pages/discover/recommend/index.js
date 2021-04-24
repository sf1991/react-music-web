import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import TopBanner from './components/top-banner';
import HotRecommend from './components/hot-recommend';

import NewAlbum from './components/new-ablum';

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
          <HotRecommend />
          <NewAlbum />
        </RecommendLeft>
        <RecommendRight>
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
})
