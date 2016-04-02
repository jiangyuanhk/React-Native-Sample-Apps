var React = require('react-native');
var {
  Component,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  ListView
} = React;

const Firebase = require('firebase');

class TodoApp extends Component {
  // Your App Code
  constructor(props) {
    super(props);
    var myFirebaseRef = new Firebase('https://todoapp001.firebaseio.com/');

    myFirebaseRef.set({
      title: "Hello World!",
      author: "Simon",
      location: {
        city: "Muenster",
        state: "Germany",
        zip: 48155
      }
    });
  }

  render() {
    return null;
  }
}



var styles = StyleSheet.create({
  // Your App Style
});

AppRegistry.registerComponent('TodoApp', () => TodoApp);
