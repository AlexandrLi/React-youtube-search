import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';
import {init as firebaseInit} from './'

import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

const API_KEY = 'AIzaSyAZyEwQfQ8weoshnlvjy4EUziSl9dw1-9w';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.videoSearch('ReactJS');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      })
    });
  }

  render() {
    const videoSearch = _.debounce(term => { this.videoSearch(term) }, 500);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <div className="row">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList videos={this.state.videos} onVideoSelect={selectedVideo => this.setState({ selectedVideo })} />
        </div>
      </div>
    )
  }

}

ReactDOM.render(< App />, document.getElementById('root'));
registerServiceWorker();