import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 80;
const CHART_HEIGHT = 180;
const PADDING = 20;

const UsageChart = ({ data }) => {
  // Calculate max for scaling
  const maxHours = Math.max(...data.map(item => item.hours)) + 1;
  
  // Generate points for path
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * (CHART_WIDTH - PADDING * 2) + PADDING;
    const y = CHART_HEIGHT - PADDING - ((item.hours / maxHours) * (CHART_HEIGHT - PADDING * 2));
    return { x, y };
  });
  
  // Generate SVG path
  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
    
  // Create gradient path (area under the line)
  const gradientPath = `${linePath} L ${points[points.length - 1].x} ${CHART_HEIGHT - PADDING} L ${points[0].x} ${CHART_HEIGHT - PADDING} Z`;
  
  return (
    <View style={styles.container}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
        {/* Horizontal grid lines */}
        {[...Array(5)].map((_, i) => {
          const y = PADDING + (i * (CHART_HEIGHT - PADDING * 2) / 4);
          return (
            <Line
              key={i}
              x1={PADDING}
              y1={y}
              x2={CHART_WIDTH - PADDING}
              y2={y}
              stroke="#E0E0E0"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          );
        })}
        
        {/* Y-axis labels */}
        {[...Array(5)].map((_, i) => {
          const y = PADDING + (i * (CHART_HEIGHT - PADDING * 2) / 4);
          const value = Math.round((maxHours - (i * maxHours / 4)) * 10) / 10;
          return (
            <SvgText
              key={i}
              x={PADDING - 10}
              y={y + 5}
              fontSize="10"
              fill="#9E9E9E"
              textAnchor="end"
            >
              {value}h
            </SvgText>
          );
        })}
        
        {/* Area under line with gradient */}
        <Path
          d={gradientPath}
          fill="rgba(90, 120, 255, 0.1)"
        />
        
        {/* Line chart */}
        <Path
          d={linePath}
          fill="none"
          stroke="#5A78FF"
          strokeWidth="3"
        />
        
        {/* Data points */}
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={5}
            fill="#FFF"
            stroke="#5A78FF"
            strokeWidth="2"
          />
        ))}
      </Svg>
      
      {/* X-axis labels */}
      <View style={styles.xAxisLabels}>
        {data.map((item, index) => (
          <Text key={index} style={styles.xLabel}>
            {item.day}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  xAxisLabels: {
    flexDirection: 'row',
    width: CHART_WIDTH - PADDING * 2,
    justifyContent: 'space-between',
    paddingHorizontal: PADDING,
  },
  xLabel: {
    color: '#9E9E9E',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default UsageChart;