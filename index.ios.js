/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   ScrollView,
   Button,
   View
 } from 'react-native';

 export default class TodoList extends Component {




   constructor(props) {
     super(props)
     this.clearList = this.clearList.bind(this)
   }
   state = {
     movies: [
       { id: 1, title: "La Reina del Sur", year: 2011 },
       { id: 2, title: "Ready Player One", year: 2018 },
       { id: 3, title: "Samurai Jack", year: 2001 },
     ]
   }
   clearList() {
     this.setState({ movies: [] })
   }
   render() {

     return (



       <ScrollView style={styles.movieList}>
        <Text style={styles.header}>TODOAPP</Text>


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



});


AppRegistry.registerComponent('TodoList', () => TodoList);
