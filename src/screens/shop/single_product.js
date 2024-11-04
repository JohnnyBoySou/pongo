import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import Swiper from 'react-native-swiper';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { addProduct } from '@hooks/cart';

export default function ShopSingleProductScreen({ navigation, }) {
    const { color, font, margin } = useTheme();

    const [qtd, setqtd] = useState(1);
    const [selectColor, setselectColor] = useState(item?.colors[0]);
    const [loading, setloading] = useState();
    const [loadingAdd, setloadingAdd] = useState(false);
    const [successAdd, setsuccessAdd] = useState(false);

    const itm = {
        id: 1,
        name: item.name,
        value: qtd,
        color: selectColor,
        price: item.price,
        sizes: ["P", "M", "G",],
        img: 'https://i.pinimg.com/564x/92/d9/b0/92d9b02c5b6840a6f6c54f314ecc7d63.jpg',
    }

    const handleAdd = async () => {
        setloadingAdd(true);
        try {
            const res = await addProduct(itm)
            console.log(res)
            setsuccessAdd(true)
        } catch (error) {

        } finally {
            setloadingAdd(false);
        }
    }

    const rate = new Array(5).fill(0).map((_, index) => { return index < item?.rating ? <AntDesign key={index} name='star' size={18} color={color.yellow} /> : <AntDesign key={index} name='staro' size={18} color={color.yellow} /> })
    return (
        <Main Main >
            <Scroll>
                <TopMenu search={false} back={true} />

                <Column>
                    <Row mh={margin.h} style={{ columnGap: 12, marginVertical: 20, }}>
                        <Column style={{ rowGap: 12 }}>
                            <Image source={{ uri: item?.imgs[0] }} style={{ width: 64, height: 64, borderRadius: 8, }} />
                            <Image source={{ uri: item?.imgs[1] }} style={{ width: 64, height: 64, borderRadius: 8, }} />
                            <Image source={{ uri: item?.imgs[2] }} style={{ width: 64, height: 64, borderRadius: 8, }} />
                        </Column>
                        <Swiper style={{ height: 216, overflow: 'hidden', borderRadius: 8, }} autoplay={true} loop={true}>
                            {item.imgs.map((img, index) =>
                                <Image key={index} source={{ uri: img }} style={{ width: '100%', height: '100%', borderRadius: 8, }} />
                            )}
                        </Swiper>
                    </Row>
                    <Column mh={margin.h}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column>
                                <Title size={22}>{item?.name}</Title>
                                <Column style={{ height: 6 }} />
                                <Label>{item?.price}</Label>
                            </Column>
                        </Row>
                        <Row style={{ marginVertical: 12, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Rating rating={item.rating} />
                            <Label size={12}>{item?.sell_qtd} vendidos</Label>
                            <Label size={12}>{item?.comments_qtd} comentários</Label>
                        </Row>

                        <Label size={18} style={{ fontFamily: font.bold, marginTop: 10, }}>Selecione a cor:</Label>
                        <Row style={{ marginTop: 12, columnGap: 6, }}>
                            {item.colors.map((color, index) =>
                                <Button style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: color == selectColor ? '#00000050' : 'transparent' }} pv={2} ph={2} onPress={() => { setselectColor(color) }} >
                                    <Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color, }} />
                                </Button>
                            )}
                        </Row>

                        <Label size={18} style={{ fontFamily: font.bold, marginTop: 20, marginBottom: 10, }}>Selecione a quantidade:</Label>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>

                            <Row style={{ marginLeft: -12, }}>
                                <Pressable disabled={qtd == 1} style={{ borderBottomLeftRadius: 12, borderTopLeftRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, }} onPress={() => { setqtd(qtd - 1) }}><AntDesign name='minus' size={18} color={color.title} /></Pressable>
                                <Column style={{ backgroundColor: '#fff', borderLeftColor: '#d1d1d1', borderLeftWidth: 1, borderRightWidth: 1, borderRightColor: '#d1d1d1', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 20, }}>
                                    <Label style={{ fontFamily: font.bold, }} size={18}>{qtd}</Label>
                                </Column>
                                <Pressable onPress={() => { setqtd(qtd + 1) }} style={{ borderBottomRightRadius: 12, borderTopRightRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 12, }}><AntDesign name='plus' size={18} color={color.title} /></Pressable>
                            </Row>
                            <Button disabled={successAdd} style={{ backgroundColor:  successAdd ? color.green : '#fff', }} onPress={handleAdd}>
                                <Row>
                                    {successAdd ? <Label color='#fff'>Adicionado!</Label> : 
                                    <Label style={{ fontFamily: font.bold, }}>Adicionar a cesta</Label>
                                    }
                                </Row>
                            </Button>
                        </Row>
                    </Column>

                    <Column mh={margin.h}>
                        <Label size={18} style={{ fontFamily: font.bold, marginTop: 20, marginBottom: 10, }}>Descrição</Label>
                        <Label style={{ fontFamily: font.book, marginBottom: 10, }}>{item?.description}</Label>
                        <Label size={18} style={{ fontFamily: font.bold, marginTop: 20, marginBottom: 20, }}>Feedbacks</Label>
                        <ListComments />
                    </Column>

                </Column>
            </Scroll>
        </Main>
    )
}

