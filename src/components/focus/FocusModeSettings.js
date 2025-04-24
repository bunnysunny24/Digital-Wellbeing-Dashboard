import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppToggleItem = ({ app, onToggle }) => {
  return (
    <View style={styles.appToggleItem}>
      <View style={styles.appInfo}>
        <View style={[styles.appIconContainer, { backgroundColor: app.color }]}>
          <Icon name={app.icon} size={20} color="#FFF" />
        </View>
        <Text style={styles.appName}>{app.name}</Text>
      </View>
      <Switch
        value={app.allowed}
        onValueChange={() => onToggle(app.id)}
        trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
        thumbColor={app.allowed ? '#5A78FF' : '#F5F5F5'}
      />
    </View>
  );
};

const FocusModeSettings = () => {
  const [settings, setSettings] = useState({
    blockNotifications: true,
    allowCalls: false,
    allowMessages: false,
    enableDoNotDisturb: true,
    autoReply: true,
    blockScreenTime: true,
  });
  
  const [apps, setApps] = useState([
    { id: '1', name: 'Phone', icon: 'phone', color: '#4CAF50', allowed: true },
    { id: '2', name: 'Messages', icon: 'message', color: '#2196F3', allowed: true },
    { id: '3', name: 'Email', icon: 'email', color: '#FF5722', allowed: false },
    { id: '4', name: 'Instagram', icon: 'instagram', color: '#E1306C', allowed: false },
    { id: '5', name: 'Twitter', icon: 'twitter', color: '#1DA1F2', allowed: false },
    { id: '6', name: 'Camera', icon: 'camera', color: '#9C27B0', allowed: true },
    { id: '7', name: 'Calendar', icon: 'calendar', color: '#FF9800', allowed: true },
    { id: '8', name: 'Browser', icon: 'web', color: '#607D8B', allowed: false },
  ]);
  
  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    });
  };
  
  const toggleAppAllow = (id) => {
    setApps(apps.map(app => 
      app.id === id 
        ? { ...app, allowed: !app.allowed } 
        : app
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Focus Mode Settings</Text>
      <Text style={styles.sectionDescription}>
        Configure how Focus Mode behaves when activated
      </Text>
      
      {/* Notification Settings */}
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Notifications</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Block All Notifications</Text>
            <Text style={styles.settingDescription}>
              Hide all notifications during focus time
            </Text>
          </View>
          <Switch
            value={settings.blockNotifications}
            onValueChange={() => toggleSetting('blockNotifications')}
            trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
            thumbColor={settings.blockNotifications ? '#5A78FF' : '#F5F5F5'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Allow Phone Calls</Text>
            <Text style={styles.settingDescription}>
              Let phone calls come through during focus time
            </Text>
          </View>
          <Switch
            value={settings.allowCalls}
            onValueChange={() => toggleSetting('allowCalls')}
            trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
            thumbColor={settings.allowCalls ? '#5A78FF' : '#F5F5F5'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Allow Messages</Text>
            <Text style={styles.settingDescription}>
              Let messages come through during focus time
            </Text>
          </View>
          <Switch
            value={settings.allowMessages}
            onValueChange={() => toggleSetting('allowMessages')}
            trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
            thumbColor={settings.allowMessages ? '#5A78FF' : '#F5F5F5'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Enable Do Not Disturb</Text>
            <Text style={styles.settingDescription}>
              Automatically turn on system-level Do Not Disturb
            </Text>
          </View>
          <Switch
            value={settings.enableDoNotDisturb}
            onValueChange={() => toggleSetting('enableDoNotDisturb')}
            trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
            thumbColor={settings.enableDoNotDisturb ? '#5A78FF' : '#F5F5F5'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Auto Reply to Messages</Text>
            <Text style={styles.settingDescription}>
              Send automatic replies that you're focusing
            </Text>
          </View>
          <Switch
            value={settings.autoReply}
            onValueChange={() => toggleSetting('autoReply')}
            trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
            thumbColor={settings.autoReply ? '#5A78FF' : '#F5F5F5'}
          />
        </View>
        
        {settings.autoReply && (
          <TouchableOpacity style={styles.autoReplyButton}>
            <Text style={styles.autoReplyButtonText}>Edit Auto Reply Message</Text>
            <Icon name="chevron-right" size={18} color="#555" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* App Restrictions */}
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>App Restrictions</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>Block Screen Time</Text>
            <Text style={styles.settingDescription}>
              Prevent opening restricted apps during focus time
            </Text>
          </View>
          <Switch
            value={settings.blockScreenTime}
            onValueChange={() => toggleSetting('blockScreenTime')}
            trackColor={{ false: '#E0E0E0', true: 'rgba(90, 120, 255, 0.3)' }}
            thumbColor={settings.blockScreenTime ? '#5A78FF' : '#F5F5F5'}
          />
        </View>
        
        {settings.blockScreenTime && (
          <View style={styles.appsContainer}>
            <Text style={styles.appsTitle}>Allowed Apps During Focus</Text>
            <Text style={styles.appsDescription}>
              Select which apps will still be accessible during focus time
            </Text>
            
            <FlatList
              data={apps}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <AppToggleItem app={item} onToggle={toggleAppAllow} />
              )}
              ItemSeparatorComponent={() => <View style={styles.appSeparator} />}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 24,
  },
  settingsGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  groupTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#777',
  },
  autoReplyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  autoReplyButtonText: {
    fontSize: 15,
    color: '#5A78FF',
    fontWeight: '500',
  },
  appsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  appsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  appsDescription: {
    fontSize: 14,
    color: '#777',
    marginBottom: 16,
  },
  appToggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appName: {
    fontSize: 15,
    color: '#333',
  },
  appSeparator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  }
});

export default FocusModeSettings;