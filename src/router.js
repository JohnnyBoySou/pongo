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
import SearchScreen from '@screens/search/index';
import AddPetScreen from '@screens/auth/addpet';
//AUTH
import AuthLoginScreen from '@screens/auth/login';
import AuthRegisterScreen from '@screens/auth/register';

//INSTITUCIONAL
import InstitucionalScreen from '@screens/institucional/visita';
  

//CHAT
import ChatScreen from '@screens/chat';
import ChatListScreen from '@screens/chat/list';
import ChatDetailsScreen from '@screens/chat/details';

//TABS SCREEN
import HomeScreen from '@screens/tabs/home';
import AccountScreen from '@screens/tabs/account';
import CartScreen from '@screens/tabs/cart';

//ICONS
import Octicons from '@expo/vector-icons/Octicons';
import { CircleUserRound, ShoppingCart } from 'lucide-react-native';
import { useTheme, Button } from '@theme/global';


export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName='Onboarding'>

        <Stack.Screen name="Chat" component={ChatScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />


        <Stack.Screen name="Institucional" component={InstitucionalScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />


        <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AddPet" component={AddPetScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Async" component={AsyncStaticScreen} options={{ ...TransitionPresets.FadeFromBottomAndroid, }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Tabs" component={Tabs} options={{ ...TransitionPresets.SlideFromRightIOS, backBehavior: 'none', }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  const route = useRoute();
  const { color, font} = useTheme();
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  return (
    <Tab.Navigator initialRouteName="Cart"
      screenOptions={{
        tabBarButton: (props) => <Button {...props} ph={0} pv={0} radius={6} 	/>,
        headerShown: false,
        tabBarShowLabel: false,
        backBehavior: 'none',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#f0a5a5',
        tabBarStyle: {
          backgroundColor: color.primary,
          height: 64,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color, size }) => (<Octicons name="home" size={routeName === 'Home' ? size + 3 : size} color={color} />),
      }} />

      <Tab.Screen name="Cart" component={CartScreen} options={{
        tabBarBadge: 3,
        tabBarBadgeStyle: { backgroundColor: '#fff', fontFamily: font.bold, fontSize: 12,  },
        tabBarIcon: ({ color, size }) => (<ShoppingCart name="search" size={routeName === 'Seach' ? size + 3 : size} color={color} />),
      }} />

      <Tab.Screen name="Account" component={AccountScreen} options={{
        tabBarIcon: ({ color, size }) => (<CircleUserRound  name="user" size={routeName === 'Account' ? size + 3 : size} color={color} />),
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


*/