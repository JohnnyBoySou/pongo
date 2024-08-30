import React, { useState, useRef } from 'react';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT, useTheme, Loader } from '@theme/global';
import Header from '@components/Header';
import Input from '@components/Forms/input';
import CalendarioHorizontal from '@components/Calendar/horizontal';
import Modal from '@components/Modal';
import { ScrollView, } from 'react-native-gesture-handler';
import { Check } from 'lucide-react-native';
import TabBar from '@components/TabBar';
import TopMenu from '@components/Header/topmenu';
import { registerVisita } from '@api/request/institucional';
import Success from '@components/Forms/success';
import Error from '@components/Forms/error';

export default function InstitucionalVisitaScreen({ }) {

    const { color, font, margin } = useTheme();

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('');
    const timerRef = useRef();

    const [success, setsuccess] = useState();
    const [error, seterror] = useState();
    const [day, setday] = useState();

    const [minutos, setminutos] = useState();
    const [hora, sethora] = useState();
    const [loading, setloading] = useState();

    const handleRegister = async () => {
        setloading(true)
        try {
            const res = await registerVisita(day, hora, tel, name, type)
            setsuccess('Solicitação de visita recebida com sucesso. Faremos a confirmação em breve via WhatsApp.')
        } catch (err) {
            seterror(err.message)
        } finally {
            setTimeout(() => {
                setloading(false)
            }, 1000);
        }
    }


    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu back={false} search={false} />
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

                    <Column style={{ marginTop: 30, }}>
                        <Title>Escolha qual deseja visitar:</Title>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 16, }} >
                            <Button bg={type === 'Hotel' ? '#918C8B' : '#ffffff' + 60} style={{ width: '48%' }} radius={12} onPress={() => { settype('Hotel') }} >
                                <LabelBT align="center" size={15} color={type === 'Hotel' ? "#fff" : '#918C8B'}>PONGO</LabelBT>
                            </Button>
                            <Button bg={type === 'Villa Pongo' ? '#918C8B' : '#ffffff' + 60} style={{ width: '48%' }} radius={12} onPress={() => { settype('Villa Pongo') }}  >
                                <LabelBT align="center" size={15} color={type === 'Villa Pongo' ? "#fff" : '#918C8B'}>VILLA PONGO</LabelBT>
                            </Button>
                        </Row>
                    </Column>

                </Column>

                <Column mh={margin.h} mv={12}>
                    <Title>Qual dia da visita:</Title>
                </Column>
                <CalendarioHorizontal setday={setday} day={day} />

                <Column mh={margin.h} mv={30}>
                    <Title>Qual horário da visita:</Title>
                    <Button bg={minutos ? color.primary : '#fff'} mbottom={10} pv={16} mtop={20} onPress={() => { timerRef.current.snapToIndex(1) }} radius={8}>
                        <SubLabel align="center" style={{ textAlign: 'center', color: minutos ? '#fff' : color.title, fontSize: 18, }}>{minutos ? hora + ':' + minutos : 'Selecione um horário'}</SubLabel>
                    </Button>
                    {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                    <Button bg={color.sc.sc1} mtop={10} onPress={handleRegister} disabled={loading}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {loading ? <Loader color="#fff" /> :
                                <LabelBT align="center" style={{ color: "#fff" }}>Agendar visita</LabelBT>
                            }
                        </Row>
                    </Button>
                </Column>

                <Column style={{ height: 120 }} />
            </Scroll>
            <TabBar />

            <Modal ref={timerRef} snapPoints={[0.1, 380]}>
                <TimePicker sethora={sethora} setminutos={setminutos} minutos={minutos} hora={hora} timerRef={timerRef} />
            </Modal>
        </Main>
    )
}


const TimePicker = ({ sethora, setminutos, minutos, hora, timerRef }) => {

    const horas = ['11', '12', '13', '14', '15', '16']
    const mins = ['00', '10', '20', '30', '40', '50',]

    const { color } = useTheme()
    return (
        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
            <ScrollView style={{ height: 260, marginHorizontal: 30, }} showsVerticalScrollIndicator={false}>
                {horas?.map((h, index) => (
                    <Button ph={20} pv={10} radius={100} onPress={() => { sethora(h) }} bg={hora == h ? color.primary : 'transparent'} key={index}>
                        <Label size={42} color={hora == h ? "#fff" : color.title} style={{ textAlign: 'center', lineHeight: 50, }}>{h}</Label>
                    </Button>
                ))}
            </ScrollView>
            <Column>
                <Title style={{ justifyContent: 'center', alignItems: 'center', fontSize: 100, lineHeight: 100, }}>:</Title>
                {minutos && <Button bg={color.primary} ph={8} pv={8} onPress={() => {timerRef.current.snapToIndex(0) }} >
                    <Check size={30} color="#fff" />
                </Button>}
            </Column>
            <ScrollView style={{ height: 260, marginHorizontal: 30, }} showsVerticalScrollIndicator={false}>
                {mins?.map((h, index) => (
                    <Button ph={20} pv={10} radius={100} onPress={() => setminutos(h)} bg={minutos == h ? color.primary : 'transparent'} key={index}>
                        <Label size={42} color={minutos == h ? "#fff" : color.title} style={{ textAlign: 'center', lineHeight: 50, }}>{h}</Label>
                    </Button>
                ))}
            </ScrollView>

        </Row>

    )
}