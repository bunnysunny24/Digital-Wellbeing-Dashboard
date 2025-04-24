import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({ 
  title, 
  onBack, 
  rightIcon, 
  onRightPress, 
  rightText,
  showBack = true 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBack && onBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBack}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Icon name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      
      {(rightIcon || rightText) && (
        <TouchableOpacity 
          style={styles.rightButton} 
          onPress={onRightPress}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          {rightIcon && (
            <Icon name={rightIcon} size={24} color="#5A78FF" />
          )}
          {rightText && (
            <Text style={styles.rightText}>{rightText}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rightButton: {},
  rightText: {
    color: '#5A78FF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Header;