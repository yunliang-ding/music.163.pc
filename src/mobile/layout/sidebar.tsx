import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { List, Badge } from 'antd-mobile'
const { Item } = List
const { Brief } = Item
import './index.less'
@inject('Music', 'UI')
@observer
class Sidebar extends React.Component<any, any> {
  [x: string]: any
  render() {
    const {
      musicsCache,
      music: {
        id,
        playing
      },
      player,
      removeMusicCache,
      removeMusicCacheById
    } = this.props.Music
    const { setDrawer } = this.props.UI
    return <div className='app-mobile-sidebar'>
      <List renderHeader={
        () => <div className='app-mobile-sidebar-list-header'>
          <span>
            播放列表({musicsCache.length})
            <span style={{marginLeft: 10}} onClick={removeMusicCache}>
              清空
            </span>
          </span>
          <span onClick={
            () => {
              setDrawer(false)
            }
          }>
            关闭
          </span>
        </div>
      } className='my-list'
      >
        {
          musicsCache.map((record, index) => {
            return <Item
              extra={
                <div className='am-list-extra-text' onClick={
                  (e) => {
                    e.stopPropagation()
                    removeMusicCacheById(record.id)
                  }
                }>
                  <i className='icon-shanchu iconfont' style={{fontSize:18}}></i>
                </div>
              }
              platform='android'
              align='middle'
              thumb={record.image + '?param=100y100'}
              multipleLine
              onClick={() => {
                player({
                  id: record.id,
                  name: record.name,
                  duration: record.duration,
                  artists: record.artists
                })
              }}
            >
              <div className='app-mobile-table-sort'>
                <span style={{ marginRight: 8 }}>
                  <Badge text={String(index + 1).padStart(2, '0')} hot />
                </span>
                {record.name}
              </div>
              <Brief>{record.artists}/{record.album ? record.album.name : '未知'}</Brief>
            </Item>
          })
        }
      </List>
    </div >
  }
}
export { Sidebar }