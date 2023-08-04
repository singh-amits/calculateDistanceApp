import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import styles from './styles';
import uploadImage from '../../../utils/uploadImage';

const Home = ({navigation}) => {
  const [profilePicture, setProfilePicture] = useState(null);

  const options = {
    title: 'Take Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const handleCameraAndPicker = async type => {
    let resp = null;
    if (profilePicture) {
      setProfilePicture(null);
    }
    if (type === 'launch-gallery') {
      resp = await launchImageLibrary(options);
    } else if (type === 'launch-camera') {
      resp = await launchCamera(options);
    }
    if (resp !== null) {
      setProfilePicture(resp?.assets?.[0]);
      uploadImage(resp?.assets?.[0]);
    } else if (resp.didCancel) {
      Alert.alert('Error', 'You cancelled camera capture');
    } else if (resp.errorCode) {
      Alert.alert('Error', 'Error Occured: ', resp.errorMessage);
    }
  };

  const navigateTo = () => {
    navigation.navigate('LocationInput', {
      userImage: profilePicture,
    });
  };

  return (
    <View style={styles.container}>
      {profilePicture ? (
        <Image
          style={styles.imagePreview}
          source={{uri: profilePicture?.uri}}
        />
      ) : null}

      {profilePicture ? (
        <Text style={styles.title}>Uploaded Image</Text>
      ) : (
        <Text style={styles.title}>Please Upload an Image</Text>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCameraAndPicker('launch-gallery')}>
          <Text style={styles.buttonText}>Select from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCameraAndPicker('launch-camera')}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{...styles.button, backgroundColor: '#bf4d0b'}}
        disabled={profilePicture === null}
        onPress={() => {
          navigateTo();
        }}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
