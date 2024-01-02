// screens/HomeScreen.tsx

import React from 'react';
import {View, Button, Image} from 'react-native';
import {Title} from '../Comman/Title';

interface HomeScreenProps {
  navigation: any; // Adjust the type according to your navigation prop type
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View>
      <Title title="Trip Plan App" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 40,
          marginTop:100,
          marginBottom:150,
        }}>
        <Image
          style={{
            width: '70%',
            height: 100,

            borderRadius: 10,
            padding: 100,
          }}
          source={require('../assets/UserImage.png')}
        />
      </View>
      <Button title="Sign Up" onPress={() => navigation.navigate('Signup')}  />
      <View style={{height:20}}></View>
      <Button title="Log In" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default HomeScreen;
