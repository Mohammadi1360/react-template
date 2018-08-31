import React, { Component } from 'react';
import SimpleForm from './SimpleForm';
import { Well } from 'react-bootstrap';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.yahooWidget = this.yahooWidget.bind(this);
  }

  yahooWidget() {
    const query = this.props.weather.query;
    if (query && query.results) {
      let html = query.results.channel.item.description;
      // remove <![CDATA[ and ]]>
      html = html.replace(/(<!\[CDATA\[|]]>)/g, '');
      return (
        <Well bsSize="large">
          <h3>
            {query.results.channel.description}
          </h3>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </Well>
      );
    } else {
      return false;
    }
  }


  render() {
    return (
      <div>
        <SimpleForm/>
        {this.yahooWidget()}
      </div>

    );
  }
}
