import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
import { CommonTable } from "../common/index"
import { Button } from 'react-ryui'
@inject('Music', 'UI')
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
    let theme = this.props.UI.theme === 'dark' ? '-dark' : ''
    return <div className={`app-liked${theme}`}>
      <div className='app-liked-header'>
        <i className='iconfont icon-xihuanlike'></i>
        <span>累计喜欢 {count} 首歌曲</span>
        <Button
          dark={this.props.UI.theme === 'dark'}
          style={{width: 80, position: 'absolute', right: 30}}
          label='播放全部'
          onClick={
            () => {
              pushMusicCache(data)
            }
          } 
        />
      </div>
      <div className='app-liked-list'>
        <CommonTable data={data} init={init} />
      </div>
    </div>
  }
}
export { Liked }