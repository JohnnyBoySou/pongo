import React, { useState } from 'react';
import { Pressable, TextInput, ScrollView, Image, FlatList } from 'react-native';
import { Main, View, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT, useTheme, } from '@theme/global';

import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';


import { MoveRight } from 'lucide-react-native';

import Input from '@components/Forms/input';
import { Card } from 'react-native-paper';
import CarrosselTopo from './CarrosselTopo';

import imgBanner from './assets/img/img-escola-banner.png';
import extensaoDaSuaCasa from './assets/img/extensao-da-sua-casa.png'





export default function EscolaPongoScreen() {

    const { color, font, margin } = useTheme();

    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} />

                <Header title="Escola Pongo" />

                <Column mh={margin.h}>
                    <CarrosselTopo />

                    <Image source={imgBanner} style={{ width: '100%', height: 223, marginVertical: 24 }} />

                    <Label style={{ textAlign: 'center', color: '#918C8B', fontStyle: 'italic', fontSize: 18, paddingVertical: 6 }}>Estimule a construção de vínculos, conecte-os com a natureza e mergulhe em experiências multissensoriais.</Label>

                    <Button style={{ width: '100%', backgroundColor: color.pr.pr2, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: color.title }}>Cadastrar pré-matrícula</Label>
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
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginVertical: 12, textAlign: 'center' }}>Planos Oferecidos</Title>


                </Column>

            </Scroll>
        </Main>
    );
}