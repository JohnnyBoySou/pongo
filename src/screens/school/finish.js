import React, { useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, SCREEN_HEIGHT, LabelBT } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import { CheckCircle } from 'lucide-react-native';
import Modal from '@components/Modal/index';

import Animated, { FadeInUp, SlideInLeft, SlideOutLeft } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function SchoolFinishScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const modalPayment = useRef()
    const handlePay = () => {
        modalPayment.current.expand()
    }
    return (
        <Main>
            <Scroll>
                <Column>
                    <TopMenu search={false} cart={false} />
                    <Column style={{ height: 20, }}></Column>
                    <Title align="center" size={24}>Cadastrar na escola</Title>
                    <Column style={{ height: 20, }}></Column>
                    <CardPlano item={item} />

                    <Column mh={margin.h} mv={24}>
                        <Title size={18}>Resumo do pedido</Title>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 6, }}>
                            <Label style={{ color: color.title, fontFamily: font.medium, }}>Dia:</Label>
                            <Label>{item?.dia}</Label>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 6, }}>
                            <Label style={{ color: color.title, fontFamily: font.medium, }}>Meses:</Label>
                            <Label>{item?.meses} meses</Label>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 6, }}>
                            <Label style={{ color: color.title, fontFamily: font.medium, }}>Total:</Label>
                            <Label>{item?.total}</Label>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 6, }}>
                            <Label style={{ color: color.title, fontFamily: font.medium, }}>Pagamento:</Label>
                            <Label>{item?.pagamento}</Label>
                        </Row>

                        <Button onPress={handlePay} bg={color.sc.sc3} style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 12, }}>
                            <LabelBT color="#fff">Finalizar compra</LabelBT>
                        </Button>
                    </Column>
                </Column>
            </Scroll>
            <Modal ref={modalPayment} snapPoints={[0.1, SCREEN_HEIGHT]}>
            </Modal>
        </Main>
    )
}

const CardPlano = ({ item, }) => {
    const { color, font, margin } = useTheme();
    const { id, name, date, price, inclusos } = item
    const navigation = useNavigation();
    return (
        <Animated.View entering={FadeInUp} exiting={SlideOutLeft}>
            <Row style={{ marginHorizontal: margin.h, justifyContent: 'center', alignItems: 'center', }}>
                <Column style={{ width: 260, borderWidth: 1, borderColor: id % 2 != 0 ? 'transparent' : color.border, backgroundColor: id % 2 === 0 ? 'transparent' : '#F7F7F7', borderRadius: 18, paddingHorizontal: 20, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20, marginBottom: 8, }}>
                        <Title size={17} width={120}>Plano {name}</Title>
                        <Label size={15}>{price}</Label>
                    </Row>
                    <Label>{date}</Label>
                    <Column style={{ height: 20, }}></Column>
                    <Title size={16}>Inclusos:</Title>
                    <Column style={{ height: 6, }}></Column>
                    {inclusos?.map((item, index) => <Label key={index} size={14} style={{ lineHeight: 20, }}>{item}</Label>)}
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.border, marginTop: 20, marginBottom: 20, }} radius={12}>
                        <Title size={18} align='center' font={font.medium}>Alterar</Title>
                    </Button>
                </Column>
            </Row>
        </Animated.View>

    )
}
const item = {
    id: 1,
    name: 'Ret',
    date: '1 vez na semana',
    price: 'R$ 650,00',
    inclusos: [
        'Uniforme',
        'Pote hermético',
        'Agenda',
        'Desconto de 5% em todos os produtos PONGO.'
    ],
    pagamento: 'Pix',
    total: 'R$ 650,00',
    meses: 2,
    dia: 'Segunda-feira'
}