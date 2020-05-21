import * as React from 'react'
import { Router, Route, hashHistory, Redirect } from 'react-router'
import { Layout } from './layout/index'
import { LikePage } from './pages/liked'
import { PlayList } from './pages/playlist'
import { Recommend } from './pages/recommend'
import { Record } from './pages/record'
import { Search } from './pages/search'
import { Song } from './pages/song'
import { Discovery } from './pages/discovery'
import { FM } from './pages/fm'
import { Video } from './pages/video'
import { Friends } from './pages/friends'
/**
  app-mobile
*/
import { LayoutMobile } from './mobile/layout/index'
import { Mrtj } from './mobile/pages/mrtj'
import { Bfjl } from './mobile/pages/bfjl'
import { Xhdg } from './mobile/pages/xhdg'
import { Wdgd } from './mobile/pages/wdgd'
import { Login } from './mobile/pages/login'
class AppRouter extends React.Component {
  isPc = () => {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }
  render() {
    return (
      <Router history={hashHistory}>
        <Redirect from='/' to={ this.isPc() ? '/app/music.163.discovery' : '/app-mobile/music.163.mrtj' } />
        <Route path='/app' component={Layout}>
          <Route path={'music.163.liked'} component={LikePage} />
          <Route path={'music.163.playlist(/:id)'} component={PlayList} />
          <Route path={'music.163.recommend'} component={Recommend} />
          <Route path={'music.163.record'} component={Record} />
          <Route path={'music.163.search'} component={Search} />
          <Route path={'music.163.song(/:songId)'} component={Song} />
          <Route path={'music.163.discovery'} component={Discovery} />
          <Route path={'music.163.fm'} component={FM} />
          <Route path={'music.163.video'} component={Video} />
          <Route path={'music.163.friends'} component={Friends} />
        </Route>
        <Route path='/app-mobile' component={LayoutMobile}>
          <Route path={'music.163.mrtj'} component={Mrtj} />
          <Route path={'music.163.bfjl'} component={Bfjl} />
          <Route path={'music.163.xhdg'} component={Xhdg} />
          <Route path={'music.163.wdgd(/:id)'} component={Wdgd} />
        </Route>
        <Route path={'/app-mobile/music.163.login'} component={Login} />
      </Router>
    )
  }
}
export { AppRouter }
