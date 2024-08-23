import React from 'react';
import { Image, View, Text } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, } from '@theme/global';

import { MoveRight } from 'lucide-react-native';

//Components
import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import Swiper from 'react-native-swiper';
import PlanosList from '@components/Planos';

import { useNavigation } from '@react-navigation/native';

import { FlatList } from 'react-native-gesture-handler';
import TabBar from '@components/TabBar';


export default function InstitucionalRealizacoesScreen() {
    const navigation = useNavigation();
    const { color, font, margin } = useTheme();
    const handleRegister = (item) => {
        navigation.navigate('SchoolRegister', { item: item })
    }

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>

                <TopMenu back={false} search={false} />

                <Header title="Realizações" />

                <Column mh={margin.h}>
                    <Image source={require('@imgs/extensao-da-sua-casa.png')} style={{ width: '100%', height: 270, borderRadius: 20 }} />
                </Column>




                <Column mh={margin.h} mv={margin.h}>

                    <Title style={{ marginBottom: 24 }}>Realizações</Title>

                    <Text style={{ color: '#979797', marginBottom: 12 }}>
                        Tombado pelo Patrimônio Histórico Nacional, O Copacabana Palace é símbolo do glamour carioca.
                    </Text>

                    <Text style={{ color: '#979797', marginBottom: 12 }}>
                        Localizado em frente à Praia de Copacabana, na cidade do Rio de Janeiro o hotel já foi eleito diversas vezes como o melhor hotel da América do Sul e os mais importantes prêmios mundiais de turismo.
                    </Text>

                    <Text style={{ color: '#979797', marginBottom: 12 }}>
                        Pet Friendly, o Copa agora oferece nossos produtos para seus hóspedes pets!
                    </Text>
                </Column>



                <Column mh={margin.h} style={{ marginBottom: 24 }}>
                    <FlatList
                        data={images.slice(0, 4)}
                        horizontal
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Column style={{ position: 'relative', marginRight: 20 }}>
                                <Image source={{ uri: item }} style={{ width: 260, height: 300, borderRadius: 12 }} />
                            </Column>
                        )}
                    />
                </Column>

                <Column style={{ height: 50 }} />

            </Scroll>
            <TabBar />
        </Main>
    );
}

const images = [
    'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid'
];
