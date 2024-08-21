import React, { useContext, useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Apple } from 'lucide-react-native';
import Header from '@components/Header';
import Input from '@components/Forms/input';
import Calendario from '@components/Calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalendarioHorizontal from '@components/Calendar/horizontal';
import Modal from '@components/Modal';

export default function InstitucionalVisitaScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('');
    const timerRef = React.useRef();

    const [day, setday] = useState();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showMode = () => {
        setShow(true);
    };


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

                            <Button bg={type === 'Pongo' ? '#918C8B' : '#ffffff' + 60} style={{ width: '48%' }} radius={12} onPress={() => { settype('Pongo') }} >
                                <LabelBT align="center" color={type === 'Pongo' ? "#fff" : '#918C8B'}>Pongo</LabelBT>
                            </Button>
                            <Button bg={type === 'Villa Pongo' ? '#918C8B' : '#ffffff' + 60} style={{ width: '48%' }} radius={12} onPress={() => { settype('Villa Pongo') }}  >
                                <LabelBT align="center" color={type === 'Villa Pongo' ? "#fff" : '#918C8B'}>Villa Pongo</LabelBT>
                            </Button>
                        </Row>
                    </Column>

                </Column>
                <CalendarioHorizontal setday={setday} day={day} />
                <Column mh={margin.h} mv={12}>
                    <Button bg={'#FFFFFF'} mtop={12} onPress={showMode} >
                        <Text align="center" style={{ textAlign: 'center', fontWeight: '700', color: "#434343" }}>Selecione um horário: {date.toLocaleTimeString().slice(0, -3)}</Text>
                    </Button>

                    <Button bg={color.pr.pr1} mtop={12}>
                        <Text align="center" style={{ textAlign: 'center', fontWeight: '700', color: "#fff" }}>Agendar visita</Text>
                    </Button>
                </Column>

            </Scroll>
            {show && <DateTimePicker
                    value={date}
                    mode='time'
                    is24Hour={true}
                    onChange={onChange}
                />}
        </Main>
    )
}

/* <Modal ref={timerRef} snapPoints={[0.1, 200]}>
                {show && <DateTimePicker
                    value={date}
                    mode='time'
                    is24Hour={true}
                    onChange={onChange}
                />}
            </Modal> */