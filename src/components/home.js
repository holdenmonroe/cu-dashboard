/**
 * Created by Zaedred on 9/6/2017.
 */
import React, { Component } from 'react';

//Components
import ServerList from './serverList';
import MOTD from './motd';
import ServerPopulation from './serverPopulation';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMOTD: false,
            viewPop: false,
            channelID: null,
            channelName: null
        };

        this.scrollToInfo = React.createRef();
    }

    handleViewMOTD = (loadMOTD, channelMOTD_ID, channelName) => {
        this.setState({
            viewMOTD: loadMOTD,
            channelID: channelMOTD_ID,
            channelName: channelName
        }, () => {
            this.scrollToInfo.current.scrollIntoView();
        });
    }

    handleViewPopulation = (loadPop, channelName) => {
        this.setState({
            viewPop: loadPop,
            channelName: channelName
        })
    }

    render() {

        return (
            
            <div className="container-fluid">
                <br/>
                <div className="row">
                    <div className="col">
                        <h2>Servers</h2>
                        <ServerList className="serverList" onViewMOTD={this.handleViewMOTD} onViewPopulation={this.handleViewPopulation} />                    
                    </div>
                    <div className="col">
                        {this.state.viewPop ? <ServerPopulation channelName={this.state.channelName} /> : null }
                        {this.state.viewMOTD ? <MOTD motdRef={this.scrollToInfo} channelID={this.state.channelID} channelName={this.state.channelName} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;