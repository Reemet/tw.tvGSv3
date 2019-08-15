import React, { Component } from 'react';
import QR from '../../../style/qr-code.png';

class QRCodeQR extends Component {

    render() {
        return(<div className="qr-code-wrapper">
            <div className="donation-text-placeholder">Donate</div>
            <div className="donation-description"></div>
            <img src={QR}></img>
        </div>)
    }
}
export default QRCodeQR