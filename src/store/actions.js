import * as types from './mutation-type'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/util'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCELIST, list)
  if (state.mode === playMode.randow) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULLSCREEN, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCELIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const insertSong = function ({commit, state}, song) {
  console.log('执行到这里了')
  // 必须要返回一个副本，否则就会在mutation回调外修改state 给予警告
  let playList = state.playList.slice()
  // console.log(playList)
  // 当前播放列表
  let sequenceList = state.sequenceList.slice()
  // console.log(sequenceList)
  let currentIndex = state.currentIndex
  // 记录当前正在播放的歌曲
  let currentSong = playList[currentIndex]
  // 查找当前播放歌曲是否有该插入歌曲
  let fpIndex = findIndex(playList, song)
  // console.log('fpIndex:' + fpIndex)
  // 由于要插入歌曲,插入歌曲插入到当前播放歌曲后
  currentIndex++
  // console.log('currentIndex0:' + currentIndex)
  // 插入这首歌到当前索引位置
  playList.splice(currentIndex, 0, song)
  console.log(playList)
  // 如果已经包含了这首歌，由于还是要插入这首歌，所以需要把playlist中之前就已经存在的删除
  if (fpIndex > -1) {
    // 如果被插入歌曲的序号小于列表当前播放歌曲的序号
    if (currentIndex > fpIndex) {
      // 删除需被插入歌曲
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }
  // 获取当前播放列表中，当前播放歌曲的index并且+1 加一的原因是直接给song插入的位置
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  // 获取当前播放列表中，插入歌曲的index
  let fsIndex = findIndex(sequenceList, song)
  // 插入，在currentSIndex后插入需要插入的歌曲
  sequenceList.splice(currentSIndex, 0, song)
  // console.log(sequenceList)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }
  // console.log('currentIndex', currentIndex)
  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCELIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
  // console.log('over')
}

export const recordUser = function ({commit}, userInfo) {
  commit(types.SET_USER_INFO, {userInfo})
}
