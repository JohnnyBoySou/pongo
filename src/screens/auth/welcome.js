import React, { useEffect, useState } from 'react';
import { Main, Title, useTheme, Label, Image, Column, Button, View, SCREEN_WIDTH, SCREEN_HEIGHT } from '@theme/global';
import Animated, { FadeInDown, FadeInLeft, FadeInUp } from 'react-native-reanimated';
import { getPreferences } from '@hooks/preferences';
import { StatusBar } from 'expo-status-bar'
import { ImageBackground } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function WelcomeScreen({ navigation, route }) {
    const { color, font, margin, } = useTheme();
    const isFocused = useIsFocused()
    useEffect(() => {
        const fecthData = async () => {

            try {
                const res = await getPreferences()
                if (res?.name) {
                    setTimeout(() => {
                        setstep(2)
                    }, 2000);
                    setTimeout(() => {
                        navigation.replace('Tabs')
                    }, 5000)
                } else {
                    setstep(2)
                    setTimeout(() => {
                        navigation.replace('AuthLogin')
                    }, 4000);
                }
            } catch (error) {
                console.log(error)
            }
        }

        if (isFocused) {
            fecthData()
        }
    }, [isFocused])



    const [step, setstep] = useState(1);

    if (step === 1) {
        return (
            <Main style={{ backgroundColor: "#AEB0AF", flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Image source={require('@imgs/icon.png')} style={{ objectFit: 'cover', width: 264, height: 264, }} />
            </Main>
        )
    }
    else if (step === 2) {
        return (
            <Main style={{ backgroundColor: "#FFF", flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Animated.View entering={FadeInDown}>
                    <StatusBar backgroundColor={color.bg} />
                    <ImageBackground source={require('@imgs/bgwelcome.png')} style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 1.1, objectFit: 'cover', zIndex: -2, justifyContent: 'center', alignItems: 'center', }} >
                        <ImageBackground source={require('@imgs/welcomecard.png')} style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, justifyContent: 'center', alignItems: 'center', }} imageStyle={{ objectFit: 'contain' }}>
                            <Column style={{ marginTop: -20, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center', }}>
                                <Animated.View entering={FadeInDown.delay(1500)}>
                                    <Title color="#fff" align="center" style={{ lineHeight: 42, fontSize: 32, marginHorizontal: 20, fontFamily: font.medium, letterSpacing: -.6, }}>SEJA BEM-VINDO!</Title>
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(1800)}>
                                    <Label color="#fff" style={{ lineHeight: 20, marginTop: 20, fontFamily: 'Voyage_Medium' }}>é um prazer ter você conosco!</Label>
                                </Animated.View>
                                <Animated.View entering={FadeInLeft.delay(2200)}>
                                    <Button bg="transparent" mv={32} pv={8} ph={20} style={{ marginTop: 26 }} >
                                        <Image source={require('@imgs/seta.png')} style={{ width: 72, height: 42, objectFit: 'contain' }} />
                                    </Button>
                                </Animated.View>
                            </Column>
                        </ImageBackground>
                    </ImageBackground>
                </Animated.View>
            </Main>

        )
    }
}