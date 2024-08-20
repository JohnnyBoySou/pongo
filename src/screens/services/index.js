import React, { useState } from 'react';
import { Pressable, TextInput, ScrollView, Image, } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, } from '@theme/global';

import { ArrowLeft } from 'lucide-react-native';
import { Search } from 'lucide-react-native';


import TopMenu from '@components/Header/topmenu';
import { FlatList } from 'react-native-gesture-handler';

export default function ServicesScreen({ navigation, }) {

    const { color, font, margin } = useTheme();

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    const [query, setquery] = useState();
    const [loading, setloading] = useState(false);
    const [focus, setfocus] = useState(false);
    const handleSearch = () => {
    }

    // Limitando a exibição a três imagens e uma máscara de overlay
    const displayedImages = images.slice(0, 3);
    const remainingItems = images.length - 3;

    const types = ['Processando', 'Concluído', 'Cancelado', 'Reembolso'];
    const [filter, setfilter] = useState('Processando');
    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>

                <TopMenu search={false} />

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

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 0 }}>
                    <Column style={{ width: margin.h, }} />
                    {types.map((item, index) => (
                        <Button onPress={() => { setfilter(item) }} style={{ opacity: filter == item ? 1 : 0.5, }} ph={12} pv={4}>
                            <Title style={{ textAlign: 'center', fontSize: 12, lineHeight: 26, textDecorationLine: filter == item ? 'underline' : 'none', textDecorationStyle: 'solid', }}>{item}</Title>
                        </Button>
                    ))}
                    <Column style={{ width: margin.h, }} />
                </ScrollView>

                <Column mh={margin.h} mv={margin.v} >
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Item item={item} />}
                    />


                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <ItemAlternative item={item} />}
                    />
                </Column>

                <Column mh={margin.h} marginTop={0} marginBottom={24} >
                    <Button style={{ width: '100%', backgroundColor: color.pr.pr1, padding: 15 }}><Label style={{ color: color.light, textAlign: 'center' }}>Solicitar novo serviço</Label></Button>
                </Column>

            </Scroll>
        </Main >
    )
}


const Item = ({ item }) => {
    const { color, font, margin } = useTheme()
    const { name } = item
    return (
        <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <Row style={{ alignItems: 'flex-start', }}>
                <Image
                    source={{ uri: 'https://thoseoldpets.co.uk/wp-content/uploads/2022/08/img_1899-2-1.png' }}
                    style={{ width: 62, height: 80, borderRadius: 12, borderWidth: 0.8, borderColor: '#ecebeb', objectFit: 'contain' }} />
                <Column mh={12} >
                    <Label style={{ fontSize: 14, color: '#434343', fontWeight: 700, marginBottom: 3 }}>{name}</Label>
                    <Label style={{ fontSize: 10, color: '#858585', fontWeight: 200, marginBottom: 8 }}>Pedido #987654323456</Label>
                    <Label style={{ fontSize: 14, color: '#858585', fontWeight: 600 }}>R$150,00</Label>
                </Column>
                <Column style={{ backgroundColor: color.sc.sc3, borderBottomLeftRadius: 8, position: 'absolute', right: -15, top: -15, }}>
                    <Title style={{ fontSize: 10, paddingHorizontal: 8, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                        Informações
                    </Title>
                </Column>
            </Row>
            <Column style={{ marginTop: 12 }}>
                <Label size={14} marginBottom={6}>Data da compra: 12/06/2024 as 14:23:00</Label>
                <Label size={14} marginBottom={6}>Previsão de entrega: 14/06/2024</Label>
                <Label size={14} marginBottom={6}>Pagamento: Crédito 3x</Label>
                <Label size={14} marginBottom={6}>Pets: 2 (Aufredo, Pitoco)</Label>
            </Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }} >
                <Row>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.pr.pr2, paddingHorizontal: 12, paddingVertical: 6, marginRight: 6, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <Label style={{ fontSize: 12, color: color.title, fontWeight: 500 }}>Cancelar</Label>
                    </Button>

                </Row>
                <Title style={{ fontSize: 12, color: '#858585', fontWeight: 500 }}>1 item: R$150,00</Title>
            </Row>
        </Column>
    )
}



const ItemAlternative = ({ item }) => {
    const { color, font, margin } = useTheme()
    const { name } = item

    return (
        <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <Column style={{ alignItems: 'flex-start', }}>

                <FlatList
                    data={images.slice(0, 4)}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Column style={{ position: 'relative', marginRight: 10 }}>
                            <Image source={{ uri: item }} style={{ width: 62, height: 80, borderRadius: 12, borderWidth: 0.8, borderColor: '#ecebeb', objectFit: 'contain' }} />
                            {index === 3 && images.length > 4 && (
                                <Column style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                                    <Label style={{ color: '#fff', fontWeight: 'bold' }}>+{images.length - 4} itens</Label>
                                </Column>
                            )}
                        </Column>
                    )}
                />

                <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                    <Column style={{ marginTop: 16 }} >
                        <Label style={{ fontSize: 14, color: '#434343', fontWeight: 700, marginBottom: 3 }}>{name}</Label>
                        <Label style={{ fontSize: 10, color: '#858585', fontWeight: 200, marginBottom: 8 }}>Pedido #987654323456</Label>
                        <Label style={{ fontSize: 14, color: '#858585', fontWeight: 600 }}>R$300,00</Label>
                    </Column>
                    <Column style={{ backgroundColor: color.sc.sc3, borderRadius: 8, marginTop: 13 }}>
                        <Title style={{ fontSize: 10, paddingHorizontal: 8, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                            Informações
                        </Title>
                    </Column>
                </Row>

            </Column>
            <Column style={{ marginTop: 12 }}>
                <Label size={14} marginBottom={6}>Data da compra: 12/06/2024 as 14:23:00</Label>
                <Label size={14} marginBottom={6}>Previsão de entrega: 14/06/2024</Label>
                <Label size={14} marginBottom={6}>Pagamento: Crédito 3x</Label>
                <Label size={14} marginBottom={6}>Pets: 2 (Aufredo, Pitoco)</Label>
            </Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }} >
                <Row>
                    <Button onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.pr.pr2, paddingHorizontal: 12, paddingVertical: 6, marginRight: 6, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <Label style={{ fontSize: 12, color: color.title, fontWeight: 500 }}>Cancelar</Label>
                    </Button>

                </Row>
                <Title style={{ fontSize: 12, color: '#858585', fontWeight: 500 }}>2 item: R$300,00</Title>
            </Row>
        </Column >
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

const images = [
    'https://thoseoldpets.co.uk/wp-content/uploads/2022/08/img_1899-2-1.png',
    'https://thoseoldpets.co.uk/wp-content/uploads/2022/08/img_1899-2-1.png',
    'https://thoseoldpets.co.uk/wp-content/uploads/2022/08/img_1899-2-1.png'
];

