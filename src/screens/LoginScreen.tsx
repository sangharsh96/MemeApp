

import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from '../Comman/Title';

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
   
   
    
    const storedUserData = await AsyncStorage.getItem('userData');
    console.log(storedUserData,"User Data");
    
    const userData = JSON.parse(storedUserData);

    if (
      userData &&
      userData.username === username &&
      userData.password === password
    ) {
     
      navigation.navigate('Profile');
    } else {
    
    }
  };

  return (
    <View>
      <Title title="User Login" />
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
