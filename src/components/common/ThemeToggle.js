import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: isDarkMode ? '#333' : '#F0F0F0' }
      ]}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={[
        styles.toggleHandle,
        isDarkMode ? styles.rightAligned : styles.leftAligned,
        { backgroundColor: isDarkMode ? '#5A78FF' : '#FFFFFF' }
      ]}>
        <Icon 
          name={isDarkMode ? 'weather-night' : 'white-balance-sunny'} 
          size={16} 
          color={isDarkMode ? '#FFFFFF' : '#FFC107'} 
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleHandle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  leftAligned: {
    alignSelf: 'flex-start',
  },
  rightAligned: {
    alignSelf: 'flex-end',
  },
});

export default ThemeToggle;