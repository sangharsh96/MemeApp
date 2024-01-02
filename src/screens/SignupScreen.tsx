
import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Title } from '../Comman/Title';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    // Perform custom signup logic

    // Save user data locally
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({username, password}),
    );

    // Navigate to Profile screen
    navigation.navigate('Profile');
  };
  console.log(username,password,"User Name and password");
  

  return (
    <View>
      <Title title="Sign Up" />
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
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;
