/**
 * Created by Zaedred on 9/6/2017.
 */
import React, { Component } from 'react';

//Components
import ServerList from '../serverListComponent/serverList';
import MOTD from '../motdComponent/motd';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMOTD: false,
            channelID: null,
            channelName: null
        };
    }

    handleViewMOTD = (loadMOTD, channelMOTD_ID, channelName) => {
        this.setState({
            viewMOTD: loadMOTD,
            channelID: channelMOTD_ID,
            channelName: channelName
        });
    }

    render() {

        return (
            <div className="container-fluid">
                <h2>Server List</h2>
                <p><small>Click on a server to view the message of the day for that server.</small></p>
                <ServerList className="serverList" onViewMOTD={this.handleViewMOTD} />
                {this.state.viewMOTD ? <MOTD channelID={this.state.channelID} channelName={this.state.channelName} /> : null}
            </div>
        );
    }
}

export default Home;