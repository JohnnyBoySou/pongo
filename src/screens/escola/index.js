import React, { useState } from 'react';
import { Pressable, TextInput, ScrollView, Image, FlatList, View, Text } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT, useTheme, } from '@theme/global';

import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';


import { MoveRight } from 'lucide-react-native';

import Input from '@components/Forms/input';
import { Card } from 'react-native-paper';
import CarrosselTopo from './CarrosselTopo';

import imgBanner from './assets/img/img-escola-banner.png';
import extensaoDaSuaCasa from './assets/img/extensao-da-sua-casa.png'
import atividades from './assets/img/atividades.png'




import PlanosList from '@components/Planos';
import CarrosselRotinaEscola from './CarrosselRotinaEscola';
import ListaRotinaEscola from './ListaRotinaEscola';
import { useNavigation } from '@react-navigation/native';




export default function EscolaPongoScreen() {
    const navigation = useNavigation();
    const { color, font, margin } = useTheme();

    const handleRegister = (item) => {
        navigation.navigate('SchoolRegister', { item: item })
    }

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
                <PlanosList destino={handleRegister} />


                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginTop: 12, textAlign: 'center' }}>Rotina na escola</Title>
                    <Label style={{ fontSize: 12, color: '#979797', textAlign: 'center' }}>Integral 7:00 ás 19:00</Label>

                    <Column mv={margin.v}>
                        <CarrosselRotinaEscola />
                    </Column>
                </Column>

                <ListaRotinaEscola />

                <Row mh={margin.h} mv={margin.v} alignItems='center'>
                    <Image source={atividades} style={{ width: 198, height: 264 }} />

                    <Column>
                        <Title style={{ fontSize: 18, fontWeight: 700, color: '#434343', marginVertical: 12 }}>Atividades</Title>
                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>SEGUNDAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Fisioterapia</Label>
                            </Row>
                        </View>

                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>TERÇAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Agility</Label>
                            </Row>
                        </View>

                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>QUARTAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Piquenipe no parque</Label>
                            </Row>
                        </View>

                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>QUINTAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Agility</Label>
                            </Row>
                        </View>

                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>SEXTAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Piscina</Label>
                            </Row>
                        </View>
                    </Column>
                </Row>

                <View style={{ backgroundColor: '#918C8B', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <Column mh={margin.h} mv={margin.v} >
                        <Title style={{ color: '#fff', textAlign: 'center', marginTop: 33, marginBottom: 18 }}>Normas</Title>

                        <Label style={{ color: '#fff', fontSize: 14, marginVertical: 12 }}>Para maior segurança do seu Pet, dos amigos dele e de nossos profissionais, seguiremos as exigências:</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Triagem de matrícula:</Label>

                        <Row alignItems='center'>
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, color: '#ffffff' }}>Apresentação de carteira de vacinação</Label>
                        </Row>

                        <Row alignItems='center'>
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, color: '#ffffff' }}>Triagem Veterinária + Exame coproparasitológico</Label>
                        </Row>

                        <Row alignItems='center'>
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, color: '#ffffff' }}>Triagem Comportamental</Label>
                        </Row>

                        <Row alignItems='center' style={{ marginBottom: 12 }}>
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, color: '#ffffff' }}> Adaptação por período pré determinado (de 2 a 6 horas)</Label>
                        </Row>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Machos acima de 12 meses devem estar castrados.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Fêmeas não podem estar no cio.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Uso obrigatório do uniforme.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Controle contra pulgas e carrapatos.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginTop: 12 }}>Respeitar os horários de entrada e saída.</Label>
                        <Label style={{ color: '#fff', fontSize: 11, marginTop: 6 }}>(Horário de entrada permitido até as 9:00am. Após o horário de saída, haverá uma tolerância de 15 minutos, excedido esse tempo, o aluno dormirá no Hotel sendo acrescentado a PERNOITE).</Label>


                        <Button style={{ backgroundColor: '#fff', marginVertical: 32 }}>
                            <Text style={{ fontSize: 12, color: '#434343', textAlign: 'center', fontWeight: 400 }}>Cadastrar pré-matrícula</Text>
                        </Button>
                    </Column>



                </View>

            </Scroll>
        </Main>
    );
}