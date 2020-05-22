import * as React from "react"
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Table, Button } from 'react-ryui'
import Message from 'antd/es/message'
import './index.less'
const $ = document.querySelector.bind(document)
@inject('Music', 'UI')
@observer
class RecordTable extends React.Component<any, any> {
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
    window.parent.addEventListener('resize', (e) => {
      this.tableNode && this.setState({
        tableHeight: this.tableNode.getBoundingClientRect().height
      })
    })
    window.parent.document.querySelector('iframe').contentWindow.addEventListener('resize', (e) => {
      this.tableNode && this.setState({
        tableHeight: this.tableNode.getBoundingClientRect().height
      })
    })
  }
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
    const columns = [{
      label: '',
      dataIndex: 'id',
      key: 'id',
      width: '33.3%',
      render: (id, record) => {
        return <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 120
        }}>
          <span style={{
            width: '30%'
          }}>{String(record.sort).padStart(2, "0")}</span>
          <i style={{
            color: 'var(--theme-color)',
            visibility: toJS(likelist).includes(record.id) ? 'visible' : 'hidden',
            marginRight: 8
          }}
            className='iconfont icon-xihuan'
          >
          </i>
          <i className={id === music.id ? 'iconfont icon-shengyin' : 'iconfont icon-bofang'} style={{
            cursor: 'pointer',
            width: '30%'
          }} onClick={
            () => {
              player({
                id: record.song.id,
                name: record.song.name,
                duration: record.song.dt,
                artists: record.song.ar[0].name
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
      width: '33.3%',
      render: (name, record) => {
        return <div title={name + '-' + record.artists} style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div style={{
            width: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
            {name}<span style={{ opacity: 0.7 }}>  -  {record.artists}</span>
            {
              (record.song.mv !== 0) && <i className='iconfont icon-mv' onClick={
                async () => {
                  await this.props.Music.queryMusicMv(record.song.mv)
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
            <span className='music-table-tools'>
              <i className='iconfont icon-shoucang' onClick={
                () => {
                  this.props.UI.setCollectionModel('visable', true)
                  this.props.UI.setCollectionModel('musicId', record.id)
                }
              }></i>
            </span>
            <span className='music-table-tools'>
              <i className='iconfont icon-xiazai1'></i>
            </span>
          </div>
        </div>
      }
    }, {
      label: '播放次数',
      dataIndex: 'playCount',
      key: 'playCount',
      width: '33.3%',
      className: 'music-score',
      render: (playCount, record) => {
        return <div style={{
          height: 42,
          display: 'flex',
          alignItems: 'center',
          width: record.score + '%',
          background: this.props.UI.theme === 'dark' ? '#3c3b3b1f' : '#9dc3ec47',
          padding: '0 10px',
          whiteSpace: 'nowrap',
        }}>
          <span>{playCount} 次</span>
        </div>
      }
    }]
    let theme = this.props.UI.theme === 'dark' ? '-dark' : ''
    return <div className={`app-record-table${theme}`}>
      <div className='app-record-header'>
        <div className='app-record-header-tips'>
          <b>《听歌排行》亲爱的！这是你在网易云的第</b>
          <span className='app-record-header-tips-days'>{Math.floor((new Date().getTime() - createTime) / 1000 / 60 / 60 / 24)}</span>
          <b>天</b>
          <Button
            dark={this.props.UI.theme === 'dark'}
            style={{ width: 80, margin: '0 20px' }}
            label='播放全部'
            onClick={
              () => {
                pushMusicCache(data)
              }
            }
          />
        </div>
        <div style={{display: 'flex', width: 140, justifyContent: 'space-between'}}>
          <Button
            label='本周'
            dark={this.props.UI.theme === 'dark'}
            style={{ width: 60 }}
            type={type === 1 ? 'blue' : 'normal'}
            onClick={
              () => {
                setSearchRecordForm('type', 1)
              }
            }
          />
          <Button
            label='所有'
            style={{ width: 60 }}
            dark={this.props.UI.theme === 'dark'}
            type={type === 0 ? 'blue' : 'normal'}
            onClick={
              () => {
                setSearchRecordForm('type', 0)
              }
            }
          />
        </div>
      </div>
      {
        init ? <div className='app-common-table-empty' ref={table => { this.tableNode = table }}>
            Loading...
          </div>
          : <div className='app-record-list' ref={table => { this.tableNode = table }}>
            <Table
              style={{ height: this.state.tableHeight, border: 'none' }}
              dark={this.props.UI.theme === 'dark'}
              data={toJS(data)}
              colmun={columns}
            />
          </div>
      }
    </div>
  }
}
export { RecordTable }