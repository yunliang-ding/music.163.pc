import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Skeleton } from 'antd';
import { List, Badge, SwipeAction, Toast } from 'antd-mobile'
import './index.less'
import { toJS } from 'mobx';
const { Item } = List
const { Brief } = Item
@inject('Music')
@observer
class Table extends React.Component<any, any> {
  render() {
    const {
      data,
      init,
      count,
      height
    } = this.props
    const {
      player,
      userInfo: {
        likelist
      },
      music: {
        id,
        playing
      }
    } = this.props.Music
    return init ? <Skeleton active avatar paragraph={{ rows: 3 }} /> : <div className='app-mobile-table' style={{
      height
    }}>
      <List renderHeader={() => null} className='my-list'>
        {
          data.map((record, index) => {
            return <SwipeAction
              key={record.id}
              style={{ backgroundColor: 'gray' }}
              autoClose
              right={[
                {
                  text: '收藏',
                  onPress: () => {
                  },
                  style: { backgroundColor: 'var(--theme-color)', color: 'white' },
                },
              ]}
              onOpen={() => console.log('global open')}
              onClose={() => console.log('global close')}
            >
              <Item
                key={record.id}
                extra={
                  <div className='am-list-extra-text'>
                    {id === record.id && <i className={playing ? 'iconfont icon-materialyinlebofangjiezougan play-active' : 'iconfont icon-materialyinlebofangjiezougan'}></i>}
                    {
                      toJS(likelist).includes(record.id) ? <i className='iconfont icon-xihuan11' onClick={
                        async (e) => {
                          e.stopPropagation()
                          const { code, message } = await this.props.Music.setLike(record.id)
                          if (code === 200) {
                            Toast.success('已取消喜欢！')
                          } else {
                            Toast.fail(message)
                          }
                        }
                      }></i> : <i className='iconfont icon-xihuan1' onClick={
                        async (e) => {
                          e.stopPropagation()
                          const { code, message } = await this.props.Music.setLike(record.id)
                          if (code === 200) {
                            Toast.success('已添加至喜欢列表！')
                          } else {
                            Toast.fail(message)
                          }
                        }
                      }></i>
                    }

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
            </SwipeAction>
          })
        }
      </List>
    </div>
  }
}
export { Table }