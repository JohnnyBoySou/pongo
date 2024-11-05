import React from 'react';
import { Image } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Button, LabelBT } from '@theme/global';

import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import { MoveRight } from 'lucide-react-native';
import PlanosList from '@components/Planos';
import TabBar from '@components/TabBar';
import CarrosselHotel from './CarrosselHotel';

export default function HotelScreen({ navigation}) {

    const { color, font, margin } = useTheme();

    const handleRegister = (item) => {
        navigation.navigate('HotelRegister', { item: item })
    }


    const details = [
        { label: 'Cama Steel King-Size', },
        { label: 'Banheiro com tablado e tapete higiênico individual', },
        { label: 'Máximo de 5 cães por quarto', },
        { label: 'Tamanho: a partir de 323 ft2 / 30 m2', },
        { label: 'TV LCD com Disney+ Plus', },
        { label: 'Ar Condicionado', },
        { label: 'Lençol e fronha 400 fios', },
        { label: 'Mini bar com água, frutas e petiscos 100% naturais', },
        { label: 'Atendimento veterinário 24 horas ', },
        { label: 'Café da manhã incluso.', },
    ]

    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} back={false} />

                <Header title="HOTEL VILLA PONGO" />

                <Column mh={margin.h}>

                    <Image source={require('@imgs/img-escola-banner1.png')} style={{ width: 304, height: 167, marginVertical: 24 }} />
                    <Title align="center" style={{ paddingVertical: 6, }}>Aconchegante e impecável, {'\n'}nossos quartos são únicos.</Title>
                    <Label size={14} align="left" style={{ paddingVertical: 6 }}>Sentir-se em casa.</Label>
                    <Label size={14} align="left" style={{ paddingVertical: 6 }}>Ao acordar, abrir a janela, sentir a brisa do Parque Ibirapuera. {'\n'} Seu pet irá se hospedar em um dos bairros mais nobres e seguros de São Paulo. </Label>
                    <Label size={14} align="left" style={{ paddingVertical: 6 }}>Aconchegante e impecável, nossos quartos são únicos. Sofisticados ambientes, decorados com camas da PONGO feitas em ferro e com colchões confortáveis em tecidos nobres, tem luz indireta, televisão, ar condicionado e teto sob nuvens! </Label>
                    <Label size={14} align="left" style={{ paddingVertical: 6 }}>Durante o dia seu mascote participará de atividades, passeios no parque e piscina.  {'\n'} Ele será recepcionado com muito amor e cuidado e durante toda a sua estadia na Villa PONGO ele será supervisionado por monitores e veterinários. </Label>
                    <Button onPress={handleRegister} style={{ width: '100%', backgroundColor: color.pr.pr2, marginTop: 12 }}>
                        <LabelBT style={{ textAlign: 'center', color: color.title }}>Reservar Hotel</LabelBT>
                    </Button>
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ paddingVertical: 6, marginVertical: 12 }}>Planos</Title>
                </Column>
                <PlanosList destino={handleRegister} />
                    
                <Column mh={margin.h} mv={24}>
                    <Title style={{ paddingVertical: 6, }}>Detalhes e comodidades</Title>

                    {details?.map((item, index) => (
                        <Row pv={6} style={{ alignItems: 'center', marginLeft: 4, }}>
                            <MoveRight size={20} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 14 }}>{item?.label}</Label>
                        </Row>
                    ))}

                    <Column style={{ paddingVertical: 20 }}>
                        <Title align="left" style={{ paddingVertical: 6, }}>Opções de reserva:</Title>

                        <Label size={14} align="left" style={{ paddingVertical: 6 }}>
                            Baixa Temporada (Fev. Mar. Abr. Maio. Jun. Ago. Set. Out.) | Valor Diária R$ 250
                        </Label>
                        <Label size={14} align="left" style={{ paddingVertical: 6 }}>Alta temporada (Feriados, Jan. Jul. Nov. Dez.) | Valor Diária R$ 320</Label>
                    </Column>


                </Column>
                    <CarrosselHotel />

                <Column style={{ backgroundColor: '#918C8B', marginTop: 30, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <Column mh={margin.h} mv={margin.v} >
                        <Title style={{ color: '#fff', textAlign: 'center', marginTop: 20, marginBottom: 18 }}>Normas</Title>

                        <Label style={{ color: '#fff', fontSize: 14, marginVertical: 12 }}>Para maior segurança do seu Pet, dos amigos dele e de nossos profissionais, seguiremos as exigências:</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Triagem:</Label>

                        <Row alignItems='center' >
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, lineHeight: 16, color: '#ffffff' }}>Apresentação de carteira de vacinação</Label>
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

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Controle contra pulgas e carrapatos.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Obrigatório atestado médico veterinário.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginTop: 12 }}>Respeitar os horários de Check In e Check Out</Label>
                        <Label style={{ color: '#fff', fontSize: 11, marginTop: 6 }}>(Após o horário de Check Out, haverá uma tolerância de 15 minutos, excedido esse tempo será cobrado Late Check Out, no valor da diária contratada)</Label>

                        <Column style={{ height: 120 }} />
                        { /* <Button style={{ backgroundColor: '#fff', marginVertical: 32 }}>
                            <Text style={{ fontSize: 12, color: '#434343', textAlign: 'center', fontWeight: 400 }}>Cadastrar pré-matrícula</Text>
                        </Button> */ }
                    </Column>




                </Column>

            </Scroll>
            <TabBar />
        </Main>
    );
}