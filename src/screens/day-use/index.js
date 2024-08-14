import React, { useState } from 'react';
import { Pressable, TextInput, ScrollView, Image, FlatList, View, Text } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT, useTheme, } from '@theme/global';

import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';

import { MoveRight } from 'lucide-react-native';

import imgBanner from './assets/img/img-escola-banner.png';
import extensaoDaSuaCasa from './assets/img/extensao-da-sua-casa.png'

import CarrosselRotinaEscola from './CarrosselRotinaEscola';
import ListaRotinaEscola from './ListaRotinaEscola';




export default function DayUseScreen() {

    const { color, font, margin } = useTheme();

    const handleRegister = (item) => {
        navigation.navigate('SchoolRegister', { item: item })
    }

    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} />

                <Header title="Day Use" />

                <Column mh={margin.h}>

                    <Image source={imgBanner} style={{ width: '100%', height: 223, marginVertical: 24 }} />

                    <Text style={{ textAlign: 'center', color: '#918C8B', fontSize: 18, paddingVertical: 6, paddingHorizontal: 40, fontWeight: 700, lineHeight: 16 }}>Tenha todos os benefícios da Escola Pongo por um dia!</Text>

                    <Button style={{ width: '100%', backgroundColor: color.pr.pr2, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: color.title }}>Contratar Day Use</Label>
                    </Button>
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginVertical: 12 }}>Conheça a estrutura da Escola Pongo</Title>


                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Atende as normas de segurança, higiene e conforto.
                            Câmera de monitoramento em todos os ambientes.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Ambientes internos com ar condicionado.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Ambientes externos com piscina, solário, área externa, jardim com grama natural e espaço de estimulação equipado com material adequado.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Sala do sono e descanço com camas PONGO
                            individuais, higienizadas diariamente.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Televisão, som ambiente e lareira em dias de frio.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Refeições em ambiente tranquilo com comedouro individual PONGO em acrílico etiquetado com nome.</Label>
                    </Row>



                </Column>

                <Column mv={margin.v} style={{ marginRight: margin.h }}>
                    <Image source={extensaoDaSuaCasa} style={{ width: '100%', height: 180, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginTop: 12, textAlign: 'center' }}>Rotina na escola</Title>
                    <Label style={{ fontSize: 12, color: '#979797', textAlign: 'center' }}>Integral 7:00 ás 19:00</Label>

                    <Column mv={margin.v}>
                        <CarrosselRotinaEscola />
                    </Column>
                </Column>

                <ListaRotinaEscola />

                <Column mh={margin.h} mv={margin.v}>
                    <Button style={{ width: '100%', backgroundColor: color.pr.pr2 }}>
                        <Text style={{ textAlign: 'center', color: color.title }}>Contratar Day Use</Text>
                    </Button>
                </Column>



            </Scroll>
        </Main>
    );
}