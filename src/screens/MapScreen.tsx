// Import necessary components and modules
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

interface MapScreenProps {
  route: any;
}

const MapScreen: React.FC<MapScreenProps> = ({route}) => {
  const [userLocation, setUserLocation] = useState<any>(null);

  const destination = route.params.destination;

  const getDestinationCoordinates = (destination: string) => {
    const destinations = {
      Jaipur: {latitude: 26.9124, longitude: 75.7873},
      Goa: {latitude: 15.2993, longitude: 74.124},
      Varanasi: {latitude: 25.3176, longitude: 82.9739},
      Munnar: {latitude: 10.0889, longitude: 77.0595},
    };

    return destinations[destination];
  };
  console.log(destinationCoordinates, 'Destination co');
  const destinationCoordinates = getDestinationCoordinates(destination);

  const calculateDistance = () => {
    if (userLocation && destinationCoordinates) {
      const distance = haversine(userLocation, destinationCoordinates);
      return distance.toFixed(2) + ' km';
    }
    return 'Calculating...';
  };

  const haversine = (start: any, end: any) => {
    const toRadians = (value: number) => (value * Math.PI) / 180;
    const lat1 = toRadians(start.latitude);
    const lon1 = toRadians(start.longitude);
    const lat2 = toRadians(end.latitude);
    const lon2 = toRadians(end.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.asin(Math.sqrt(a));

    const earthRadius = 6371;

    return c * earthRadius;
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const locationPermissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );

      if (locationPermissionStatus === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            console.error(error, 'Error fetching location');
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (result === RESULTS.GRANTED) {
          requestLocationPermission();
        } else {
          console.warn('Location permission denied');
        }
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {userLocation && destinationCoordinates ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={userLocation}
            title="Your Location"
            pinColor="blue"
          />
          <Marker
            coordinate={destinationCoordinates}
            title={destination}
            pinColor="red"
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={styles.distanceContainer}>
        <Text style={styles.distanceText}>
          Distance to {destination}: {calculateDistance()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  distanceContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 3,
  },
  distanceText: {
    fontSize: 16,
  },
});

export default MapScreen;
