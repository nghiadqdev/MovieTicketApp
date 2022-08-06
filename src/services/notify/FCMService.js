import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import { Platform } from 'react-native'
const Sound = require('react-native-sound');
class FCMService {

    makeSound = () => {
        // Enable playback in silence mode
        Sound.setCategory('Playback');
        const whoosh = new Sound('whoosh.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            // console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());

            // Play the sound with an onEnd callback
            whoosh.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        });
    }

    configure = (onRegister, onNotification, onOpenNotifycation) => {
        // Must be outside of any component LifeCycle (such as `componentDidMount`).
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                // onRegister(token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                // console.log("NOTIFICATION:", notification);

                if (Platform.OS === 'ios') {
                    if (notification.data.openedInForeground) {
                        notification.userInteraction = true;
                    } else {
                        notification.userInteraction = true;
                    }
                }
                notification.userInteraction = true;
                onOpenNotifycation(notification);

                if (notification.userInteraction) {
                    onOpenNotifycation(notification);
                } else {
                    onNotification(notification);
                }

                // process the notification

                if (Platform.OS === 'ios') {
                    // (required) Called when a remote is received or opened, or local notification is opened
                    if (!notification.data.openedInForeground) {
                        notification.finish(PushNotificationIOS.FetchResult.NoData);
                    }
                } else {
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }
            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                // console.log("ACTION:", notification.action);
                // console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            channelId: "channelNotify",
            /* Android only properties */
            ...this.buildAndroidNotification(id, title, message, data, options),

            /* iOS only properties */
            ...this.buildIOSNotification(id, title, message, data, options),

            title: title || "",
            message: message || "",
            playSound: true,
            soundName: 'default',
            userInteraction: false,
        });
        this.makeSound();
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id,
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || "high",
            data,
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item: data,
            }
        }
    }

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllDeliveredNotifications();
        }
    }

    unregister = () => {
        PushNotification.unregister();
    }


}

export const fcmService = new FCMService();
