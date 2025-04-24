import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMemo } from 'react';

const DailyUsageSummary = ({ totalHours, percentChange, isIncrease }) => {
  const formattedHours = useMemo(() => {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return `${hours}h ${minutes}m`;
  }, [totalHours]);

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.hoursText}>{formattedHours}</Text>
            <Text style={styles.todayText}>Today</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {percentChange > 0 && (
          <View style={styles.statItem}>
            <View style={[styles.changeIndicator, { backgroundColor: isIncrease ? '#FF6B6B' : '#4CAF50' }]}>
              <Icon
                name={isIncrease ? 'arrow-up' : 'arrow-down'}
                size={16}
                color="#FFF"
              />
            </View>
            <Text style={styles.changeText}>
              <Text style={styles.percentText}>{percentChange}% </Text>
              {isIncrease ? 'more' : 'less'} than yesterday
            </Text>
          </View>
        )}
        
        <View style={styles.statItem}>
          <View style={[styles.changeIndicator, { backgroundColor: '#5A78FF' }]}>
            <Icon name="phone" size={16} color="#FFF" />
          </View>
          <Text style={styles.changeText}>
            <Text style={styles.boldText}>42 </Text>unlocks today
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  outerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 12,
    borderColor: 'rgba(90, 120, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  hoursText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  todayText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  statsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  changeIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  changeText: {
    fontSize: 14,
    color: '#555',
  },
  percentText: {
    fontWeight: 'bold',
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default DailyUsageSummary;