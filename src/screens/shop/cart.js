import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Row, Title, Button, useTheme, Label, LabelBT } from '@theme/global';
import { MotiImage } from 'moti';
import TopMenu from '@components/Header/topmenu';
import CheckBox from '@components/Forms/checkbox';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { listProducts, removeProduct } from '@hooks/cart';

export default function ShopCartScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    const [loading, setloading] = useState();
    const [data, setdata] = useState(products);

    const handleRemove = async (id) => {
        try {
            const res = await removeProduct(id);
        } catch (error) {
            
        } finally {
            fetchData()
        }
    }
    const fetchData = async() => {
        setloading(true)
        try {
            const res = await listProducts();
            console.log(res)
            setdata(res)
        } catch (error) {
            
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {   
        
        fetchData()
    }, [])

    return (
        <Main >
            <Scroll>
                <TopMenu search={false} />
                <Column ph={margin.h} pv={margin.v}>
                    <Column mv={12}>
                        <Title>Produtos</Title>
                    </Column>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Card item={item} handleRemove={() => handleRemove(item.id)}/>}
                        keyExtractor={item => item.id}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        removeClippedSubviews
                        ListEmptyComponent={<Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                            <Image source={require("@imgs/home_1.png")} style={{ width: 200, borderRadius: 12, marginVertical: 12, height: 200, resizeMode: 'contain', }} />
                            <Title align="center">Seu carrinho está vazio!</Title>
                            <Label align="center">Adicione produtos na loja</Label>
                            <Button bg={color.sc.sc3} mv={12} onPress={() => {navigation.navigate('Shop')}} >
                                <LabelBT color="#fff">Ir para loja</LabelBT>
                            </Button>
                        </Column>}
                        showsVerticalScrollIndicator={false}
                    />
                    {data.length > 0 && <Column >
                    <Button onPress={() => { navigation.navigate('ShopPayment', {data: data}) }} style={{ backgroundColor: '#918C8B', marginTop: 24, }} radius={50} pv={16} ph={1} mh={margin.h}>
                        <Title align="center" color="#fff">Finalizar pedido</Title>
                        </Button>
                        </Column>}
                </Column>
            </Scroll>
        </Main>
    )
}

const products = [
    {
        id: 1,
        name: 'Nome do produto',
        color: '#E5C8C9',
        price: 'R$ 99,99',
        value: 1,
        img: 'https://i.pinimg.com/564x/92/d9/b0/92d9b02c5b6840a6f6c54f314ecc7d63.jpg',
    },
    {
        id: 2,
        name: 'Nome do produto',
        color: '#778428',
        price: 'R$ 209,99',
        value: 1,
        img: 'https://i.pinimg.com/564x/92/d9/b0/92d9b02c5b6840a6f6c54f314ecc7d63.jpg',
    },

]

const Card = ({ item, handleRemove }) => {
    const { color, font, margin, } = useTheme();
    const { name, price, img, } = item
    const [qtd, setqtd] = useState(1);
    const navigation = useNavigation();

    return (
        <Pressable onPress={() => {navigation.navigate('ShopSingleProduct', {id: item.id})}}   style={{ backgroundColor: '#FFF', marginVertical: 12, paddingHorizontal: 12, paddingVertical: 18, borderRadius: 12, }}>
            <Row style={{ alignItems: 'center', }}>
                <MotiImage source={{ uri: img }} style={{ width: 62, height: 72, objectFit: 'contain', borderRadius: 12, marginRight: 12, marginLeft: 8, borderWidth: 1, borderColor: color.border, }} />
                <Column>
                    <Title size={14} style={{ lineHeight: 18, }}>{name}</Title>
                    <Row style={{ alignItems: 'center', marginTop: 5 }}>
                        <Label size={14} style={{ lineHeight: 16, marginRight: 8, }}>Cor</Label>
                        <Column style={{ backgroundColor: item.color, borderRadius: 100, paddingVertical: 1, paddingHorizontal: 1,}}>
                            <Column style={{ width: 14, height: 14, borderRadius: 100, borderWidth: 2, borderColor: '#fff', backgroundColor: item?.color, }} />
                        </Column>
                    </Row>
                    <LabelBT size={18} style={{ lineHeight: 18, marginTop: 12, }}>{price}</LabelBT>
                </Column>

                <Column style={{  backgroundColor: 'red', position: 'absolute', top: -20, right: -20, bottom: -20, }}>
                <Button style={{  marginRight: -12, position: 'absolute', right: 20,}} onPress={() => handleRemove(item.id)}>
                    <LabelBT color={color.red} size={12}>Excluir</LabelBT>
                </Button>
                <Row style={{ position: 'absolute', bottom: 10, right: 20, }}>
                    <Column style={{ backgroundColor: '#f1f1f1', justifyContent: 'center', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, }}>
                        <Label style={{ fontFamily: font.bold, color: '#000' }} size={18}>{item?.value}</Label>
                    </Column>
                </Row>
                </Column>
                
            </Row>
        </Pressable>
    )
}
//<Pressable style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, }} onPress={() => { if (qtd === 1) { handleRemove(item.id) } else { setqtd(qtd - 1) } }}><AntDesign name='minus' size={16} color={color.title} /></Pressable>
//<Pressable onPress={() => { setqtd(qtd + 1) }} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, }}><AntDesign name='plus' size={16} color={color.title} /></Pressable>
