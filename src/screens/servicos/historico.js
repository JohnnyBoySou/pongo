import React, { useContext, useState } from 'react';
import { Pressable, TextInput, ScrollView, Image, Text } from 'react-native';
import { Main, View, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';

import { ThemeContext } from 'styled-components/native';

import { ArrowLeft } from 'lucide-react-native';
import { Search } from 'lucide-react-native';

import Header from '@components/Header';
import HeaderInternal from '@components/HeaderInternal';

import Input from '@components/Forms/input';
import { Card } from 'react-native-paper';

export default function HistoricoServicosScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    const [query, setquery] = useState();
    const [loading, setloading] = useState(false);
    const [focus, setfocus] = useState(false);
    const handleSearch = () => {
    }


    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <HeaderInternal />

                <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, }}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{ backgroundColor: '#fff', width: 70, height: 36, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color="#242424" />
                    </Pressable>

                    <Column style={{ flex: 1, marginLeft: 32, height: 36 }}>
                        <Row style={{ alignItems: 'center', backgroundColor: '#fff', borderRadius: 30, paddingLeft: 12 }}>

                            <Search color="#858585" style={{ width: '10%' }} />


                            <TextInput
                                value={query}
                                onChangeText={e => { setquery(e); query?.length > 3 ? handleSearch() : null }}
                                onFocus={() => setfocus(true)}
                                onBlur={() => setfocus(false)}
                                placeholder='Buscar'
                                placeholderTextColor={color.title + 60}
                                onSubmitEditing={handleSearch}
                                style={{ borderRadius: 30, padding: 6, width: '90%', fontFamily: font.bold, fontSize: 16, color: color.secundary, borderWidth: 2, borderColor: focus ? color.primary : '#fff' }}
                            />

                        </Row>
                    </Column>

                </Row>

                <Column style={{ width: '100vw', height: 1, backgroundColor: '#D9D9D9', marginBottom: 16 }}>
                </Column>

                <Column mh={margin.h} >
                    <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Title style={{ textAlign: 'center', fontSize: 12, lineHeight: 26, }}>Processando</Title>

                        <Title style={{ textAlign: 'center', fontSize: 12, lineHeight: 26, }}>Concluído</Title>

                        <Title style={{ textAlign: 'center', fontSize: 12, lineHeight: 26, }}>Cancelado</Title>

                        <Title style={{ textAlign: 'center', fontSize: 12, lineHeight: 26, }}>Reembolso</Title>
                    </Row>
                </Column>

                <Column mh={margin.h} mv={margin.v} >
                    <Card style={{ padding: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'none' }}>

                        <Column style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <Image
                                source={{ uri: 'https://img.freepik.com/free-photo/top-view-pet-accessories_23-2150930406.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720483200&semt=ais_hybrid' }}
                                style={{ width: 62, height: 80, borderRadius: 12 }} />

                            <Column mh={12} >
                                <Text style={{ fontSize: 14, color: '#434343', fontWeight: 700, marginBottom: 4 }}>Nome do Produto</Text>

                                <Text style={{ fontSize: 10, color: '#858585', fontWeight: 500, marginBottom: 8 }}>Pedido #987654323456</Text>

                                <Text style={{ fontSize: 14, color: '#858585', fontWeight: 500 }}>R$150,00</Text>
                            </Column>


                            <Column style={{ backgroundColor: color.sc.sc3, borderRadius: 12 }}>
                                <Text style={{ fontSize: 10, paddingHorizontal: 8, color: '#fff', fontWeight: 500, textAlign: 'center' }}>
                                    Informações
                                </Text>
                            </Column>

                        </Column>

                        <Column style={{ marginTop: 12 }}>
                            <Text style={{ fontSize: 14, color: '#858585', fontWeight: 500 }}>Data da compra: 12/06/2024 as 14:23:00</Text>

                            <Text style={{ fontSize: 14, color: '#858585', fontWeight: 500 }}>Previsão de entrega: 14/06/2024</Text>

                            <Text style={{ fontSize: 14, color: '#858585', fontWeight: 500 }}>Pagamento: Crédito 3x</Text>
                        </Column>

                        <Column style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }} >
                            <Column style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <Pressable onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.pr.pr2, paddingHorizontal: 12, marginRight: 13, height: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 12, color: color.title, fontWeight: 500 }}>Cancelar</Text>
                                </Pressable>

                                <Pressable onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.pr.pr2, paddingHorizontal: 12, height: 20, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 12, color: color.title, fontWeight: 500 }}>Rastrear</Text>
                                </Pressable>
                            </Column>

                            <Text style={{ fontSize: 12, color: '#858585', fontWeight: 500 }}>1 item: R$150,00</Text>
                        </Column>

                    </Card>
                </Column>



            </Scroll>
        </Main>
    )
}

