import React, { useState } from 'react';
import { Pressable, TextInput, ScrollView, Image, } from 'react-native';
import { Main, View, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT, useTheme, } from '@theme/global';

import { ArrowLeft } from 'lucide-react-native';
import { Search } from 'lucide-react-native';

import Header from '@components/Header';

import TopMenu from '@components/Header/topmenu';
import { FlatList } from 'react-native-gesture-handler';
import TabBar from '@components/TabBar';

export default function ServiceSingleScreen({ navigation, }) {

    const { color, font, margin } = useTheme();

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    const [query, setquery] = useState();
    const [loading, setloading] = useState(false);
    const [focus, setfocus] = useState(false);
    const handleSearch = () => {
    }


    const types = ['Processando', 'Concluído', 'Cancelado', 'Reembolso'];
    const [filter, setfilter] = useState('Processando');

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>

                <TopMenu search={false} back={false} />

                <Header title="Hotel" />

                <Column mh={margin.h} marginTop={30} >
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Item item={item} />}
                    />
                </Column>

                <Column mh={margin.h} mv={120}>
                    <Button style={{ width: '100%', backgroundColor: color.sc.sc3,}}><LabelBT style={{ color: color.light, textAlign: 'center' }}>Diário do pet</LabelBT></Button>
                </Column>
            </Scroll>
            <TabBar />
        </Main >
    )
}


const Item = ({ item }) => {
    const { color, font, margin } = useTheme()
    const { name } = item
    return (
        <Column style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <Row style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Row>
                    <Image
                        source={{ uri: 'https://thoseoldpets.co.uk/wp-content/uploads/2022/08/img_1899-2-1.png' }}
                        style={{ width: 62, height: 80, borderRadius: 12, borderWidth: 0.8, borderColor: '#ecebeb', objectFit: 'cover' }} />
                    <Column mh={12} >
                        <Label style={{ fontSize: 14, color: '#434343', fontWeight: 700, marginBottom: 3 }}>{name}</Label>
                        <Label style={{ fontSize: 10, color: '#858585', fontWeight: 200, marginBottom: 8 }}>Pedido #987654323456</Label>
                        <Label style={{ fontSize: 14, color: '#858585', fontWeight: 600 }}>R$150,00</Label>
                    </Column>
                </Row>
                <Column style={{ backgroundColor: color.light, borderRadius: 8 }}>
                    <Title style={{ fontSize: 10, paddingHorizontal: 8, color: '#000', fontWeight: 500, TitleAlign: 'center' }}>
                        {item.status}
                    </Title>
                </Column>

            </Row>


            <Column style={{ marginTop: 24 }}>
                <Label size={14} marginBottom={6}>Check-in: 12/06/2024 as 14:23</Label>
                <Label size={14} marginBottom={6}>Check-out: 14/06/2024</Label>
                <Label size={14} marginBottom={6}>Colaborador responsável: {item.colaborador}</Label>
            </Column>


            <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Column style={{ marginTop: 12, }}>
                    <Title style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 6 }} marginBottom={6}>Informações do pedido</Title>
                    <Label style={{ fontSize: 14 }} marginBottom={6}>Status do pagamento: {item.status_pagemnto}</Label>
                    <Label size={14} marginBottom={6}>Data da transação: {item.data_transacao}</Label>
                    <Label size={14} marginBottom={6}>Número: #987654323456</Label>
                    <Label size={14} marginBottom={6}>Forma de pagamento: Cartão de Crédito</Label>
                </Column>
            </Row>

        </Column>
    )
}

const data = [
    {
        name: 'Nome do pet',
        image: 'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid', //puxar icone
        id: '987654323456',
        price: 'R$150,00',
        date: '12/06/2024 as 14:23:00',
        status: 'Entregue',
        time: '14/06/2024',
        payment: 'Crédito 3x',
        status: 'Em andamento',
        status_pagemnto: 'Pago',
        colaborador: 'Jorge',
        data_transacao: '12/06/2024 às 14:00',
    },
    /*{
        name: 'Nome do Produto',
        image: 'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid',
        id: '987654323456',
        price: 'R$150,00',
        date: '12/06/2024 as 14:23:00',
        status: 'Entregue',
        time: '14/06/2024',
        payment: 'Crédito 3x',
    },*/
]
