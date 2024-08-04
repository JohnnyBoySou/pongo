import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Row, Title, Button, useTheme, Label, } from '@theme/global';
import { MotiImage } from 'moti';
import TopMenu from '@components/Header/topmenu';
import CheckBox from '@components/Forms/checkbox';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';

export default function HomeScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    return (
        <Main >
            <Scroll>
                <TopMenu search={false} />
                <Column ph={margin.h}>

                    <Title>Serviços</Title>

                    <FlatList
                        data={services}
                        renderItem={({item}) => <Card item={item} />}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />

                    <Title>Produtos</Title>

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
        img: 'https://i.pinimg.com/564x/1d/0e/a6/1d0ea6596b14da2fb98656529166f716.jpg',
        time: '10:00',
    },
    {
        id: 2, 
        title: 'Hotel',
        date: '20/05/2025',
        status: 'Aguardando',
        price: 200,
        value: 1,
        img: 'https://i.pinimg.com/564x/af/0d/40/af0d4035cf4ca76292e7b9f8eb9a728c.jpg',
        time: '10:00',
    },
    {
        id: 3, 
        title: 'Veterinário',
        date: '20/05/2025',
        status: 'Aguardando',
        price: 200,
        value: 1,
        img: 'https://i.pinimg.com/564x/93/19/7e/93197e00e8ce56689b7df5e0faa80a4f.jpg',
        time: '10:00',
    },
]

const Card = ({item}) => {
    const { color, font, margin, } = useTheme();
    const { title, date, status, price, value, img, time } = item   
    const [isSelect, setisSelect] = useState(false);
    return (
        <Pressable onLongPress={() => setisSelect(!isSelect)} style={{ borderWidth: 2, borderColor: isSelect ? '#00A3FF50' : '#30303020', backgroundColor: isSelect ? '#00A3FF20' : '#FFF', marginVertical: 8, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, }}>
            <Row style={{  alignItems: 'center',  }}>
                <CheckBox status={isSelect} setstatus={setisSelect}/>
                <MotiImage  source={{uri: img}} style={{ width: 72, height: 82, objectFit: 'cover', borderRadius: 6, marginHorizontal: 12,}}/>
                <Column>
                    <Title size={16}>{title}</Title>
                    <Label size={14}>Data: {date}</Label>
                    <Label size={14} style={{ marginTop: -4, }}>Horário: {time}</Label>
                    <Title size={16}>R$ {price},00</Title>
                </Column>
            </Row>
        </Pressable>
    )
}