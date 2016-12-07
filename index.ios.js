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
  View
} from 'react-native';

export default class TodoList extends Component {


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
      { id: 1, title: "La Reina del Sur"},
      { id: 2, title: "Ready Player One"},
      { id: 3, title: "Samurai Jack"},
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
  render() {
    movie = this.props.movie
    return (
      <View style={styles.item}>
      <Text>{movie.title}</Text>

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




});


AppRegistry.registerComponent('TodoList', () => TodoList);
