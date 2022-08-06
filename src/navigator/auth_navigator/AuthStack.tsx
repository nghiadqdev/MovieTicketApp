import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screens } from '~/common';
import authRouters from './auth.routers';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={screens.login}>
            <Stack.Screen
                name={screens.login}
                component={authRouters.SigninScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={screens.signup}
                component={authRouters.SignUpScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
