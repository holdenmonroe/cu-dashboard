/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';

//Components
import ServerList from '../serverListComponent/serverList';
import MOTD from '../motdComponent/motd';

class Home extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h3>Server List</h3>
                <ServerList className="serverList" />
                <h3>Message of the Day</h3>
                <MOTD className="motd" />
            </div>
        );
    }
}

export default Home;