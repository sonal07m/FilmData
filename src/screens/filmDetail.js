import * as React from 'react';
import { FlatList, View, Text, SafeAreaView } from 'react-native';
import Item from '../commonComponent/itemComponent';
import { useSelector, useDispatch } from "react-redux";
import { setFavoriteChar } from '../actions'

const FilmDetail = ({ navigation, route }) => {
  const films = useSelector((state) => state.film.films);
  const dispatch = useDispatch();
  const id = route.params.film_id;
  var item = films.filter(function (film) {
    return film.episode_id === id;
  })[0];
  const onCharClick = (name) => {
    navigation.navigate('CharDetail', { name: name })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30 }}>
        
        <View style={{ width: '100%', flexDirection: 'row', }}>
          <Text style={{ width: '24%' }}>Title:</Text>
          <Text>
            {item.title}
          </Text>
        </View>

        <View style={{ width: '100%', flexDirection: 'row', }}>
          <Text style={{ width: '24%' }}>Description:</Text>
          <Text numberOfLines={2} ellipsizeMode={'tail'} style={{ width: '76%' }}>
            {((item.opening_crawl).length > 50) ?
              (((item.opening_crawl).substring(0, 50 - 3)) + '...') :
              mytextitem.opening_crawlvar}
          </Text>
        </View>

        <View style={{ width: '100%', flexDirection: 'row', }}>
          <Text style={{ width: '24%' }}>Director:</Text>
          <Text>
            {item.director}
          </Text>
        </View>

        <View style={{ width: '100%', flexDirection: 'row', }}>
          <Text style={{ width: '24%' }}>Producer:</Text>
          <Text>
            {item.producer}
          </Text>
        </View>

      </View>

      <Text>Character List</Text>
      <FlatList
        style={{ flex: 1, marginTop: 20 }}
        data={item.characters}
        renderItem={({ item }) => <Item item={JSON.parse(item)} film={false} onClick={() => onCharClick(item)}
          onHeartClick={(item) => dispatch(setFavoriteChar(id, item.name))} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
export default FilmDetail;