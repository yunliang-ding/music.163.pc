import * as React from "react"
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Table } from 'react-ryui'
import Message from 'antd/es/message'
import './index.less'
@inject('Music', 'UI')
@observer
class CommonTable extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
    this.state = {
      tableHeight: 0
    }
  }
  componentDidMount() {
    this.setState({
      tableHeight: this.tableNode.getBoundingClientRect().height
    })
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
        label: '',
        dataIndex: 'id',
        key: 'id',
        width: '20%',
        render: (id, record) => {
          return <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%'
          }}>
            <span style={{
              width: '30%',
              textAlign: 'center'
            }}>{String(record.sort).padStart(2, "0")}</span>
            <i
              style={{
                color: 'var(--theme-color)',
                visibility: toJS(likelist).includes(record.id) ? 'visible' : 'hidden',
                marginRight: 8
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
        label: <span>音乐标题</span>,
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        width: '20%',
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
        label: <span>歌手</span>,
        dataIndex: 'artists',
        key: 'artists',
        width: '20%'
      }, {
        label: '专辑',
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
        label: <span>时长</span>,
        dataIndex: 'duration',
        key: 'duration',
        width: '20%',
        render: (_item) => {
          return <div>
            {Math.floor(_item / 1000 / 60).toString().padStart(2, '0')}
            :
            {Math.floor(_item / 1000 % 60).toString().padStart(2, '0')}
          </div>
        }
      }]
    return toJS(data).length === 0
      ? <div className='app-common-table-empty' ref={table => { this.tableNode = table }}>
        Loading...
      </div>
      : <div className='app-common-table' ref={table => { this.tableNode = table }}>
        <Table
          style={{ height: this.state.tableHeight, border: 'none' }}
          dark={this.props.UI.theme === 'dark'}
          data={toJS(data)}
          colmun={columns}
        />
      </div>
  }
}
export { CommonTable }