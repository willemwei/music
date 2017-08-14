<template>
  <transition name="slide">
    <v-music-list :title="title" :bg-image="bgImage" :songs="songs"></v-music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list';
  import {mapGetters} from 'vuex';
  import {getSongList} from 'api/recommend';
  import {ERR_OK} from 'api/config';
  import {createSong} from 'common/js/song';

  export default {
    data() {
      return {
        songs: []
      };
    },
    components: {
      'v-music-list': MusicList
    },
    computed: {
      title() {
        return this.disc.dissname;
      },
      bgImage() {
        return this.disc.imgurl;
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList();
    },
    methods: {
      _getSongList() {
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist);
          }
        });
      },
      _normalizeSongs(list) {
        let ret = [];
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData));
          }
        });

        return ret;
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .slide-enter-active,
  .slide-leave-active {
    transition: all .3s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
