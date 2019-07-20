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
}

export function createSong (musicData) {
  const ret = getSinger(musicData.singer)
  return new Song({
    id: ret.id,
    mid: ret.mid,
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
