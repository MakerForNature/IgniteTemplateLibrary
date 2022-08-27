/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WelcomeScreen, DemoScreen, DemoListScreen } from "../screens"
import { navigationRef, useBackButtonHandler } from "./navigation-utilities"

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
export type TabDrawerNavigatorParamList = {
  tab: undefined
  welcome: undefined
  demo: undefined
  demoList: undefined
  // 🔥 Your screens go here
}

const Tab = createBottomTabNavigator<TabDrawerNavigatorParamList>()

export function ParentTabScreen() {

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Tab.Screen name="welcome" component={DrawerTabStack} 
       options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen name="demo" component={DrawerTabStackDemo} 
      options={{
        tabBarLabel: 'Demo',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="lightbulb-on-outline" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Drawer = createDrawerNavigator<TabDrawerNavigatorParamList>()

const DrawerTabStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: "whitesmoke"}
      }}
      initialRouteName="welcome"
    >
      <Drawer.Screen name="welcome" component={WelcomeScreen} />
      <Drawer.Screen name="demo" component={DemoScreen} />
      <Drawer.Screen name="demoList" component={DemoListScreen} />
      {/** 🔥 Your screens go here */}
    </Drawer.Navigator>
  )
}

const DrawerTabStackDemo = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: "whitesmoke"}
      }}
      initialRouteName="demo"
    >
      <Drawer.Screen name="welcome" component={WelcomeScreen} />
      <Drawer.Screen name="demo" component={DemoScreen} />
      <Drawer.Screen name="demoList" component={DemoListScreen} />
      {/** 🔥 Your screens go here */}
    </Drawer.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppTabDrawerNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <ParentTabScreen />
    </NavigationContainer>
  )
}

AppTabDrawerNavigator.displayName = "TabDrawerNavigator"