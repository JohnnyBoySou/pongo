import React from 'react';
//ROUTER
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//STACK SCREEN
import OnboardingScreen from '@screens/auth/onboarding';
import AsyncStaticScreen from '@screens/auth/async';

//AUTH
import AuthLoginScreen from '@screens/auth/login';
import AuthRegisterScreen from '@screens/auth/register';

//INSTITUCIONAL
import InstitucionalScreen from '@screens/institucional';

//TABS SCREEN
import HomeScreen from '@screens/tabs/home';
import SearchScreen from '@screens/tabs/search';
import AccountScreen from '@screens/tabs/account';

//ICONS
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName='Institucional'>

<<<<<<< HEAD
            <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{...TransitionPresets.SlideFromRightIOS , }}/>
            <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} options={{...TransitionPresets.SlideFromRightIOS , }}/>
          
            <Stack.Screen name="Async" component={AsyncStaticScreen} options={{...TransitionPresets.FadeFromBottomAndroid , }}/>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{...TransitionPresets.SlideFromRightIOS , }}/>
=======
        <Stack.Screen name="Institucional" component={InstitucionalScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
>>>>>>> 04b105560e57cd01967489ea1dce951b27c5ca42

        <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />


        <Stack.Screen name="Async" component={AsyncStaticScreen} options={{ ...TransitionPresets.RevealFromBottomAndroid, }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Tabs" component={Tabs} options={{ ...TransitionPresets.SlideFromRightIOS, backBehavior: 'none', }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        backBehavior: 'none',
        tabBarActiveTintColor: '#FF26BD',
        tabBarInactiveTintColor: '#5C0D4580',
        tabBarStyle: {
          backgroundColor: '#FFF',
          paddingBottom: 12,
          paddingTop: 8,
          borderTopWidth: 2,
          borderColor: '#F1F1F1',
          height: 68,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarLabel: 'Início',
        tabBarLabelStyle: { fontFamily: routeName === 'Home' ? 'Font_Bold' : 'Font_Book', },
        tabBarIcon: ({ color, size }) => (<Octicons name="home" size={routeName === 'Home' ? size + 3 : size} color={color} />),
      }} />

<<<<<<< HEAD
  /*
   Transitions só substituir 
      ModalSlideFromBottomIOS
      SlideFromRightIOS
      FadeFromBottomAndroid 
      RevealFromBottomAndroid
      ScaleFromCenterAndroid 
      DefaultTransition 
      ModalTransition
=======
      <Tab.Screen name="Search" component={SearchScreen} options={{
        tabBarLabel: 'Buscar',
        tabBarLabelStyle: { fontFamily: routeName === 'Search' ? 'Font_Bold' : 'Font_Book', },
        tabBarIcon: ({ color, size }) => (<Octicons name="search" size={routeName === 'Seach' ? size + 3 : size} color={color} />),
      }} />

      <Tab.Screen name="Account" component={AccountScreen} options={{
        tabBarLabel: 'Conta',
        tabBarLabelStyle: { fontFamily: routeName === 'Account' ? 'Font_Bold' : 'Font_Book', },
        tabBarIcon: ({ color, size }) => (<FontAwesome6 name="user" size={routeName === 'Account' ? size + 3 : size} color={color} />),
      }} />
    </Tab.Navigator>
  )
}

/*
 Transitions só substituir 
    ModalSlideFromBottomIOS
    SlideFromRightIOS
    SlideFromRightIOS
    FadeFromBottomAndroid 
    RevealFromBottomAndroid
    ScaleFromCenterAndroid 
    DefaultTransition 
    ModalTransition
>>>>>>> 04b105560e57cd01967489ea1dce951b27c5ca42


*/