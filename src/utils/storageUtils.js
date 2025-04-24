import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Utility functions for data storage and persistence
 */

// Storage keys
const STORAGE_KEYS = {
  USAGE_DATA: 'digital_wellbeing_usage_data',
  GOALS: 'digital_wellbeing_goals',
  FOCUS_SCHEDULES: 'digital_wellbeing_focus_schedules',
  SETTINGS: 'digital_wellbeing_settings',
  APP_LAUNCHES: 'digital_wellbeing_app_launches',
};

/**
 * Save data to persistent storage
 * @param {string} key - Storage key
 * @param {any} value - Data to store (will be JSON stringified)
 * @returns {Promise<boolean>} Success indicator
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

/**
 * Load data from persistent storage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key not found
 * @returns {Promise<any>} Retrieved data
 */
export const loadData = async (key, defaultValue = null) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (error) {
    console.error('Error loading data:', error);
    return defaultValue;
  }
};

/**
 * Remove data from persistent storage
 * @param {string} key - Storage key
 * @returns {Promise<boolean>} Success indicator
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

/**
 * Clear all app data from persistent storage
 * @returns {Promise<boolean>} Success indicator
 */
export const clearAllData = async () => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};

/**
 * Save app usage data
 * @param {object} usageData - App usage data
 * @returns {Promise<boolean>} Success indicator
 */
export const saveUsageData = (usageData) => {
  return saveData(STORAGE_KEYS.USAGE_DATA, usageData);
};

/**
 * Load app usage data
 * @returns {Promise<object>} App usage data
 */
export const loadUsageData = () => {
  return loadData(STORAGE_KEYS.USAGE_DATA, {
    dailyUsage: 0,
    weeklyData: [],
    topApps: [],
    percentChange: 0,
    isIncrease: false,
  });
};

/**
 * Save user goals
 * @param {Array} goals - Array of goal objects
 * @returns {Promise<boolean>} Success indicator
 */
export const saveGoals = (goals) => {
  return saveData(STORAGE_KEYS.GOALS, goals);
};

/**
 * Load user goals
 * @returns {Promise<Array>} Array of goal objects
 */
export const loadGoals = () => {
  return loadData(STORAGE_KEYS.GOALS, []);
};

/**
 * Save focus mode schedules
 * @param {Array} schedules - Array of schedule objects
 * @returns {Promise<boolean>} Success indicator
 */
export const saveFocusSchedules = (schedules) => {
  return saveData(STORAGE_KEYS.FOCUS_SCHEDULES, schedules);
};

/**
 * Load focus mode schedules
 * @returns {Promise<Array>} Array of schedule objects
 */
export const loadFocusSchedules = () => {
  return loadData(STORAGE_KEYS.FOCUS_SCHEDULES, []);
};

/**
 * Save app settings
 * @param {object} settings - App settings object
 * @returns {Promise<boolean>} Success indicator
 */
export const saveSettings = (settings) => {
  return saveData(STORAGE_KEYS.SETTINGS, settings);
};

/**
 * Load app settings
 * @returns {Promise<object>} App settings
 */
export const loadSettings = () => {
  return loadData(STORAGE_KEYS.SETTINGS, {
    darkMode: false,
    notificationsEnabled: true,
    usageReminders: true,
    goalAlerts: true,
    weeklyReport: true,
    screenTimeTrackingEnabled: true,
    dataCollection: true,
  });
};

/**
 * Track app launch to calculate frequency
 * @returns {Promise<void>}
 */
export const trackAppLaunch = async () => {
  try {
    const launches = await loadData(STORAGE_KEYS.APP_LAUNCHES, []);
    launches.push(Date.now());
    
    // Keep only last 100 launches to avoid excessive storage
    const trimmedLaunches = launches.slice(-100);
    
    await saveData(STORAGE_KEYS.APP_LAUNCHES, trimmedLaunches);
  } catch (error) {
    console.error('Error tracking app launch:', error);
  }
};

export default {
  STORAGE_KEYS,
  saveData,
  loadData,
  removeData,
  clearAllData,
  saveUsageData,
  loadUsageData,
  saveGoals,
  loadGoals,
  saveFocusSchedules,
  loadFocusSchedules,
  saveSettings,
  loadSettings,
  trackAppLaunch,
};