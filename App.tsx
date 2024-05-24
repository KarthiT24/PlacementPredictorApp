import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AuthScreen from '../PlacementPredictorApp/frontend/screens/AuthScreen';
import HomeScreen from './frontend/screens/HomeScreen';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from './frontend/utils/firebaseConfig';

const App=({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleAuthentication = async () => {
    if (user) {
      navigation.navigate('Auth');
      await signOut(auth);
      console.log('User logged out successfully!');
      
    } else {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
        navigation.navigate('Home');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully!');
        navigation.navigate('Auth');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <HomeScreen user={user} handleAuthentication={handleAuthentication} navigation={navigation} />
      ) : (
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  }
});
export default App;