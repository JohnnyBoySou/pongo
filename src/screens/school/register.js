import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, LabelBT, U, SCREEN_HEIGHT, Image } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import PlanosList from '@components/Planos';
import { ScrollView } from 'react-native-gesture-handler';
import { Check, CheckCircle } from 'lucide-react-native';
import CheckBox from '@components/Forms/checkbox';
import TextArea from '@components/Forms/textarea';


export default function SchoolRegisterScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const [plano, setplano] = useState();
    const [month, setmonth] = useState();
    const [day, setday] = useState([]);
    const [desc, setdesc] = useState();
   
    const item = {
        id: 1,
        plano: plano,
        meses: month,
        dias: day,
        desc: desc,
    }

    const handleSelect = (item) => {
        setplano(item)
    }
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira',]
    const handleDays = (item) => {
        if (day.includes(item)) {
            setday(day.filter((i) => i !== item))
        } else {
            setday([...day, item])
        }
    }

    const handlePay = () => {
        if (plano != null && month != null && day.length > 0) {
            navigation.navigate('SchoolPayments', { item: item, destino: 'Plano escolar' })
        } else { return }
    }
    return (
        <Main>
            <Scroll>
                <Column>
                    <TopMenu search={false} cart={false} />
                    <Column style={{ height: 20, }}></Column>
                    <Title align="center" size={24}>Cadastrar na escola</Title>
                    <Row mh={margin.h} mv={12} style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title size={18} font={font.medium}>Selecione o plano: *</Title>
                        {plano && <Button bg={color.sc.sc3+30} radius={4} onPress={() => { setplano(null) }} ph={10} pv={8}><Label color={color.sc.sc3}>Trocar</Label></Button>}
                    </Row>
                    {plano ?
                        <CardPlano item={plano} destino={handleSelect} /> :
                        <PlanosList destino={handleSelect} />}
                    <Column mh={margin.h} mv={12}>
                        <Title size={17} font={font.medium}>Selecione quantos meses você deseja: *</Title>
                    </Column>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 12, marginHorizontal: margin.h, }}>
                        {months?.map((item, index) => (
                            <Button key={index} onPress={() => { setmonth(item) }} style={{ backgroundColor: month === item ? color.sc.sc3 : '#f7f7f7', borderWidth: 1, borderColor: month === item ? color.sc.sc3 : color.border, justifyContent: 'center', alignItems: 'center', }} radius={12}>
                                <Title font={font.bold} size={16} color={month === item ? '#fff' : color.label}>{item} mês</Title>
                            </Button>))}
                        <Column style={{ width: 38, }}></Column>
                    </ScrollView>
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
                        <Column style={{ height: 12, }}></Column>
                        <Title size={17} font={font.medium}>Alguma observação?</Title>
                        <Column style={{ height: 12, }}></Column>
                        <TextArea value={desc} setValue={setdesc} label="Observações" />
                        <Button onPress={handlePay} bg={color.sc.sc3} style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                            <LabelBT color="#fff">Continuar</LabelBT>
                        </Button>
                    </Column>

                </Column>
            </Scroll>
        </Main>
    )
}

const CardPlano = ({ item, destino }) => {
    const { color, font, margin } = useTheme();
    const { name, date, price, inclusos } = item
    return (
            <Row style={{ marginHorizontal: margin.h, justifyContent: 'center', alignItems: 'center', }}>
                <Column style={{ width: 260, backgroundColor: '#F7F7F7', borderRadius: 18, paddingHorizontal: 20, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20, marginBottom: 8, }}>
                        <Title size={17} width={120}>Plano {name}</Title>
                        <Label size={15}>{price}</Label>
                    </Row>
                    <Label>{date}</Label>
                    <Column style={{ height: 20, }}></Column>
                    <Title size={16}>Inclusos:</Title>
                    <Column style={{ height: 6, }}></Column>
                    {inclusos?.map((item, index) => <Label key={index} size={14} style={{ lineHeight: 20, }}>{item}</Label>)}
                    <Button onPress={() => { destino(item) }} style={{ backgroundColor: color.green, marginTop: 20, marginBottom: 20, }} radius={12}>
                        <Row style={{ justifyContent: 'center', columnGap: 12, alignItems: 'center', }}>
                            <CheckCircle size={18} color="#fff" />
                            <Title size={18} align='center' color="#fff" font={font.medium}>Selecionado</Title>
                        </Row>
                    </Button>
                </Column>
            </Row>
    )
}