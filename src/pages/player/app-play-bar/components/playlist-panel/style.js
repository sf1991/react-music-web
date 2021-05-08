import styled from 'styled-components';

export const PanelWrapper = styled.div`
  position: absolute;
  left: 50%;
  bottom: 46px;
  transform: translateX(-50%);
  width: 986px;
  height: 301px;
  color: #e2e2e2;

  /* .mask{
    position: absolute;
    left: 2px;
    top: 0;
    z-index: 2;
    width: 558px;
    height: 260px;
    background: #121212;
    opacity: .5;

  } */
  .main {
    position: relative;
    display: flex;
    height: 260px;
    overflow: hidden;
    background: url(${require("@/assets/img/playlist_bg.png")}) -1014px 0 repeat-y;

    .image {
      position: absolute;
      left: 2px;
      top: -360px;
      width: 980px;
      height: auto;
      opacity: .2;
    }
  }
`

export const Header=styled.div`
  display: flex;
  height: 41px;
  line-height: 41px;
  background: url(${require("@/assets/img/playlist_bg.png")}) 0 0;
  .left{
    display: flex;
    justify-content: space-between;
    width: 553px;
    padding: 0 25px;
    h3 {
      color: #e2e2e2;
      font-weight: 700;
    }
    .operator {
      color: #ccc;
      button {
        background-color: transparent;
        color: #ccc;
      }
      .icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        position: relative;
        top: 4px;
        right: 2px;
      }

      .favor {
        background-position: -24px 0;
      }

      .remove {
        width: 13px;
        background-position: -51px 0;
      }
    }
  }
  .right{
    flex: 1;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
`

export const Playlist = styled.div`
  position: relative;
  width: 553px;
  padding: 2px;

  .play-item {
    padding: 0 8px 0 25px;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    line-height: 28px;
    color: #ccc;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color:rgba(0,0,0,0.4);
    }
    &.active{
      color: #fff;
      background-color: rgba(0,0,0,0.3);

      ::before {
        content: "";
        position: absolute;
        left: 8px;
        width: 10px;
        height: 13px;
        background: url(${require("@/assets/img/playlist_sprite.png")}) -182px 0;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .singer {
        width: 80px;
      }

      .duration {
        width: 45px;
      }

      .link {
        margin-left: 20px;
        width: 14px;
        height: 16px;
        background-position: -100px 0;
      }
    }
  }
`