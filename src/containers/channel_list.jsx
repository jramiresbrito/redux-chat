import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMessages } from '../actions/index';

class ChannelList extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.channel !== this.props.channel) {
      this.props.fetchMessages(nextProps.channel);
    }
  }

  renderChannel = (channel) => {
    return (
      <li
        key={channel}
        className={channel === this.props.channel ? 'active' : null}
        role="presentation"
      >
        <Link to={`/${channel}`}>
          #{channel}
        </Link>
      </li>
    );
  };

  render() {
    return (
      <div className="channels-container">
        <span>Redux Chat</span>
        <ul>{this.props.channels.map(this.renderChannel)}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    channels: state.channels
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMessages }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList);
