import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { getFilms, getCharacter, setFavoriteFilm } from '../actions'
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';
import Item from '../commonComponent/itemComponent';

const Feed = () => {
    const navigation = useNavigation();
    const films = useSelector((state) => state.film.films);
    const dispatch = useDispatch();

    useEffect(() => {
        const request = {
            onSuccess: (res) => {
                dispatch(getCharacter())
                showMessage({
                    message: "All Flims are fetched",
                    type: "success",
                });
            },
            onFail: (err) => {
                showMessage({
                    message: "Error while fetching films",
                    type: "danger",
                });
            },
        };
        if(films.length === 0) {
            dispatch(getFilms(request));
        }
    }, [])
    const onFilmClick = (id) => {
        navigation.navigate('FilmDetail', {film_id: id})
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{ flex: 1 }}
                data={films}
                renderItem={({ item }) => <Item item={item} film={true} onClick={()=>onFilmClick(item.episode_id)} onHeartClick={(item)=> dispatch(setFavoriteFilm(item))}/>}
                keyExtractor={(item, index) => index.toString()}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    listItem: {
        margin: 10,
        padding: 10,
        backgroundColor: "#FFF",
        width: "80%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    }
});


export default Feed;