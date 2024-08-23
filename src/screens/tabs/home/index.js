import React from 'react';
import { Main, Scroll, Column, Row, Title, Button, useTheme, LabelBT } from '@theme/global';
import { MotiImage } from 'moti';
import TopMenu from '@components/Header/topmenu';
import { MotiView, MotiText } from 'moti'
import { Linking, Text } from 'react-native';

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    return (
        <Main >
            <Scroll >
                <TopMenu back={false} />
                <Column ph={margin.h} mv={12}>
                    <Row style={{ columnGap: 16, marginBottom: 8,  flex: 1, width: '100%' }}>
                        <MotiView
                            from={{ translateX: -55, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 1 }}
                            transition={{
                                delay: 200,
                                type: 'timing',
                            }}
                            style={{ flexGrow: 1 }}
                        >
                            <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={() => { Linking.openURL('https://pongo.com.br') }}>
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
                    <Row style={{ columnGap: 16, marginTop: 8, flex: 1 }}>
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
                                    <MotiImage source={require('@imgs/home_3.png')} style={{ width: '100%', height: 130, objectFit: 'contain' }} />
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
                                    <Title align="center" size={16}>Conheça mais</Title>
                                </Column>
                            </Button>
                        </MotiView>
                    </Row>
                </Column>
                <MotiView
                    from={{ translateY: 55, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{
                        delay: 800,
                        type: 'timing',
                    }}>

                    <Button onPress={() => { navigation.navigate('ChatNew') }} style={{ borderWidth: 2, borderColor: '#918C8B', marginTop: 32, }} pv={16} ph={1} mh={margin.h}>
                        <LabelBT color="#918C8B" style={{ textAlign: 'center', }}>Iniciar conversa</LabelBT>
                    </Button>
                </MotiView>
                <Column style={{ height: 30, }} />
            </Scroll>
        </Main>
    )
}
