import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Input from 'antd/es/input'
import Menu from 'antd/es/menu'
import Dropdown from 'antd/es/dropdown'
@inject('Music', 'UI')
@observer
class Header extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  render() {
    const {
      searchForm: {
        keywords
      },
      setSearchForm
    } = this.props.Music
    const themes = [{
      background: 'cadetblue'
    }, {
      background: 'green'
    }, {
      background: 'red'
    }, {
      background: 'skyblue'
    }]
    const menu = <Menu>
      <Menu.Item>
        <div className='app-theme-item'>
          {
            themes.map(_theme => {
              return <span style={{ background: _theme.background }} onClick={
                (e) => {
                  e.stopPropagation()
                  let href: any = document.querySelector('#app-theme').getAttribute('href').split('/');
                  href[href.length - 1] = _theme.background + '.css'
                  document.querySelector('#app-theme').setAttribute('href', href.join('/'))
                }
              } />
            })
          }
        </div>
      </Menu.Item>
    </Menu>
    return <div className='app-header'>
      <div className='app-header-left'>
        <i className='iconfont icon-wangyiyunyinle'></i>
        <b>网易云音乐</b>
        <i className='iconfont icon-qianjin-copy-copy' onClick={
          () => {
            window.history.go(-1)
          }
        }></i>
        <i style={{marginLeft: 10}} className='iconfont icon-qianjin-Outline'  onClick={
          () => {
            window.history.go(1)
          }
        }></i>
      </div>
      <div className='app-header-right'>
        <Input
          placeholder='关键字查找-回车'
          prefix={<i className='iconfont icon-search'></i>}
          defaultValue={keywords}
          onPressEnter={
            (e: any) => {
              setSearchForm('keywords', e.target.value)
              window.location.hash = '/app/music.163.search'
            }
          }
        />
        <div className='app-header-tools'>
          <Dropdown overlay={menu}>
            <i className='iconfont icon-palette'></i>
          </Dropdown>
        </div>
      </div>
    </div>
  }
}
export { Header }