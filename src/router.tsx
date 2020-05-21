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
class AppRouter extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Redirect from='/' to={'/app/music.163.discovery'} />
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
      </Router>
    )
  }
}
export { AppRouter }
