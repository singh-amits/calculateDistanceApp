import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Image, Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkDistance} from '../../../utils/checkDistance';
import styles from './styles';

const CalculateDistance = ({navigation, route}) => {
  const uploadedImage = route.params.userImage;

  const [newlatitude, setNewLatitude] = useState('');
  const [newlongitude, setNewLongitude] = useState('');
  const [initialLatitude, setInitialLatitude] = useState('');
  const [initialLongitude, setInitialLongitude] = useState('');
  const [distanceInKm, setDistanceInKm] = useState('');
  const [distanceInMiles, setDistanceInMiles] = useState('');

  useEffect(() => {
    getInitialCoordinates();
  }, []);

  const getInitialCoordinates = async () => {
    try {
      const savedLat = await AsyncStorage.getItem('initialLatitude');
      const savedLong = await AsyncStorage.getItem('initialLongitude');
      setInitialLatitude(savedLat || '');
      setInitialLongitude(savedLong || '');
    } catch (error) {
      Alert.alert('Error', 'Please try again.');
    }
  };

  const handleCalculateDistance = () => {
    if (newlatitude && newlongitude && initialLatitude && initialLongitude) {
      const calculatedDistance = checkDistance(
        initialLatitude,
        initialLongitude,
        newlatitude,
        newlongitude,
      );
      const distanceInMiles = calculatedDistance * 0.621371;

      setDistanceInKm(calculatedDistance);
      setDistanceInMiles(distanceInMiles);
    } else {
      Alert.alert('Error', 'Please enter latitude and longitude values.');
    }
  };
  const navigateTo = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {uploadedImage ? (
        <>
          <Image
            style={styles.imagePreview}
            source={{uri: uploadedImage?.uri}}
          />
          <Text style={styles.title}>My Uploaded Image</Text>
        </>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Enter latitude"
        value={newlatitude}
        onChangeText={setNewLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter longitude"
        value={newlongitude}
        onChangeText={setNewLongitude}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <Button title="Calculate" onPress={handleCalculateDistance} />
        <Button title="Previous" onPress={navigateTo} />
      </View>

      {distanceInMiles !== '' ? (
        <View style={{marginHorizontal: 15}}>
          <Text style={styles.distanceText}>
            Distance(KM) :
            <Text style={{color: '#000'}}>
              {' '}
              {distanceInKm.toFixed(2)} KiloMeters{' '}
            </Text>
          </Text>
          <Text style={styles.distanceText}>
            Distance(Miles) :{' '}
            <Text style={{color: '#000'}}>
              {distanceInMiles.toFixed(2)} Miles
            </Text>
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default CalculateDistance;
