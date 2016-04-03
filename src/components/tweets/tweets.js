const React = require('react-native');

const {
  StyleSheet,
  Text,
  View,
} = React;

const Parse = require('parse/react-native');

class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    // this is an asyncronous call
    Parse.User.currentAsync()
      .then((user) => {this.setState({user: user})});
  }

  render() {
    if (!this.state.user) {
      return <Text>Loading</Text>;
    }

    var username = this.state.user.get('username');
    return (<View style={styles.container}>
      <Text>
        Welcome back, {username} !!
      </Text>
    </View>);
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

module.exports = Tweets;
