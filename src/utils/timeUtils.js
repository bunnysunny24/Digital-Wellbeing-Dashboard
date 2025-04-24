/**
 * Utility functions for handling time calculations and formatting
 */

/**
 * Format minutes into a readable time string
 * @param {number} minutes - Total minutes
 * @param {boolean} compact - Whether to use compact format
 * @returns {string} Formatted time string
 */
export const formatMinutes = (minutes, compact = false) => {
  if (!minutes && minutes !== 0) return '--';
  
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  
  if (compact) {
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  } else {
    if (hours > 0) {
      return mins > 0 
        ? `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}` 
        : `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    return `${mins} minute${mins > 1 ? 's' : ''}`;
  }
};

/**
 * Format hours into a readable time string
 * @param {number} hours - Total hours (can include decimal)
 * @param {boolean} includeMinutes - Whether to include minutes part
 * @returns {string} Formatted time string
 */
export const formatHours = (hours, includeMinutes = true) => {
  if (!hours && hours !== 0) return '--';
  
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (includeMinutes && minutes > 0) {
    return `${wholeHours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }
  
  return `${wholeHours}${includeMinutes ? ':00' : ''}`;
};

/**
 * Format a date object to a readable date string
 * @param {Date} date - Date object
 * @param {string} format - Format style ('short', 'medium', 'long')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  if (!date) return '';
  
  try {
    switch (format) {
      case 'short':
        return date.toLocaleDateString();
      case 'long':
        return date.toLocaleDateString(undefined, { 
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'time':
        return date.toLocaleTimeString(undefined, { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
      case 'datetime':
        return date.toLocaleString();
      case 'medium':
      default:
        return date.toLocaleDateString(undefined, { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
    }
  } catch (err) {
    console.error('Date formatting error:', err);
    return String(date);
  }
};

/**
 * Get the day name from a date
 * @param {Date} date - Date object
 * @param {boolean} short - Whether to return the short version
 * @returns {string} Day name
 */
export const getDayName = (date, short = false) => {
  const days = short 
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  return days[date.getDay()];
};

/**
 * Calculate percentage difference between two values
 * @param {number} current - Current value
 * @param {number} previous - Previous value
 * @returns {object} Difference object with percent and direction
 */
export const calculatePercentDifference = (current, previous) => {
  if (previous === 0) {
    return { 
      percent: current > 0 ? 100 : 0,
      isIncrease: current > 0
    };
  }
  
  const diff = current - previous;
  const percentChange = Math.round(Math.abs(diff) / previous * 100);
  
  return {
    percent: percentChange,
    isIncrease: diff > 0
  };
};

/**
 * Get the date for the start of the week
 * @param {Date} date - Date to get the week start from (defaults to today)
 * @returns {Date} Date object for start of the week (Sunday)
 */
export const getWeekStart = (date = new Date()) => {
  const result = new Date(date);
  const day = result.getDay();
  if (day !== 0) { // If not Sunday
    result.setHours(-24 * day); // Go back to Sunday
  }
  result.setHours(0, 0, 0, 0); // Start of day
  return result;
};

/**
 * Get an array of dates for the current week
 * @returns {Array<Date>} Array of 7 date objects for the current week
 */
export const getCurrentWeekDates = () => {
  const weekStart = getWeekStart();
  return Array(7).fill().map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });
};