import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Apple } from 'lucide-react-native';
import Header from '@components/Header';
import Input from '@components/Forms/input';

export default function InstitucionalScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    return (
        <Main style={{}}>
            <Scroll>
                <Header title="Solicitar visita"/>
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

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', columnGap: 12, marginVertical: 16, }} >
                        <Button bg={type === 'Pongo' ? color.sc.sc3 : color.sc.sc3 + 60} radius={12} onPress={() => { settype('Pongo') }} >
                            <LabelBT align="center" color={type === 'Pongo' ? "#fff" : color.sc.sc3}>Pongo</LabelBT>
                        </Button>
                        <Button bg={type === 'Villa Pongo' ? color.sc.sc1 : color.sc.sc1 + 60} radius={12} onPress={() => { settype('Villa Pongo') }}  >
                            <LabelBT align="center" color={type === 'Villa Pongo' ? "#fff" : color.sc.sc1}>Villa Pongo</LabelBT>
                        </Button>
                    </Row>

                    <Calendar />
                    
                    <Button bg={color.sc.sc3} mtop={12}>
                        <LabelBT color="#fff" align="center">Selecione um horário</LabelBT>
                    </Button>

                    <Button bg={color.sc.sc1} mtop={12}>
                        <LabelBT color="#fff" align="center">Agendar visita</LabelBT>
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