import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Title} from '../Comman/Title';

interface ProfileScreenProps {
  navigation: any;
}

const trip_plan_india = [
  {
    destination: 'Jaipur',
    photo_url:
      'https://media.istockphoto.com/id/1135820309/photo/amber-fort-and-maota-lake-jaipur-rajasthan-india.jpg?s=612x612&w=0&k=20&c=raUKDB1Mris9Z7SjvuuTieZRzF2-CaKukGvTC8t1kuo=',
  },
  {
    destination: 'Goa',
    photo_url:
      'https://media.istockphoto.com/id/535168027/photo/india-goa-palolem-beach.jpg?s=612x612&w=0&k=20&c=iGV1Ue0Efj87dQirWnUpZVG1dNobUjfVvMGdKHTJ7Qg=',
  },
  {
    destination: 'Varanasi',
    photo_url:
      'https://t4.ftcdn.net/jpg/04/08/25/05/360_F_408250543_MVaEVGeWxb4FiFy7mEGKj8nfYkwoAZON.jpg',
  },
  {
    destination: 'Munnar',
    photo_url:
      'https://t4.ftcdn.net/jpg/01/28/57/63/360_F_128576315_ejpjSy7S7fsH275jCDuUtykU1O3B6rUb.jpg',
  },
  {
    destination: 'Munnar',
    photo_url:
      'https://t4.ftcdn.net/jpg/01/28/57/63/360_F_128576315_ejpjSy7S7fsH275jCDuUtykU1O3B6rUb.jpg',
  },
  
];

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      const userData = JSON.parse(storedUserData);
      setUserData(userData);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    // Remove user data from local storage
    //await AsyncStorage.removeItem('userData');

    // Navigate back to Home screen
    navigation.navigate('Home');
  };

  const handleDestinationPress = (destination: string) => {
    // Navigate to MapScreen with the selected destination
    navigation.navigate('Map', {destination});
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity onPress={() => handleDestinationPress(item.destination)}>
      <View style={{justifyContent: 'center', alignContent: 'center'}}>
        <View style={{height: 300, width: '100%', padding: 10}}>
          <Image
            source={{uri: item.photo_url}}
            style={{width: '100%', height: '95%'}}
          />
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>{item.destination}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Title title="Trip Locations" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>Welcome {userData?.username}!</Text>
        <Button title="Log Out" onPress={handleLogout} />
      </View>
      {userData ? (
        <View>
          <FlatList
            data={trip_plan_india}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
