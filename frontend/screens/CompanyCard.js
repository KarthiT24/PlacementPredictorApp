import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const CompanyCard = ({ company, data }) => {
    const [visible, setVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);

    const handlePress = () => {
        setVisible(true);
    };

    const handleModalClose = () => {
        setVisible(false);
        setSelectedYear(null);
    };

    const handleYearPress = (year) => {
        setSelectedYear(year === selectedYear ? null : year);
    };

    const renderBarChart = (skills) => {
        const skillNames = Object.keys(skills);
        const percentages = Object.values(skills);

        // Increase chart width based on number of items
        const chartWidth = Math.max(screenWidth, skillNames.length * 50); // 50 pixels per skill

        return (
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                style={{ flexGrow: 0, overflow: 'hidden' }}>
                <BarChart
                    data={{
                        labels: skillNames,
                        datasets: [{ data: percentages }]
                    }}
                    width={chartWidth}  // Width based on the number of skills
                    height={220}
                    yAxisLabel=""
                    xAxisLabel=""
                    chartConfig={{
                        backgroundColor: 'blue',
                        backgroundGradientFrom: '#fb8c00',
                        backgroundGradientTo: '#ffa726',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        barPercentage: 0.85,
                        propsForLabels: {
                            fontSize: 10,
                        },
                        verticalLabelRotation: 30,
                    }}
                    showBarTops
                    showValuesOnTopOfBars
                    fromZero
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        alignSelf: 'center',  // Ensure chart is centered within the scroll view
                    }}
                />
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={handlePress}>
                <View style={styles.cardContent}>
                    <Text style={styles.name}>{company}</Text>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={handleModalClose}
            >
                <ScrollView style={{ marginTop: 20 }}>
                    {Object.entries(data).sort((a, b) => b[0] - a[0]).map(([year, detail], index) => (
                        <TouchableOpacity key={index} onPress={() => handleYearPress(year)}>
                            <View style={styles.modalYear}>
                                <Text style={styles.yearText}>{year}</Text>
                                <Text style={styles.countText}>Predicted Result: {detail.count}</Text>
                            </View>
                            {selectedYear === year && renderBarChart(detail.skills)}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ebf0f7"
    },
    card: {
        backgroundColor: "white",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        elevation: 3,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        color: "#3399ff",
        fontWeight: 'bold',
    },
    modalYear: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#ddd",
        marginVertical: 5,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    yearText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    countText: {
        fontWeight: 'bold',
    },
});

export default CompanyCard;
