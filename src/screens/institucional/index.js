import React, { useContext, useState } from 'react';
import { ScrollView, Image, Pressable } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Apple } from 'lucide-react-native';
import Header from '@components/Header';
import Swiper from 'react-native-swiper';
import Input from '@components/Forms/input';

export default function InstitucionalScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <Header title="Institucional" />
                <Column mh={margin.h} >

                    <Carrossel data={imgs} />

                    <Title style={{ marginVertical: 24 }}>Saiba mais</Title>

                    <Pressable style={{ backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#D9D9D9', marginBottom: 8 }}>
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-solicitar-visita.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Solicitar Visita</Title>
                        </Row>
                    </Pressable>

                    <Pressable style={{ backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#D9D9D9', marginBottom: 8 }}>
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-sobre-nos.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Sobre nós</Title>
                        </Row>
                    </Pressable>

                    <Pressable style={{ backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#D9D9D9', marginBottom: 8 }}>
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-realizacoes.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Realizações</Title>
                        </Row>
                    </Pressable>

                    <Pressable style={{ backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#D9D9D9', marginBottom: 8 }}>
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-onde-estamos.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Onde estamos</Title>
                        </Row>
                    </Pressable>

                    <Pressable style={{ backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: '#D9D9D9', marginBottom: 8 }}>
                        <Row style={{ alignItems: 'center' }}>
                            <Image source={require('@imgs/btn-galeria.png')} style={{ width: 81, height: 81, marginRight: 24, borderRadius: 20 }} />
                            <Title>Galeria</Title>
                        </Row>
                    </Pressable>



                </Column>

            </Scroll>
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
        <Swiper style={{ height: 180, overflow: 'hidden', borderRadius: 20 }} autoplay={true}>
            {data?.map((img, index) => (
                <Column key={index} style={{ flex: 1, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        source={{ uri: img }}
                    />
                </Column>
            ))}
        </Swiper>
    );
}