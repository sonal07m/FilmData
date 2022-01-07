import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, SafeAreaView } from 'react-native';
import Item from '../commonComponent/itemComponent';
import { useSelector, useDispatch } from "react-redux";
import { setFavoriteFilm, setFavoriteChar, getdata } from '../actions'

const Favorite = ({ navigation, route }) => {
  let films = useSelector((state) => state.film.films);
  const list = getdata(films);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {list.length === 0 && <Text>No favorte item</Text>}
      <FlatList
        style={{ flex: 1 }}
        data={list}
        renderItem={({ item }) => <Item item={item} film={item.film} onClick={() => { }}
          onHeartClick={(item) => {
            if (item.film) {
              dispatch(setFavoriteFilm(item))
            } else {
              dispatch(setFavoriteChar(item.filmid, item.name));
            }
          }}
          isLeft={false} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
export default Favorite;