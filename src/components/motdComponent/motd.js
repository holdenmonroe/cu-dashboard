/**
 * Created by zaedr on 9/6/2017.
 */
import React, { Component } from 'react';
import { withGraphQL } from 'camelot-unchained/lib/graphql/react';

import '../../assets/css/styles.css';
//<p dangerouslySetInnerHTML={{__html: this.props.channelMOTD_ID}} />
class MOTD extends Component {

    render() {

        if (this.props.graphql.loading) {
            return <div>Loading...</div>;
        }

        console.log(this.props);

        return this.props.graphql.data.motd && this.props.graphql.data.motd.map(({ id, title, htmlContent, utcCreated, utcDisplayStart, utcDisplayEnd }) => {

            return (
                <div className='container-fluid'>
                    {id}
                    {title}
                    {htmlContent}
                </div>
            );
        });
    }
}

export default withGraphQL(
    {
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
        }
    `
    },
    {
        options: (props) => { return { variables: { channel: props.channelID } } }
    }

)(MOTD);