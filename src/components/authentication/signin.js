'use strict';
var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  TextInput
} = React;

var Button = require('../common/button');
const Parse = require('parse/react-native');

class Signin extends React.Component {
  constructor(props) {
    super(props);

    //initialize state
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };

    this.onPress = this.onPress.bind(this);
    this.onSignupPress = this.onSignupPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={this.state.username}
          onChangeText={(text) => {
            console.log(`when password is changed, password is ${text}`)
            this.setState({username: text})
          }}
          />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => {
            console.log(`when password is changed, password is ${text}`)
            this.setState({password: text})
          }}
          />

        <Text>{this.onErrorMessage(this.state.errorMessage)}</Text>
        <Button text={'Sign In'} onPress={this.onPress} />
        <Button text={'Sign Up'} onPress={this.onSignupPress} />
      </View>
    );
  }

  onSignupPress() {
    this.props.navigator.push({name: 'signup'});
  }

  onPress() {
    // log user in
    console.log(`when pressed login button, username is ${this.state.username}, password is ${this.state.password}`);
    Parse.User.logIn(this.state.username, this.state.password, {
      success: (user) => {
        console.log('login success');
        console.log(user);
        this.setState({errorMessage: ''});
        this.props.navigator.immediatelyResetRouteStack([{name:'tweets'}]);
      },

      error: (data, error) => {
        console.log('login failed');
        console.log(data, error);
        this.setState({errorMessage: error.message});
      }
    });
  }
  /* helper method to display a friendlier error message
  */
  onErrorMessage(errorMessage) {
    if (this.state.errorMessage) {
      return 'Invalid Login, Please try again.';
    }
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  label: {
    fontSize: 18
  }
});


module.exports = Signin;
