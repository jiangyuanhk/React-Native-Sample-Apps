var React = require('react-native');
var {
  Text,
  View,
  StyleSheet,
  TextInput,
} = React;

const Button = require('../common/button');

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
    };
    this.onSigninPress = this.onSigninPress.bind(this);
    this.onSignupPress = this.onSignupPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
          style={styles.input} />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          style={styles.input} />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          secureTextEntry={true}
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
          style={styles.input} />
        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Sign Up'} onPress={this.onSignupPress} />
        <Button text={'I have an account...'} onPress={this.onSigninPress} />
      </View>
    );
  }

  onSignupPress() {
    if (this.state.password !== this.state.passwordConfirmation) {
        this.setState({errorMessage: 'Your password does not match'});
        return;
    }
  }

  onSigninPress() {
    this.props.navigator.pop();
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18
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
  }
});


module.exports = Signup;
