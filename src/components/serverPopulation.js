/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';
import { withGraphQL } from 'camelot-unchained/lib/graphql/react';

import { ScaleLoader } from 'react-spinners';

class ServerPopulation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lastUpdated: null
        }
    }

    componentDidUpdate (newProps) {
        if (newProps.channelName !== this.props.channelName) {
            this.graphqlRefetch();
        }
    }

    componentDidMount() {
        this.setState({
            lastUpdated: new Date().toLocaleString()
        });
        this.interval = setInterval(() => this.graphqlRefetch(), 300000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    graphqlRefetch() {
        this.props.graphql.refetch();
        this.setState({
            lastUpdated: new Date().toLocaleString()
        });
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
                            <td className="red">Arthurian</td>
                            <td>{this.props.graphql.data.metrics.currentPlayerCount.arthurian}</td>
                        </tr>
                        <tr>
                            <td className="blue">Viking</td>
                            <td>{this.props.graphql.data.metrics.currentPlayerCount.viking}</td>
                        </tr>
                        <tr>
                            <td className="green">Tuatha</td>
                            <td>{this.props.graphql.data.metrics.currentPlayerCount.tuatha}</td>
                        </tr>
                        <tr>
                            <td>Bots</td>
                            <td>{this.props.graphql.data.metrics.currentPlayerCount.bots}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{this.props.graphql.data.metrics.currentPlayerCount.total}</td>
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
                    <p><small>Last Updated: {this.state.lastUpdated}</small></p>
                    {this.renderServerPop()}
                </div>
            );
        } else {
            return (
                <div>
                    <h2>{this.props.channelName}</h2>
                    <p><small>Last Updated: {this.state.lastUpdated}</small></p>
                    <p>No population data.</p>
                </div>
            );
        }
        
    }
}

export default withGraphQL(props => 
    ({
      query: `
        query FetchServerPopulationQuery($server: String!, $shardID: Int!) {
            metrics {
                currentPlayerCount(server: $server, shard: $shardID) {
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
        shardID: props.shardID
      },
    }),
    props => (
        {
            url: `${props.apiHost}/graphql`
        }
    )
)(ServerPopulation);