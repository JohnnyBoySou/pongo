import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function VillaPongoScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    return (
        <Main>
            <Scroll>
                <Column>
                    <TopMenu />
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Column style={{ width: 28, }} />
                        <Row style={{ borderWidth: 1, borderColor: color.border, borderRadius: 16, paddingHorizontal: 20, paddingVertical: 20, justifyContent: 'center', alignItems: 'center', }}>
                            <Column>
                                <Title>Compre na loja</Title>
                                <Label>Lorem ipsum</Label>
                                <Label>Lorem ipsum</Label>
                                <Label>Lorem ipsum</Label>
                            </Column>
                            <Image source={require('@imgs/villa1.png')} style={{ width: 100, height: 100, objectFit: 'contain', marginLeft: 12, }} />
                        </Row>
                        <Row style={{ borderWidth: 1, borderColor: color.border, borderRadius: 16, paddingHorizontal: 20, paddingVertical: 20, marginHorizontal: 12, justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require('@imgs/villa2.png')} style={{ width: 100, height: 100, objectFit: 'contain', marginRight: 12, }} />
                            <Column>
                                <Title>Compre na loja</Title>
                                <Label>Lorem ipsum</Label>
                                <Label>Lorem ipsum</Label>
                                <Label>Lorem ipsum</Label>
                            </Column>
                        </Row>
                    </ScrollView>

                    <Column mh={margin.h} mv={20}>
                        <Title size={18}>Serviços</Title>
                        <FlatList
                            style={{ marginTop: 6, }}
                            data={data}
                            renderItem={({ item }) => <Card item={item} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />

                    </Column>

                </Column>
            </Scroll>
        </Main>
    )
}

const Card = ({ item }) => {
    const { color, font, margin } = useTheme();
    const { name, time, price, img } = item
    return (
        <Button pv={12} ph={12} radius={12} mh={0} mv={6} style={{ borderWidth: 1, borderColor: color.border, }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Row>
                    <Image style={{ width: 46, height: 46, backgroundColor: '#d7d7d7', borderRadius: 8, marginRight: 12, }} />
                    <Column style={{ justifyContent: 'center', }}>
                        <Title size={16}>{name}</Title>
                        <Column style={{ height: 4, }} />
                        <Label size={14}>{time}</Label>
                    </Column>
                </Row>
                <Column>
                    <Label size={14}></Label>
                    <Title size={16}>{price}</Title>
                </Column>
            </Row>
        </Button>
    )
}

const data = [
    {
        name: 'Banho',
        time: 'Tempo de duração',
        price: 'R$ 150,00',
        id: 1,
        img: '',
    },
    {
        name: 'Tosa',
        time: 'Tempo de duração',
        price: 'R$ 150,00',
        id: 2,
        img: '',
    },
    {
        name: 'Hospital veterinário',
        time: 'Tempo de duração',
        price: 'R$ 150,00',
        id: 2,
        img: '',
    },
    {
        name: 'Hotel',
        time: 'Tempo de duração',
        price: 'R$ 150,00',
        id: 2,
        img: '',
    },
    {
        name: 'Day use',
        time: 'Tempo de duração',
        price: 'R$ 150,00',
        id: 2,
        img: '',
    },
    {
        name: 'Escola',
        time: 'Tempo de duração',
        price: 'R$ 150,00',
        id: 2,
        img: '',
    },

]