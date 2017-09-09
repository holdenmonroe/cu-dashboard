/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';
import axios from 'axios';

import '../../assets/css/styles.css';

class ServerList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            servers: []
        }
    }

    convertServerData(data) {
        var accessLevelArray = ["Everyone", "Beta 3, Beta 2, Beta 1, Alpha & IT", "Beta 2, Beta 1, Alpha & IT", "Beta 1, Alpha & IT", "Alpha & IT", "IT", "CSE"];
        var statusArray = ["Offline", "Unknown", "Online"];
        var convertedServers = [];
        for (var i = 0; i < data.length; i++) {
            convertedServers[i] = data[i];
            convertedServers[i]['accessLevel'] = accessLevelArray[convertedServers[i]['accessLevel']];
            convertedServers[i]['status'] = statusArray[convertedServers[i]['status']];
        }

        this.setState({ servers: convertedServers});
    }

    componentDidMount() {
        axios.get('http://api.camelotunchained.com/servers')
            .then(res => this.convertServerData(res.data))
            .catch(err => console.log(err))
    }

    render() {

        if (this.state.servers.length !== 0) {
            return (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>Server Name</th>
                            <th>Access</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.servers.map(function (server) {
                                var statusColor = "";
                                if (server.status === "Online") {
                                    statusColor = "green";
                                } else {
                                    statusColor = "red";
                                }
                                return (
                                    <tr key={server.name}>
                                        <td>{server.name}</td>
                                        <td>{server.accessLevel}</td>
                                        <td className={statusColor}>{server.status}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return (
                <div>Loading...</div>
            );
        }
    }
}

export default ServerList;