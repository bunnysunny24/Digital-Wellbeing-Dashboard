import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Predefined colors and icons for goals
const COLORS = [
  '#5A78FF', '#FF6B6B', '#56CCF2', '#6FCF97',
  '#F2994A', '#9B51E0', '#2D9CDB', '#EB5757'
];

const ICONS = [
  'instagram', 'youtube', 'facebook', 'twitter',
  'phone', 'message', 'gamepad-variant', 'shopping',
  'laptop', 'television', 'web', 'account-group'
];

const GoalForm = ({ goal, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [iconPickerVisible, setIconPickerVisible] = useState(false);
  
  useEffect(() => {
    if (goal) {
      setName(goal.name || '');
      
      // Parse target time
      const targetMinutes = goal.target || 0;
      setHours(Math.floor(targetMinutes / 60).toString());
      setMinutes((targetMinutes % 60).toString());
      
      setSelectedIcon(goal.icon || ICONS[0]);
      setSelectedColor(goal.color || COLORS[0]);
    } else {
      // Default values for new goal
      setName('');
      setHours('');
      setMinutes('');
      setSelectedIcon(ICONS[0]);
      setSelectedColor(COLORS[0]);
    }
  }, [goal]);

  const handleSave = () => {
    const targetMinutes = (parseInt(hours, 10) || 0) * 60 + (parseInt(minutes, 10) || 0);
    
    if (!name.trim()) {
      alert('Please enter a goal name');
      return;
    }
    
    if (targetMinutes <= 0) {
      alert('Please set a valid time limit');
      return;
    }
    
    const newGoal = {
      id: goal?.id || Date.now().toString(),
      name: name.trim(),
      target: targetMinutes,
      current: goal?.current || 0,
      icon: selectedIcon,
      color: selectedColor,
    };
    
    onSave(newGoal);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Goal Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g., Reduce Instagram Usage"
        placeholderTextColor="#999"
      />
      
      <Text style={styles.label}>Time Limit</Text>
      <View style={styles.timeContainer}>
        <View style={styles.timeInputContainer}>
          <TextInput
            style={styles.timeInput}
            value={hours}
            onChangeText={setHours}
            placeholder="0"
            keyboardType="number-pad"
            maxLength={2}
            placeholderTextColor="#999"
          />
          <Text style={styles.timeUnit}>hours</Text>
        </View>
        
        <View style={styles.timeInputContainer}>
          <TextInput
            style={styles.timeInput}
            value={minutes}
            onChangeText={setMinutes}
            placeholder="0"
            keyboardType="number-pad"
            maxLength={2}
            placeholderTextColor="#999"
          />
          <Text style={styles.timeUnit}>minutes</Text>
        </View>
      </View>
      
      <Text style={styles.label}>Icon</Text>
      <TouchableOpacity
        style={styles.iconSelector}
        onPress={() => setIconPickerVisible(true)}
      >
        <View style={[styles.iconPreview, { backgroundColor: selectedColor }]}>
          <Icon name={selectedIcon} size={24} color="#FFF" />
        </View>
        <Text style={styles.selectorText}>Choose Icon</Text>
        <Icon name="chevron-right" size={20} color="#888" />
      </TouchableOpacity>
      
      <Text style={styles.label}>Color</Text>
      <TouchableOpacity
        style={styles.colorSelector}
        onPress={() => setColorPickerVisible(true)}
      >
        <View style={[styles.colorPreview, { backgroundColor: selectedColor }]} />
        <Text style={styles.selectorText}>Choose Color</Text>
        <Icon name="chevron-right" size={20} color="#888" />
      </TouchableOpacity>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Goal</Text>
        </TouchableOpacity>
      </View>
      
      {/* Icon Picker Modal */}
      <Modal
        visible={iconPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIconPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Icon</Text>
            
            <View style={styles.iconGrid}>
              {ICONS.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    { backgroundColor: selectedIcon === icon ? selectedColor : '#F5F5F5' }
                  ]}
                  onPress={() => {
                    setSelectedIcon(icon);
                    setIconPickerVisible(false);
                  }}
                >
                  <Icon
                    name={icon}
                    size={24}
                    color={selectedIcon === icon ? '#FFF' : '#555'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIconPickerVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Color Picker Modal */}
      <Modal
        visible={colorPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setColorPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose a Color</Text>
            
            <View style={styles.colorGrid}>
              {COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColorOption
                  ]}
                  onPress={() => {
                    setSelectedColor(color);
                    setColorPickerVisible(false);
                  }}
                />
              ))}
            </View>
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setColorPickerVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  timeInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  timeUnit: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  iconSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  colorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  iconPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  selectorText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#5A78FF',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  iconOption: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: '23%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: '#333',
  },
  closeButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GoalForm;