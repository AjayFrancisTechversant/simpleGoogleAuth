/**
 * @format
 */

import {AppRegistry, Linking} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.PRESS) {
    Linking.openURL(notification.data.url)
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);
