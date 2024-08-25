import React, { useContext, useState } from 'react';
import { ScrollView, Image, Pressable } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Swiper from 'react-native-swiper';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';

export default function InstitucionalScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu title="Conheça mais" />
                <Column style={{ height: 12, }} />
                <Carrossel data={imgs} />
                <Column mh={margin.h} mv={30} style={{ rowGap: 24, }}>
                    <Button radius={16} bg="#fff" pv={10} ph={10} onPress={() => { navigation.navigate('InstitucionalVisita') }} >
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-solicitar-visita.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Solicitar Visita</Title>
                        </Row>
                    </Button>

                    <Button radius={16} bg="#fff" pv={10} ph={10} onPress={() => { navigation.navigate('InstitucionalAbout') }} >
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-sobre-nos.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Sobre nós</Title>
                        </Row>
                    </Button>

                    <Button radius={16} bg="#fff" onPress={() => { navigation.navigate('InstitucionalRealizacoes') }}  pv={10} ph={10}>
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-realizacoes.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Realizações</Title>
                        </Row>
                    </Button>

                    <Button radius={16} bg="#fff" pv={10} ph={10} onPress={() => { navigation.navigate('InstitucionalLocal') }} >
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-onde-estamos.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Onde estamos</Title>
                        </Row>
                    </Button>

                    <Button radius={16} bg="#fff" pv={10} ph={10} onPress={() => { navigation.navigate('InstitucionalGaleria') }} >
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-galeria.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Galeria</Title>
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
    'https://caninablog.wordpress.com/wp-content/uploads/2013/10/dia-das-bruxas-pet_escola_075-1.jpg',
    'https://www.decao.com.br/adestramento-de-cao/imagens/daycare-para-caes-de-raca.jpg',
    'https://www.decao.com.br/adestramento-de-cao/imagens/quanto-custa-escola-para-caes.jpg',
]

function Carrossel({ data }) {
    return (
        <Swiper style={{ height: 180, overflow: 'hidden', borderRadius: 20 }} autoplay={true} loop={false}>
            {data?.map((img, index) => (
                <Column key={index} style={{ flex: 1, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginHorizontal: 28, }}>
                    <Image
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        source={{ uri: img }}
                    />
                </Column>
            ))}
        </Swiper>
    );
}
