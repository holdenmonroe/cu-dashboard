/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';
import { withGraphQL } from 'camelot-unchained/lib/graphql/react';
import Moment from 'react-moment';
import 'moment-timezone';

import { ScaleLoader } from 'react-spinners';

import '../../assets/css/styles.css';

class MOTD extends Component {

    componentWillReceiveProps (newProps) {
        if (newProps.channelID !== this.props.channelID) {
            this.props.graphql.refetch();
        }
    }

    renderMOTD() {
        return this.props.graphql.data.motd && this.props.graphql.data.motd.map(({ id, title, htmlContent, utcCreated, utcDisplayStart, utcDisplayEnd }) => {

            let createdDate = new Date(utcCreated);
            let startDate = new Date(utcDisplayStart);
            let endDate = new Date(utcDisplayEnd);
            
            return (
                <div className='panel panel-default' key={id}>
                    <div className='panel-heading'>
                        <h3 dangerouslySetInnerHTML={{__html: title}} />
                    </div>
                    <div className='panel-body'>
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

        if (this.props.graphql.loading) {
            return (
                <div className='text-center react-spinner'>
                    <ScaleLoader color='silver' loading={this.props.graphql.loading} />
                </div>
            );
        } else if (this.props.graphql.data.motd.length !== 0) {
            return (
                <div>
                    <h2>Message of the Day</h2>
                    {this.renderMOTD()}
                </div>
            );
        } else {
            return (
                <div>
                    <h2>Message of the Day</h2>
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