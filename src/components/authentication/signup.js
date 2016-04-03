var React = require('react-native');
var {
  Text,
  View,
  StyleSheet
} = React;

class Signup extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>You can sign up here!</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});


module.exports = Signup;
