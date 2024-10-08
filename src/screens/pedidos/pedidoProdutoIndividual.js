import React, { useState } from 'react';
import { Image, } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, } from '@theme/global';


import Header from '@components/Header';

import TopMenu from '@components/Header/topmenu';
import { FlatList } from 'react-native-gesture-handler';
import StepsPedido from './stepsPedido';
import StepsRastreio from './stepsRastreio';

export default function PedidoProdutoIndividualScreen({ navigation, }) {

    const { color, font, margin } = useTheme();


    
    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>

                <TopMenu search={false} back={false} />

                <Header title="Pedido" />

                <StepsPedido mv={0} />

                <Column mh={margin.h} marginTop={-20} >
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Item item={item} />}
                    />


                </Column>

                <Column mh={margin.h} >
                    <Button style={{ width: '100%', backgroundColor: color.pr.pr1, padding: 15 }}><Label style={{ color: color.light, textAlign: 'center' }}>Ir para cesta</Label></Button>

                </Column>
                <Column mh={margin.h} mv={margin.v}>
                    <Button style={{ width: '100%', backgroundColor: '#D9D9D9', padding: 15 }}><Label style={{ color: color.title, textAlign: 'center' }}>Finalizar pagamento</Label></Button>
                </Column>
            </Scroll>
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
                        source={{ uri: 'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid' }}
                        style={{ width: 62, height: 80, borderRadius: 12 }} />
                    <Column mh={12} >
                        <Title style={{ fontSize: 14, color: '#434343', fontWeight: 700, marginBottom: 3 }}>{name}</Title>
                        <Label style={{ fontSize: 10, color: '#858585', fontWeight: 200, marginBottom: 8 }}>Pedido #987654323456</Label>
                        <Label style={{ fontSize: 14, color: '#858585', fontWeight: 600 }}>R$300,00</Label>
                    </Column>
                </Row>
                <Column style={{ backgroundColor: color.light, borderRadius: 8 }}>
                    <Title style={{ fontSize: 10, paddingHorizontal: 8, color: '#000', fontWeight: 500, TitleAlign: 'center' }}>
                        Cancelar
                    </Title>
                </Column>

            </Row>

            <Row style={{ justifyContent: 'flex-end', alignItems: 'center', marginTop: -28 }} >
                <Title style={{ fontSize: 12, color: '#858585', fontWeight: 500 }}>1 item: R$150,00</Title>
            </Row>

            <Column style={{ marginTop: 24 }}>
                <Label size={14} marginBottom={6}>Data da compra: 12/06/2024 as 14:23:00</Label>
                <Label size={14} marginBottom={6}>Previsão de entrega: 14/06/2024</Label>
                <Label size={14} marginBottom={6}>Pagamento: Crédito 3x</Label>
            </Column>

            <Column style={{ marginTop: 12 }}>
                <Title style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 6 }} marginBottom={6}>Data da compra: 12/06/2024 as 14:23:00</Title>
                <Label size={14} marginBottom={6}>Tutor: Maria de Oliveira</Label>
                <Label size={14} marginBottom={6}>Endereço: Retirada em loja frísica xxxxxxxxxxxxxxxx
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Label>

            </Column>

            <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Column style={{ marginTop: 12, }}>
                    <Title style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 6 }} marginBottom={6}>Informações do pedido</Title>
                    <Label size={14} marginBottom={6}>Número: #987654323456</Label>
                    <Label size={14} marginBottom={6}>Previsão de entrega: 14/06/2024</Label>
                    <Label size={14} marginBottom={6}>Pagamento: 3 parcelas de R$50,00 cada</Label>
                </Column>
                <Button style={{ position: 'absolute', top: 22, right: -10 }}>
                    <Title style={{ fontSize: 12, color: '#91A6C4', fontWeight: 'bold' }}>Copiar</Title>
                </Button>
            </Row>


            <Column style={{ marginTop: 18, }}>
                <Title style={{ fontWeight: 'bold', fontSize: 15 }}>Informações de rastreio</Title>

                <StepsRastreio />

            </Column>

        </Column>
    )
}







const data = [
    {
        name: 'Nome do Produto',
        image: 'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid',
        id: '987654323456',
        price: 'R$150,00',
        date: '12/06/2024 as 14:23:00',
        status: 'Entregue',
        time: '14/06/2024',
        payment: 'Crédito 3x',
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
