import React, { useState, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, LabelBT, U, SCREEN_HEIGHT, Image } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import CheckBox from '@components/Forms/checkbox';
import TextArea from '@components/Forms/textarea';
import Modal from '@components/Modal/index';
import Payment from '@components/Payments';
import Calendario from '@components/Calendar';

export default function HotelRegisterScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const [terms, setterms] = useState(true);
    const [day, setday] = useState([]);
    const [desc, setdesc] = useState();
    const [value, setvalue] = useState();
    const [inclusos, setinclusos] = useState([

        {
            name: 'Passeio',
            label: 'Segunda feira',
        },

        {
            name: 'Brincadeiras',
            label: 'Dia 12/06/2024',
        },
        {
            name: 'Alimentação',
            label: 'Horário: 07:00 à 19:00',
        },
        {
            name: 'Adestrador',
            label: '',
        },
    ]);

    const item = {
        dias: day,
        desc: desc,
        value: value,
        incluso: inclusos,
    }

    const handlePay = () => {
        if (!terms || !day.length === 0) return;
        else {
            console.log(day.length)
            navigation.navigate('HotelPayments', { item: item });    
        }
    }

    return (
        <Main>
            <Scroll>
                <Column>
                    <TopMenu search={false} cart={false} />
                    <Column style={{ height: 20, }}></Column>
                    <Title align="center" size={24}>Reservar Hotel</Title>
                    <Column mh={margin.h} mv={12}>
                        <Title size={17} font={font.medium}>Selecione qual data você deseja: *</Title>
                        <Column style={{ height: 6, }}></Column>
                        
                        <Calendario day={day} setday={setday} disabled={false}/>

                        <Column style={{ marginVertical: 12, }}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, }}>
                                <Label>Baixa temporada</Label>
                                <Label>Diária: R$ 250,00</Label>
                            </Row>
                            <Title>R$ {day.length * 250},00</Title>
                            <Column style={{ height: 12, }} />
                            <Title size={16}>Check In: </Title>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Label>14:00h às 20:00h</Label>
                                <Label align="right">Segunda-feira e{'\n'}Terça-feira</Label>
                            </Row>
                            <Column style={{ height: 12, }} />
                            <Title size={16}>Check Out: </Title>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Label>07:00h às 12:00h</Label>
                                <Label align="right">Dias 12/12/2024 e{'\n'}13/12/2024</Label>
                            </Row>


                        </Column>

                        <Column style={{ height: 12, }}></Column>
                        <Title size={17} font={font.medium}>Alguma observação?</Title>
                        <Column style={{ height: 12, }}></Column>
                        <TextArea value={desc} setValue={setdesc} label="Observações" />

                        <Button onPress={() => { setterms(!terms) }} pv={1} ph={1} radius={2} mv={12}>
                            <Row style={{ columnGap: 12,  }}>
                                <CheckBox status={terms} setstatus={() => { setterms(!terms) }} />
                                <Label>Li e estou ciente das normas do{'\n'}estabelecimento.</Label>
                            </Row>
                        </Button>
                        <Button onPress={handlePay} bg={color.sc.sc3} style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                            <LabelBT color="#fff">Continuar</LabelBT>
                        </Button>
                    </Column>

                    <Column style={{ height: 70, }}></Column>
                </Column>
            </Scroll>
        </Main>
    )
}

