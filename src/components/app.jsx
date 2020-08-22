import React from 'react';
import ChannelList from '../containers/channel_list';
import MessageList from '../containers/message_list';

const App = (props) => {
  const { channel } = props.match.params;

  return (
    <div className="messaging-wrapper">
      <div className="logo-container">
        <img className="messaging-logo" src="assets/images/logo.png" alt="logo" />
      </div>
      <ChannelList channel={channel} />
      <MessageList channel={channel} />
    </div>
  );
};

export default App;
