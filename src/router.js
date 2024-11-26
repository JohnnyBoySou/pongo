import React from 'react';
//ROUTER
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, NavigationContainer, useRoute } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//ICONS
import Octicons from '@expo/vector-icons/Octicons';
import { Bell, CircleUserRound, GraduationCap, Hotel, ShoppingBag, ShoppingCart, TentTree } from 'lucide-react-native';
import { useTheme, Button } from '@theme/global';

//STACK SCREEN
import OnboardingScreen from '@screens/auth/onboarding';
import AsyncStaticScreen from '@screens/auth/async';
import SearchScreen from '@screens/search/index';

//AUTH
import AuthLoginScreen from '@screens/auth/login';
import AuthRegisterScreen from '@screens/auth/register';
import WelcomeScreen from '@screens/auth/welcome';
import AuthLoginColaboradorScreen from '@screens/auth/login_colaborador';

//INSTITUCIONAL
import InstitucionalScreen from '@screens/institucional/index';
import InstitucionalVisitaScreen from '@screens/institucional/visita';
import InstitucionalRealizacoesScreen from '@screens/institucional/realizacoes';
import InstitucionalLocalScreen from '@screens/institucional/local';
import InstitucionalAboutScreen from '@screens/institucional/about';
import InstitucionalGaleriaScreen from '@screens/institucional/galeria';
import InstitucionalSingleGaleriaScreen from '@screens/institucional/singe_galeria';
//PEDIDOS
import MeusPedidosScreen from '@screens/pedidos/pedidos';
import PedidoProdutoIndividualScreen from '@screens/pedidos/pedidoProdutoIndividual';

//PETS
import PetsListScreen from '@screens/pets/list';
import PetsProfileScreen from '@screens/pets/profile';
import PetsDiarioScreen from '@screens/pets/diario';
import PetsStoryScreen from '@screens/pets/story';
import AddPetScreen from '@screens/auth/addpet';
import PetsSingleGaleriaScreen from '@screens/pets/singe_galeria';

//CHAT
import ChatListScreen from '@screens/chat/list';
import ChatNewScreen from '@screens/chat/new';
import ChatDetailsScreen from '@screens/chat/details';
import ChatSingleImageScreen from '@screens/chat/zoom';
import ChatColaboradorListScreen from '@screens/colaborador/list';
import ChatDetailsColaboradorScreen from '@screens/colaborador/details';

//TABS SCREEN
import HomeScreen from '@screens/tabs/home';
import AccountScreen from '@screens/tabs/account';
import AccountDetailsScreen from '@screens/tabs/account/details';
import VeterinarioScreen from '@screens/veterinario';
import GroomingScreen from '@screens/grooming';

//TEST
import TestScreen from '@screens/test';

//SHOP
import ShopScreen from '@screens/shop';
import ShopSingleProductScreen from '@screens/shop/single_product';
import ShopSingleCategoryScreen from '@screens/shop/single_category';
import ShopPaymentScreen from '@screens/shop/payment';
import ShopCartScreen from '@screens/shop/cart';

//VILLA PONGO
import VillaPongoScreen from '@screens/tabs/villapongo';

//SERVICES
import ServicesScreen from '@screens/services';
import ServicesSingleScreen from '@screens/services/single';
import ServiceDiarioScreen from '@screens/services/diario';

//PRODUCTS
import ProductsScreen from '@screens/products';
import ProductSingleScreen from '@screens/products/single';

//SCHOOL
import SchoolRegisterScreen from '@screens/school/register';
import SchoolFinishScreen from '@screens/school/finish';
import SchoolSuccessScreen from '@screens/school/success';
import SchoolPongoScreen from '@screens/school/index';
import SchoolBoletimScreen from '@screens/school/boletim';
import SchoolPayments from '@screens/school/payments';

//DAY USE
import DayUseScreen from '@screens/day-use/index';
import DayUseRegisterScreen from '@screens/day-use/register';
import DayUsePayments from '@screens/day-use/payments';

//HOTEL
import HotelScreen from '@screens/hotel/index';
import HotelRegisterScreen from '@screens/hotel/register';
import HotelPayments from '@screens/hotel/payments';

import NotificationsScreen from '@screens/notifications/index';
import FaqScreen from '@screens/faq/index';
import Privacidade from '@screens/privacidade/index';
import VideoScreen from '@screens/video';

const linking = {
  prefixes: ['pongo://'],
  config: {
    screens: {
      ChatList: {
        path: 'ChatList',
        parse: {
          message: (message) => `${message}`,
        },
      },
      ChatColaboradorList: {
        path: 'ChatColaboradorList',
        parse: {
          message: (message) => `${message}`,
        },
      },
    },
  },
};


