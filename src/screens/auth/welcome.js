import React, { useEffect, useState } from 'react';
import { Main, Title, useTheme, Label, Image, Column, Button, View, SCREEN_WIDTH, SCREEN_HEIGHT } from '@theme/global';
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { getPreferences } from '@hooks/preferences';
import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation, route }) {
    const { color, font, margin, } = useTheme();
    const [name, setname] = useState(route.params?.name ? route.params?.name : 'Visitante');
    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await getPreferences()
                if (res?.name) {
                    setname(res?.name)
                    setTimeout(() => {
                        navigation.navigate('Tabs')
                    }, 3000)
                } else {
                    setname('Visitante')
                    navigation.navigate('Onboarding')
                }
            } catch (error) {
                console.log(error)
                setname('Visitante')
            }
        }

        fecthData()
    }, [])

    return (
        <Main style={{ backgroundColor: "#FFF", flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <StatusBar backgroundColor={color.bg} />
            <ImageBackground source={require('@imgs/bgwelcome.png')} style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 1.1, objectFit: 'cover', zIndex: -2, justifyContent: 'center', alignItems: 'center',  }} >
                <ImageBackground source={require('@imgs/welcomecard.png')} style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, justifyContent: 'center', alignItems: 'center',   }} imageStyle={{ objectFit: 'contain' }}>
                    <Column style={{ marginTop: -20, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center', }}>
                        <Animated.View entering={FadeInDown.delay(500)}>
                            <Title color="#fff" align="center" style={{ lineHeight: 42, fontSize: 32, marginHorizontal: 20, fontFamily: font.medium, letterSpacing: -.6, }}>SEJA BEM - VINDO!</Title>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(800)}>
                            <Label color="#fff" style={{ lineHeight: 20, marginTop: 20, fontFamily: 'Voyage_Medium' }}>é um prazer ter você conosco!</Label>
                        </Animated.View>
                        <Animated.View entering={FadeInLeft.delay(1200)}>
                            <Button bg="transparent" mv={32} pv={8} ph={20} style={{ marginTop: 26 }} onPress={() => { navigation.navigate('Tabs') }}  >
                                <Image source={require('@imgs/seta.png')} style={{ width: 72, height: 42, objectFit: 'contain' }} />
                            </Button>
                        </Animated.View>
                    </Column>
                </ImageBackground>
            </ImageBackground>
        </Main>
    )
}