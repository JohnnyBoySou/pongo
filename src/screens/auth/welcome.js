import React, { useEffect, useState } from 'react';
import { Main, Title, useTheme, Label, Image, Column, Button, View } from '@theme/global';
import { ArrowRight } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
export default function WelcomeScreen({ navigation, route }) {
    //verificacoes e animação
    const { font, color, margin } = useTheme();

    const name = route.params?.name || 'Maria';
    useEffect(() => {
        setTimeout(() => {
            //  navigation.navigate('Tabs')
        }, 2000)
    }, [])
    return (
        <Main style={{ backgroundColor: "#918C8B", flex: 1, justifyContent: 'center', alignItems: 'center', }}>

            <Column style={{ position: 'absolute', top: 40, justifyContent: 'center', alignItems: 'center', }}>
                <Animated.View entering={FadeInUp} style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Title color="#fff" font='Voyage_Medium' style={{ lineHeight: 42, fontSize: 32, }}>VILLA PONGO</Title>
                    <Image source={require('@imgs/wel.png')} style={{ width: 132, height: 6, }} />
                </Animated.View>
            </Column>
            <Animated.View entering={FadeInDown.delay(500)}>
                <Title color="#fff" font='Voyage_Medium' style={{ lineHeight: 42, fontSize: 32, }}>Seja vem vinda {name}</Title>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(1000)}>
                <Label color="#fff" style={{ lineHeight: 20, }}>É um prazer ter você conosco!</Label>
            </Animated.View>

            <Animated.View entering={FadeInLeft.delay(2000)}>
                <Button bg="#d9d9d9" mv={16} pv={8} ph={20} onPress={() => { navigation.navigate('AddPet') }}  >
                    <ArrowRight size={24} color="#918C8B" />
                </Button>
            </Animated.View>
        </Main>
    )
}