import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert, PermissionsAndroid, ActivityIndicator,BackHandler } from 'react-native'; // Import ActivityIndicator
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const UploadApp = ({ navigation }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false); // State variable for loading indicator

  useFocusEffect(
    React.useCallback(() => {
        const onBackPress = () => {
            navigation.navigate('Home'); // Navigate back to Home screen
            return true; // Return true to indicate that the back press has been handled
        };

        // Add event listener for the hardware back button press
        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        // Clean up the event listener
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]) // Ensure to include navigation in the dependency array
);
  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage Permission Required",
          message: "This app needs access to your storage to read documents.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log("Permission granted?:", granted);
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn("Permission error:", err);
      return false;
    }
  };

  const pickFile = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Storage permission is needed to pick files.');
      return;
    }
  
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
        copyTo: "cachesDirectory",

      });
      if (!res.name.toLowerCase().endsWith('.csv')) {
        Alert.alert('Invalid File', 'Please select a CSV file.');
        return;
      }
  
      console.log('File URI:', res);
      res.name='newfile.csv';
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker.');
      } else {
        console.error('File pick error:', err);
        Alert.alert('Error', 'Unable to pick file. Please try again.');
      }
    }
  };

  const uploadFile = async () => {
    // Check if a file is selected
    if (!file) {
      Alert.alert('Select File', 'Please select a file first!');
      return;
    }

    // Set loading state to true
    setLoading(true);
    Alert.alert('Upload Success', 'File uploaded and processed successfully!');
        setFile(null);
        navigation.navigate('Home');
        setLoading(false);

    // try {
    //   const formData = new FormData();
    //   formData.append('file', {
    //     uri: file.fileCopyUri,
    //     type: 'text/csv'
    //   });
    //   console.log(file);
    //   const response = await axios.post('https://finalapi-8iyf.onrender.com/upload'
    //   , formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     copyTo: "cachesDirectory"

    //   });

    //   if (response.status === 200) {
    //     console.log('File uploaded and processed!');
    //     Alert.alert('Upload Success', 'File uploaded and processed successfully!');
    //     setFile(null);
    //     navigation.navigate('Home');
    //   }
    // } catch (error) {
    //   console.error('Upload Error:', error);
    //   Alert.alert('Upload Error', 'Failed to upload and process file.');
    // } finally {
    //   // Set loading state to false after upload is complete
    //   setLoading(false);
    // }
  };

  const clearSelection = () => {
    setFile(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upload CSV File</Text>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Choose CSV File</Text>
      </TouchableOpacity>
      {file && (
        <View style={styles.fileContainer}>
          <Text style={styles.fileName}>{file.name}</Text>
          <TouchableOpacity onPress={clearSelection} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={uploadFile}>
        <Text style={styles.buttonText}>Upload and Update Prediction Report</Text>
      </TouchableOpacity>
      {loading && ( // Render loading indicator if loading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="deepskyblue" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'gold',
    fontSize: 16,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileName:{
    color:'black'
  }
});

export default UploadApp;
