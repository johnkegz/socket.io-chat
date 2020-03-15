/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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
  // Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';
import Reactotron from 'reactotron-react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://10.20.74.36:3000');
    this.initialState = {
      message: '',
    };
    this.state = this.initialState;
  }
  static getDerivedStateFromProps(props, state) {
    let d = '';
    const socket = io('http://10.20.74.36:3000');
    socket.on('message', function(data) {
      d = data;
    });
    return {...state, d};
  }
  componentDidMount() {
    // const socket = io('http://10.20.74.36:3000');
    this.socket.emit('message', 'Starting');
  }

  execute() {
    // const socket = io('http://10.20.74.36:3000');
    this.socket.emit('message', 'REACT NATIVE');
    // alert(0);
  }

  handleMessage = val => {
    return this.setState({
      message: val,
    });
  };
  handleSubmit = () => {
    return this.socket.emit('message', this.state);
  };

  displayMessages = () => {
    return this.state.message;
  };
  render() {
    Reactotron.log(this.state);
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
            <View>
              <Button title="Click me" onPress={() => this.execute()} />
            </View>
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
      <Text>{displayMessages()}</Text>
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
