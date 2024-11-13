import React, { useState, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, LabelBT, U, SCREEN_HEIGHT, Image } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import CheckBox from '@components/Forms/checkbox';
import TextArea from '@components/Forms/textarea';
import Modal from '@components/Modal/index';
import Payment from '@components/Payments';


export default function DayUseRegisterScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const [terms, setterms] = useState();
    const [day, setday] = useState([]);
    const [desc, setdesc] = useState();
    const [value, setvalue] = useState(250);
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
        price: day?.length * value,
        inclusos: inclusos,
    }
    const days = ['Segunda-feira | Fisioterapia', 'Terça-feira | Agility', 'Quarta-feira | Piquenipe no parque', 'Quinta-feira | Agility', 'Sexta-feira | Piscina',]
    const handleDays = (item) => {
        if (day.includes(item)) {
            setday(day.filter((i) => i !== item))
        } else {
            setday([...day, item])
        }
    }

    const handlePay = () => {
        navigation.navigate('DayUsePayments', { item: item });
    }
    return (
        <Main>
            <Scroll>
                <Column>
                    <TopMenu search={false} cart={false} />
                    <Column style={{ height: 20, }}></Column>
                    <Title align="center" size={24}>Contratar Day Use</Title>

                    <Column mh={margin.h} mv={12}>
                        <Title size={17} font={font.medium}>Selecione qual dia você deseja: *</Title>
                        <Column style={{ height: 6, }}></Column>
                        {days?.map((item, index) => (
                            <Button onPress={() => { handleDays(item) }} radius={12} pv={6} ph={1}>
                                <Row style={{ columnGap: 8, alignItems: 'center', }}>
                                    <CheckBox status={day.includes(item)} setstatus={() => { handleDays(item) }} />
                                    <Title font={font.medium} size={16}>{item}</Title>
                                </Row>
                            </Button>))}


                        <Column style={{ backgroundColor: '#FFF', borderRadius: 16, marginVertical: 12, paddingVertical: 20, paddingHorizontal: 20, }}>
                            <Title>R$ {day?.length * value},00</Title>
                            <Column style={{ height: 12, }} />
                            <Title size={16}>Incluso:</Title>
                            {inclusos?.map((item, index) => (
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Label style={{ lineHeight: 24, }}>{item?.name} </Label>
                                    <Label>{item?.label}</Label>
                                </Row>))}
                        </Column>

                        <Column style={{ height: 12, }}></Column>
                        <Title size={17} font={font.medium}>Alguma observação?</Title>
                        <Column style={{ height: 12, }}></Column>
                        <TextArea value={desc} setValue={setdesc} label="Observações" />

                        <Button onPress={() => { setterms(!terms) }} pv={1} ph={1} radius={2} mv={12}>
                            <Row style={{ columnGap: 12, }}>
                                <CheckBox status={terms} setstatus={() => { setterms(!terms) }} />
                                <Label>Li e estou ciente das normas do {'\n'}estabelecimento</Label>
                            </Row>
                        </Button>
                        <Button onPress={handlePay} bg={color.sc.sc3} style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                            <LabelBT color="#fff">Continuar</LabelBT>
                        </Button>
                    </Column>

                </Column>
            </Scroll>
          
        </Main>
    )
}

