/**
 * Created by Zaedred on 9/6/2017.
 */
import React, { Component } from 'react';
import { withGraphQL } from 'camelot-unchained/lib/graphql/react';
import { accessLevelString } from 'camelot-unchained/lib/webAPI/helpers';
import { AccessType } from 'camelot-unchained/lib/webAPI/definitions';

import { ScaleLoader } from 'react-spinners';

class ServerList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lastUpdated: null
        }
    }

    handleViewMOTDChange = (channelID, name) => {
        this.props.onViewMOTD(true, channelID, name);
    }

    handleViewPopulationChange = (name, shardID) => {
        this.props.onViewPopulation(true, name, shardID);
    }

    handleViewInfoClick(channelID, name, shardID) {
        this.handleViewPopulationChange(name, shardID);
        this.handleViewMOTDChange(channelID, name);
    }

    graphqlRefetch() {
        this.props.graphql.refetch();
        this.setState({
            lastUpdated: new Date().toLocaleString()
        });
    }

    renderServers() {

        return this.props.graphql.data.connectedServices.servers && this.props.graphql.data.connectedServices.servers.map(({ channelID, shardID, name, status, accessLevel }) => {
            
            var statusColor = "";
            if (status === "Online") {
                statusColor = "badge-success";
            } else {
                statusColor = "badge-danger";
            }

            return (
                <tr key={channelID}>
                    <td>{name}</td>
                    <td>{accessLevelString(AccessType[accessLevel])}</td>
                    <td><span className={"badge " + statusColor}>{status}</span></td>
                    <td>
                        <button type="button" className="btn btn-primary btn-shadow btn-sm btn-small" onClick={() => this.handleViewInfoClick(channelID, name, shardID)}>Info</button> 
                    </td>
                </tr>
            );
        });
    }

    componentDidMount() {
        this.setState({
            lastUpdated: new Date().toLocaleString()
        });
        this.interval = setInterval(() => this.graphqlRefetch(), 300000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        if (this.props.graphql.data === null) {
            return (
                <div>
                    <h2>Servers</h2>
                    <div className='text-center react-spinner'>
                        <ScaleLoader color='silver' loading={this.props.graphql.loading} />
                    </div>
                </div>
                
            );
        } else if (this.props.graphql.data !== null) {
            return (
                <div>
                    <h2>Servers</h2>
                    <p><small>Last Updated: {this.state.lastUpdated}</small></p>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Server Name</th>
                                    <th>Access</th>
                                    <th>Status</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderServers()}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            );
        } else {
            return (
                <div>
                    <h2>Servers</h2>
                    <div className='text-center'>
                        <span>Unable to load server list information from the CU API.</span>
                    </div>
                </div>
                
            );
        }

        
    }
}

export default withGraphQL(
    {
        query: `
        query FetchServersQuery {
            connectedServices {
                servers {
                channelID
                shardID
                host
                name
                status
                apiHost
                accessLevel
                }
            }
        }
        `
    }
)(ServerList);