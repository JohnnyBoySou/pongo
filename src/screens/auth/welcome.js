import React, { useEffect, useState } from 'react';
import { Main, Title, useTheme, Label, Image, Column, Button, View } from '@theme/global';
import { ArrowRight } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
export default function WelcomeScreen({ navigation, route }) {
    //verificacoes e animação
    const { font, color, margin } = useTheme();

    const name = route.params?.name ? route.params?.name : 'Visitante'
    
    return (
        <Main style={{ backgroundColor: "#918C8B", flex: 1, justifyContent: 'center', alignItems: 'center', }}>

           
            <Animated.View entering={FadeInDown.delay(500)}>
                <Title color="#fff" align="center" font='Voyage_Medium' style={{ lineHeight: 42, fontSize: 32, marginHorizontal: 20, }}>Seja bem-vindo, {'\n'}{name}!</Title>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(800)}>
                <Label color="#fff" style={{ lineHeight: 20, marginTop: 30, }}>É um prazer ter você conosco!</Label>
            </Animated.View>

            <Animated.View entering={FadeInLeft.delay(1200)}>
                <Button bg="#d9d9d9" mv={32} pv={8} ph={20} onPress={() => { navigation.navigate('Tabs') }}  >
                    <ArrowRight size={24} color="#918C8B" />
                </Button>
            </Animated.View>
        </Main>
    )
}