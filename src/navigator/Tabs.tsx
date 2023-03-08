import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { TabList, RootStackParams } from './TabList';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchScreen } from '../screens/SearchScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { TabNavigator } from './TabSearch';

const Tab = createBottomTabNavigator();





export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D6',
        tabBarStyle: {
          // Tab transparente
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderWidth: 0,
          elevation: 0,
          height: (Platform.OS === 'ios') ? 80 : 60
        },
        tabBarLabelStyle: {
          marginBottom: (Platform.OS === 'ios') ? 0 : 10,
        }


      }}

    >
      <Tab.Screen
        name="Home"
        component={TabList}
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="list-outline"
            />
          )
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={TabNavigator}
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({ color }) => (
            <Icon
              color={color}
              size={25}
              name="search-outline"
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}