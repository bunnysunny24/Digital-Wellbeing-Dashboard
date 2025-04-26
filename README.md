# Digital Wellbeing Dashboard

![Last Updated](https://img.shields.io/badge/Last%20Updated-April%202025-brightgreen)

## Overview

The Digital Wellbeing Dashboard is a React Native application designed to help users track and manage their digital habits. By providing visual insights into app usage patterns and offering tools to set healthy boundaries, this app empowers users to develop a more balanced relationship with technology.

## Features

### 📊 Usage Visualization
- Daily and weekly screen time tracking
- App usage breakdown by category
- Usage pattern analysis
- Interactive charts and graphs

### 🎯 Goal Setting
- Create daily screen time limits
- Set app-specific usage goals
- Track progress with visual indicators
- Receive achievement notifications

### ⏱️ Focus Mode Scheduling
- Schedule distraction-free time periods
- Customize allowed notifications and apps
- Integration with device's Do Not Disturb functionality
- Focus session statistics

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="https://github.com/user-attachments/assets/793ca030-71d0-4b20-9b4f-6080b27de749" width="300" alt="Dashboard View 1">
  
  <img src="https://github.com/user-attachments/assets/0edca269-62a0-4a5c-a6c5-ab6cc207de15" width="300" alt="Dashboard View 2">
  
  <img src="https://github.com/user-attachments/assets/7d8a08ec-5846-4ba0-b35e-03ba5e59f0ce" width="300" alt="Usage Stats">
  
  <img src="https://github.com/user-attachments/assets/3c970125-471a-449e-8c55-4a9e64c6bfd7" width="300" alt="App Categories">
  
  <img src="https://github.com/user-attachments/assets/2f862f28-8dd0-4bda-b168-6810d1a44bf6" width="300" alt="Goal Setting Interface">
  
  <img src="https://github.com/user-attachments/assets/9afff9fa-04fa-4f8c-a3d3-7138d7914f0a" width="300" alt="Progress Tracking">
  
  <img src="https://github.com/user-attachments/assets/45554752-2d88-45bf-be2c-896867762afe" width="300" alt="Focus Mode Settings">
  
  <img src="https://github.com/user-attachments/assets/14f8b2b7-c85f-431a-b752-38082686cea8" width="300" alt="Notification Management">
  
  <img src="https://github.com/user-attachments/assets/d5d4889f-bffa-4213-9c8b-af66daa892ec" width="300" alt="Session Timer">
  
  <img src="https://github.com/user-attachments/assets/dc788cd1-bd93-4e1f-81f9-53ba22b6c244" width="300" alt="Analytics Dashboard">
  
  <img src="https://github.com/user-attachments/assets/8be45bf6-2a53-4146-925e-108e59cda591" width="300" alt="User Profile">
  
  <img src="https://github.com/user-attachments/assets/ff7a986e-58ab-4a39-94e4-7cc58605c578" width="300" alt="Settings Screen">
  
  <img src="https://github.com/user-attachments/assets/eca53484-65cc-4cf8-b491-cce36649f2a7" width="300" alt="App Details">
  
  <img src="https://github.com/user-attachments/assets/2c5661f3-a0cc-4ae3-b795-5313143fa776" width="300" alt="Achievements">
  
  <img src="https://github.com/user-attachments/assets/55019bab-2b97-43b5-91f4-408da8b924ee" width="300" alt="Weekly Report">
</div>

## Impact

- Helps users become aware of their digital consumption habits
- Encourages mindful technology use through visual feedback
- Reduces digital overload and screen fatigue
- Promotes better productivity and mental wellbeing

## Technology Stack

- **Frontend**: React Native
- **State Management**: Redux / Context API
- **Data Visualization**: React Native SVG, Victory Charts
- **Storage**: AsyncStorage for local data persistence
- **UI Components**: Custom components with Reanimated for animations

## Technical Implementation

### Data Visualization
- Custom chart components for usage statistics
- Interactive graphs with touch gestures
- Color-coded indicators for goal progress

### Notification Settings UI
- Permission management interface
- Priority levels configuration
- Custom notification scheduling

### Timer Interfaces
- Focus session countdown timers
- Usage limit notifications
- Screen time tracking

## Installation

```bash
# Clone the repository
git clone https://github.com/bunnysunny24/React_native.git

# Navigate to project directory
cd React_native

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm start
# or
npx react-native start

# Run on Android
npx react-native run-android

# Run on iOS
npx react-native run-ios
