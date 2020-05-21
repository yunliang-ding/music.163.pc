import * as React from "react"
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import Table from 'antd/es/table'
import Message from 'antd/es/message'
import Empty from 'antd/es/empty'
import { Skeleton } from 'antd';
import './index.less'
const $ = document.querySelector.bind(document)
@inject('Music', 'UI')
@observer
class CommonTable extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  render() {
    const {
      music,
      player,
      userInfo: {
        likelist
      }
    } = this.props.Music
    const {
      data,
      init
    } = this.props
    const columns = [
      {
        title: '',
        dataIndex: 'id',
        key: 'id',
        width: '15%',
        render: (id, record) => {
          return <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              width: '30%',
              textAlign: 'center'
            }}>{String(record.sort).padStart(2, "0")}</span>
            <i 
              style={{
                color: 'var(--theme-color)',
                visibility: toJS(likelist).includes(record.id) ? 'visible' : 'hidden',
                marginRight:8
              }} 
              className='iconfont icon-xihuan'
            >
            </i> 
            <i className={id === music.id ? 'iconfont icon-bofang music-playing' : 'iconfont icon-bofang'} style={{
              cursor: 'pointer',
              width: '30%'
            }} onClick={
              () => {
                player({
                  id,
                  name: record.name,
                  duration: record.duration,
                  artists: record.artists
                })
              }
            }></i>
            <img src={record.image + '?param=30y30'} style={{
              borderRadius: 4,
              width: 30,
              height: 30
            }}></img>
          </div>
        }
      }, {
        title: <span>音乐标题</span>,
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        width: '30%',
        render: (name, record) => {
          return <div title={name} style={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative'
          }}>
            <div style={{
              width: 180,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {name}
              {
                (record.mvid !== 0) && <i className='iconfont icon-mv' onClick={
                  async () => {
                    await this.props.Music.queryMusicMv(record.mvid)
                    this.props.Music.setPlaying(false)
                  }
                }></i>
              }
            </div>
            <div className='music-table-tools-list' id={'tools' + record.id} style={{ display: 'none', marginLeft: 20 }}>
              <span className='music-table-tools'>
                {
                  toJS(likelist).includes(record.id)
                    ? <i className='iconfont icon-xihuan' title='点击取消喜欢'></i>
                    : <i className='iconfont icon-xihuan1' title='点击添加喜欢' onClick={
                      async () => {
                        const { code, message } = await this.props.Music.setLike(record.id)
                        if (code === 200) {
                          Message.success('已添加至喜欢列表！')
                        } else {
                          Message.error(message)
                        }
                      }
                    }></i>
                }
              </span>
              <span className='music-table-tools' title='收藏'>
                <i className='iconfont icon-shoucang' onClick={
                  () => {
                    this.props.UI.setCollectionModel('visable', true)
                    this.props.UI.setCollectionModel('musicId', record.id)
                  }
                }></i>
              </span>
              <span className='music-table-tools' title={'下载'}>
                <i className='iconfont icon-xiazai1'></i>
              </span>
            </div>
          </div>
        }
      }, {
        title: <span>歌手</span>,
        dataIndex: 'artists',
        key: 'artists',
        width: '20%'
      }, {
        title: '专辑',
        dataIndex: 'album',
        key: 'album',
        ellipsis: true,
        width: '20%',
        render: (_item) => {
          return <div title={_item.name} style={{
            width: 150,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            《 {_item.name} 》
          </div>
        }
      }, {
        title: <span>时长</span>,
        dataIndex: 'duration',
        key: 'duration',
        width: '10%',
        render: (_item) => {
          return <div>
            {Math.floor(_item / 1000 / 60).toString().padStart(2, '0')}
            :
            {Math.floor(_item / 1000 % 60).toString().padStart(2, '0')}
          </div>
        }
      }]
    return init ? <Skeleton active /> : (toJS(data).length === 0 
      ? <div className='app-common-table-empty'>
         <Empty />
      </div> 
      : <div className='app-common-table'>
        <Table
          dataSource={toJS(data)}
          rowKey='id'
          columns={columns}
          pagination={false}
          scroll={{ y: 300 }}
          onRow={record => {
            return {
              onMouseEnter: (e) => {
                $(`#tools${record.id}`).style.display = 'inline-block'
              },
              onMouseLeave: (e) => {
                $(`#tools${record.id}`).style.display = 'none'
              },
            };
          }}
        />
      </div>)
  }
}
export { CommonTable }