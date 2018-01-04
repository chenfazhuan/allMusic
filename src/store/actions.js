import * as types from './mutation-types'
function findIndex(list, song) {
  let lid=[];
  for(let i=0;i<list.length;i++){
    lid.push(list[i].id)
  }
  return lid.findIndex(function(x) { x == song; })
}

export const selectPlay=function ({commit,state},{list,index}) {
  commit(types.SET_sequenceList,list)
  commit(types.SET_playlist,list)
  commit(types.SET_fullScreen,true)
  commit(types.SET_currentIndex,index)
  commit(types.SET_playing,true)
}

export const addPlay=function ({commit,state},song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let fpIndex = findIndex(playlist, song.id)
  if(fpIndex==-1){
    sequenceList.unshift(song)
    playlist.unshift(song)
    currentIndex=0
  }
  commit(types.SET_sequenceList,playlist)
  commit(types.SET_playlist,sequenceList)
  // commit(types.SET_fullScreen,true)
  commit(types.SET_currentIndex,currentIndex)
  commit(types.SET_playing,true)
}
export const delOne=function ({commit,state},index) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  playlist.splice(index, 1);
  commit(types.SET_sequenceList,playlist)
  commit(types.SET_playlist,playlist)
  // commit(types.SET_fullScreen,true)
  commit(types.SET_currentIndex,currentIndex)
  commit(types.SET_playing,true)
}
