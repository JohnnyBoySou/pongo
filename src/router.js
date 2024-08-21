import React from 'react';
//ROUTER
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//ICONS
import Octicons from '@expo/vector-icons/Octicons';
import { Bell, CircleUserRound, GraduationCap, ShoppingCart } from 'lucide-react-native';
import { useTheme, Button } from '@theme/global';


//STACK SCREEN
import OnboardingScreen from '@screens/auth/onboarding';
import SearchScreen from '@screens/search/index';
import WelcomeScreen from '@screens/auth/welcome';

//AUTH
import AuthLoginScreen from '@screens/auth/login';
import AuthRegisterScreen from '@screens/auth/register';

//INSTITUCIONAL
import InstitucionalScreen from '@screens/institucional/index';
import InstitucionalVisitaScreen from '@screens/institucional/visita';
import SobreNosScreen from '@screens/institucional/sobre-nos';
import RealizacoesScreen from '@screens/institucional/realizacoes';
import InstitucionalOndeEstamosScreen from '@screens/institucional/onde-estamos';
import InstitucionalGaleriaScreen from '@screens/institucional/galeria';

import InstitucionalRealizacoes from '@screens/institucional/realizacoes';
import InstitucionalAboutScreen from '@screens/institucional/about';
import InstitucionalLocalScreen from '@screens/institucional/local';
import InstitucionalSingleGaleriaScreen from '@screens/institucional/singe_galeria';

//PEDIDOS
import MeusPedidosScreen from '@screens/pedidos/pedidos';
import PedidoProdutoIndividualScreen from '@screens/pedidos/pedidoProdutoIndividual';

//PETS
import PetsListScreen from '@screens/pets/list';
import PetsProfileScreen from '@screens/pets/profile';
import PetsDiarioScreen from '@screens/pets/diario';
import AddPetScreen from '@screens/auth/addpet';

//CHAT
import ChatListScreen from '@screens/chat/list';
import ChatDetailsScreen from '@screens/chat/details';

//TABS SCREEN
import HomeScreen from '@screens/tabs/home';
import AccountScreen from '@screens/tabs/account';
import CartScreen from '@screens/tabs/cart';
import NotifyScreen from '@screens/tabs/notify';
//TEST
import TestScreen from '@screens/test';

//SHOP
import ShopScreen from '@screens/shop';
import ShopSingleProductScreen from '@screens/shop/single_product';
import ShopSingleServiceScreen from '@screens/shop/single_service';

//VILLA PONGO
import VillaPongoScreen from '@screens/villapongo';

//SERVICES
import ServicesScreen from '@screens/services';
import ServicesSingleScreen from '@screens/services/single';

//SCHOOL
import SchoolRegisterScreen from '@screens/school/register';
import SchoolFinishScreen from '@screens/school/finish';
import SchoolSuccessScreen from '@screens/school/success';
import SchoolPongoScreen from '@screens/school/index';
import SchoolBoletimScreen from '@screens/school/boletim';

//DAY USE
import DayUseScreen from '@screens/day-use/index';
import DayUseRegisterScreen from '@screens/day-use/register';

//HOTEL
import HotelScreen from '@screens/hotel/index';
import HotelRegisterScreen from '@screens/hotel/register';


export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName='Onboarding'>

        <Stack.Screen name="Test" component={TestScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="PetsList" component={PetsListScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="PetsProfile" component={PetsProfileScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="PetsDiario" component={PetsDiarioScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="SchoolRegister" component={SchoolRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="SchoolFinish" component={SchoolFinishScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="SchoolSuccess" component={SchoolSuccessScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="School" component={SchoolPongoScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="SchoolBoletim" component={SchoolBoletimScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />


        <Stack.Screen name="Institucional" component={InstitucionalScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalVisita" component={InstitucionalVisitaScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalAbout" component={InstitucionalAboutScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalGaleria" component={InstitucionalGaleriaScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalRealizacoes" component={InstitucionalRealizacoes} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalLocal" component={InstitucionalLocalScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Shop" component={ShopScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ShopSingleProduct" component={ShopSingleProductScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ShopSingleService" component={ShopSingleServiceScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="VillaPongo" component={VillaPongoScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Services" component={ServicesScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ServicesSingle" component={ServicesSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />


        <Stack.Screen name="MeusPedidos" component={MeusPedidosScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="PedidoProdutoIndividual" component={PedidoProdutoIndividualScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AddPet" component={AddPetScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Tabs" component={Tabs} options={{ ...TransitionPresets.SlideFromRightIOS, backBehavior: 'none', }} />

        <Stack.Screen name="DayUse" component={DayUseScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="DayUseRegister" component={DayUseRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Hotel" component={HotelScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="HotelRegister" component={HotelRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  const route = useRoute();
  const { color, font } = useTheme();
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
  return (
    <Tab.Navigator initialRouteName="Home"
      screenOptions={{
        tabBarButton: (props) => <Button {...props} ph={0} pv={0} radius={6} />,
        headerShown: false,
        tabBarShowLabel: false,
        backBehavior: 'none',
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#C3C3C3',
        tabBarStyle: {
          backgroundColor: '#918C8B',
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
        tabBarBadgeStyle: { backgroundColor: '#fff', fontFamily: font.bold, fontSize: 12, },
        tabBarIcon: ({ color, size }) => (<ShoppingCart size={routeName === 'Cart' ? size + 3 : size} color={color} />),
      }} />
      <Tab.Screen name="School" component={SchoolBoletimScreen} options={{
        tabBarIcon: ({ color, size }) => (<GraduationCap size={routeName === 'School' ? size + 6 : size + 2} color={color} />),
      }} />

      <Tab.Screen name="Notify" component={NotifyScreen} options={{
        tabBarIcon: ({ color, size }) => (<Bell size={routeName === 'Notify' ? size + 3 : size} color={color} />),
      }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{
        tabBarIcon: ({ color, size }) => (<CircleUserRound size={routeName === 'Account' ? size + 3 : size} color={color} />),
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