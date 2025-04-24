import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FocusTimer = ({ initialMinutes = 25, onComplete }) => {
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Animated progress circle
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const totalSeconds = initialMinutes * 60;
  
  // Control timer
  useEffect(() => {
    let interval = null;
    
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setRemainingSeconds(seconds => {
          if (seconds <= 1) {
            clearInterval(interval);
            setIsActive(false);
            if (onComplete) onComplete();
            return 0;
          }
          return seconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, onComplete]);
  
  // Animation for progress circle
  useEffect(() => {
    const progress = 1 - (remainingSeconds / totalSeconds);
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, [remainingSeconds, animatedValue, totalSeconds]);
  
  const circumference = 2 * Math.PI * 120; // 2πr
  
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });
  
  // Format remaining time as mm:ss
  const formatTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleToggleTimer = () => {
    if (!isActive) {
      setIsActive(true);
      setIsPaused(false);
    } else {
      setIsPaused(!isPaused);
    }
  };
  
  const handleResetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setRemainingSeconds(initialMinutes * 60);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Animated.View style={styles.svgContainer}>
          {/* Background Circle */}
          <View style={[styles.backgroundCircle]} />
          
          {/* Progress Circle */}
          <Animated.View
            style={[
              styles.progressCircle,
              {
                transform: [
                  {
                    rotate: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.progressIndicator} />
          </Animated.View>
          
          <View style={styles.timeTextContainer}>
            <Text style={styles.timeText}>{formatTime()}</Text>
            <Text style={styles.focusLabel}>
              {isActive ? (isPaused ? 'Paused' : 'Focusing') : 'Ready'}
            </Text>
          </View>
        </Animated.View>
      </View>
      
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetTimer}>
          <Icon name="refresh" size={24} color="#777" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.playPauseButton, { backgroundColor: isActive && !isPaused ? '#FF6B6B' : '#5A78FF' }]}
          onPress={handleToggleTimer}
        >
          <Icon 
            name={isActive ? (isPaused ? 'play' : 'pause') : 'play'} 
            size={32} 
            color="#FFF" 
          />
        </TouchableOpacity>
        
        <View style={styles.resetButton}></View> {/* Empty view for layout balance */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  timerContainer: {
    position: 'relative',
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  svgContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 12,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  progressCircle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 12,
    borderColor: '#5A78FF',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '-90deg' }],
  },
  progressIndicator: {
    width: 16,
    height: 16,
    backgroundColor: '#5A78FF',
    borderRadius: 8,
    position: 'absolute',
    top: -14,
    right: -14,
  },
  timeTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#333',
  },
  focusLabel: {
    fontSize: 18,
    color: '#5A78FF',
    marginTop: 8,
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  resetButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playPauseButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#5A78FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    shadowColor: '#5A78FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
});

export default FocusTimer;