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
import detalhes from './assets/img/detalhes.png'




import PlanosList from '@components/Planos';
import CarrosselRotinaEscola from './CarrosselRotinaEscola';
import ListaRotinaEscola from './ListaRotinaEscola';




export default function HotelScreen() {

    const { color, font, margin } = useTheme();

    const handleRegister = (item) => {
        navigation.navigate('SchoolRegister', { item: item })
    }

    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} />

                <Header title="Hotel" />

                <Column mh={margin.h}>

                    <Image source={imgBanner} style={{ width: 304, height: 167, marginVertical: 24 }} />

                    <Label style={{ textAlign: 'center', color: '#918C8B', fontSize: 19, fontWeight: 700, paddingVertical: 6, paddingHorizontal: 26 }}>Aconchegante e impecável, nossos quartos são únicos.</Label>
                    <Label style={{ textAlign: 'center', color: '#918C8B', fontSize: 15, paddingVertical: 6, paddingHorizontal: 22 }}>Seu pet irá se hospedar em um dos bairros
                        mais nobres e seguros de São Paulo.</Label>

                    <Button style={{ width: '100%', backgroundColor: color.pr.pr2, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: color.title }}>Reservar Hotel</Label>
                    </Button>
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginVertical: 12 }}>Planos</Title>

                    <PlanosList destino={handleRegister} />
                </Column>


                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginVertical: 12 }}>Detalhes e comodidades</Title>


                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Cama Steel King-Size</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Banheiro com tablado e tapete higiênico individual</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Máximo de 5 cães por quarto</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Tamanho: a partir de 323 ft2 / 30 m2</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>TV LCD com Disney+ Plus</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Ar Condicionado</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Lençol e fronha 400 fios</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Mini bar com água, frutas e petiscos 100%naturais</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Atendimento veterinário 24 horas</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Café da manhã incluso.</Label>
                    </Row>

                    <Image source={detalhes} style={{ width: '100%', height: 200, borderRadius: 20, marginVertical: 20 }} />

                </Column>


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

                        <Label style={{ color: '#fff', fontSize: 13, marginTop: 12 }}>Respeitar os horários de Check In e Check Out</Label>
                        <Label style={{ color: '#fff', fontSize: 11, marginTop: 6 }}>(Após o horário de Check Out, haverá uma tolerância de 15 minutos, excedido esse tempo será cobrado Late Check Out, no valor da diária contratada)</Label>


                        <Button style={{ backgroundColor: '#fff', marginVertical: 32 }}>
                            <Text style={{ fontSize: 12, color: '#434343', textAlign: 'center', fontWeight: 400 }}>Cadastrar pré-matrícula</Text>
                        </Button>
                    </Column>



                </View>

            </Scroll>
        </Main>
    );
}