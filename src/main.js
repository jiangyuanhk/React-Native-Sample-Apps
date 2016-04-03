'use strict';
var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  Navigator,
} = React;


// import signin component
var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
var Tweets = require('./components/tweets/tweets');
const Parse = require('parse/react-native');

var ROUTES = {
  signin: Signin,
  signup: Signup,
  tweets: Tweets,
};


class Main extends React.Component {
  // Your App Code
  constructor(props){
    super(props);
    Parse.initialize('myAppId','unused');
    Parse.serverURL = 'https://parse-server-01.herokuapp.com/parse';
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name]; // ROUTES['signin'] => Signin
    return <Component route={route} navigator={navigator} />;
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
        />
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = Main;
