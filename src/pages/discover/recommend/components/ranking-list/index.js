import React, { memo ,useEffect} from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import {
  getTopData
} from "../../store/actionCreators";

import ThemeHeaderRCM from '@/components/theme-header-rcm';
import TopRanking from "@/components/top-ranking";

import {
  RankingWrapper
} from './style'
export default memo(function RankingList() {

  const dispatch = useDispatch();
  
  const state = useSelector((state) => ({
    topUpList: state.getIn(["recommend", "topUpList"]),
    topNewList: state.getIn(["recommend", "topNewList"]),
    topOriginList: state.getIn(["recommend", "topOriginList"])
  }), shallowEqual);

  useEffect(() => {
    dispatch(getTopData(0))
    dispatch(getTopData(2))
    dispatch(getTopData(3))
  }, [dispatch])
  
  return (
    <RankingWrapper>
      <ThemeHeaderRCM title="榜单" moreLink="/discover/ranking"/>
      <div className="tops">
        <TopRanking info={state.topUpList}/>
        <TopRanking info={state.topNewList}/>
        <TopRanking info={state.topOriginList}/>
      </div>
    </RankingWrapper>
  )
})
