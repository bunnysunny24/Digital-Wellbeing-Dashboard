import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppUsageItem = ({ app }) => {
  const { name, icon, timeSpent, color } = app;
  
  // Convert minutes to hours and minutes format
  const hours = Math.floor(timeSpent / 60);
  const minutes = timeSpent % 60;
  const timeDisplay = hours > 0 
    ? `${hours}h ${minutes}m`
    : `${minutes}m`;

  return (
    <View style={styles.appItem}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Icon name={icon} size={24} color="#FFFFFF" />
      </View>
      <View style={styles.appDetails}>
        <Text style={styles.appName}>{name}</Text>
        <View style={styles.timeBar}>
          <View style={[styles.timeFill, { width: `${Math.min(100, timeSpent / 2)}%`, backgroundColor: color }]} />
        </View>
      </View>
      <Text style={styles.timeText}>{timeDisplay}</Text>
    </View>
  );
};

const AppUsageList = ({ apps }) => {
  return (
    <FlatList
      data={apps}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <AppUsageItem app={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appDetails: {
    flex: 1,
    marginLeft: 12,
  },
  appName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  timeBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  timeFill: {
    height: '100%',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
});

export default AppUsageList;