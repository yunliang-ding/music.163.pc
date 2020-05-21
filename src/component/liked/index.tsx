import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
import { CommonTable } from "../common/index"
import Button from 'antd/es/button'
@inject('Music')
@observer
class Liked extends React.Component<any, any> {
  [x: string]: any;
  constructor(props) {
    super(props)
  }
  render() {
    const {
      likelistArray: {
        data,
        count,
        init
      },
      pushMusicCache
    } = this.props.Music
    return <div className='app-liked'>
      <div className='app-liked-header'>
        <i className='iconfont icon-xihuanlike'></i>
        <span>累计喜欢 {count} 首歌曲</span>
        <Button className='ant-btn-bf-all' onClick={
          () => {
            pushMusicCache(data)
          }
        }>
          <i className='iconfont icon-bofang'></i>
          播放全部
        </Button>
      </div>
      <div className='app-liked-list'>
        <CommonTable data={data} init={init} />
      </div>
    </div>
  }
}
export { Liked }