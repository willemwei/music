import * as types from './mutation-types';
import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/util';
import {saveSearch, deleteSearch, clearSearch, savePlay} from 'common/js/cache';

function getIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id;
  });
}

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list);
  if (state.mode === playMode.random) {
    let randomlist = shuffle(list);
    commit(types.SET_PLAYLIST, randomlist);
    index = getIndex(randomlist, list[index]);
  } else {
    commit(types.SET_PLAYLIST, list);
  }
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random);
  commit(types.SET_SEQUENCE_LIST, list);
  let randomlist = shuffle(list);
  commit(types.SET_PLAYLIST, randomlist);
  commit(types.SET_CURRENT_INDEX, 0);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
};

export function insertSong({commit, state}, song) {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  // 记录当前歌曲
  let currentSong = playlist[currentIndex];

  // 查找当前列表是否存在要插入歌曲
  let fpIndex = getIndex(playlist, song);

  // 插入歌曲 索引+1
  currentIndex++;
  playlist.splice(currentIndex, 0, song);

  // 已经包含这首歌  删除
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playlist.splice(fpIndex + 1, 1);
    }
  }

  let currentSIndex = getIndex(sequenceList, currentSong) + 1;
  let fsIndex = getIndex(sequenceList, song);

  sequenceList.splice(currentSIndex, 0, song);

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}

export function saveSearchHistroy({commit}, query) {
  commit(types.SET_SEACH_HISTRY, saveSearch(query));
}

export function deleteSearchHistory({commit}, query) {
  commit(types.SET_SEACH_HISTRY, deleteSearch(query));
}

export function clearSearchHistory({commit}) {
  commit(types.SET_SEACH_HISTRY, clearSearch());
}

export function deleteSong({commit, state}, song) {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  let pIndex = getIndex(playlist, song);
  playlist.splice(pIndex, 1);
  let sIndex = getIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--;
  }

  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);

  const playingState = playlist.length > 0;

  commit(types.SET_PLAYING_STATE, playingState);
}

export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, []);
  commit(types.SET_SEQUENCE_LIST, []);
  commit(types.SET_CURRENT_INDEX, -1);
  commit(types.SET_PLAYING_STATE, false);
};

export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song));
};
