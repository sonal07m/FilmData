import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Item = ({ item, film, onClick, onHeartClick, isLeft = true }) => {
    if (!item) return null;
    return (
        <TouchableOpacity style={styles.listItem} onPress={onClick}>
            {
                film ?
                    <Image source={require("../assets/film.png")} style={{ width: 60, height: 60 }} /> :
                    (item.gender === 'male' ?
                        <Image source={require("../assets/male.png")} style={{ width: 60, height: 60 }} /> :
                        <Image source={require("../assets/female.png")} style={{ width: 60, height: 60 }} />
                    )
            }
            <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{film ? item.title || 'dsv' : item.name}</Text>
            </View>
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => onHeartClick(item)}>
                {
                    item.favorite ? <Ionicons name="heart" size={30} color="red" /> :
                        <Ionicons name="heart-outline" size={30} color="red" />
                }
            </TouchableOpacity>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                {
                    isLeft && <Ionicons name="chevron-forward-outline" size={30} color="black" />
                }
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop: 60
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

export default Item