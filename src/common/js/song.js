import {getLyric} from '../../api/song'
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  getLyric () {
    console.log('获取歌词')
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.status === 200) {
          this.lyric = res.data
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong (musicData) {
  // console.log(musicData)
  const ret = getSinger(musicData.singer)
  return new Song({
    id: ret.id,
    mid: musicData.songmid,
    singer: ret.name,
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `https://v1.itooi.cn/tencent/url?id=${musicData.songmid}&quality=128`
  })
}

function getSinger (singer) {
  let ret
  if (singer instanceof Object) {
    singer.forEach(s => {
      ret = s
    })
  }
  return ret
}
export function createRecommendSong (musicData) {
  return new Song({
    id: musicData.ksong.id,
    mid: musicData.ksong.mid,
    singer: musicData.singer[0].name,
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: `https://v1.itooi.cn/tencent/url?id=${musicData.ksong.mid}&quality=128`
  })
}

export function createTopListSong (musicData) {
  return new Song({
    id: musicData.ksong.id,
    mid: musicData.mid,
    singer: musicData.singer[0].name,
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: `https://v1.itooi.cn/tencent/url?id=${musicData.mid}&quality=128`
  })
}

// export function createInsertSong (musicData) {
//   return new Song({
//     id: musicData.id,
//     mid: musicData.mid,
//     singer: musicData.singer,
//     name: musicData.name,
//     album: musicData.album,
//     duration: musicData.duration,
//     image: musicData.image,
//     url: musicData.url
//   })
// }
