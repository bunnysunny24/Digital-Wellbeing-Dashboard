import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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

const AppUsageItem = ({ app, index }) => {
  return (
    <View style={styles.appItem}>
      <View style={styles.appNameSection}>
        <View style={[styles.appIcon, { backgroundColor: app.color }]}>
          <Icon name={app.icon} size={18} color="#FFF" />
        </View>
        <View style={styles.appDetails}>
          <Text style={styles.appName}>{app.name}</Text>
          <Text style={styles.appTime}>{formatTime(app.timeSpent)}</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${Math.min(100, (app.timeSpent / 120) * 100)}%`, backgroundColor: app.color }]} />
      </View>
    </View>
  );
};

const AppUsageList = ({ apps }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={apps}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <AppUsageItem app={item} index={index} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  appItem: {
    paddingVertical: 8,
  },
  appNameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  appIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appDetails: {
    flex: 1,
  },
  appName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  appTime: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
});

export default AppUsageList;