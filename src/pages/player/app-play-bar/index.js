import React, { memo,useMemo, useEffect, useState, useRef, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getSizeImage, formatMinuteSecond, getPlayUrl } from '@/utils/format-utils.js'

import { 
  changeCurrentSongAction,
  changeCurrentSongIndexAction,
  changeSequenceAction,
  // changeCurrentIndexAndSongAction,
  // changeCurrentLyricIndexAction 
} from '../store/actionCreators';
import PlaylistPanel from './components/playlist-panel'
import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';
import { NavLink } from 'react-router-dom'
import { Slider, Tooltip,message } from 'antd'
export default memo(function AppPlayBar() {

  const [isPlaying, setIsPlaying] = useState(false)
  const [isChanging, setIsChanging] = useState(false);
  const [showVolumeBar, setShowVolumeBar] = useState(false)
  const [showPanel, setShowPanel] = useState(true)
  
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    isPlaying && audioRef.current.play()
  }, [isPlaying])

  const dispatch = useDispatch()
  const { currentSong , sequence, playList } = useSelector((state) => ({
    currentSong: state.getIn(["player", "currentSong"]),
    sequence: state.getIn(["player", "sequence"]),
    playList: state.getIn(["player", "playList"]),
  }), shallowEqual)

  // useEffect(() => {
  //   if(playList.length){
  //     dispatch(changeCurrentSongAction(playList[0]));
  //     // dispatch(changeCurrentSongIndexAction(0));
  //   }
  // }, [dispatch,playList]);

  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id);
    audioRef.current.play().then(res => {
      setIsPlaying(true);
    }).catch(err => {
      setIsPlaying(false);
    });
  }, [currentSong]);

  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime * 1000;
    if (!isChanging) {
      setCurrentTime(currentTime);
      setProgress(currentTime / duration * 100);
    }
  }
  
  const handleTimeEnd = (e) => {
    
  }
  const audioRef = useRef()
  // other handle
  const picUrl = (currentSong.al && currentSong.al.picUrl)// 图片url
  const songName = currentSong.name // 歌曲名字
  const singerName = currentSong.ar && currentSong.ar[0].name //作者名字
  const duration = currentSong.dt || 0//播放总时间
  //播放或暂停按钮后音乐
  const playMusic = useCallback(() => {
    setIsPlaying(!isPlaying)
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
  }, [isPlaying])

  const sequenceTitle= useMemo(() => {
    const title=['循环','随机','单曲循环']
    return title[sequence]
  }, [sequence])


  const changeSequence = () => {
    let currentSequence = sequence + 1;
    if (currentSequence > 2) {
      currentSequence = 0;
    }
    dispatch(changeSequenceAction(currentSequence));
  }


  const sliderChange = useCallback(value => {
    setIsChanging(true);
    setProgress(value);
    const time = value / 100.0 * duration;
    setCurrentTime(time);
  }, [duration])

  const sliderAfterChange = useCallback(value => {
    const time = value / 100.0 * duration;
    audioRef.current.currentTime = time / 1000;
    // setCurrentTime(time)
    setIsChanging(false)
    setIsPlaying(true)
    audioRef.current.play()
  }, [duration]);


  const changVolume = useCallback(value=>{
    audioRef.current.volume = value / 100
  }, [])
  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar prev" title="上一首"></button>
          <button className="sprite_playbar btn play" title="播放/暂停" onClick={playMusic}></button>
          <button className="sprite_playbar btn next"  title="下一首"></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <img src={picUrl ? getSizeImage(picUrl, 35) : require("@/assets/img/default_album.jpg")} alt="" />
            <NavLink to={{ pathname: '/song' }} className="sprite_playbar mask"/>
          </div>

          <div className="info">
            <div className="song">
              <span className="song-name">{songName}</span>
              <span className="singer-name">{singerName}</span>
            </div>
            <div className="progress">
              <Slider value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{formatMinuteSecond(currentTime)}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatMinuteSecond(duration)}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator  sequence={sequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <div className="sprite_playbar volume-bar" style={{ display: showVolumeBar ? 'block' : 'none' }}>
              <Slider vertical defaultValue={100} onChange={changVolume} />
            </div>
            <button className="sprite_playbar btn volume" onClick={e => setShowVolumeBar(!showVolumeBar)}></button>
            <Tooltip title={sequenceTitle}>
              <button className="sprite_playbar btn loop" onClick={e => changeSequence()}></button>
            </Tooltip>
            <button className="sprite_playbar btn playlist" onClick={e => setShowPanel(!showPanel)}>{playList.length}</button>
          </div>
        </Operator>
      </div>
      <audio id="audio" ref={audioRef} onTimeUpdate={timeUpdate} onEnded={handleTimeEnd} preload="auto" />
      {showPanel && <PlaylistPanel />}
    </PlaybarWrapper >
  )
})
