import * as React from "react"
import { observer, inject } from 'mobx-react'
import Pagination from 'antd/es/pagination'
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import './index.less'
@inject('Music')
@observer
class MusicComment extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    const {
      music: {
        comment
      },
      simiArray:{
        data
      },
      player,
      setCommentForm,
      commentForm:{
        offset,
        limit,
        count
      }
    } = this.props.Music
    return <div className='app-song-comment'>
      <div className='app-song-comment-left'>
        <div className='app-song-comment-title'>
          <strong>所有评论</strong>
          <span>共{count}条评论</span>
        </div>
        <div className='app-song-comment-body'>
          {
            comment && comment.map(_item=>{
              return <Comment
                actions={[
                  <span key="comment-basic-like">
                    <Tooltip title="Like">
                      <Icon
                        type="like"
                        theme={'filled'}
                      />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>{_item.likedCount}</span>
                  </span>,
                  <span key="comment-basic-reply-to">Reply to</span>,
                ]}
                author={<a>{_item.user.nickname}</a>}
                avatar={
                  <Avatar
                    src={_item.user.avatarUrl + '?param=50y50'}
                    alt="{_item.user.nickname}"
                  />
                }
                content={
                  <p style={{fontSize: 12}}>
                    {_item.content}
                  </p>
                }
                datetime={
                  <Tooltip>
                    <span>{new Date(_item.time).toLocaleString()}</span>
                  </Tooltip>
                }
              />
            })
          }
        </div>
        <div className='app-song-comment-pagination'>
          <Pagination
            current={offset + 1}
            total={count}
            pageSize={limit}
            onChange={
              (page) => {
                setCommentForm('offset', page - 1)
              }
            }
            onShowSizeChange={
              (current, size) => {
                setCommentForm('limit', size)
              }
            }
          />
        </div>
      </div>
      <div className='app-song-comment-right'>
        <div className='app-song-simi'>
          <div className='app-song-simi-title'>
            相似歌曲
          </div>
          {
            data && data.map(_item=>{
              return <div className='app-song-simi-item' key={_item.id}>
                <div className='simi-img'>
                  <img src={_item.album.blurPicUrl + '?param=34y34'} />
                </div>
                <div className='simi-name'>
                  <span>{_item.name}</span>
                  <br />
                  {_item.artists[0].name}
                </div>
                <div className='simi-player'>
                  <i className='iconfont icon-youjiantoushixinxiao' onClick={
                    () => {
                      player({
                        id: _item.id,
                        name: _item.name,
                        duration: _item.duration,
                        artists: _item.artists[0].name
                      })
                    }
                  }></i>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  }
}
export { MusicComment }