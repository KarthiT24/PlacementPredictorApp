import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { View, Button, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log('User logged out successfully!');
      navigation.navigate('Auth'); // Navigate to AuthScreen after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.buttonContainer}>
          <Button
            title="View Prediction"
            onPress={() => navigation.navigate('PredictionScreen')}
            color="#3498db"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Upload File"
            onPress={() => navigation.navigate('UploadScreen')}
            color="#3498db"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    margin: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});

export default HomeScreen;
