/**
 * Created by Zaedred on 9/6/2017.
 */
import React, { Component } from 'react';
import { withGraphQL } from 'camelot-unchained/lib/graphql/react';
import { accessLevelString } from 'camelot-unchained/lib/webAPI/helpers';
import { AccessType } from 'camelot-unchained/lib/webAPI/definitions';

import { ScaleLoader } from 'react-spinners';

import '../../assets/css/styles.css';

class ServerList extends Component {

    renderServers() {

        return this.props.graphql.data.serviceStatus.servers && this.props.graphql.data.serviceStatus.servers.map(({ channelID, name, status, accessLevel }) => {
            
            var statusColor = "";
            if (status === "Online") {
                statusColor = "green";
            } else {
                statusColor = "red";
            }


            return (
                <tr key={channelID} onClick={() => this.handleViewMOTDChange(channelID, name)}>
                    <td>{name}</td>
                    <td>{accessLevelString(AccessType[accessLevel])}</td>
                    <td className={statusColor}>{status}</td>
                </tr>
            );
        });
    }

    handleViewMOTDChange = (channelID, name) => {
        this.props.onViewMOTD(true, channelID, name);
    }

    render() {

        if (this.props.graphql.loading) {
            return (
                <div className='text-center react-spinner'>
                    <ScaleLoader color='silver' loading={this.props.graphql.loading} />
                </div>
            );
        } else if (this.props.graphql.data !== null) {
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
                            {this.renderServers()}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <div className='text-center'>Unable to load server list information from the CU API.</div>;
        }

        
    }
}

export default withGraphQL(
    {
        query: `
        query FetchServersQuery {
            serviceStatus {
                servers {
                channelID
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