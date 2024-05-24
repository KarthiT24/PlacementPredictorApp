import React, { useState, useEffect } from 'react';
import { ScrollView, BackHandler } from 'react-native'; // Import BackHandler
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook
import CompanyCard from './CompanyCard';
import { initializeApp } from '@firebase/app';
import exportJSON from '../../lstm_prediction_report';

// Firebase configuration
const config = {
    apiKey: "AIzaSyBejzfwpu1lyNQg07jaQ-qyo0HqrBImgUo",
    authDomain: "placementprediction-fp.firebaseapp.com",
    projectId: "placementprediction-fp",
    storageBucket: "placementprediction-fp.appspot.com",
    messagingSenderId: "403450492438",
    appId: "1:403450492438:web:e307336c971fde21b4a737",
    measurementId: "G-6W2STCNVCX"
};

// Initialize Firebase
initializeApp(config);

const PredictionViewScreen = ({ navigation }) => { // Pass navigation prop
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const fetchedData = await exportJSON();
            setData(fetchedData);
        }

        fetchData();
    }, []);

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

    if (!data) {
        return <ScrollView><CompanyCard company="Loading..." data={{}} /></ScrollView>;
    }

    // Convert object to array, sort it, and then map to components
    const sortedCompanies = Object.entries(data).sort((a, b) => {
        return a[0].localeCompare(b[0]); // Sort by company name alphabetically
    });

    return (
        <ScrollView>
            {sortedCompanies.map(([company, details], index) => (
                <CompanyCard key={index} company={company} data={details} />
            ))}
        </ScrollView>
    );
};

export default PredictionViewScreen;