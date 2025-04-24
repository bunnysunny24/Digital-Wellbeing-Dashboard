import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const formatTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes}m`;
  } else {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return min > 0 ? `${hours}h ${min}m` : `${hours}h`;
  }
};

const GoalCard = ({ goal, onEdit, onDelete }) => {
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (goal.current / goal.target) * 100);
  const isExceeding = goal.current > goal.target;
  
  // Determine status color
  const getStatusColor = () => {
    if (isExceeding) return '#FF6B6B'; // Over limit - red
    if (progressPercentage >= 90) return '#FFA26B'; // Almost at limit - orange
    return '#4CAF50'; // Good progress - green
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.titleSection}>
          <View style={[styles.iconContainer, { backgroundColor: goal.color }]}>
            <Icon name={goal.icon} size={20} color="#FFF" />
          </View>
          <Text style={styles.title}>{goal.name}</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(goal)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="pencil-outline" size={20} color="#777" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete(goal.id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="delete-outline" size={20} color="#777" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${progressPercentage}%`, backgroundColor: getStatusColor() }
          ]} 
        />
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current Usage</Text>
          <Text 
            style={[
              styles.statValue, 
              isExceeding && styles.exceedingValue
            ]}
          >
            {formatTime(goal.current)}
            {isExceeding && (
              <Text style={styles.exceedingIndicator}>
                {' '} • exceeding
              </Text>
            )}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Daily Target</Text>
          <Text style={styles.statValue}>{formatTime(goal.target)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 5,
    marginLeft: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {},
  statLabel: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  exceedingValue: {
    color: '#FF6B6B',
  },
  exceedingIndicator: {
    fontSize: 13,
    fontStyle: 'italic',
  },
});

export default GoalCard;