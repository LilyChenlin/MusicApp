import {playMode} from '../common/js/config'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [], // 当前播放列表
  sequenceList: [], // 歌曲顺序列表
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  toplist: {}
}
export default state
