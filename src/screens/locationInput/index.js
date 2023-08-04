import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const LocationInput = ({navigation, route}) => {
  const uploadedImage = route.params.userImage;
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [loading, setloading] = useState();
  const [nextButton, setNextButton] = useState(true);

  const isValidCoordinate = coordinate => {
    return !isNaN(parseFloat(coordinate)) && isFinite(coordinate);
  };

  const handleSaveLocation = async () => {
    setloading(true);
    if (isValidCoordinate(latitude) && isValidCoordinate(longitude)) {
      try {
        //Saving the latitude and longitude values to AsyncStorage
        await AsyncStorage.setItem('initialLatitude', latitude);
        await AsyncStorage.setItem('initialLongitude', longitude);
        Alert.alert('Success', 'Location saved successfully!');
        setloading(false);
        setNextButton(false);
      } catch (error) {
        setloading(false);
        Alert.alert('Error', 'Failed to save location.');
      }
    } else {
      setloading(false);
      Alert.alert(
        'Error',
        'Invalid latitude or longitude. Please enter valid values.',
      );
    }
  };
  const handleNextScreen = () => {
    navigation.navigate('CalculateDistance', {
      userImage: uploadedImage,
    });
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
        placeholder="Enter Latitude"
        keyboardType="numeric"
        value={latitude}
        onChangeText={text => setLatitude(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Longitude"
        keyboardType="numeric"
        value={longitude}
        onChangeText={text => setLongitude(text)}
      />
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <Button title="Save" onPress={handleSaveLocation} />
        )}

        <Button title="Next" onPress={handleNextScreen} disabled={nextButton} />
      </View>
    </View>
  );
};

export default LocationInput;
