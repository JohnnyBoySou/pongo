import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Row, Title, Button, useTheme, Label, LabelBT } from '@theme/global';
import { MotiImage } from 'moti';
import TopMenu from '@components/Header/topmenu';
import CheckBox from '@components/Forms/checkbox';
import { FlatList } from 'react-native-gesture-handler';
import { Pressable, Image, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { listProducts, removeProduct } from '@hooks/cart';

export default function ShopCartScreen({ navigation, }) {
    const { color, font, margin, } = useTheme();

    const [loading, setloading] = useState();
    const [data, setdata] = useState([]);

    const handleRemove = async (id) => {
        try {
            const res = await removeProduct(id);
        } catch (error) {

        } finally {
            fetchData()
        }
    }
    const fetchData = async () => {
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
                        <Title size={24} align='center'>Carrinho</Title>
                    </Column>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Card item={item} handleRemove={() => handleRemove(item.id)} />}
                        keyExtractor={item => item.id}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        removeClippedSubviews
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData} />}
                        ListEmptyComponent={<Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require("@imgs/home_1.png")} style={{ width: 200, borderRadius: 12, marginVertical: 12, height: 200, resizeMode: 'contain', }} />
                            <Title align="center">Seu carrinho está vazio!</Title>
                            <Label align="center">Adicione produtos na loja</Label>
                            <Button bg={color.sc.sc3} mv={12} onPress={() => { navigation.navigate('Shop') }} >
                                <LabelBT color="#fff">Ir para loja</LabelBT>
                            </Button>
                        </Column>}
                        showsVerticalScrollIndicator={false}
                    />
                    {data.length > 0 && <Column >
                        <Button onPress={() => { navigation.navigate('ShopPayment', { data: data }) }} style={{ backgroundColor: '#918C8B', marginTop: 24, }} radius={1} pv={16} ph={1}>
                            <Title align="center" color="#fff">Finalizar pedido</Title>
                        </Button>
                    </Column>}
                </Column>
            </Scroll>
        </Main>
    )
}

const Card = ({ item, handleRemove }) => {
    const { color, font, margin, } = useTheme();
    const { name, price, img, } = item
    const navigation = useNavigation();

    return (
        <Column>
            <Row style={{ marginBottom: -16, zIndex: 99, marginHorizontal: -16,justifyContent: 'space-between', alignItems: 'center',  }}>
                <Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                <Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color.bg, }}></Column>
            </Row>
        <Pressable onPress={() => { navigation.navigate('ShopSingleProduct', { id: item.id }) }} style={{ backgroundColor: '#FFF', paddingHorizontal: 24, paddingVertical: 20, }}>
            <Row style={{ alignItems: 'center', }}>
                <MotiImage source={{ uri: img }} style={{ width: 62, height: 72, objectFit: 'contain', marginRight: 12, }} />
                <Column style={{ justifyContent: 'center',   }}>
                    <Title size={14} style={{ lineHeight: 18, width: 140, }}>{name?.length > 32 ? name.slice(0, 32) + '...' : name}</Title>
                    <LabelBT size={18} style={{ lineHeight: 18, marginTop: 5, }}>{price}</LabelBT>
                    <Row style={{ columnGap: 8, marginTop: 12, }}>
                        {item?.color && <Column style={{ width: 24, height: 24, borderRadius: 100, backgroundColor: item?.color, }} />}
                        {item?.size && <Column style={{ width: 24, height: 24, backgroundColor: '#868686', justifyContent: 'center', alignItems: 'center', }}><Label color='#fff' align='center'>{item?.size}</Label></Column>}
                    </Row>
                </Column>
                <Column style={{  position: 'absolute', top: -20, right: -20, bottom: -20, }}>
                    <Button style={{ marginRight: -12, position: 'absolute', right: 20, }} onPress={() => handleRemove(item.id)}>
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
            <Row style={{ marginTop: -16, zIndex: 99, marginHorizontal: -16,justifyContent: 'space-between', alignItems: 'center',  }}>
                <Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                <Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color.bg, }}></Column>
            </Row>
        </Column>
    )
}