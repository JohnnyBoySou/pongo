import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, SCREEN_WIDTH } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import { Bell, CircleUserRound, GraduationCap, Hotel, ShoppingCart, TentTree } from 'lucide-react-native';
export default function TabBar({ theme = 'dark'}) {
    const { color, font, } = useTheme();
    const navigation = useNavigation();


    return (
        <Row style={{
            width: SCREEN_WIDTH,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0, zIndex: 99,
            backgroundColor: theme === 'dark' ? '#918C8B' : '#fff',
            height: 80,
        }}>

            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', }} radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'Home',})}} >
                <Octicons name="home" size={20} color="#C3C3C3" />
            </Button>
       
            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', }} radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'Shop',})}} >
                <ShoppingCart  size={28} color="#C3C3C3" />
            </Button>
            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center',  }} radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'VillaPongo',})}} >
                <TentTree  size={24} color="#C3C3C3" />
            </Button>
            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', }} radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'Account',})}} >
                <CircleUserRound   size={24} color="#C3C3C3" />
            </Button>
        </Row>
    )
}
