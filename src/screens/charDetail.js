import * as React from 'react';
import { Image, View, Text, SafeAreaView } from 'react-native';

const CharDetail = ({ navigation, route }) => {
  const name = route.params.name;
  const item = JSON.parse(name);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
      {
        item.gender === 'male' ?
          <Image source={require("../assets/male.png")} style={{ width: 120, height: 120 }} /> :
          <Image source={require("../assets/female.png")} style={{ width: 120, height: 120 }} />
      }
      <View style={{ paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30 }}>
        <View style={{ width: '100%', flexDirection: 'row', }}>
          <Text>Name:</Text>
          <Text>
            {item.name}
          </Text>
        </View>

        <View style={{ width: '100%', flexDirection: 'row', }}>
          <Text>Gender:</Text>
          <Text>
            {item.gender}
          </Text>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', }}>
          <Text>Number of films:</Text>
          <Text>
            {item.films.length}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
export default CharDetail;