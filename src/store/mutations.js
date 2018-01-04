import * as types from './mutation-types'

const mutations = {
  [types.SET_way](state, way) {
    state.way = way
  },
  [types.SET_h_bg](state, h_bg) {
    state.h_bg = h_bg
  },
  [types.SET_in_bg](state, in_bg) {
    state.in_bg = in_bg
  },
  [types.SET_playlist](state, playlist) {
    state.playlist = playlist
  },
  [types.SET_sequenceList](state, sequenceList) {
    state.sequenceList = sequenceList
  },
  [types.SET_playing](state, flag) {
    state.playing = flag
  },
  [types.SET_fullScreen](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_mode](state, mode) {
    state.mode = mode
  },
  [types.SET_currentIndex](state, currentIndex) {
    state.currentIndex = currentIndex
  },
  [types.SET_skrollr](state, allskrollr) {
    state.allskrollr = allskrollr
  },
  [types.SET_showlist](state, showlist) {
    state.showlist = showlist
  },
}

export default mutations
