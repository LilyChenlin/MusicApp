// 搜索
export default class ZhiDa {
  constructor ({albumnum, singerid, singermid, singername, songnum, type}) {
    this.albumnum = albumnum
    this.singerid = singerid
    this.singermid = singermid
    this.singername = singername
    this.songnum = songnum
    this.type = type
  }
}

export function createZhiDa (musicData) {
  return new ZhiDa({
    albumnum: musicData.albumid,
    singerid: musicData.singer[0].id,
    singermid: musicData.singer[0].mid,
    singername: musicData.singer[0].name,
    songname: musicData.songname,
    type: musicData.type
  })
}
