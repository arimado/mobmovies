/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import _ from 'lodash'

const MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'https://i.imgur.com/UePbdph.jpg'}},
];
const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class MobMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row !== row2,
            }),
            loaded: false,
        };
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then((responseData) => {
                this.setState({
                     dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                     loaded: true,
                   });
            })
            .done();
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {

        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderMovie}
                style={styles.listView}
            />
        )
    }


    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        )
    }

    renderMovie(movie) {
        return (
            <View style={styles.container}>
                 <Image
                   source={{uri: _.replace(movie.posters.thumbnail, 'http', 'https')}}
                   style={styles.thumbnail}
                 />
                 <View style={styles.rightContainer}>
                       <Text style={styles.title}>{movie.title}</Text>
                       <Text style={styles.year}>{movie.year}</Text>
                 </View>
           </View>
        )
    }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
   paddingTop: 20,
   backgroundColor: '#F5FCFF',
    },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
      flex: 1
  },
  title: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: 'center'
  },
  year: {
      textAlign: 'center'
  }
});

AppRegistry.registerComponent('MobMovies', () => MobMovies);
