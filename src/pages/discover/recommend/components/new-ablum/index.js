import React, { useEffect, useRef, memo } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  getAlbum
} from "../../store/actionCreators";

import { Carousel } from 'antd';
import ThemeHeaderRCM from '@/components/theme-header-rcm';
import AlbumCover from "@/components/album-cover";

import {
  AlbumWrapper
} from "./style";

export default memo(function NewAlbum() {
  const state = useSelector(state => ({
    newAlbum: state.getIn(["recommend", "newAlbum"])
  }), shallowEqual)
  const dispatch = useDispatch()
  const carouselRef = useRef();
  useEffect(() => {
    dispatch(getAlbum());
  }, [dispatch]);
  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title="新碟上架"></ThemeHeaderRCM>
      <div className="content">
        <div className="arrow arrow-left sprite_02" onClick={e => carouselRef.current.prev()}></div>
        <div className="album">
          <Carousel ref={carouselRef} dots={false}>
            {
              [0, 1].map(item => {
                return (
                  <div key={item} className="page">
                    {
                      state.newAlbum.slice(item * 5, (item + 1) * 5).map(item => {
                        return (
                          <AlbumCover key={item.id} info={item} />
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div className="arrow arrow-right sprite_02" onClick={e => carouselRef.current.next()}></div>
      </div>
    </AlbumWrapper>

  )
})
