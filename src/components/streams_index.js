import React, { Component } from 'react';
import { connect } from 'react-redux';

import Player from './player_index';
import ChannelList from './channel_list';
import GamesMenu from './games_menu';
import Loader from './ui_widgets/loader';
import QRCodeQR from './ui_widgets/qrCode';


import { getTopGames, 
        getTopStreams, 
        findGameByName, 
        findGameByID, 
        playNext, 
        playPrevious, 
        channelListMount,
        switchChannelList,
        gamesMenuMount,
        isLoading
    } from '../actions/index';





class StreamIndex extends Component {
    constructor(props) {
        super(props);

        this.handleKey = this.handleKey.bind(this);
        this.changeStream = this.changeStream.bind(this);

    }

    componentWillMount() {
    document.addEventListener('keydown', this.handleKey, false);
    this.props.isLoading(true);
    this.props.getTopGames(false);
    this.props.getTopStreams(true);
    this.props.channelListMount(false);
    this.props.gamesMenuMount(true);    
    }

    handleKey(e) {
    if(this.props.isChannelListMounted || this.props.isGamesMounted) {
        return;
    }
    e.preventDefault();

       if(e.keyCode == 33 || e.keyCode == 34) {
           this.changeStream(e.keyCode);
       }
       if(e.keyCode == 37) {
           this.handleChannelList(!this.props.isChannelListMounted);
       }
       if(e.keyCode == 13) {
           this.handleGamesMenu(!this.props.isGamesMounted)
       }
    }
    changeStream(keyCode) {
        if(keyCode == 33) {
            this.playNextStream();
        } else if (keyCode == 34) {
            this.playPreviousStream();
        }
        return;
    }
    // Currently uses default stream list.
    playNextStream() {
        const { currentlyPlaying, currentChannelList} = this.props;
        this.props.playNext(currentlyPlaying, currentChannelList);
    }
    // Currently uses default stream list.
    playPreviousStream() {
      const { currentlyPlaying, currentChannelList } = this.props;
      this.props.playPrevious(currentlyPlaying, currentChannelList);

    }
    handleChannelList(boo) {
        this.props.channelListMount(boo);
        
    }
    handleGamesMenu(boo) {
        this.props.gamesMenuMount(boo, true);
    }
    render() {


        return (<div> 
            {this.props.loading && <Loader /> }
            {this.props.isGamesMounted && <GamesMenu gamesMenuMount={this.handleGamesMenu.bind(this)}/>}
            {this.props.isChannelListMounted && <ChannelList handleChannelList={this.handleChannelList.bind(this)}/>}
            {this.props.isChannelListMounted && <div className="list-name-container">
                        <div className="list-name">{this.props.currentListName || ''}</div>
                    </div>}
            {this.props.currentlyPlaying !== null  && <Player />} 
           
        </div>);
    }
}
function mapStateToProps({ topGames, topStreams, byNameResult, byIdResult, currentlyPlaying, isChannelListMounted, isGamesMounted, currentListName, currentChannelList, loading }) {
    return { topGames, topStreams, byNameResult, byIdResult, currentlyPlaying, isChannelListMounted, isGamesMounted, currentListName, currentChannelList, loading };
}

export default connect(mapStateToProps, { getTopGames, getTopStreams, findGameByName, findGameByID, playNext, playPrevious, channelListMount, gamesMenuMount, switchChannelList, isLoading  })(StreamIndex);