/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';
import { withGraphQL } from 'camelot-unchained/lib/graphql/react';

import '../../assets/css/styles.css';

class MOTD extends Component {

    componentWillReceiveProps (newProps) {
        if (newProps.channelID !== this.props.channelID) {
            this.props.graphql.refetch();
        }
    }

    renderMOTD() {
        return this.props.graphql.data.motd && this.props.graphql.data.motd.map(({ id, title, htmlContent, utcCreated, utcDisplayStart, utcDisplayEnd }) => {
            
            return (
                <div className='well' key={id}>
                    <h3>Title:</h3> 
                    <div className='well'><h1 dangerouslySetInnerHTML={{__html: title}} /></div>

                    <h3>Message:</h3> 
                    <div className='well'><p dangerouslySetInnerHTML={{__html: htmlContent}} /></div>
                </div>
            );
        });
    }

    render() {

        if (this.props.graphql.loading) {
            return <div>Loading...</div>;
        }

        console.log(this.props);

        if (this.props.graphql.data.motd.length !== 0) {
            return (
                <div className='container-fluid'>
                    <h3>Message of the Day</h3>
                    {this.renderMOTD()}
                </div>
            );
        } else {
            return (
                <div></div>
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