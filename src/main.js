'use strict';
var React = require('react-native');
var {
  View,
  Text,
  StyleSheet
} = React;

// import signin component
var Signin = require('./components/authentication/signin');

class Main extends React.Component {
  // Your App Code
  render() {
    return (
      <View style={styles.container}>
        <Signin />
      </View>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Main;
