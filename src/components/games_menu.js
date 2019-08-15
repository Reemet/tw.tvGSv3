import React, { Component } from 'react';
import { connect } from 'react-redux';

import { findGameByName, getTopGames, gamesMenuMount, channelListMount, isLoading } from '../actions/index';

import topThumbnail from '../../style/top.png';

class GamesMenu extends Component {
    constructor(props){
        super(props);

        this.state = {
            activeGame: 0,
            left: 100,
        }
        this.handleGamesKeys = this.handleGamesKeys.bind(this);
        document.addEventListener('keydown', this.handleGamesKeys);
    }
    componentWillMount() {
       
    }
    componentWillUnmount(){
        document.removeEventListener('keydown', this.handleGamesKeys);
    }

    handleGamesKeys(e) {
        e.preventDefault();
        if(e.keyCode === 8 || e.keyCode === 461 ) {
            this.props.gamesMenuMount(false);
        }
        if(e.keyCode == 37) {
            this.state.activeGame !== 0 ? this.onNavigationLeft(): null;
        }
        if(e.keyCode == 39) {
            this.state.activeGame !== this.props.topGames.length -1 ? this.onNavigationRight(): null;
        }
        if(e.keyCode == 13) {
            this.selectGame();
        }
    }
    onNavigationLeft(e) {
        this.setState({
            activeGame: this.state.activeGame-1,
            left: this.state.left + 255,
        })
    }
    onNavigationRight(e) {
        this.setState({
            activeGame: this.state.activeGame+1,
            left: this.state.left - 255,
        })
    }
    selectGame() {
        this.props.isLoading(true);
        this.props.findGameByName(this.props.topGames[this.state.activeGame].name, this.props.channelListMount(true));
    }
    renderGames() {
        const games = this.props.topGames;
        if (!games) {
            return;
        }
        const gamesList =  games.map( (game, index) => {
            const boxArt = game.box_art_url;
            let backgroundImage;
            if (game.id === "1") {
                backgroundImage = topThumbnail;
            } else {
                 backgroundImage = boxArt.replace('{width}', '180').replace('{height}', '240');
            }
            return (
                <div key={game.id} className={"game-item " + (this.state.activeGame === index ? 'active': '')} style={{'backgroundImage': `url(${backgroundImage})`, 'left': `${index * 255 + 5}px`}}>
                    <div className="game-title">{game.name}</div>
                </div>
            );
        });
        return gamesList;
    }


    render() {
        return (<div className="games-menu-wrapper" style={{'left': `${this.state.left}px`}}>
             {this.renderGames()}
            </div>);
    }
}


function mapStateToProps({ topGames }) {
    return { topGames };
}

export default connect(mapStateToProps, { findGameByName, getTopGames, gamesMenuMount, channelListMount, isLoading  })(GamesMenu);
