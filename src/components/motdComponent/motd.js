/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';
import axios from 'axios';

import '../../assets/css/styles.css';

class MOTD extends Component {

    constructor(props) {
        super(props)

        this.state = {
            motd: []
        }
    }

    componentDidMount() {
        axios.get('http://api.camelotunchained.com/messageoftheday')
            .then(res => this.setState({ motd: res.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container-fluid pages_container">
                <p dangerouslySetInnerHTML={{__html: this.state.motd.message}} />
            </div>
        );
    }
}

export default MOTD;