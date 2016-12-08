/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component,PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default class TodoList extends Component {
// metodo removeItem del componente principal //
    removeItem = (id) => {
    const newTasks = this.state.tasks.filter(
     (task) => task.id !== id
   )
   this.setState({ tasks: newTasks })
  }
  toggleItemCompleted = (id) => {
    console.log(id);
    const newTasks = this.state.tasks.map((task) => {
    	if(task.id == id) {
      task.completed = !task.completed
    	}
      return task
    })
    this.setState({tasks: newTasks});
   }

//metodo addItem del componente principal //
  addItem = (item) => {
    const task = { id: this.state.tasks.length+1 ,title: item};
    const newTasks = this.state.tasks.concat([task]);
    this.setState({tasks: newTasks});
  }
  constructor(props) {
    super(props)
    this.clearList = this.clearList.bind(this)
  }
  state = {
    tasks: [
      { id: 1, title: "Task 1", completed :false},
      { id: 2, title: "Task 2", completed :false},
      { id: 3, title: "Task 3 ", completed :false},
    ]
  }

  clearList() {
  this.setState({ tasks: [] })
  }

  render() {
    return (
      <ScrollView style={styles.taskList}>
      <Text style={styles.header}>TODOAPP</Text>
      < Input
      placeholder={'Enter an item!'}
      onSubmit={this.addItem}
      />
      {this.state.tasks.map((task) => {
        return (
          <TaskDetails
          key={task.id}
          task={task}
          onRemoveItem={this.removeItem}
          onToggleItemCompleted={this.toggleItemCompleted}
          />
        )
      })}

      <Button
      title="Clear list"
      onPress={this.clearList}
      />
      </ScrollView>
    )
  }
}

class Input extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string,
  }
  state = {
    text: '',
  }

  onChangeText = (text) => {
    this.setState({text})
  }

  onSubmitEditing = () => {
    const {onSubmit} = this.props
    const {text} = this.state

    if (!text) return

    onSubmit(text)
    this.setState({text: ''})
  }

  render()   {
    const {onSubmit, placeholder} = this.props
    const {text} = this.state
    return(
      <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={text}
      onChangeText={this.onChangeText}
      onSubmitEditing={this.onSubmitEditing}
      blurOnSubmit={false}
      />
    )
  }
}


class Checkbox extends Component {

  static propTypes = {
    onToggle: PropTypes.func,
    isChecked: PropTypes.bool,
  }

  render() {
    const {onToggle, isChecked} = this.props

    return (
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.box}>
          { isChecked && <View style={styles.inner}/> }
        </View>
      </TouchableOpacity>
    )
  }
}

class TaskDetails extends Component {
  static propTypes = {
    onRemoveItem: PropTypes.func.isRequired,
    onToggleItemCompleted: PropTypes.func.isRequired,
  }

  render() {
    const {onToggleItemCompleted, onRemoveItem} = this.props
    const task = this.props.task

    return (
      <View style={styles.item}>
        <Text>{task.title}</Text>
      <View style={styles.rightSection}>
          <Checkbox
            isChecked={task.completed}
            onToggle={() => onToggleItemCompleted(task.id)}
          />
          <TouchableOpacity onPress={() => onRemoveItem(task.id)}>
            <Text style={styles.remove}> &times; </Text>
          </TouchableOpacity>
       </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header :{
    padding :30,
    textAlign: 'center',
    backgroundColor:'#00BFFF',
    color:'white',
    fontWeight:'bold',
    fontSize: 16

  },

  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  box: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  inner: {
    flex: 1,
    margin: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },

  title: {
    textAlign: 'center',
    color: 'white',
  },

  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  input: {
    height: 50,
    padding: 15,
    backgroundColor: 'whitesmoke',

  },

  remove: {
    marginLeft: 10,
    marginBottom: 2,
    color: '#CD5C5C',
    fontSize: 26,
  },

});


AppRegistry.registerComponent('TodoList', () => TodoList);
