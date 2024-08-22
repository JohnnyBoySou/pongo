import React from 'react';
import { Main, Scroll, Column, Row, Title, Button, useTheme } from '@theme/global';
import { MotiImage } from 'moti';
import TopMenu from '@components/Header/topmenu';
import { MotiView, MotiText } from 'moti'

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    return (
        <Main >
            <Scroll >
                <TopMenu />
                <Column ph={margin.h} mv={18}>
                    <Title>Escolha qual deseja acessar</Title>
                    <Row style={{ columnGap: 8, marginBottom: 8, marginTop: 24, flex: 1, width: '100%' }}>
                        <MotiView
                            from={{ translateX: -55, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 1 }}
                            transition={{
                                delay: 200,
                                type: 'timing',
                            }}
                            style={{ flexGrow: 1 }}
                        >
                            <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={() => { navigation.navigate('Shop') }}>
                                <Column>
                                    <MotiImage source={require('@imgs/home_1.png')} style={{ width: '100%', height: 130, objectFit: 'contain' }} />
                                    <Title align="center" size={18}>Loja Pongo</Title>
                                </Column>
                            </Button>
                        </MotiView>

                        <MotiView
                            from={{ translateX: 55, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 1 }}
                            transition={{
                                delay: 400,
                                type: 'timing',
                            }}
                            style={{ flexGrow: 1 }}
                        >
                            <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={() => { navigation.navigate('VillaPongo') }}>
                                <Column>
                                    <MotiImage source={require('@imgs/home_2.png')} style={{ width: '100%', height: 130, objectFit: 'contain' }} />
                                    <Title align="center" size={18}>Villa Pongo</Title>
                                </Column>
                            </Button>
                        </MotiView>

                    </Row>
                    <Row style={{ columnGap: 8, }}>
                        <MotiView
                            from={{ translateX: -55, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 1 }}
                            transition={{
                                delay: 600,
                                type: 'timing',
                            }}
                            style={{ flexGrow: 1 }}
                        >
                            <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={() => { navigation.navigate('Tabs', { screen: 'Account' }) }}>
                                <Column>
                                    <MotiImage source={require('@imgs/home_3.png')} style={{ width: '100%', height: 130, objectFit: 'contain', marginHorizontal: 0, }} />
                                    <Title align="center" size={18}>Minha conta</Title>
                                </Column>
                            </Button>
                        </MotiView>
                        <MotiView
                            from={{ translateX: 55, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 1 }}
                            transition={{
                                delay: 800,
                                type: 'timing',
                            }}
                            style={{ flexGrow: 1 }}
                        >
                            <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={() => { navigation.navigate('Institucional') }}>
                                <Column>
                                    <MotiImage source={require('@imgs/home_4.png')} style={{ width: '100%', height: 130, objectFit: 'contain' }} />
                                    <Title align="center" size={18}>Institucional</Title>
                                </Column>
                            </Button>
                        </MotiView>
                    </Row>
                </Column>
            </Scroll>
        </Main>
    )
}
