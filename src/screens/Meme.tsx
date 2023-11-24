import React from 'react'
import { Image, View } from 'react-native'

export default function Meme({route, navigation}: any) {
    const data= route.params.data
    console.log(data);
    
  return (
    <View>
      <View style={{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }} >
        <Image
          source={{uri: data.url}}
          style={{width: 200, height: 200, resizeMode: 'cover'}}
        />
      </View>
    </View>
  );
}
