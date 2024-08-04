import React from 'react';
import { Dimensions, } from 'react-native';
import { Main, Scroll, Column, Row, Title, Button, useTheme } from '@theme/global';
import { MotiImage } from 'moti';
import TopMenu from '@components/Header/topmenu';

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    return (
        <Main >
            <Scroll>
                <TopMenu />
                <Column ph={margin.h}>

                    <Title>Escolha qual deseja acessar</Title>

                    <Row style={{ columnGap: 12, marginVertical: 12, }}>
                        <Button radius={24} pv={20} style={{ borderWidth: 2, borderColor:'#30303030', flexGrow: 1, }} onPress={() => { navigation.navigate('Institucional') }}>
                            <Column>
                                <MotiImage  source={require('@imgs/home_1.png')} style={{ width: '100%',height: 130, objectFit: 'contain'}}/>
                                <Title align="center">Loja Pongo</Title>
                            </Column>
                        </Button>
                        <Button radius={24} pv={20} style={{ borderWidth: 2, borderColor:'#30303030', flexGrow: 1, }} onPress={() => { navigation.navigate('Institucional') }}>
                            <Column>
                                <MotiImage  source={require('@imgs/home_2.png')} style={{ width: '100%', height: 130, objectFit: 'contain'}}/>
                                <Title align="center">Villa Pongo</Title>
                            </Column>
                        </Button>
                    </Row>
                    <Row style={{ columnGap: 12,  }}>
                        <Button radius={24} pv={20} style={{ borderWidth: 2, borderColor:'#30303030', flexGrow: 1, }} onPress={() => { navigation.navigate('Institucional') }}>
                            <Column>
                                <MotiImage  source={require('@imgs/home_3.png')} style={{ width: '100%',height: 130, objectFit: 'contain', marginHorizontal: 0,}}/>
                                <Title align="center">Minha conta</Title>
                            </Column>
                        </Button>
                        <Button radius={24} pv={20} style={{ borderWidth: 2, borderColor:'#30303030', flexGrow: 1, }} onPress={() => { navigation.navigate('Institucional') }}>
                            <Column>
                                <MotiImage  source={require('@imgs/home_4.png')} style={{ width: '100%', height: 130, objectFit: 'contain'}}/>
                                <Title align="center">Institucional</Title>
                            </Column>
                        </Button>
                    </Row>

                </Column>
            </Scroll>
        </Main>
    )
}
