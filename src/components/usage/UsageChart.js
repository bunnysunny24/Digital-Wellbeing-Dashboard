import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const UsageChart = ({ data }) => {
  // Find the maximum value for scaling
  const maxHours = Math.max(...data.map(item => item.hours)) * 1.2; // Add 20% padding to top
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {[...Array(5)].map((_, i) => {
            const value = maxHours * ((4 - i) / 4);
            return (
              <Text key={i} style={styles.axisLabel}>
                {value.toFixed(1)}h
              </Text>
            );
          })}
        </View>
        
        {/* Bars */}
        <View style={styles.barsContainer}>
          {data.map((item, index) => {
            // Calculate height as percentage of container
            const heightPercentage = (item.hours / maxHours) * 100;
            
            return (
              <View key={index} style={styles.barColumn}>
                <View style={styles.barLabelContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${heightPercentage}%`,
                        backgroundColor: item.hours > maxHours * 0.7 ? '#FF6B6B' : '#5A78FF' 
                      }
                    ]}
                  />
                </View>
                <Text style={styles.barLabel}>{item.day}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  yAxis: {
    width: 40,
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  axisLabel: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    paddingRight: 5,
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingLeft: 10,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barLabelContainer: {
    height: '85%', // Leave room for the label beneath
    width: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '60%',
    minWidth: 20,
    maxWidth: 35,
    alignSelf: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
});

export default UsageChart;