const Rating = ({ rating }) => {
    const { color } = useTheme();
    return (
        <Row>
            {new Array(5).fill(0).map((_, index) => (
                index < rating ?
                    <AntDesign key={index} name='star' size={18} color={color.yellow} /> :
                    <AntDesign key={index} name='staro' size={18} color={color.yellow} />
            ))}
        </Row>
    );
}

const ListComments = () => {
    const { color, font, margin } = useTheme();
    const renderItem = ({ item }) => {
        return (
            <Column>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, }}>
                    <Row>
                        <Image style={{ width: 42, height: 42, borderRadius: 100, }} source={{ uri: item.avatar }} />
                        <Column style={{ marginLeft: 8, rowGap: 4, }}>
                            <Title size={16}>{item.name}</Title>
                            <Label size={12}>{item.create_at}</Label>
                        </Column>
                    </Row>
                    <Rating rating={item?.rating} />
                </Row>
                <Label>{item.message}</Label>
                <ScrollView style={{ marginVertical: 10, }} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 12, }}>
                    {item.imgs.map((img, index) => <Image source={{ uri: img }} style={{ width: 60, height: 80, borderRadius: 6, }} />)}
                </ScrollView>
            </Column>
        )
    }
    return (
        <FlatList
            renderItem={renderItem}
            keyExtractor={item => item.id}
            data={comments?.comments}
            ListFooterComponent={<Column style={{ height: 20, }}></Column>}
            ItemSeparatorComponent={<Column style={{ height: 1, backgroundColor: '#30303030', marginVertical: 12, flexGrow: 1, }} />}
        />
    )
}

const item = {
    id: 1,
    name: 'Product Name',
    price: 'R$ 150,00',
    sell_qtd: 345,
    comments_qtd: 45,
    rating: 4,
    description: 'Description of the product',
    colors: ["#E5C8C9", "#91A6C4", "#778428", "#EBD269"],
    sizes: ["P", "M", "G",],
    imgs: [
        'https://i.pinimg.com/564x/92/d9/b0/92d9b02c5b6840a6f6c54f314ecc7d63.jpg',
        'https://i.pinimg.com/736x/b1/a8/0e/b1a80ef1b4c145c5ded119bb14fe9001.jpg',
        'https://i.pinimg.com/564x/4f/4f/64/4f4f6439cd9ab69f5aacbd3796b538f9.jpg',
        'https://i.pinimg.com/564x/c3/4f/c8/c34fc802d3112e87f73b45f418395b8b.jpg',
        'https://i.pinimg.com/564x/4f/a7/d2/4fa7d21c5afa80eede46bcfd4ec375ad.jpg',
        'https://i.pinimg.com/564x/1d/90/02/1d90028a0e8ffbcd420c4265911763b8.jpg',
        'https://i.pinimg.com/564x/9a/f7/a0/9af7a0e8d23f28340a5a356e361603c8.jpg',
    ]
}

const comments = {
    id: 1,
    qtd: 5,
    product_id: 1,
    comments: [
        {
            id: 1,
            name: 'User Name',
            avatar: 'https://i.pinimg.com/564x/3a/16/8e/3a168e9e167f7751bf3174faf6abe83e.jpg',
            message: 'Comment of the user',
            create_at: '12h atrás',
            rating: 4,
            imgs: [
                'https://i.pinimg.com/564x/14/2c/29/142c299f2727dd00f8598f08b9f6618c.jpg',
                'https://i.pinimg.com/564x/4b/79/c4/4b79c4bea1f1c661d1f0921a03e2fc32.jpg',
                'https://i.pinimg.com/564x/b0/c5/a5/b0c5a585ecf07da9304a888549ba37d0.jpg',
            ]
        },
        {
            id: 2,
            name: 'User Name',
            avatar: 'https://i.pinimg.com/564x/3a/16/8e/3a168e9e167f7751bf3174faf6abe83e.jpg',
            message: 'Comment of the user',
            create_at: '6h atrás',
            rating: 5,
            imgs: [
                'https://i.pinimg.com/564x/14/2c/29/142c299f2727dd00f8598f08b9f6618c.jpg',
                'https://i.pinimg.com/564x/4b/79/c4/4b79c4bea1f1c661d1f0921a03e2fc32.jpg',
                'https://i.pinimg.com/564x/b0/c5/a5/b0c5a585ecf07da9304a888549ba37d0.jpg',
            ]
        },
    ],
}