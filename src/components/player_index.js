import React, { Component } from 'react';
import { connect } from 'react-redux';




class Player extends Component {
    componentWillMount() {
    }
    componentDidMount() {
    }



    render() {
        let currentUserName = this.props.currentUserName || '';

// TODO:
// Need to find a workaround for this IFRAME Crap. What ever attributes put on CSS class, Twitch IFrame always pops up in front.
// Therefor will deny all sorts of future menus from beeing seen. 


        return (<div className="iframe-wrapper">
            <iframe 
                    src={`https://player.twitch.tv/?channel=${currentUserName}&muted=false`}
                    height={window.innerHeight} 
                    width={window.innerWidth}
                    scrolling="no"
                    allowFullScreen="false"
                    
                    >
                </iframe>
                <div id="overlay"></div>
        </div>);
    }
}
function mapStateToProps({ currentUserName }) {
    return { currentUserName };
}

export default connect(mapStateToProps, {})(Player);