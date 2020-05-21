import * as React from "react"
import { observer, inject } from 'mobx-react'
import { Accordion, List, Badge } from 'antd-mobile';
import './index.less'
@inject('Music', 'UI')
@observer
class WdgdIndex extends React.Component<any, any> {
  render() {
    const {
      userInfo: {
        playlist,
        userId
      },
      queryPlaylistSong
    } = this.props.Music
    const createPlaylist = playlist && playlist.filter(_item => {
      return _item.userId === userId
    }) || []
    const collPlaylist = playlist && playlist.filter(_item => {
      return _item.userId !== userId
    }) || []
    return <div className='app-mobile-wdgd'>
      <Accordion defaultActiveKey="0" className="wdgd-accordion" onChange={(e) => {
        console.log(e)
      }}>
        <Accordion.Panel header={
          <span className='wdgd-accordion-hot'>
            我创建的歌单
            <Badge text={createPlaylist.length} hot style={{marginLeft: 10}} />
          </span>
        }>
          <List className="my-list1">
            {
              createPlaylist.map(record => {
                return <List.Item
                  key={record.id}
                  extra={
                    <div>
                      {record.trackCount}
                    </div>
                  }
                  platform='android'
                  align='middle'
                  thumb={record.coverImgUrl + '?param=100y100'}
                  multipleLine
                  onClick={() => {
                    queryPlaylistSong(record.id)
                    this.props.UI.setNavTitle(
                      record.name.length > 6 ? record.name.substring(0,6) + '...' : record.name
                    )
                    location.hash = `app-mobile/music.163.wdgd/${record.id}`
                  }}
                >
                  <div className='app-mobile-table-sort'>
                    {record.name}
                  </div>
                  <List.Item.Brief>{new Date(record.trackUpdateTime).toLocaleString()}</List.Item.Brief>
                </List.Item>
              })
            }
          </List>
        </Accordion.Panel>
        <Accordion.Panel header={
          <span className='wdgd-accordion-hot'>
            我收藏的歌单
            <Badge text={collPlaylist.length} hot style={{marginLeft: 10}} />
          </span>
        }>
          <List className="my-list2">
            {
              collPlaylist.map(record => {
                return <List.Item
                  key={record.id}
                  extra={
                    <div>
                      {record.trackCount}
                    </div>
                  }
                  platform='android'
                  align='middle'
                  thumb={record.coverImgUrl + '?param=100y100'}
                  multipleLine
                  onClick={() => { 
                    queryPlaylistSong(record.id)
                    this.props.UI.setNavTitle(
                      record.name.length > 6 ? record.name.substring(0,6) + '...' : record.name
                    )
                    location.hash = `app-mobile/music.163.wdgd/${record.id}`
                  }}
                >
                  <div className='app-mobile-table-sort'>
                    {record.name}
                  </div>
                  <List.Item.Brief>{new Date(record.trackUpdateTime).toLocaleString()}</List.Item.Brief>
                </List.Item>
              })
            }
          </List>
        </Accordion.Panel>
      </Accordion>
    </div>
  }
}
export { WdgdIndex }