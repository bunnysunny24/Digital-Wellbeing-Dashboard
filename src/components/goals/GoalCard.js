import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GoalCard = ({ goal, onEdit, onDelete }) => {
  const { id, name, target, current, icon, color } = goal;
  
  // Calculate percentage completed
  const percentage = Math.min(100, Math.round((current / target) * 100));
  const isExceeded = current > target;
  
  // Format time display
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon name={icon} size={22} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(goal)} style={styles.actionButton}>
            <Icon name="pencil" size={18} color="#777" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(id)} style={styles.actionButton}>
            <Icon name="delete" size={18} color="#777" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${percentage}%`,
                backgroundColor: isExceeded ? '#FF6B6B' : color 
              }
            ]} 
          />
        </View>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.targetText}>
          <Text style={styles.emphasizedText}>{formatTime(current)}</Text>
          {isExceeded ? ' over ' : ' of '}
          <Text style={styles.targetValue}>{formatTime(target)}</Text> target
        </Text>
        
        {isExceeded && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Exceeded</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 6,
    marginLeft: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    width: 40,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  targetText: {
    fontSize: 14,
    color: '#666',
  },
  emphasizedText: {
    fontWeight: '600',
    color: '#333',
  },
  targetValue: {
    fontWeight: '600',
    color: '#555',
  },
  badge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default GoalCard;