export default function Router({ }) {
 
  return (
    <NavigationContainer linking={linking}>
      
      <Stack.Navigator screenOptions={{ headerShown: false, }} initialRouteName='Welcome'>

        <Stack.Screen name="Test" component={TestScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ChatNew" component={ChatNewScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ChatSingleImage" component={ChatSingleImageScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ChatColaboradorList" component={ChatColaboradorListScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ChatDetailsColaborador" component={ChatDetailsColaboradorScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Products" component={ProductsScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ProductSingle" component={ProductSingleScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="PetsList" component={PetsListScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="PetsProfile" component={PetsProfileScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="PetsDiario" component={PetsDiarioScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="PetsStory" component={PetsStoryScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="PetsSingleGaleria" component={PetsSingleGaleriaScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="SchoolRegister" component={SchoolRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="SchoolFinish" component={SchoolFinishScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="SchoolSuccess" component={SchoolSuccessScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="School" component={SchoolPongoScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="SchoolBoletim" component={SchoolBoletimScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="SchoolPayments" component={SchoolPayments} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        
        <Stack.Screen name="Institucional" component={InstitucionalScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalVisita" component={InstitucionalVisitaScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalAbout" component={InstitucionalAboutScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalLocal" component={InstitucionalLocalScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalRealizacoes" component={InstitucionalRealizacoesScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalGaleria" component={InstitucionalGaleriaScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="InstitucionalSingleGaleria" component={InstitucionalSingleGaleriaScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Shop" component={ShopScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ShopSingleProduct" component={ShopSingleProductScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ShopCart" component={ShopCartScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ShopSingleCategory" component={ShopSingleCategoryScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ShopPayment" component={ShopPaymentScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        
        <Stack.Screen name="VillaPongo" component={VillaPongoScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Services" component={ServicesScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="ServicesSingle" component={ServicesSingleScreen} options={{ ...TransitionPresets.ModalPresentationIOS, }} />
        <Stack.Screen name="ServicesDiario" component={ServiceDiarioScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="MeusPedidos" component={MeusPedidosScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="PedidoProdutoIndividual" component={PedidoProdutoIndividualScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="AuthLogin" component={AuthLoginScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AddPet" component={AddPetScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AuthLoginColaborador" component={AuthLoginColaboradorScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Async" component={AsyncStaticScreen} options={{ ...TransitionPresets.FadeFromBottomAndroid, }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ ...TransitionPresets.SlideFromRightIOS, backBehavior: 'none', }} />

        <Stack.Screen name="DayUse" component={DayUseScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="DayUseRegister" component={DayUseRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="DayUsePayments" component={DayUsePayments} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Hotel" component={HotelScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="HotelRegister" component={HotelRegisterScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="HotelPayments" component={HotelPayments} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Veterinario" component={VeterinarioScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Grooming" component={GroomingScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Faq" component={FaqScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
        <Stack.Screen name="Privacidade" component={Privacidade} options={{ ...TransitionPresets.SlideFromRightIOS, }} />

        <Stack.Screen name="Video" component={VideoScreen} options={{ ...TransitionPresets.SlideFromRightIOS, }} />
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
          height: 80,
          elevation: 0,
         // borderTopLeftRadius: 20,
        //  borderTopRightRadius: 20
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{
        tabBarIcon: ({ color, size }) => (<Octicons name="home" size={routeName === 'Home' ? size + 3 : size} color={color} />),
      }} />


      <Tab.Screen name="Shop" component={ShopScreen} options={{
        tabBarIcon: ({ color, size }) => (<ShoppingBag size={routeName === 'School' ? size + 6 : size + 2} color={color} />),
      }} />

      <Tab.Screen name="VillaPongo" component={VillaPongoScreen} options={{
        tabBarIcon: ({ color, size }) => (<TentTree size={routeName === 'Notify' ? size + 3 : size} color={color} />),
      }} />
      <Tab.Screen name="Account" component={AccountScreen} options={{
        backBehavior: 'none',
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
  <Tab.Screen name="Cart" component={CartScreen} options={{
        tabBarBadge: 3,
        tabBarBadgeStyle: { backgroundColor: '#fff', fontFamily: font.bold, fontSize: 12, },
        tabBarIcon: ({ color, size }) => (<ShoppingCart size={routeName === 'Cart' ? size + 3 : size} color={color} />),
      }} />

*/