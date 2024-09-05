import React from 'react';
import { Main, Scroll, Column, Row, Title, Button, useTheme, LabelBT } from '@theme/global';
import { MotiImage } from 'moti';
import TopMenu from '@components/Header/topmenu';
import { MotiView, } from 'moti'
import { getPreferences, } from '@hooks/preferences';
import { MessageCircleMore } from 'lucide-react-native';
import Card from '../../../components/Card';

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    const handleChat = async () => {
        try {
            const res = await getPreferences()
            if (res?.token) {
                navigation.navigate('ChatNew',)
            }
            else {
                navigation.navigate('AuthLogin')
            }
        } catch (error) {
            return
        }
    }
    const handleAccount = async () => {
        try {
            const res = await getPreferences()
            if (res?.token) {
                navigation.navigate('Tabs', { screen: 'Account' })
            }
            else {
                navigation.navigate('AuthLogin')
            }
        } catch (error) {
            return
        }
    }

    return (
        <Main >
            <Scroll >
                <TopMenu back={false} handleSearch={false} />
                <Column ph={margin.h} mv={12}>
                    <Row style={{ columnGap: 16, marginBottom: 8, flex: 1, width: '100%' }}>
                        <MotiView
                            from={{ translateX: -55, opacity: 0 }}
                            animate={{ translateX: 0, opacity: 1 }}
                            transition={{
                                delay: 200,
                                type: 'timing',
                            }}
                            style={{ flexGrow: 1 }}
                        >
                            <Card>
                                <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={() => { navigation.navigate('Shop') }}>
                                    <Column>
                                        <MotiImage source={require('@imgs/home_4.png')} style={{ width: '100%', height: 130, objectFit: 'contain' }} />
                                        <Title align="center" size={14}>LOJA PONGO</Title>
                                    </Column>
                                </Button>
                            </Card>
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
                            <Card>
                                <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={() => { navigation.navigate('VillaPongo') }}>
                                    <Column>
                                        <MotiImage source={require('@imgs/home_2.png')} style={{ width: '100%', height: 130, objectFit: 'contain' }} />
                                        <Title align="center" size={14}>VILLA PONGO</Title>
                                    </Column>
                                </Button>
                            </Card>
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
                            <Card>
                                <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={handleAccount}>
                                    <Column>
                                        <MotiImage source={require('@imgs/home_3.png')} style={{ width: '100%', height: 130, objectFit: 'contain' }} />
                                        <Title align="center" size={14}>MINHA CONTA</Title>
                                    </Column>
                                </Button>
                            </Card>
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
                            <Card>

                                <Button radius={24} pv={20} style={{ backgroundColor: color.light, flexGrow: 1, }} onPress={() => { navigation.navigate('Institucional') }}>
                                    <Column>
                                        <MotiImage source={require('@imgs/home_1.png')} style={{ width: '100%', height: 130, objectFit: 'contain' }} />
                                        <Title align="center" size={14}>CONHEÇA MAIS</Title>
                                    </Column>
                                </Button>
                            </Card>
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

                    <Button onPress={handleChat} style={{ borderWidth: 2, borderColor: '#918C8B', marginTop: 32, }} pv={16} ph={1} mh={margin.h}>
                        <LabelBT color="#918C8B" style={{ textAlign: 'center', fontSize: 20 }}> <MessageCircleMore color={color.title} size={20} /> Iniciar conversa</LabelBT>
                    </Button>
                </MotiView>
                <Column style={{ height: 200, }} />
            </Scroll>
        </Main>
    )
}
