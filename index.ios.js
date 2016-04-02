'use strict';
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
    // everything would be under root->items node
    this.itemsRef = myFirebaseRef.child('items');

    this.state = {
      newTodo: '',
      //rowHasChanged affects how much is re-rendered,
      todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };

    this.items = [];
  }

  render() {
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>
            My Todos
          </Text>
        </View>
        <View style={styles.inputcontainer}>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({newTodo: text})} value={this.state.newTodo}/>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.addTodo()}
            underlayColor='#dddddd'>
            <Text style={styles.btnText}>Add!</Text>
          </TouchableHighlight>
        </View>
        <ListView
          dataSource={this.state.todoSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }

  // populate each element in rowData into a renderable view component
  // rowData.text is an object, in the form of {todo: "to do text"}

  renderRow(rowData) {
    return (
      <TouchableHighlight
        underlayColor='#dddddd'
        onPress={() => this.removeTodo(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.todoText}>{rowData.text.todo}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  componentDidMount() {
    /*  1. when user clicks Add button, addTodo() would be called, firebase changed, triggering
        itemsRef.on('child_added', callback) function, the callback would change the todoSource which is a state,
        when todoSource is changed, the LitView would automatically re-rendering those changed list items (react native minimun rendering feature)
        2. when user click listitem which is a TouchableHighlight, addTodo() would be triggered, thusly deleting items in the firebase, and then
        itemsRef.on('child_removed', callback) would be called, todoSource is changed and then list items re-rendered again.
    */
    this.itemsRef.on('child_added', (dataSnapshot) => {
      this.items.push({
        id: dataSnapshot.key(),
        text: dataSnapshot.val(),
      });
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });

    this.itemsRef.on('child_removed', (dataSnapshot) => {
        this.items = this.items.filter((x) => x.id !== dataSnapshot.key());
        this.setState({
          todoSource: this.state.todoSource.cloneWithRows(this.items)
        });
    });
  }

  // insert {todo: "to do text"} object into Firebase
  addTodo() {
    if (this.state.newTodo !== '') {
      this.itemsRef.push({
        todo: this.state.newTodo
      });
      this.setState({
        newTodo : ''
      });
    }
  }

  removeTodo(rowData) {
    this.itemsRef.child(rowData.id).remove();
  }
}

var styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});

AppRegistry.registerComponent('TodoApp', () => TodoApp);
