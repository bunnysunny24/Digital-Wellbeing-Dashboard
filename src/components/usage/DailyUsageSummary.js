import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DailyUsageSummary = ({ totalHours, percentChange, isIncrease }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Today's Screen Time</Text>
        <View style={styles.hoursContainer}>
          <Text style={styles.hours}>{totalHours}</Text>
          <Text style={styles.hoursUnit}>hours</Text>
        </View>
        
        <View style={styles.changeContainer}>
          <Icon 
            name={isIncrease ? 'arrow-up' : 'arrow-down'} 
            size={16} 
            color={isIncrease ? '#FF6B6B' : '#4CAF50'} 
          />
          <Text 
            style={[
              styles.changeText, 
              { color: isIncrease ? '#FF6B6B' : '#4CAF50' }
            ]}
          >
            {percentChange}% {isIncrease ? 'more' : 'less'} than yesterday
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  hours: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333',
  },
  hoursUnit: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    marginLeft: 5,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default DailyUsageSummary;