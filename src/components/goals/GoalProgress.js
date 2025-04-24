import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GoalProgressItem = ({ goal }) => {
  const { name, target, current, icon, color } = goal;
  
  // Calculate percentage
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const isExceeded = current > target;
  
  return (
    <View style={styles.goalItem}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon name={icon} size={18} color="#FFFFFF" />
      </View>
      <View style={styles.goalDetails}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalName}>{name}</Text>
          <Text style={[
            styles.percentageText, 
            { color: isExceeded ? '#FF6B6B' : '#555' }
          ]}>
            {percentage}%
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBarFill, 
              { 
                width: `${percentage}%`,
                backgroundColor: isExceeded ? '#FF6B6B' : color 
              }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const GoalProgress = ({ goals, onViewAll, maxItems = 2 }) => {
  // Only show first maxItems if maxItems is specified
  const displayGoals = maxItems ? goals.slice(0, maxItems) : goals;
  
  return (
    <View style={styles.container}>
      <FlatList
        data={displayGoals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GoalProgressItem goal={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        scrollEnabled={false}
      />
      
      {goals.length > maxItems && onViewAll && (
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
          <Text style={styles.viewAllText}>View All Goals</Text>
          <Icon name="chevron-right" size={16} color="#5A78FF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalDetails: {
    flex: 1,
    marginLeft: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  goalName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingVertical: 8,
  },
  viewAllText: {
    color: '#5A78FF',
    fontWeight: '500',
    marginRight: 4,
  },
});

export default GoalProgress;