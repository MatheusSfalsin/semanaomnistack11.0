import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { View } from 'react-native';

const appStack = createStackNavigator();

import Incidents from './pages/Incidents'
import Detail from './pages/Detail'

export default function Routes() {
    return (// tem que vir por volta das rotas
        <NavigationContainer>
            <appStack.Navigator screenOptions={{ headerShown: false }}>
                <appStack.Screen name="Incidents" component={Incidents} />
                <appStack.Screen name="Detail" component={Detail} />
            </appStack.Navigator>
        </NavigationContainer>
    )
}