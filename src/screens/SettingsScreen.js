import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

// Import components
import Header from '../components/common/Header';
import ThemeToggle from '../components/common/ThemeToggle';
import BottomNavigation from '../components/common/BottomNavigation';

const SettingsScreen = ({ navigation }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    usageReminders: true,
    goalAlerts: true,
    weeklyReport: true,
    screenTimeTrackingEnabled: true,
    dataCollection: true,
  });

  const toggleSetting = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };
  
  const navigateTo = (screen) => {
    const screenMapping = {
      'dashboard': 'Dashboard',
      'usage': 'UsageDetails',
      'focus': 'FocusMode',
      'goals': 'Goals',
      'settings': 'Settings'
    };
    
    if (screenMapping[screen]) {
      navigation.navigate(screenMapping[screen]);
    }
  };
  
  const showExportConfirmation = () => {
    Alert.alert(
      "Export Data",
      "Your data will be exported as a CSV file. This may take a moment.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Export", onPress: () => console.log("Export initiated") }
      ]
    );
  };
  
  const showDeleteConfirmation = () => {
    Alert.alert(
      "Delete All Data",
      "This will permanently delete all your usage data and goals. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          onPress: () => console.log("Delete initiated"),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={theme.colors.card} barStyle={theme.colors.statusBar} />
      
      <Header 
        title="Settings" 
        onBack={() => navigation.goBack()} 
      />
      
      <ScrollView style={styles.content}>
        {/* Appearance */}
        <View style={[styles.section, { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow
        }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Dark Mode</Text>
              <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                Switch between light and dark theme
              </Text>
            </View>
            <ThemeToggle 
              isDarkMode={isDark} 
              onToggle={toggleTheme}
            />
          </View>
        </View>
        
        {/* Notifications */}
        <View style={[styles.section, { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow
        }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Notifications</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Enable Notifications</Text>
              <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                Receive notifications for goals and usage updates
              </Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              onValueChange={() => toggleSetting('notificationsEnabled')}
              trackColor={{ false: theme.colors.border, true: `${theme.colors.accent}50` }}
              thumbColor={settings.notificationsEnabled ? theme.colors.accent : '#F5F5F5'}
            />
          </View>
          
          {settings.notificationsEnabled && (
            <>
              <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Usage Reminders</Text>
                  <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                    Get notified when you approach your daily limits
                  </Text>
                </View>
                <Switch
                  value={settings.usageReminders}
                  onValueChange={() => toggleSetting('usageReminders')}
                  trackColor={{ false: theme.colors.border, true: `${theme.colors.accent}50` }}
                  thumbColor={settings.usageReminders ? theme.colors.accent : '#F5F5F5'}
                />
              </View>
              
              <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Goal Alerts</Text>
                  <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                    Receive notifications about your goal progress
                  </Text>
                </View>
                <Switch
                  value={settings.goalAlerts}
                  onValueChange={() => toggleSetting('goalAlerts')}
                  trackColor={{ false: theme.colors.border, true: `${theme.colors.accent}50` }}
                  thumbColor={settings.goalAlerts ? theme.colors.accent : '#F5F5F5'}
                />
              </View>
              
              <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
                <View style={styles.settingInfo}>
                  <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Weekly Report</Text>
                  <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                    Receive a weekly summary of your digital wellbeing
                  </Text>
                </View>
                <Switch
                  value={settings.weeklyReport}
                  onValueChange={() => toggleSetting('weeklyReport')}
                  trackColor={{ false: theme.colors.border, true: `${theme.colors.accent}50` }}
                  thumbColor={settings.weeklyReport ? theme.colors.accent : '#F5F5F5'}
                />
              </View>
            </>
          )}
        </View>
        
        {/* Privacy */}
        <View style={[styles.section, { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow
        }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy</Text>
          
          <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Screen Time Tracking</Text>
              <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                Track how you use your device and apps
              </Text>
            </View>
            <Switch
              value={settings.screenTimeTrackingEnabled}
              onValueChange={() => toggleSetting('screenTimeTrackingEnabled')}
              trackColor={{ false: theme.colors.border, true: `${theme.colors.accent}50` }}
              thumbColor={settings.screenTimeTrackingEnabled ? theme.colors.accent : '#F5F5F5'}
            />
          </View>
          
          <View style={[styles.settingItem, { borderBottomColor: theme.colors.border }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, { color: theme.colors.text }]}>Data Collection</Text>
              <Text style={[styles.settingDescription, { color: theme.colors.textSecondary }]}>
                Collect anonymous usage data to improve the app
              </Text>
            </View>
            <Switch
              value={settings.dataCollection}
              onValueChange={() => toggleSetting('dataCollection')}
              trackColor={{ false: theme.colors.border, true: `${theme.colors.accent}50` }}
              thumbColor={settings.dataCollection ? theme.colors.accent : '#F5F5F5'}
            />
          </View>
        </View>
        
        {/* Data Management */}
        <View style={[styles.section, { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow
        }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Data Management</Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, { borderBottomColor: theme.colors.border }]}
            onPress={showExportConfirmation}
          >
            <Icon name="export" size={24} color={theme.colors.accent} />
            <Text style={[styles.actionText, { color: theme.colors.accent }]}>Export Your Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={showDeleteConfirmation}
          >
            <Icon name="delete-outline" size={24} color={theme.colors.error} />
            <Text style={[styles.deleteText, { color: theme.colors.error }]}>Delete All Data</Text>
          </TouchableOpacity>
        </View>
        
        {/* About */}
        <View style={[styles.section, { 
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadow
        }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>About</Text>
          
          <TouchableOpacity style={[styles.linkItem, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.linkText, { color: theme.colors.text }]}>Privacy Policy</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.textTertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.linkItem, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.linkText, { color: theme.colors.text }]}>Terms of Service</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.textTertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.linkItem, { borderBottomColor: theme.colors.border }]}>
            <Text style={[styles.linkText, { color: theme.colors.text }]}>Send Feedback</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.textTertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <Text style={[styles.linkText, { color: theme.colors.text }]}>Rate the App</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.textTertiary} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.versionText, { color: theme.colors.textTertiary }]}>Version 1.0.0</Text>
      </ScrollView>
      
      <BottomNavigation 
        activeTab="settings"
        onTabPress={(tab) => navigateTo(tab)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  actionText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  deleteText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  linkText: {
    fontSize: 16,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 20,
  },
});

export default SettingsScreen;