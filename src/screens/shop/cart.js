import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Row, Title, Button, useTheme, Label, LabelBT } from '@theme/global';
import { MotiImage } from 'moti';
import TopMenu from '@components/Header/topmenu';
import CheckBox from '@components/Forms/checkbox';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';

export default function ShopCartScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    return (
        <Main >
            <Scroll>
                <TopMenu search={false} />
                <Column ph={margin.h} pv={margin.v}>
                    <Column mv={12}>
                        <Title>Serviços</Title>
                    </Column>
                    <FlatList
                        data={services}
                        renderItem={({ item }) => <Card item={item} />}
                        keyExtractor={item => item.id}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        removeClippedSubviews
                        showsVerticalScrollIndicator={false}
                    />
                    <Button onPress={() => { navigation.navigate('ChatList') }} style={{ backgroundColor: '#918C8B', marginTop: 24, }} radius={50} pv={16} ph={1} mh={margin.h}>
                        <Title align="center" color="#fff">Finalizar pedido</Title>
                    </Button>
                </Column>
            </Scroll>
        </Main>
    )
}


const services = [
    {
        id: 1,
        title: 'Banho',
        date: '20/05/2025',
        status: 'Aguardando',
        price: 100,
        value: 1,
        img: require('@imgs/cart1.png'),
        time: '10:00',
    },
    {
        id: 2,
        title: 'Hotel',
        date: '20/05/2025',
        status: 'Aguardando',
        price: 200,
        value: 1,
        img: require('@imgs/cart2.png'),
        time: '10:00',
    },
    {
        id: 3,
        title: 'Veterinário',
        date: '20/05/2025',
        status: 'Aguardando',
        price: 200,
        value: 1,
        img: require('@imgs/cart3.png'),
        time: '10:00',
    },
]

const Card = ({ item }) => {
    const { color, font, margin, } = useTheme();
    const { title, date, status, price, value, img, time } = item
    const [isSelect, setisSelect] = useState(false);
    return (
        <Pressable onLongPress={() => setisSelect(!isSelect)} style={{ backgroundColor: '#FFF', marginVertical: 12, paddingHorizontal: 16, paddingVertical: 18, borderRadius: 12, }}>
            <Row style={{ alignItems: 'center', }}>
                <CheckBox status={isSelect} setstatus={setisSelect} size={22} />
                <MotiImage source={img} style={{ width: 62, height: 72, objectFit: 'contain', borderRadius: 12, marginHorizontal: 12, borderWidth: 1, borderColor: color.border, }} />
                <Column>
                    <Title size={14} style={{ lineHeight: 18, }}>{title}</Title>
                    <Label size={10} style={{ lineHeight: 12, marginTop: 4, }}>Data: {date}</Label>
                    <Label size={10} style={{ lineHeight: 12, marginBottom: 4, }}>Horário: {time}</Label>
                    <LabelBT size={14} style={{ lineHeight: 18, }}>R$ {price},00</LabelBT>
                </Column>
                <Button style={{ position: 'absolute', top: -5, right: -10, }}>
                    <LabelBT color={color.red} size={12}>Excluir</LabelBT>
                </Button>
                <Button style={{ position: 'absolute', bottom: 5, right: 0, backgroundColor: '#ECEBEB', }} pv={4} ph={6} radius={6}>
                    <LabelBT color={color.title} size={10}>Add oberservação</LabelBT>
                </Button>
            </Row>
        </Pressable>
    )
}