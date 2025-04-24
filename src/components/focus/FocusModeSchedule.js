import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Switch,
  Modal,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Day abbreviations
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Time options for focus mode scheduling
const TIME_OPTIONS = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
];

const FocusModeSchedule = () => {
  const [schedules, setSchedules] = useState([
    { 
      id: '1', 
      name: 'Work Focus', 
      startTime: '09:00', 
      endTime: '17:00',
      days: [0, 1, 2, 3, 4], 
      enabled: true 
    },
    { 
      id: '2', 
      name: 'Evening Relaxation', 
      startTime: '20:00', 
      endTime: '22:00',
      days: [0, 1, 2, 3, 4, 5, 6], 
      enabled: false 
    }
  ]);
  
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [timePickerType, setTimePickerType] = useState('start'); // 'start' or 'end'
  
  const [editName, setEditName] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editDays, setEditDays] = useState([]);
  const [editEnabled, setEditEnabled] = useState(true);
  
  const toggleDay = (dayIndex) => {
    if (editDays.includes(dayIndex)) {
      setEditDays(editDays.filter(d => d !== dayIndex));
    } else {
      setEditDays([...editDays, dayIndex]);
    }
  };
  
  const handleAddSchedule = () => {
    setSelectedSchedule(null);
    setEditName('New Schedule');
    setEditStartTime('09:00');
    setEditEndTime('17:00');
    setEditDays([0, 1, 2, 3, 4]); // Mon-Fri
    setEditEnabled(true);
    setEditModalVisible(true);
  };
  
  const handleEditSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setEditName(schedule.name);
    setEditStartTime(schedule.startTime);
    setEditEndTime(schedule.endTime);
    setEditDays([...schedule.days]);
    setEditEnabled(schedule.enabled);
    setEditModalVisible(true);
  };
  
  const handleSaveSchedule = () => {
    if (!editName.trim()) {
      // Show error
      return;
    }
    
    const updatedSchedule = {
      id: selectedSchedule ? selectedSchedule.id : Date.now().toString(),
      name: editName.trim(),
      startTime: editStartTime,
      endTime: editEndTime,
      days: editDays,
      enabled: editEnabled
    };
    
    if (selectedSchedule) {
      // Update existing
      setSchedules(schedules.map(s => 
        s.id === selectedSchedule.id ? updatedSchedule : s
      ));
    } else {
      // Add new
      setSchedules([...schedules, updatedSchedule]);
    }
    
    setEditModalVisible(false);
  };
  
  const handleDeleteSchedule = () => {
    if (selectedSchedule) {
      setSchedules(schedules.filter(s => s.id !== selectedSchedule.id));
      setEditModalVisible(false);
    }
  };
  
  const handleToggleSchedule = (id) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
  };
  
  const openTimePicker = (type) => {
    setTimePickerType(type);
    setTimePickerVisible(true);
  };
  
  const selectTime = (time) => {
    if (timePickerType === 'start') {
      setEditStartTime(time);
    } else {
      setEditEndTime(time);
    }
    setTimePickerVisible(false);
  };
  
  const renderDayAbbreviation = (day, index) => {
    const isSelected = editDays.includes(index);
    
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.dayBubble,
          isSelected && styles.selectedDayBubble
        ]}
        onPress={() => toggleDay(index)}
      >
        <Text style={[
          styles.dayText,
          isSelected && styles.selectedDayText
        ]}>
          {day}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const renderScheduleItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.scheduleItem}
        onPress={() => handleEditSchedule(item)}
      >
        <View style={styles.scheduleInfo}>
          <Text style={styles.scheduleName}>{item.name}</Text>
          <View style={styles.scheduleDetails}>
            <Text style={styles.scheduleTime}>
              {item.startTime} - {item.endTime}
            </Text>
            <Text style={styles.scheduleDays}>
              {item.days.map(d => DAYS[d]).join(', ')}
            </Text>
          </View>
        </View>
        <Switch
          value={item.enabled}
          onValueChange={() => handleToggleSchedule(item.id)}
          trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
          thumbColor={item.enabled ? '#5A78FF' : '#F5F5F5'}
        />
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Scheduled Focus Time</Text>
      <Text style={styles.sectionDescription}>
        Focus mode will automatically activate during these times
      </Text>
      
      <FlatList
        data={schedules}
        keyExtractor={item => item.id}
        renderItem={renderScheduleItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.scheduleList}
        scrollEnabled={false}
      />
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddSchedule}
      >
        <Icon name="plus" size={20} color="#FFF" />
        <Text style={styles.addButtonText}>Add Schedule</Text>
      </TouchableOpacity>
      
      {/* Edit Schedule Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedSchedule ? 'Edit Schedule' : 'New Schedule'}
            </Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Name</Text>
              <View style={styles.textInputContainer}>
                <Icon name="format-title" size={18} color="#777" style={styles.inputIcon} />
                <Text style={styles.textInput}>{editName}</Text>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Time Period</Text>
              <View style={styles.timeInputRow}>
                <TouchableOpacity 
                  style={styles.timeInput}
                  onPress={() => openTimePicker('start')}
                >
                  <Icon name="clock-outline" size={18} color="#777" style={styles.inputIcon} />
                  <Text style={styles.timeInputText}>{editStartTime}</Text>
                </TouchableOpacity>
                
                <Text style={styles.timeInputSeparator}>to</Text>
                
                <TouchableOpacity 
                  style={styles.timeInput}
                  onPress={() => openTimePicker('end')}
                >
                  <Icon name="clock-outline" size={18} color="#777" style={styles.inputIcon} />
                  <Text style={styles.timeInputText}>{editEndTime}</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Repeat on Days</Text>
              <View style={styles.daysContainer}>
                {DAYS.map(renderDayAbbreviation)}
              </View>
            </View>
            
            <View style={styles.formGroup}>
              <View style={styles.enableRow}>
                <Text style={styles.enableText}>Enable Schedule</Text>
                <Switch
                  value={editEnabled}
                  onValueChange={setEditEnabled}
                  trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
                  thumbColor={editEnabled ? '#5A78FF' : '#F5F5F5'}
                />
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              {selectedSchedule && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDeleteSchedule}
                >
                  <Icon name="delete" size={18} color="#FF6B6B" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
              
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveSchedule}
                >
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Time Picker Modal */}
      <Modal
        visible={timePickerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTimePickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.timePickerContent}>
            <Text style={styles.timePickerTitle}>
              {timePickerType === 'start' ? 'Start Time' : 'End Time'}
            </Text>
            
            <ScrollView style={styles.timePickerList}>
              {TIME_OPTIONS.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeOption,
                    (timePickerType === 'start' ? editStartTime === time : editEndTime === time) && 
                    styles.selectedTimeOption
                  ]}
                  onPress={() => selectTime(time)}
                >
                  <Text style={[
                    styles.timeOptionText,
                    (timePickerType === 'start' ? editStartTime === time : editEndTime === time) && 
                    styles.selectedTimeOptionText
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity
              style={styles.closeTimePickerButton}
              onPress={() => setTimePickerVisible(false)}
            >
              <Text style={styles.closeTimePickerText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  scheduleList: {
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  scheduleDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleTime: {
    fontSize: 14,
    color: '#555',
    marginRight: 8,
  },
  scheduleDays: {
    fontSize: 14,
    color: '#777',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5A78FF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 8,
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
    paddingTop: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  timeInputText: {
    fontSize: 16,
    color: '#333',
  },
  timeInputSeparator: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#777',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDayBubble: {
    backgroundColor: '#5A78FF',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777',
  },
  selectedDayText: {
    color: '#FFF',
  },
  enableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  enableText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  modalButtons: {
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#5A78FF',
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  deleteButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  timePickerContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '70%',
  },
  timePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  timePickerList: {
    maxHeight: 400,
  },
  timeOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  selectedTimeOption: {
    backgroundColor: 'rgba(90, 120, 255, 0.1)',
  },
  timeOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTimeOptionText: {
    color: '#5A78FF',
    fontWeight: '500',
  },
  closeTimePickerButton: {
    marginTop: 16,
    paddingVertical: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeTimePickerText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FocusModeSchedule;