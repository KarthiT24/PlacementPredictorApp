import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = ({
  email,
  setEmail,
  password,
  setPassword,
  isLogin,
  setIsLogin
}) => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigation = useNavigation();

  const handleAuthentication = async () => {
    if (!isLogin && password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }
  
    try {
      if (isLogin) {
        await auth().signInWithEmailAndPassword(email, password);
        console.log('User logged in successfully!');
        navigation.navigate('Home');
        // Clear input fields after successful login
        setEmail('');
        setPassword('');
      } else {
        await auth().createUserWithEmailAndPassword(email, password);
        console.log('User signed up successfully!');
        // Show alert for successful sign-up
        Alert.alert(
          'Success',
          'Signed up successfully.',
          [
            { text: 'Go to Login', onPress: () => setIsLogin(true) }
          ]
        );
        // Clear input fields after successful sign-up
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      
      if (error.code === 'auth/invalid-credential') {
        Alert.alert('Error', 'Incorrect password',
        [
          {text:'Forgot Password',onPress:()=>setIsForgotPassword(true)}
        ]);
      }
      if (error.code === 'auth/too-many-requests') {
        Alert.alert('Error', 'Try Changing Password or Try After 5 mins');
      }
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'User Already Exists');
      }
    }
  };
  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address to reset your password.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', 'Password reset email sent.');
      setIsForgotPassword(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.header}>
          {isForgotPassword ? 'Reset Password' : (isLogin ? 'Log In' : 'Create An Account')}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor='grey'
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {!isForgotPassword && (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor='grey'
                secureTextEntry
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={isLogin ? 'Log In' : 'Sign Up'}
                onPress={handleAuthentication}
                color="#3498db"
              />
            </View>
            {isLogin && (
              <Text style={styles.forgotPasswordText} onPress={() => setIsForgotPassword(true)}>
                Forgot Password?
              </Text>
            )}
          </>
        )}

        {isForgotPassword && (
          <>
            <View style={styles.buttonContainer}>
              <Button
                title="Reset Password"
                onPress={handlePasswordReset}
                color="#3498db"
              />
            </View>
            <Text style={styles.toggleText} onPress={() => setIsForgotPassword(false)}>
              Go back to {isLogin ? 'Log In' : 'Sign Up'}
            </Text>
          </>
        )}

        {!isForgotPassword && (
          <View style={styles.bottomContainer}>
            <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
            </Text>
          </View>
        )}

       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1', // Light gray
  },
  authContainer: {
    backgroundColor: '#2C3E50', // Dark blue
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF', // White
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: { // Container for input
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'white', // White
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: '#3498db',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AuthScreen;
