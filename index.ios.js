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

    const newMovies = this.state.movies.filter(
     (movie) => movie.id !== id
   )
   this.setState({ movies: newMovies })

  }

//metodo addItem del componente principal //

  addItem = (item) => {
    const movie = { id: this.state.movies.length+1 ,title: item};
    const newMovies = this.state.movies.concat([movie]);
    this.setState({movies: newMovies});
  }

  constructor(props) {
    super(props)
    this.clearList = this.clearList.bind(this)
  }
  state = {
    movies: [
      { id: 1, title: "Task 1"},
      { id: 2, title: "Task 2"},
      { id: 3, title: "Task 3 "},
    ]
  }
  clearList() {
    this.setState({ movies: [] })
  }
  render() {

    return (
      <ScrollView style={styles.movieList}>
      <Text style={styles.header}>TODOAPP</Text>
      < Input
      placeholder={'Enter an item!'}
      onSubmit={this.addItem}
      />
      {this.state.movies.map((movie) => {

        return (
          <MovieDetails
          key={movie.id}
          movie={movie}
          onRemoveItem={this.removeItem}
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

class MovieDetails extends Component {
  static propTypes = {
    onRemoveItem: PropTypes.func.isRequired
  }


  render() {
    const {onToggleItemCompleted, onRemoveItem} = this.props
    movie = this.props.movie
    return (
      <View style={styles.item}>
      <Text>{movie.title}</Text>

      <TouchableOpacity onPress={() => onRemoveItem(movie.id)}>
        <Text style={styles.remove}> &times; </Text>
      </TouchableOpacity>
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
    backgroundColor: 'yellow',

  },

  remove: {
    marginLeft: 10,
    marginBottom: 2,
    color: '#CD5C5C',
    fontSize: 26,
  },



});


AppRegistry.registerComponent('TodoList', () => TodoList);
