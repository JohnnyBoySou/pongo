import React, { useContext, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Apple } from 'lucide-react-native';
import Header from '@components/Header';
import Input from '@components/Forms/input';

export default function InstitucionalVisitaScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <Header title="Solicitar visita" />
                <Column mh={margin.h} >
                    <Input
                        label="Nome *"
                        placeholder="Nome"
                        value={name}
                        setValue={setname}
                    />
                    <Column style={{ height: 16, }} />

                    <Input
                        label="Telefone *"
                        placeholder="Telefone"
                        maxLength={16}
                        value={tel}
                        setValue={settel}
                        mask="PHONE"
                    />

                    <Column mv={margin.v}>
                        <Text>Escolha qual deseja visitar:</Text>

                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, }} >

                            <Button bg={type === 'Pongo' ? color.sc.sc3 : '#ffffff' + 60} style={{ width: '48%' }} radius={12} onPress={() => { settype('Pongo') }} >
                                <LabelBT align="center" color={type === 'Pongo' ? "#fff" : color.sc.sc3}>Pongo</LabelBT>
                            </Button>
                            <Button bg={type === 'Villa Pongo' ? color.sc.sc1 : '#ffffff' + 60} style={{ width: '48%' }} radius={12} onPress={() => { settype('Villa Pongo') }}  >
                                <LabelBT align="center" color={type === 'Villa Pongo' ? "#fff" : color.sc.sc1}>Villa Pongo</LabelBT>
                            </Button>
                        </Row>
                    </Column>

                    <Calendar />

                    <Button bg={'#FFFFFF'} mtop={12}>
                        <Text align="center" style={{ textAlign: 'center', fontWeight: '700', color: "#434343" }}>Selecione um horário:</Text>
                    </Button>

                    <Button bg={color.pr.pr1} mtop={12}>
                        <Text align="center" style={{ textAlign: 'center', fontWeight: '700', color: "#fff" }}>Agendar visita</Text>
                    </Button>



                </Column>

            </Scroll>
        </Main>
    )
}

const Calendar = () => {
    return (
        <Column >
            <Title>Calendário</Title>
        </Column>
    )
}