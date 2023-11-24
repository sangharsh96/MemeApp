import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export function AllMemes({navigation}: any) {
  const [memeData, setMemeData] = useState<any>([]);
  const [details, setDetails] = useState({});
  console.log(memeData, 'Data');
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(({data}) => setMemeData(data.memes));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={memeData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('meme', {
        data:item
      })}>
            <View>
              <View>
                <Image
                  source={{uri: item.url}}
                  style={{width: 200, height: 200, resizeMode: 'cover'}}
                />
              </View>
              <View>
                <Text>{item.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
   
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
