export const way = state => state.way
export const h_bg = state => state.h_bg
export const in_bg = state => state.in_bg
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const allskrollr = state => state.allskrollr
export const showlist = state => state.showlist
//计算当前歌曲
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

