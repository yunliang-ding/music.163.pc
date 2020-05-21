import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
import { toJS } from 'mobx'
import Button from 'antd/es/button'
import Empty from 'antd/es/empty'
import { List, Badge } from 'antd-mobile'
import { Skeleton } from 'antd'
const { Item } = List
const { Brief } = Item
@inject('Music')
@observer
class BfjlTable extends React.Component<any, any> {
  render() {
    const {
      music,
      recordArray: {
        data,
        init
      },
      userInfo: {
        createTime,
        likelist
      },
      searchRecordForm: {
        type
      },
      setSearchRecordForm,
      player,
      pushMusicCache
    } = this.props.Music
    return <div className='app-mobile-bfjl'>
      <div className='app-record-table'>
        <div className='app-record-header'>
          <div className='btns'>
            <Button className={type === 1 ? 'type-active' : ''} onClick={
              () => {
                setSearchRecordForm('type', 1)
              }
            }>
              本周
            </Button>
            <Button className={type === 0 ? 'type-active' : ''} onClick={
              () => {
                setSearchRecordForm('type', 0)
              }
            }>
              所有
            </Button>
          </div>
        </div>
        {
          init ? <Skeleton active avatar paragraph={{ rows: 3 }} /> : toJS(data).length === 0
            ? <div className='app-common-table-empty'>
              <Empty />
            </div>
            : <div className='app-bfjl-list'>
              <List renderHeader={() => null} className='my-list'>
                {
                  data.map((record, index) => {
                    return <Item
                      key={record.id}
                      extra={
                        <div>
                          {String(record.playCount).padStart(2, '0')}次
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
                      <Brief>{record.artists}</Brief>
                    </Item>
                  })
                }
              </List>
            </div>
        }
      </div>
    </div>
  }
}
export { BfjlTable }