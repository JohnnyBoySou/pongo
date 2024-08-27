import React, { useContext, useState, } from 'react';
import { Main, Scroll, Column, Row, Button, Label, Title } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { TextInput, Text } from 'react-native';
import { Search } from 'lucide-react-native';
import Back from '@components/Back';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';
import { FlatList } from 'react-native-gesture-handler';

export default function FaqScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [query, setquery] = useState();
    const [loading, setloading] = useState(false);
    const [focus, setfocus] = useState(false);
    const handleSearch = () => {
    }
    return (
        <Main style={{ backgroundColor: "#ECEBEB", }}>
            <Scroll >
                <TopMenu search={false} back={false} />
                <Row style={{ marginHorizontal: margin.h, alignItems: 'center' }}>
                    <Back />
                    <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <TextInput
                            value={query}
                            onChangeText={e => { setquery(e); query?.length > 3 ? handleSearch() : null }}
                            onFocus={() => setfocus(true)}
                            onBlur={() => setfocus(false)}
                            placeholder='Buscar'
                            placeholderTextColor={color.title + 60}
                            onSubmitEditing={handleSearch}
                            style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, marginLeft: 12, flex: 1, fontFamily: font.medium, fontSize: 16, color: color.title, borderWidth: 2, borderColor: focus ? color.sc.sc3 : '#fff' }}
                        />
                        <Button radius={20} disabled={loading} onPress={handleSearch} ph={8} pv={8} style={{ backgroundColor: color.sc.sc3, borderRadius: 8, position: 'absolute', right: 6, }}>
                            <Search size={24} color="#fff" style={{ zIndex: 99, }} />
                        </Button>
                    </Row>
                </Row>


                <FlatList
                    data={faq}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ marginTop: 20, }}
                    renderItem={({ item }) => <Card item={item} />}
                />




                <Column style={{ height: 100, }} />

            </Scroll>
            <TabBar />
        </Main>
    )
}

const Card = ({ item }) => {
    return (
        <Column bg="#fff" pv={20} ph={20} mh={28} style={{ borderRadius: 12, marginVertical: 12, }}>
            <Title size={16} style={{ lineHeight: 18, }}>{item.q}</Title>
            <Label size={14} style={{ lineHeight: 16, marginTop: 6, }}>{item.r}</Label>
        </Column>
    )
}


const faq = [
    {
        q: 'Quais tipos de produtos a Pongo oferece?',
        r: 'A Pongo oferece uma variedade de produtos para animais de estimação, incluindo ração, brinquedos, camas, coleiras, produtos de higiene, e muito mais.'
    },
    {
        q: 'A Pongo faz entregas?',
        r: 'Sim, a Pongo realiza entregas em todo o Brasil. Você pode escolher a opção de entrega ao finalizar a compra.'
    },
    {
        q: 'Quais são as formas de pagamento aceitas na Pongo?',
        r: 'Aceitamos cartões de crédito, débito, boleto bancário e pagamento por Pix.'
    },
    {
        q: 'Posso trocar um produto comprado na Pongo?',
        r: 'Sim, a Pongo permite a troca de produtos dentro de 30 dias após a compra, desde que o produto esteja em sua embalagem original e sem uso.'
    },
    {
        q: 'Como posso acompanhar meu pedido?',
        r: 'Após a confirmação da compra, você receberá um código de rastreamento por e-mail para acompanhar o status do seu pedido.'
    },
    {
        q: 'A Pongo vende produtos para todos os tipos de animais?',
        r: 'Sim, oferecemos produtos para cães, gatos, aves, roedores, peixes, e outros animais de estimação.'
    },
    {
        q: 'Posso fazer compras na Pongo mesmo sem criar uma conta?',
        r: 'Sim, é possível comprar como visitante, mas recomendamos criar uma conta para facilitar futuras compras e acompanhar seus pedidos.'
    },
    {
        q: 'A Pongo oferece algum programa de fidelidade?',
        r: 'Sim, a Pongo possui um programa de fidelidade onde você acumula pontos a cada compra e pode trocar por descontos em futuras compras.'
    },
    {
        q: 'Como entro em contato com o suporte da Pongo?',
        r: 'Você pode entrar em contato com o suporte da Pongo através do nosso chat online, e-mail ou telefone disponível no nosso site.'
    },
    {
        q: 'A Pongo vende produtos naturais e orgânicos?',
        r: 'Sim, temos uma seção dedicada a produtos naturais e orgânicos para animais de estimação, incluindo ração, petiscos e produtos de higiene.'
    }
];
