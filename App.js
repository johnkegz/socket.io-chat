import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import socketIOClient from 'socket.io-client';
import Reactotron from 'reactotron-react-native';

// export const io = socketIOClient(serverUrl, {transports: ['websocket', 'polling']});

// const io = socketIOClient('http://10.20.74.36:3000', {
//   transports: ['websocket', 'polling'],
// });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = socketIOClient('http://10.20.74.36:3000');
    this.initialState = {
      message: '',
      chatMessages: [],
    };
    this.state = this.initialState;
  }

  componentDidMount() {
    // this.socket.emit('message', 'app connecting to server');
    // this.socket = io('http://10.20.74.36:3000');
    // let messageData = [];
    this.socket.on('message', data => {
      this.setState({
        chatMessages: data,
      });
    });
  }

  handleMessage = val => {
    return this.setState({
      message: val,
    });
  };
  handleSubmit = () => {
    this.socket.emit('message', this.state.message);

    return true;
  };

  displayMessages = () => {
    return (
      <View>
        {this.state.chatMessages.map((message, index) => {
          return <Text key={index}>{message.message}</Text>;
        })}
      </View>
    );
  };
  render() {
    // console.log('startstdyhfyvjubkj >>>>>>>>', this.state);
    return (
      <>
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Chat displayMessages={this.displayMessages} />
            <ChatForm
              handleMessage={this.handleMessage}
              handleSubmit={this.handleSubmit}
            />
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  chatForm: {
    backgroundColor: 'green',
    borderColor: 'green',
    borderWidth: 2,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: 50,
    height: 50,
  },
  messageBox: {
    backgroundColor: '#eedd',
    borderColor: 'green',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    width: 280,
  },
});

function Chat({displayMessages}) {
  // io.on('message', data => {
  //   console.log("--------->",data);
  // });
  return (
    <View
      style={{
        backgroundColor: '#eedd',
        borderColor: 'green',
        borderWidth: 2,
        padding: 10,
        margin: 10,
        width: 340,
        minHeight: 300,
      }}>
      <View>{displayMessages()}</View>
    </View>
  );
}

function ChatForm({handleMessage, handleSubmit}) {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TextInput
        style={styles.messageBox}
        // onFocus={() => alert(0)}
        placeholder="type Message"
        onChangeText={val => handleMessage(val)}
      />
      <TouchableOpacity onPress={() => handleSubmit()}>
        <View style={styles.chatForm}>
          <Text style={{color: 'white'}}>send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default App;
