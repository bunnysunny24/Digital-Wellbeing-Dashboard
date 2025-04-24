import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

// Import components
import Header from '../components/common/Header';
import GoalCard from '../components/goals/GoalCard';
import GoalForm from '../components/goals/GoalForm';
import BottomNavigation from '../components/common/BottomNavigation';

const GoalsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [goals, setGoals] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  
  // Mock data
  useEffect(() => {
    setGoals([
      { 
        id: '1', 
        name: 'Reduce Instagram', 
        target: 60, 
        current: 95, 
        icon: 'instagram', 
        color: '#E1306C' 
      },
      { 
        id: '2', 
        name: 'Limit Social Media', 
        target: 120, 
        current: 165, 
        icon: 'account-group', 
        color: '#4267B2' 
      },
      { 
        id: '3', 
        name: 'Less YouTube', 
        target: 90, 
        current: 78, 
        icon: 'youtube', 
        color: '#FF0000' 
      },
      { 
        id: '4', 
        name: 'Productive Time', 
        target: 180, 
        current: 95, 
        icon: 'briefcase', 
        color: '#4CAF50' 
      },
    ]);
  }, []);

  const handleAddGoal = () => {
    setSelectedGoal(null);
    setIsFormVisible(true);
  };

  const handleEditGoal = (goal) => {
    setSelectedGoal(goal);
    setIsFormVisible(true);
  };

  const handleDeleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleSaveGoal = (updatedGoal) => {
    if (selectedGoal) {
      // Edit existing goal
      setGoals(goals.map(goal => 
        goal.id === updatedGoal.id ? updatedGoal : goal
      ));
    } else {
      // Add new goal
      setGoals([...goals, updatedGoal]);
    }
    
    setIsFormVisible(false);
    setSelectedGoal(null);
  };
  
  const navigateTo = (screen) => {
    // Map tab keys to screen names
    const screenMapping = {
      'dashboard': 'Dashboard',
      'usage': 'UsageDetails',
      'focus': 'FocusMode',
      'goals': 'Goals',
      'settings': 'Settings'
    };
    
    // Navigate to the correct screen
    if (screenMapping[screen]) {
      navigation.navigate(screenMapping[screen]);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={theme.colors.card} barStyle={theme.colors.statusBar} />
      
      <Header 
        title="Your Goals" 
        onBack={() => navigation.goBack()}
        rightIcon="plus"
        onRightPress={handleAddGoal}
      />

      <View style={styles.content}>
        {goals.length > 0 ? (
          <FlatList
            data={goals}
            renderItem={({ item }) => (
              <GoalCard 
                goal={item} 
                onEdit={handleEditGoal} 
                onDelete={handleDeleteGoal}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Icon name="flag-outline" size={64} color={theme.colors.textTertiary} />
            <Text style={[styles.emptyStateText, { color: theme.colors.text }]}>No goals set</Text>
            <Text style={[styles.emptyStateSubText, { color: theme.colors.textSecondary }]}>
              Set goals to manage your digital wellbeing
            </Text>
          </View>
        )}
        
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.accent }]}
          onPress={handleAddGoal}
        >
          <Icon name="plus" size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add New Goal</Text>
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFormVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {selectedGoal ? 'Edit Goal' : 'New Goal'}
            </Text>
            
            <GoalForm 
              goal={selectedGoal}
              onSave={handleSaveGoal}
              onCancel={() => setIsFormVisible(false)}
            />
          </View>
        </View>
      </Modal>
      
      <BottomNavigation 
        activeTab="goals"
        onTabPress={(tab) => navigateTo(tab)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#5A78FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    shadowColor: '#5A78FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    height: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default GoalsScreen;