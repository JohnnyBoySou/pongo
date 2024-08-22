import React, { useRef } from 'react';
import { Column, Label, Title, Row, Button, useTheme } from '@theme/global';
import { FlatList } from 'react-native-gesture-handler';
import { Animated as RAnimated } from 'react-native';
import Animated, { FadeInRight, FadeOutRight, SlideInDown, SlideInRight, SlideOutDown, SlideOutRight } from 'react-native-reanimated';

export default function PlanosList({ destino }) {
    const { color, font, } = useTheme();
    const scrollX = useRef(new RAnimated.Value(0)).current;
    return (
        <Column>
            <FlatList
                data={plans}
                renderItem={({ item }) => <CardPlano item={item} destino={destino} />}
                keyExtractor={item => item.id}
                horizontal
                contentContainerStyle={{ columnGap: 20, }}
                ListHeaderComponent={<Column style={{ width: 10, }}></Column>}
                ListFooterComponent={<Column style={{ width: 10, }}></Column>}
                showsHorizontalScrollIndicator={false}
                onScroll={RAnimated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
                snapToAlignment="center"
                pagingEnabled
                snapToEnd={false}
            />

        </Column>
    )
}

const CardPlano = ({ item, destino }) => {
    const { color, font, margin } = useTheme();
    const { id, name, date, price, inclusos } = item
    return (
        <Animated.View entering={FadeInRight} exiting={FadeOutRight}>
            <Column style={{ width: 260, borderWidth: 1, borderColor: id % 2 != 0 ? 'transparent' : color.border, backgroundColor: id % 2 === 0 ? 'transparent' : '#F7F7F7', borderRadius: 18, paddingHorizontal: 20, paddingVertical: 20 }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8, }}>
                    <Title size={17} width={120}>Plano {name}</Title>
                    <Label size={15}>{price}</Label>
                </Row>
                <Label>{date}</Label>
                <Column style={{ height: 20, }}></Column>
                <Title size={16}>Inclusos:</Title>
                <Column style={{ height: 6, }}></Column>
                {inclusos.map((item, index) => <Label key={index} size={14} style={{ lineHeight: 20, }}>{item}</Label>)}
                { /* <Button onPress={() => { destino(item) }} style={{ backgroundColor: color.border, marginTop: 20, marginBottom: 20, }} radius={12}>
                    <Title size={18} align='center' font={font.medium}>Escolher</Title>
                </Button> */ }
            </Column>
        </Animated.View>
    )
}

const plans = [
    {
        id: 1,
        name: 'Ret',
        date: '1 vez na semana',
        price: 'R$ 650,00',
        inclusos: [
            'Uniforme',
            'Pote hermético',
            'Agenda',
            'Desconto de 5% em todos os produtos PONGO.'
        ]
    },
    {
        id: 2,
        name: 'Sweet',
        date: '2 vezes na semana',
        price: 'R$ 1.105,00',
        inclusos: [
            'Uniforme',
            'Pote hermético',
            'Agenda',
            'Desconto de 5% em todos os produtos PONGO.'
        ]
    },
    {
        id: 3,
        name: 'Kind',
        date: '3 vezes na semana',
        price: 'R$ 1.420,00',
        inclusos: [
            'Material escolar',
            '1 Day Use',
            '1 Banho',
            'Desconto de 5% em todos os produtos PONGO.'
        ]
    },
    {
        id: 4,
        name: 'Cool',
        date: '4 vezes na semana',
        price: 'R$ 1.615,00',
        inclusos: [
            'Material escolar',
            '1 Day Use',
            '2 Banhos',
            'Desconto de 7% em todos os produtos PONGO.'
        ]
    },
    {
        id: 5,
        name: 'Pretty',
        date: '5 vezes na semana',
        price: 'R$ 2.020,00',
        inclusos: [
            'Material escolar',
            '1 Diária de hotel',
            '2 Banhos',
            'Desconto de 10% em todos os produtos PONGO.'
        ]
    },
]