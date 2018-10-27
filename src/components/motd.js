/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';
import { withGraphQL } from 'camelot-unchained/lib/graphql/react';
import Moment from 'react-moment';
import 'moment-timezone';

import { ScaleLoader } from 'react-spinners';

class MOTD extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lastUpdated: null
        }
    }

    componentDidUpdate (newProps) {
        if (newProps.channelID !== this.props.channelID) {
            this.graphqlRefetch()
        }
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

    graphqlRefetch() {
        this.props.graphql.refetch();
        this.setState({
            lastUpdated: new Date().toLocaleString()
        });
    }

    renderMOTD() {
        return this.props.graphql.data.motd && this.props.graphql.data.motd.map(({ id, title, htmlContent, utcCreated, utcDisplayStart, utcDisplayEnd }) => {

            let createdDate = new Date(utcCreated);
            let startDate = new Date(utcDisplayStart);
            let endDate = new Date(utcDisplayEnd);
            
            return (
                <div className='card' key={id}>
                    <div className='card-header'>
                        <h3 dangerouslySetInnerHTML={{__html: title}} />
                    </div>
                    <div className='card-body'>
                        <div>
                            <div className='col-md-4 text-center timeDiv'>
                                <small>Created Date: <Moment format='YYYY-MM-DD hh:mm A'>{createdDate}</Moment></small>
                            </div>
                            <div className='col-md-4 text-center timeDiv'>
                                <small>Start Date: <Moment format='YYYY-MM-DD hh:mm A'>{startDate}</Moment></small>
                            </div>
                            <div className='col-md-4 text-center timeDiv'>
                                <small>End Date: <Moment format='YYYY-MM-DD hh:mm A'>{endDate}</Moment></small>
                            </div>
                        </div>
                        <br/>
                        <p dangerouslySetInnerHTML={{__html: htmlContent}} />
                    </div>
                </div>
            );
        });
    }

    render() {

        if (this.props.graphql.data === null) {
            return (
                <div ref={this.props.motdRef} className='text-center react-spinner'>
                    <ScaleLoader color='silver' loading={this.props.graphql.loading} />
                </div>
            );
        } else if (this.props.graphql.data.motd) {
            return (
                <div ref={this.props.motdRef}>
                    <h2>{this.props.channelName} Message of the Day</h2>
                    <p><small>Last Updated: {this.state.lastUpdated}</small></p>
                    {this.renderMOTD()}
                </div>
            );
        } else {
            return (
                <div ref={this.props.motdRef}>
                    <h2>{this.props.channelName} Message of the Day</h2>
                    <p><small>Last Updated: {this.state.lastUpdated}</small></p>
                    <p>No message of the day.</p>
                </div>
            );
        }
        
    }
}

export default withGraphQL(props => 
    ({
      query: `
        query FetchMOTDQuery($channel: Int!) {
            motd(channel: $channel) {
                id
                title
                htmlContent
                utcCreated
                utcDisplayStart
                utcDisplayEnd
            }
        }`,
      variables: {
        channel: props.channelID,
      },
    })
)(MOTD);