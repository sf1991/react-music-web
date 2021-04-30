import React, { memo } from 'react';
import TopBanner from './components/top-banner';
import HotRecommend from './components/hot-recommend';
import NewAlbum from './components/new-ablum';
import RankingList from './components/ranking-list'
import UserLogin from './components/user-login';
import SettleSinger from './components/settle-singer';
import HotRadio from './components/hot-radio';

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
          <RankingList />
        </RecommendLeft>
        <RecommendRight>
          <UserLogin />
          <SettleSinger />
          <HotRadio />
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
})
