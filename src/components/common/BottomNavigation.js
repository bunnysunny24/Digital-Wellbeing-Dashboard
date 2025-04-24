import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BottomNavigation = ({ activeTab, onTabPress }) => {
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: 'view-dashboard-outline' },
    { key: 'usage', label: 'Usage', icon: 'chart-timeline-variant' },
    { key: 'focus', label: 'Focus', icon: 'timer-outline' },
    { key: 'goals', label: 'Goals', icon: 'flag-outline' },
    { key: 'settings', label: 'Settings', icon: 'cog-outline' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tabItem}
          onPress={() => onTabPress(tab.key)}
          activeOpacity={0.7}
        >
          <Icon
            name={tab.icon}
            size={24}
            color={activeTab === tab.key ? '#5A78FF' : '#9E9E9E'}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === tab.key ? '#5A78FF' : '#9E9E9E' }
            ]}
          >
            {tab.label}
          </Text>
          {activeTab === tab.key && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 32,
    height: 3,
    backgroundColor: '#5A78FF',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
});

export default BottomNavigation;