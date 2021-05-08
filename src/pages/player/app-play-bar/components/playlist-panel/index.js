import React, { memo } from 'react';
import { useSelector, shallowEqual,useDispatch } from 'react-redux';
import classNames from 'classnames';

import { formatMinuteSecond } from '@/utils/format-utils';
// import HYLyricPanel from './c-cpns/lyric-panel';
import { PanelWrapper,Header,Playlist } from './style';
import { getSongDetailAction } from '@/pages/player/store';
export default memo(function HYAppPlayList() {
  const { playList, currentSong ,currentSongIndex} = useSelector(state => ({
    playList: state.getIn(["player", "playList"]),
    currentSong: state.getIn(["player", "currentSong"]),
    currentSongIndex: state.getIn(["player", "currentSongIndex"])
  }), shallowEqual);
  
  const dispatch = useDispatch();
  const playMusic = (item) => {
    dispatch(getSongDetailAction(item.id));
  }

  return (
    <PanelWrapper>
      <Header>
        <div className='left'>
          <h3>播放列表({playList.length})</h3>
          <div className="operator">
            <button>
              <i className="sprite_playlist icon favor"></i> 收藏全部
            </button>
            <button>
              <i className="sprite_playlist icon remove"></i> 清除
            </button>
          </div>
        </div>
        <div className='right'>
          {currentSong.name}
        </div>
      </Header>
      <div className="main">
        <Playlist>
        {
          playList.map((item, index) => {
            return (
              <div key={item.id}
                className={classNames("play-item", {"active": currentSongIndex === index})}
                onClick={e => playMusic(item)}
              >
                <div className="left">{item.name}</div>
                <div className="right">
                  <span className="singer">{item.ar[0].name}</span>
                  <span className="duration">{formatMinuteSecond(item.dt)}</span>
                  <span className="sprite_playlist link"></span>
                </div>
              </div>
            )
          })
        }
      </Playlist>
        {/* <div className="mask"></div> */}
        {/* <img className="image" src="https://p4.music.126.net/qeN7o2R3_OTPhghmkctFBQ==/764160591569856.jpg" alt=""/> */}
        {/* <HYPlayList/>
        <HYLyricPanel/> */}
      </div>
    </PanelWrapper>
  )
})
