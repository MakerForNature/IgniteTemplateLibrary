/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WelcomeScreen, DemoScreen, DemoListScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type BottomNavigatorParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  // 🔥 Your screens go here
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const BottomTab = createBottomTabNavigator<BottomNavigatorParamList>()

const BottomTabStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: "whitesmoke"}
      }}
      initialRouteName="welcome"
    >
      <BottomTab.Screen name="welcome" component={WelcomeScreen} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
      />
      <BottomTab.Screen name="demo" component={DemoScreen} 
      options={{
        tabBarLabel: 'Demo',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="lightbulb-on-outline" color={color} size={size} />
        ),
      }}/>
      <BottomTab.Screen name="demoList" component={DemoListScreen} 
      options={{
        tabBarLabel: 'List',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="basketball" color={color} size={size} />
        ),
      }}/>
      {/** 🔥 Your screens go here */}
    </BottomTab.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const BottomAppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <BottomTabStack />
    </NavigationContainer>
  )
}

BottomAppNavigator.displayName = "BottomTabNavigator"