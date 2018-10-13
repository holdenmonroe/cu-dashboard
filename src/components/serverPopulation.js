/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';
import { withGraphQL } from 'camelot-unchained/lib/graphql/react';

import { ScaleLoader } from 'react-spinners';

class ServerPopulation extends Component {

    componentDidUpdate (newProps) {
        if (newProps.channelName !== this.props.channelName) {
            this.props.graphql.refetch();
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.props.graphql.refetch(), 300000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderServerPop() {           
        return (
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Realm</th>
                            <th>Population</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Arthurian</td>
                            <td>{this.props.graphql.data.metrics.playerCounts[0].arthurian}</td>
                        </tr>
                        <tr>
                            <td>Viking</td>
                            <td>{this.props.graphql.data.metrics.playerCounts[0].viking}</td>
                        </tr>
                        <tr>
                            <td>Tuatha</td>
                            <td>{this.props.graphql.data.metrics.playerCounts[0].tuatha}</td>
                        </tr>
                        <tr>
                            <td>Bots</td>
                            <td>{this.props.graphql.data.metrics.playerCounts[0].bots}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{this.props.graphql.data.metrics.playerCounts[0].total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {

        if (this.props.graphql.data === null) {
            return (
                <div className='text-center react-spinner'>
                    <ScaleLoader color='silver' loading={this.props.graphql.loading} />
                </div>
            );
        } else if (this.props.graphql.data.metrics.length !== 0) {
            return (
                <div>
                    <h2>{this.props.channelName} Population</h2>
                    {this.renderServerPop()}
                </div>
            );
        } else {
            return (
                <div>
                    <h2>{this.props.channelName}</h2>
                    <p>No population data.</p>
                </div>
            );
        }
        
    }
}

export default withGraphQL(props => 
    ({
      query: `
        query FetchServerPopulationQuery($server: String!) {
            metrics {
                playerCounts(server: $server, from: "-5min", until: "now") {
                  total
                  bots
                  arthurian
                  tuatha
                  viking
                }
              }
        }`,
      variables: {
        server: props.channelName,
      },
    })
)(ServerPopulation);