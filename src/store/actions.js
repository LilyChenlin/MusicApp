import * as types from './mutation-type'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCELIST, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULLSCREEN, true)
}
