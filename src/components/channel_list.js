import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Clock from 'react-live-clock';
import Frame from '../../style/pixil-frame-0 (15).png';
import Clock from './ui_widgets/clock';

import { saveCurrentPosition, playStream, channelListMount, switchChannelList, isLoading } from '../actions/index';


class ChannelList extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            activeChannel: 0,
            bottom: 0,
            channelsFetched: false
        }
        this.channelList = this.channelList.bind(this);
        this.onKeyUP = this.onKeyUP.bind(this);

        this.resumeAnimation = this.resumeAnimation.bind(this);

        this.timeout;

        document.addEventListener('keydown', this.channelList);
        document.addEventListener('keyup', this.onKeyUP);
    }
    componentWillMount() {
        
        this.setState({
            channelsFetched: false
        });
        // this.activeIndex = this.findIndexOfObject(this.props.currentChannelList, this.props.currentlyPlaying.user_name);
        this.setState({
            activeChannel: 0,
            bottom: 0
        });

        if(!this.props.loading){
            this.activeIndex = this.findIndexOfObject(this.props.currentChannelList, this.props.currentlyPlaying.user_name);
                if (this.activeIndex !== -1) {
                    this.setState({
                        channelsFetched: true,
                        activeChannel: this.activeIndex,
                        bottom: this.activeIndex * -125
                    });
                }
        
        }
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.channelList);
        document.removeEventListener('keyup', this.onKeyUP);
        clearTimeout(this.timeout);
        this.setState({
            channelsFetched: false
        })
    }
    componentWillReceiveProps(nextProps) {
        if(!nextProps.loading) {
            this.activeIndex = this.findIndexOfObject(this.props.currentChannelList, this.props.currentlyPlaying.user_name);
            if (this.activeIndex !== -1) {
                this.setState({
                    channelsFetched: true,
                    activeChannel: this.activeIndex,
                    bottom: this.activeIndex * -125
                });
            } else {
                this.setState({
                    channelsFetched: true
                })
            }
            
        }
    }
    findIndexOfObject(object, userName) {
        console.log(object);
        for(let i = 0; i < object.length; i++) {
            if(object[i].user_name == userName) {
                console.log('found on index: ', i);
                return i;
            }
        }
        console.log('not found');
        return -1;
    }
    textLength(title) {
        if(title.length > 110) {
            return 20;
        } else if (title.length <= 5) {
            return 50;
        
        } else if (title.length < 18) {
            return 30;
        } else {
           return 25;
        }
    }
   
    navigationUp() {
        this.setState({
            activeChannel: this.state.activeChannel +1,
            bottom: this.state.bottom -125
        })
    }
    navigationDown() {
        this.setState({
            activeChannel: this.state.activeChannel -1,
            bottom: this.state.bottom +125
        })
    }

    onEnter() {
        this.props.isLoading(true);
        this.props.playStream(this.props.currentChannelList[this.state.activeChannel]);
    }
    resumeAnimation() {
        document.getElementById("one").style.WebkitAnimationPlayState = "running";
        document.getElementById("two").style.WebkitAnimationPlayState = "running";
    }
    onKeyUP(e) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout( () => {
            this.resumeAnimation();
        }, 2000);
    }

    channelList(e) {
        document.getElementById("one").style.WebkitAnimationPlayState = "paused";
        document.getElementById("two").style.WebkitAnimationPlayState = "paused";
      
        if (this.props.loading === true) {
            return;
        }
        this.setState({
            channelsFetched: true
        });

        if (e.keyCode === 8 || e.keyCode === 461) {
            this.props.handleChannelList(false);
        } else if (e.keyCode === 38) {
            if(this.state.activeChannel !== this.props.currentChannelList.length-1) {
                this.navigationUp();
            }  
        } else if (e.keyCode === 40) {
            this.state.activeChannel != 0 ? this.navigationDown() : null
        } else if (e.keyCode === 13) {
            this.onEnter();        
        
        }
    }

    renderChannels() {
        const data  = this.props.currentChannelList;
        const channels = data.map((stream, index) => {
            const thumbnail = stream.thumbnail_url.replace("{width}", "240").replace("{height}", "125");
            return (
            <div 
                key={index} 
                className={"channel-menu-item " +  (this.state.activeChannel == index? 'active': '')}
                style={{'bottom': `${index * 125}px`, 'backgroundImage': `linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0)), url(${thumbnail})`}}
            >
                <div className="channel-title">{stream.user_name}</div>
            </div>
            );
        });  
        return channels.reverse();
    }
    // Loop through channels and render'em
    render() {
        const live = this.props.currentChannelList[this.state.activeChannel].type == "live" ? "data:image/png;base64,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": "";
        const font = this.textLength(this.props.currentChannelList[this.state.activeChannel].title);
        return(
        <div className="channel-menu">
            <div>
            <div className="channel-list" style={{'bottom': `${this.state.bottom}px`}}>

                {this.renderChannels()}

            </div>
            <img className="gamestreams-frame" src={Frame}></img>
            <div id="one" ref="one" className="frame-animation-one"></div>
            <div id="two" className="frame-animation-two"></div>
            <div className="channel-description">
                <div className="description-text-wrap">
                    <div className="description-text" style={{'fontSize': `${font}`}}>{(this.props.loading === true && this.state.channelsFetched === false) ? 'Loading...' : this.props.currentChannelList[this.state.activeChannel].title}</div>
                </div>
                <Clock />
                <div className="viewer-count">viewers  :  {this.props.currentChannelList[this.state.activeChannel].viewer_count}
                </div>
                <img className="user-live-status" src={live} ></img>
            </div>
            
            </div>
            <div className="channel-type-switch">
                
                <img className="fav-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVGhD7ZlLSBVRHMbVHkYPLUF6grXIkrIH0QtqWaCCFYRQmdBCCXrjpjZBUbQKqU1F4CIKKogocNVKCCMpgoqygkKKIFxYucgX2u/c+RKsmTNn7sy9trg/+Dgz93zf/3+Ge+/M3Ll5OXLkmFhGR0fnoKna/f8ZGRmZixpQK+pEPziAMdgfRF3oHmpGqxWdeFhfPguqQm1o2FuyO2ReoRNohkpmH9axBT1LrSgmHEgPOsrmZJXPPDSbTtOraCS1igSh5HOG5WqVOWhUhl56bTMD9fvQLrVMHopXoC/ql1HoM4wa1To5KLoIfVafrEA/wz4tIT7UNN+JjH6cgqDvANqgpcSDQldUd0Kg/ydUpOWkBwW2osTPTlFhCS1aUnTI56NErhNx4UCGULmWFg2C1apjBV8vuoVOo3PoEQq8yjP3Dl1i8yTjZfTBm7GDr1VLiwbBNtUIBM81htmKjMFra5h7mjIJ9s3V+wCb+bKlMPu8vh/1pYwBMN+PShRzg9w8QkNeCX+YvyC7L1gK8LTI+wLN15QvzG9GA8ZvoUl2NyjYoKAvzL9hcLovwnsYb7F2reA9n2oQAPMPZXWDQKuyvjB/TNZEoe5CFHiWZKqXoUD2cAh0elF/mN8ka+JQ23oHwXyZrOFgHvej6G+YXytr4lC7S218YX6brHbwmuuHFYpVy54olDYniJ9eF3+Y3yO7HbzFXiQYilnPWOlC6XVeBytuZy4WWahAIHi6Gdy/dI5Q96LXIRg89bKHg3lQuUDwuL3FjlCvlLLfverB4KtVJBzMb5ULBE83mqVIbKhl7hJCwVepSDiY7ytnBd8dRWJBnd0qaQWfuduYplg4BJq9aDh4DymWFuTLKRP6kTLg7VDMDQKrlA0Fr/kVt0PRSJBbgJzufg14zyjqDqHXyoeC1xxMlaJO4C9F5p7NGfwVirtD6LjyTuD/heoUt4JvCYp6EI8VjwbZmYR7vDJu4DecUglfmDe3698UcYZMjUpEh7B5jJkOd8n+88CA1w6ifnmcIdPOMO4HWSQIT6KIeYwZGXLv0UZTh7EE3dZUJMiZ79/K1ILiQJFlyPozNAhy5onhdfRVL0WG7BEtJT4UqzWLUu2sQc+bDOl/pPygYBOFs/aMi1bm4Udm/umi+F4U9oAgNvS4wTBFbTMDTdajj17LZKGueeRjzpTJfpyCoFkRakHWR0ZRoFY7WqEW2YXGS5H58zPyteEPZDtQDZvZeRdssBBznWhED1iQ9U4Wj3mO+wSdZTfzf7OlC4srQItZ6HZUx7Y529Uz7mSsRIWy5siRI0dU8vJ+A3A/aKegmwEDAAAAAElFTkSuQmCC"/>
            </div>
        </div>
        );
    }
}
function mapStateToProps({topStreams, topGames, savedChannelIndex, currentChannelList, currentListName, loading, currentlyPlaying}) {
    return {topStreams, topGames, savedChannelIndex, currentChannelList, currentListName, loading, currentlyPlaying};
}

export default connect(mapStateToProps, { saveCurrentPosition, playStream, channelListMount, switchChannelList, isLoading })(ChannelList);