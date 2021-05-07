import React, { memo, useEffect, useState, useRef, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getSizeImage, formatMinuteSecond, getPlayUrl } from '@/utils/format-utils.js'
// import {
//   getSongDetailAction,
// } from '@/store/actionCreators'


import {
  PlaybarWrapper,
  Control,
  PlayInfo,
  Operator
} from './style';
import { NavLink } from 'react-router-dom'
import { Slider, message } from 'antd'
export default memo(function AppPlayBar() {

  const [isPlaying, setIsPlaying] = useState(false)
  const [isChanging, setIsChanging] = useState(false);
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    isPlaying && audioRef.current.play()
  }, [isPlaying])

  const dispatch = useDispatch()

  const { currentSong } = useSelector((state) => ({
    currentSong: state.getIn(["player", "currentSong"]),
  }), shallowEqual)

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


  const sliderChange = useCallback((value) => {
    setIsChanging(true);
    setProgress(value);
    const time = value / 100.0 * duration;
    setCurrentTime(time);

  }, [duration])

  const sliderAfterChange = useCallback((value) => {
    const time = value / 100.0 * duration;
    audioRef.current.currentTime = time / 1000;
    // setCurrentTime(time)
    setIsChanging(false)
    setIsPlaying(true)
    audioRef.current.play()
  }, [duration]);
  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar prev"></button>
          <button className="sprite_playbar btn play" title="播放/暂停(P)" onClick={playMusic}></button>
          <button className="sprite_playbar btn next" ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink
              to={{
                pathname: '/discover/song',
              }}

            >
            </NavLink>
            <img src={picUrl ? getSizeImage(picUrl, 35) : require("@/assets/img/default_album.jpg")} alt="" />

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
        <Operator>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop"></button>
            <button className="sprite_playbar btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio
        id="audio"
        ref={audioRef}
        onTimeUpdate={timeUpdate}
        // onEnded={handleTimeEnd}
        preload="auto"
      />
    </PlaybarWrapper >
  )
})
