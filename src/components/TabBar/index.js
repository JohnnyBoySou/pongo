import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, SCREEN_WIDTH } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import Octicons from '@expo/vector-icons/Octicons';
import { Bell, CircleUserRound, GraduationCap, ShoppingCart } from 'lucide-react-native';
export default function TabBar({ }) {
    const { color, font, } = useTheme();
    const navigation = useNavigation();
    return (
        <Row style={{
            width: SCREEN_WIDTH,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 12,
            position: 'absolute',
            bottom: 0, zIndex: 99,
            backgroundColor: '#918C8B',
            height: 90,
        }}>

            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', }} radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'Home',})}} >
                <Octicons name="home" size={20} color="#C3C3C3" />
            </Button>
            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}  radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'Cart',})}} >
                <ShoppingCart size={24} color="#C3C3C3" />
            </Button>
            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', }} radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'School',})}} >
                <GraduationCap  size={28} color="#C3C3C3" />
            </Button>
            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center',  }} radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'Notify',})}} >
                <Bell  size={24} color="#C3C3C3" />
            </Button>
            <Button ph={0} pv={0} style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center', }} radius={6} onPress={() => {navigation.navigate('Tabs', { screen: 'Account',})}} >
                <CircleUserRound   size={24} color="#C3C3C3" />
            </Button>
        </Row>
    )
}