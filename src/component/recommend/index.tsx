import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
import { CommonTable } from '../common/index'
import Button from 'antd/es/button'
const weekMapping = {
  '0': '周 日',
  '1': '周 一',
  '2': '周 二',
  '3': '周 三',
  '4': '周 四',
  '5': '周 五',
  '6': '周 六',
}
@inject('Music', 'UI')
@observer
class RecommendTable extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  render() {
    const {
      pushMusicCache,
      recommendArray: {
        data,
        init
      }
    } = this.props.Music
    return <div className='app-recommend-table'>
      <div className='app-recommend-header'>
        <div className='dates'>
          <div className='datas-weeks'>
            {
              weekMapping[new Date().getDay()]
            }
          </div>
          <div className='datas-days'>
            {
              new Date().getDate()
            }
          </div>
        </div>
        <div className='infos'>
          <h3>每日歌曲推荐</h3>
          <h5>
            依据您的音乐口味生成, 6:00 准时更新
            <Button className='ant-btn-bf-all' onClick={
              () => {
                pushMusicCache(data)
              }
            }>
              <i className='iconfont icon-bofang'></i>
              播放全部
            </Button>
          </h5>
        </div>
      </div>
      <div className='app-recommend-list'>
        <CommonTable data={data} init={init} />
      </div>
    </div>
  }
}
export { RecommendTable }