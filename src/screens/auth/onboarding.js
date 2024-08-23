import React, { useState, useContext, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Column, Title, Main, Row, Label, Button, C, LabelBT } from '@theme/global';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { AnimatePresence, MotiImage, MotiView, } from 'moti';

const { width, height } = Dimensions.get('window');
import PagerView from 'react-native-pager-view';

import Animated, { FadeInDown, useAnimatedStyle, withSpring, withTiming, 
    interpolateColor,
    useSharedValue, } from 'react-native-reanimated';

export default function OnboardingScreen({ navigation, route, }) {
    const { color, font } = useContext(ThemeContext)

    const pagerRef = useRef();
    const handleScreen = (position) => {
        pagerRef.current.setPage(position);
        setCurrentIndex(position);
        console.log(position)
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const numberOfDots = 3;

    const goToNext = () => {
        let next = (currentIndex + 1) % numberOfDots;
        setCurrentIndex(next);
        pagerRef.current.setPage(next);
    };


    return (
        <Main style={{backgroundColor: '#fff',}}>
            <Row style={{ position: 'absolute', top: 40, left: 30, right: 30, zIndex: 99, justifyContent: 'space-between', alignItems: 'center', }}>

                <Column></Column>
                <Button pv={8} ph={20} bg='#ECEBEB' onPress={() => { setCurrentIndex(2); pagerRef.current.setPage(2) }} >
                    <LabelBT color='#918C8B' align="center">Pular</LabelBT>
                </Button>
            </Row>
            <PagerView style={{ flex: 1, }} initialPage={0} ref={pagerRef} onPageSelected={(event) => { handleScreen(event.nativeEvent.position) }}>
                <Screen0 color={color} />
                <Screen1 color={color} />
                <Screen2 color={color} navigation={navigation} />
            </PagerView>
            <Row style={{ marginBottom: 20, width: width, zIndex: 99, paddingHorizontal: 30, justifyContent: 'space-between', zIndex: -4, }}>
                <PaginationDots
                    index={currentIndex}
                    numberOfDots={numberOfDots}
                    activityColor="#918C8B"
                    disableColor='#ECEBEB' />


                {currentIndex == 2 && <Column style={{ width: 54, height: 54, borderRadius: 100, }}>
                </Column>}
                <AnimatePresence>
                    {currentIndex != 2 &&
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} exit={{ opacity: 0, scale: 0, }} transition={{ type: 'timing' }}>
                            <Button bg='#ECEBEB' onPress={goToNext} style={{ width: 54, height: 54, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                <ArrowRight size={28} color="#918C8B" />
                            </Button>
                        </MotiView>
                    }
                </AnimatePresence>
            </Row>
        </Main>
    )
}
const Screen0 = ({ color }) => {
    return (
        <Column style={{ flex: 1, marginHorizontal: 30, justifyContent: 'center', }}>
            <MotiImage from={{ opacity: 0, scale: 0, rotate: '12deg' }} animate={{ opacity: 1, scale: 1, rotate: '0deg' }} source={require('@imgs/onboarding_1.png')} style={{ width: '100%', height: 400, objectFit: 'contain', }} />
            <Title style={{ letterSpacing: -1, fontSize: 32, lineHeight: 34, textAlign: 'center', }}>Acompanhe o diário do seu Pet na Villa Pongo</Title>
        </Column>

    )
}

const Screen1 = ({ color }) => {
    return (
        <Column style={{ flex: 1, marginHorizontal: 30, justifyContent: 'center', }}>
            <MotiImage from={{ opacity: 0, scale: 0, rotate: '-12deg' }} animate={{ opacity: 1, scale: 1, rotate: '0deg' }} source={require('@imgs/onboarding_2.png')} style={{ width: '100%', height: 400, objectFit: 'contain', }} />
            <Title style={{ letterSpacing: -1, fontSize: 32, lineHeight: 34, textAlign: 'center', }}>Acesso rápido a produtos e novidades Pongo</Title>
        </Column>
    )
}   

const Screen2 = ({ color, navigation }) => {
    return (
        <Column style={{ flex: 1, marginHorizontal: 30, justifyContent: 'center', }}>
            <Animated.Image entering={FadeInDown} source={require('@imgs/onboarding_3.png')} style={{ width: '100%', height: 300, objectFit: 'contain', }} />
            <Title style={{ letterSpacing: -1, fontSize: 28, lineHeight: 32, textAlign: 'center', }}>Atendimento em tempo real com a equipe Pongo e Villa Pongo</Title>
            <Label style={{ letterSpacing: -0.5, fontSize: 18, lineHeight: 22, textAlign: 'center', marginTop: 10, }}>Utilize seu acesso para entrar no app ou entre como visitante.</Label>
            <Column style={{ justifyContent: 'center', alignItems: 'center', columnGap: 20, zIndex: 99, }}>
                <Button onPress={() => { navigation.navigate('AuthLogin') }} mtop={20} bg='#918C8B' style={{ width: 240, }}>
                    <LabelBT color="#fff" align="center">Acessar conta</LabelBT>
                </Button>
                <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Home'}) }} bg='#ECEBEB' ph={12} radius={100} mtop={12} style={{ width: 240, }}>
                    <LabelBT color='#918C8B' align="center">Entrar como visitante</LabelBT>
                </Button>
            </Column>
        </Column>
    )
}


const PaginationDots = ({ index, numberOfDots, activityColor, disableColor }) => {
    // Animated styles


    const dotStyle = (dotIndex) => {
        return useAnimatedStyle(() => {

            const width = withTiming(index === dotIndex ? 45 : 20); 
            const bgColor = withTiming(index === dotIndex ? 1 : 0, {
                duration: 300,
            });

            return {
                backgroundColor: index === dotIndex ? activityColor : disableColor,
                width,
            };
        });
    };

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
        }}>

            {Array.from({ length: numberOfDots }).map((_, dotIndex) => (
                <Animated.View
                    key={dotIndex}
                    style={[{
                        height: 20,
                        borderRadius: 100,
                        margin: 5,
                    }, dotStyle(dotIndex)]}
                />
            ))}
        </View>
    );
};
