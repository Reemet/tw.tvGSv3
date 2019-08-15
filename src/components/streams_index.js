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
        isLoading,
        getBookmarks,
        showBookmarks
    } from '../actions/index';





class StreamIndex extends Component {
    constructor(props) {
        super(props);

        this.handleKey = this.handleKey.bind(this);
        this.changeStream = this.changeStream.bind(this);

    }

    componentWillMount() {

    if (!localStorage.gameStreams) {
        const gameStreams = [];
        const TV = {
            settings: {},
            bookmarks: []
        }
        gameStreams.push(TV);
        const gameStreamsString = JSON.stringify(gameStreams);
        localStorage.setItem('gameStreams', gameStreamsString);

        this.props.getBookmarks(gameStreams); // not defined yet.
    } else {
        let storage = localStorage.getItem('gameStreams');
        let gameStreams = JSON.parse(storage);
        const { settings } = gameStreams[0]; // might not need at all.

        this.props.getBookmarks(gameStreams);
     }

    document.addEventListener('keydown', this.handleKey, false);
    this.props.isLoading(true);
    this.props.getTopGames(false);
    this.props.getTopStreams(true);
    this.props.channelListMount(false);
    this.props.gamesMenuMount(true);
    this.props.showBookmarks(false); 
    

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
        if (e.keyCode == 38) {
            this.addBookmark();
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
    findIndexOfObject(object, userName) {
 
        for(let i = 0; i < object.length; i++) {
            if(object[i].user_name == userName) {

                return i;
            }
        }

        return -1;
    }
    clone(object) {
        if (object == null || "object" !== typeof object) return object;
        let copy = object.constructor();
        for(var attr in object) {
            if(object.hasOwnProperty(attr)) copy[attr] = object[attr];
        }
        return copy 
    }

    addBookmark() {
        const storage = localStorage.getItem('gameStreams');
        const gameStreams = JSON.parse(storage);
    

        const bookmarks = gameStreams[0].bookmarks;
        if(this.props.currentlyPlaying) {
            let index = this.findIndexOfObject(bookmarks, this.props.currentlyPlaying.user_name);
            if(index === -1) {
                let clonedBookmark = this.clone(this.props.currentlyPlaying);
                const dateAdded = new Date();
                clonedBookmark.title = `Bookmark added on:  ${dateAdded.getDate()} / ${dateAdded.getMonth()} / ${dateAdded.getFullYear()}`;
                clonedBookmark.viewer_count = "N/A";
                bookmarks.unshift(clonedBookmark);
            } else {
                bookmarks.splice(index, 1);
            }   
            /*if(this.props.showToastObj.display) {
                this.props.showToast({index: 0, name: '', display: false});
            }
                this.props.showToast({index:index, name: this.props.activeChannel.display_name, display: true});*/
          //  WebOSToast(index, this.props.activeChannel.display_name);
        }/* else {
            let index = this.findIndexOfObject(bookmarks, this.props.topStreams[0].channel.name);
            if(index === -1) {
                bookmarks.unshift({...this.props.topStreams[0].channel, ...{preview: this.props.topStreams[0].preview.medium}});
            } else {
                bookmarks.splice(index, 1);
            }
            if(this.props.showToastObj.display) {
                this.props.showToast({index: 0, name: '', display: false});
            }
            this.props.showToast({index:index, name:this.props.topStreams[0].channel.display_name, display: true});
          //  WebOSToast(index, this.props.topStreams[0].channel.display_name);
        }*/

        let newBookmark = JSON.stringify(gameStreams);
        console.log(newBookmark);
        localStorage.setItem('gameStreams', newBookmark);
        
        this.props.getBookmarks(JSON.parse(newBookmark));
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
function mapStateToProps({ topGames, topStreams, byNameResult, byIdResult, currentlyPlaying, isChannelListMounted, isGamesMounted, currentListName, currentChannelList, loading, renderBookmarks }) {
    return { topGames, topStreams, byNameResult, byIdResult, currentlyPlaying, isChannelListMounted, isGamesMounted, currentListName, currentChannelList, loading, renderBookmarks };
}

export default connect(mapStateToProps, { getTopGames, getTopStreams, findGameByName, findGameByID, playNext, playPrevious, channelListMount, gamesMenuMount, switchChannelList, isLoading, getBookmarks, showBookmarks})(StreamIndex);