import React, { useContext } from 'react';
import { Image } from 'react-native';
import { Main, Scroll, Column, Title, Row, Button, Label } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Swiper from 'react-native-swiper';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';

export default function InstitucionalScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu title="Conheça mais" />
                <Column style={{ height: 12, }} />
                <Carrossel data={imgs} />
                <Column mh={margin.h} mv={30} style={{ rowGap: 24, }}>
                    <Button radius={16} bg="#fff" pv={10} ph={10} onPress={() => { navigation.navigate('InstitucionalVisita') }} >
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-solicitar-visita.png')} style={{ width: 81, height: 81, marginRight: 8, borderRadius: 20 }} />
                            <Column>
                                <Title size={16}>SOLICITAR VISITA</Title>
                                <Column style={{ height: 4, }} />
                                <Label size={14}>Clique para visualizar</Label>
                            </Column>

                        </Row>
                    </Button>

                    <Button radius={16} bg="#fff" pv={10} ph={10} onPress={() => { navigation.navigate('InstitucionalAbout') }} >
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-sobre-nos.png')} style={{ width: 81, height: 81, marginRight: 8, borderRadius: 20 }} />
                            <Column>
                                <Title size={16}>SOBRE NÓS</Title>
                                <Column style={{ height: 4, }} />
                                <Label size={14}>Clique para visualizar</Label>
                            </Column>
                        </Row>
                    </Button>

                    <Button radius={16} bg="#fff" onPress={() => { navigation.navigate('InstitucionalRealizacoes') }} pv={10} ph={10}>
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-realizacoes.png')} style={{ width: 81, height: 81, marginRight: 8, borderRadius: 20 }} />
                            <Column>
                                <Title size={16}>REALIZAÇÕES</Title>
                                <Column style={{ height: 4, }} />
                                <Label size={14}>Clique para visualizar</Label>
                            </Column>
                        </Row>
                    </Button>

                    <Button radius={16} bg="#fff" pv={10} ph={10} onPress={() => { navigation.navigate('InstitucionalLocal') }} >
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-onde-estamos.png')} style={{ width: 81, height: 81, marginRight: 8, borderRadius: 20 }} />
                            <Column>
                                <Title size={16}>ONDE ESTAMOS</Title>
                                <Column style={{ height: 4, }} />
                                <Label size={14}>Clique para visualizar</Label>
                            </Column>
                        </Row>
                    </Button>

                    <Button radius={16} bg="#fff" pv={10} ph={10} onPress={() => { navigation.navigate('InstitucionalGaleria') }} >
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-galeria.png')} style={{ width: 81, height: 81, marginRight: 8, borderRadius: 20 }} />
                            <Column>
                                <Title size={16}>GALERIA</Title>
                                <Column style={{ height: 4, }} />
                                <Label size={14}>Clique para visualizar</Label>
                            </Column>
                        </Row>
                    </Button>



                </Column>
                <Column style={{ height: 120 }} />
            </Scroll>
            <TabBar />
        </Main>
    )
}

const imgs = [
    require('@imgs/carrousel-institucional1.jpg'),
    require('@imgs/carrousel-institucional2.jpg'),
    require('@imgs/carrousel-institucional3.jpg'),
    require('@imgs/carrousel-institucional4.jpg'),
]

function Carrossel({ data }) {
    return (
        <Swiper style={{ height: 180, overflow: 'hidden', borderRadius: 20 }} autoplay={true} loop={false}>
            {data?.map((img, index) => (
                <Column key={index} style={{ flex: 1, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginHorizontal: 28, }}>
                    <Image
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        source={img}
                    />
                </Column>
            ))}
        </Swiper>
    );
}
