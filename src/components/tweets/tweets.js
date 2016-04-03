const React = require('react-native');

const {
  StyleSheet,
  Text,
  View,
} = React;



class Tweets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (<View style={styles.container}>
      <Text>
        Welcome back !!
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
