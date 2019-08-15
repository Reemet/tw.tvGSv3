import React, { Component } from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
          time: ''
        };
        this.intervalID = this.intervalID;
        this.tick = this.tick.bind(this);

        
      }
      componentDidMount() {
        this.intervalID = setInterval(
            () => {
                this.tick()
            },
            60000
          );
          let date = new Date();

        let dateTIme = `${date.getHours()}:${date.getMinutes() <= 9 ? '0'+date.getMinutes(): date.getMinutes()}`; 
          this.setState({
            time : dateTIme
          });
      }
      componentWillUnmount() {
        clearInterval(this.intervalID);
      }
      tick() {
        let date = new Date();

        let dateTIme = `${date.getHours()}:${date.getMinutes() <= 9 ? '0'+date.getMinutes(): date.getMinutes()}`; 
        
        this.setState({
          time: dateTIme
        });
      }
  render() {
    return (
      <div className="clock">
            {this.state.time}
      </div>
    );
  }
}
export default Clock;