import { useState, useEffect } from 'react';

/**
 * Hook to fetch and manage app usage data
 * In a real app, this would integrate with native modules to get actual usage data
 */
const useAppUsage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usageData, setUsageData] = useState({
    dailyUsage: 0,
    weeklyData: [],
    topApps: [],
    percentChange: 0,
    isIncrease: false,
  });

  // Fetch app usage data
  const fetchUsageData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an actual API call or native module integration
      // Mock data for demonstration
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Sample data
      const mockData = {
        dailyUsage: 5.2, // hours
        weeklyData: [
          { day: 'Mon', hours: 4.5 },
          { day: 'Tue', hours: 5.2 },
          { day: 'Wed', hours: 3.8 },
          { day: 'Thu', hours: 6.1 },
          { day: 'Fri', hours: 5.5 },
          { day: 'Sat', hours: 7.2 },
          { day: 'Sun', hours: 5.0 },
        ],
        topApps: [
          { id: '1', name: 'Instagram', icon: 'instagram', timeSpent: 95, color: '#E1306C' },
          { id: '2', name: 'YouTube', icon: 'youtube', timeSpent: 78, color: '#FF0000' },
          { id: '3', name: 'Twitter', icon: 'twitter', timeSpent: 45, color: '#1DA1F2' },
          { id: '4', name: 'TikTok', icon: 'music-note', timeSpent: 42, color: '#000000' },
        ],
        percentChange: 12,
        isIncrease: false,
      };
      
      setUsageData(mockData);
    } catch (err) {
      setError('Failed to fetch usage data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get filtered usage data by time range
  const getFilteredData = (timeRange = 'weekly') => {
    switch(timeRange) {
      case 'daily':
        // In a real app, we would fetch hourly data for the current day
        return [
          { day: '12AM', hours: 0.5 },
          { day: '3AM', hours: 0.0 },
          { day: '6AM', hours: 0.8 },
          { day: '9AM', hours: 1.2 },
          { day: '12PM', hours: 0.7 },
          { day: '3PM', hours: 1.5 },
          { day: '6PM', hours: 2.3 },
          { day: '9PM', hours: 1.8 },
        ];
      case 'monthly':
        // In a real app, we would fetch weekly data for the current month
        return [
          { day: 'Week 1', hours: 32.5 },
          { day: 'Week 2', hours: 37.8 },
          { day: 'Week 3', hours: 35.2 },
          { day: 'Week 4', hours: 40.3 },
        ];
      case 'weekly':
      default:
        return usageData.weeklyData;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchUsageData();
  }, []);

  return {
    isLoading,
    error,
    usageData,
    refreshUsageData: fetchUsageData,
    getFilteredData,
  };
};

export default useAppUsage;