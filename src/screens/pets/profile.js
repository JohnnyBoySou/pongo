import React, { useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image, Button, SCREEN_WIDTH, } from '@theme/global'

//Components
import Back from '@components/Back';
import TabBar from '@components/TabBar';
import Header from '@components/Header';
import Card from '@components/Card';
//API
import { singlePet } from '@api/request/pets';
import { ImageBackground } from 'react-native';
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

export default function PetsProfileScreen({ navigation, route }) {
    const { color, font, margin, } = useTheme()
    const id = route?.params?.id ? route?.params?.id : 1;

    const [pet, setdata] = useState();
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await singlePet(id)

                setdata(res)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }

        fecthData()
    }, []);


    return (
        <Main >
            <StatusBar style="dark" backgroundColor={color.bg} />
            <Scroll>
                <Column style={{ flex: 1, }}>
                    <Header title="Pet" />
                    <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: -24, zIndex: 99, width: SCREEN_WIDTH - 56, }}>
                            <Column style={{ borderBottomRightRadius: 100, backgroundColor: color.bg, width: 24, height: 24, }} />
                            <Column style={{ borderBottomLeftRadius: 100, backgroundColor: color.bg, width: 24, height: 24, }} />
                        </Row>
                        <Image source={{ uri: pet?.img }} style={{ width: SCREEN_WIDTH - 56, height: 320, objectFit: 'cover', backgroundColor: '#d7d7d7', }} />
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -24, zIndex: 99, width: SCREEN_WIDTH - 56, }}>
                            <Column style={{ borderTopRightRadius: 100, backgroundColor: color.bg, width: 24, height: 24, }} />
                            <Column style={{ borderTopLeftRadius: 100, backgroundColor: color.bg, width: 24, height: 24, }} />
                        </Row>
                    </Column>

                    <Row style={{ backgroundColor: '#fff', paddingHorizontal: 24, paddingBottom: 18, paddingTop: 8, alignSelf: 'center', zIndex: 99, marginTop: -32, borderRadius: 8, }}>
                        <Title size={24} align="center" color={color.sc.sc3} >{pet?.name}</Title>
                    </Row>

                    <Column style={{ marginHorizontal: margin.h, backgroundColor: '#fff', marginTop: -24, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: -14, }}>
                            <Column style={{ borderBottomRightRadius: 100, backgroundColor: color.bg, width: 24, height: 24, }} />
                            <Column style={{ borderBottomLeftRadius: 100, backgroundColor: color.bg, width: 24, height: 24, }} />
                        </Row>
                        <Animated.View entering={FadeInDown.delay(300)}>
                            <Row style={{ columnGap: 12, marginVertical: 12, paddingTop: 10, justifyContent: 'center', alignItems: 'center', }}>
                                <Title size={16} font={font.bold} color="#fff" style={{ backgroundColor: color.sc.sc3, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' }}>{pet?.race ? pet?.race : 'Nenhuma raca informada'}</Title>
                                <Title size={16} font={font.bold} color="#fff" style={{ backgroundColor: color.sc.sc3, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' }}>{pet?.age} ano{pet?.age > 1 ? 's' : ''}</Title>
                            </Row>
                        </Animated.View>
                        <Row style={{ alignItems: 'center', columnGap: 20, marginHorizontal: 20, }}>
                            <Column style={{ paddingHorizontal: 14, marginRight: -12, paddingVertical: 24, flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Animated.View entering={FadeInLeft.delay(500)} style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                    <Image source={require('@imgs/ac3.png')} style={{ width: 52, height: 52, objectFit: 'contain' }} />
                                    <Title size={16} style={{ textAlign: 'center', }}>Banhos</Title>
                                    <Title style={{ marginTop: 4, textAlign: 'center', }}>{pet?.banhos}</Title>
                                </Animated.View>
                            </Column>

                            <Column style={{ height: 120, width: 1, backgroundColor: color.border, }} />
                            <Column style={{ paddingHorizontal: 14, marginLeft: -12, paddingVertical: 24, flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Animated.View entering={FadeInRight.delay(800)} style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                    <Image source={require('@imgs/ac2.png')} style={{ width: 52, height: 52, objectFit: 'contain' }} />
                                    <Title size={16} style={{ textAlign: 'center', }}>Tosas</Title>
                                    <Title style={{ marginTop: 4, textAlign: 'center', }}>{pet?.tosas}</Title>
                                </Animated.View>
                            </Column>
                        </Row>
                        <Column style={{ flexGrow: 1, height: 1, backgroundColor: color.border, marginHorizontal: 30, }} />
                        <Row style={{ alignItems: 'center', columnGap: 20, marginHorizontal: 20, }}>
                            <Column style={{ paddingHorizontal: 24, marginRight: -12, paddingVertical: 24, flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Animated.View entering={FadeInLeft.delay(1000)} style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                    <Image source={require('@imgs/icon_vet.png')} style={{ width: 42, height: 52, objectFit: 'contain' }} />
                                    <Title size={16} style={{ textAlign: 'center', }}>Consultas</Title>
                                    <Title style={{ marginTop: 4, textAlign: 'center', }}>{pet?.consultas}</Title>
                                </Animated.View>
                            </Column>
                            <Column style={{ height: 120, width: 1, backgroundColor: color.border, }} />
                            <Column style={{ paddingHorizontal: 0, marginLeft: -12, paddingVertical: 24, flexGrow: 1, justifyContent: 'center', alignItems: 'center', }}>
                                <Animated.View entering={FadeInLeft.delay(1000)} style={{ justifyContent: 'center', alignItems: 'center',  }}>
                                    <Image source={require('@imgs/shop1.png')} style={{ width: 74, height: 74, objectFit: 'contain' }} />
                                    <Button style={{ backgroundColor: '#91A6C4', }} pv={6} ph={12} onPress={() => {navigation.navigate('Services')}} >
                                        <Title size={16} color='#fff'>Mais serviços</Title>
                                    </Button>
                                </Animated.View>
                            </Column>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column style={{ borderTopRightRadius: 100, backgroundColor: color.bg, width: 24, height: 24, }} />
                            <Column style={{ borderTopLeftRadius: 100, backgroundColor: color.bg, width: 24, height: 24, }} />
                        </Row>
                    </Column>
                </Column>
                <Column style={{ height: 120, }} />
            </Scroll>
            <TabBar theme="light" />
        </Main>
    )
}


/*
 <Button ph={4} pv={4} radius={6}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require("@imgs/pr4.png")} style={{ width: 50, height: 50, marginBottom: 6, }} />
                                <Title size={16} color="#fff">Novo</Title>
                            </Column>
                        </Button>
                           <Row style={{ justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <Button ph={4} pv={4} radius={6}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require("@imgs/pr1.png")} style={{ width: 50, height: 50, marginBottom: 6, borderRadius: 100, }} />
                                <Title size={16} color="#fff">Escola</Title>
                            </Column>
                        </Button>
                        <Button ph={4} pv={4} radius={6}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require("@imgs/pr2.png")} style={{ width: 50, height: 50, marginBottom: 6, borderRadius: 100, }} />
                                <Title size={16} color="#fff">Agenda</Title>
                            </Column>
                        </Button>
                        <Button ph={4} pv={4} radius={6} onPress={() => { navigation.navigate('PetsDiario', { id: pet?.id, pet: pet, }) }} >
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require("@imgs/pr3.png")} style={{ width: 50, height: 50, marginBottom: 6, borderRadius: 100, }} />
                                <Title size={16} color="#fff">Diário</Title>
                            </Column>
                        </Button>
                    </Row>
*/


