import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, Loader } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import Swiper from 'react-native-swiper';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { addProduct } from '@hooks/cart';
import { singleProduct } from '@api/request/shop';
import { Check, ShoppingCart } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';

export default function ShopSingleProductScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();

    const [qtd, setqtd] = useState(1);


    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            setsuccessAdd(false)
        }
    }, [isFocused])

    const [selectColor, setselectColor] = useState();
    const [selectSize, setselectSize] = useState();
    const [loadingAdd, setloadingAdd] = useState(false);
    const [successAdd, setsuccessAdd] = useState(false);

    const [loading, setloading] = useState(true);
    const id = route.params.id;
    const [item, setitem] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const res = await singleProduct(id)
                if (res?.colors) {
                    setselectColor(res.colors[0])
                }
                if (res?.size) {
                    setselectSize(res.size[0])
                }
                setitem(res)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchData()
    }, [])


    const itm = {
        id: item?.id,
        name: item?.name,
        value: qtd,
        color: selectColor,
        price: item?.price,
        size: selectSize,
        img: item?.img,
    }

    const handleAdd = async () => {
        setloadingAdd(true);
        try {
            console.log(itm)
            const res = await addProduct(itm)
            setsuccessAdd(true)
        } catch (error) {

        } finally {
            setloadingAdd(false);
        }
    }
    
    const handleAddFinalize = async () => {
        setloadingAdd(true);
        try {
            const res = await addProduct(itm)
            setsuccessAdd(true)
            navigation.navigate('ShopCart')
        } catch (error) {

        } finally {
            setloadingAdd(false);
        }
    }
    // const rate = new Array(5).fill(0).map((_, index) => { return index < item?.rating ? <AntDesign key={index} name='star' size={18} color={color.yellow} /> : <AntDesign key={index} name='staro' size={18} color={color.yellow} /> })

    if (loading) return <Main style={{ justifyContent: 'center', alignItems: 'center', }}><Loader size={24} /></Main>
    else {
        return (
            <Main>
                <Scroll>
                    <TopMenu search={false} back={true} />
                    <Column>
                        <Row mh={margin.h} style={{ columnGap: 12, marginVertical: 20, }}>
                            <Column style={{ rowGap: 12 }}>
                                <Image source={{ uri: item?.imgs[0] }} style={{ width: 64, height: 64, }} />
                                <Image source={{ uri: item?.imgs[1] }} style={{ width: 64, height: 64, }} />
                                <Image source={{ uri: item?.imgs[2] }} style={{ width: 64, height: 64, }} />
                            </Column>
                            {item?.imgs && <>
                                <Swiper style={{ height: 216, overflow: 'hidden', }} autoplay={true} loop={true}>
                                    {item?.imgs?.map((img, index) =>
                                        <Image key={index} source={{ uri: img }} style={{ width: '100%', height: '100%', }} />
                                    )}
                                </Swiper>
                            </>}
                        </Row>
                        <Column mh={margin.h}>
                            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                <Column>
                                    <Title size={22}>{item?.name}</Title>
                                    <Column style={{ height: 6 }} />
                                    <Title>{item?.price}</Title>
                                </Column>
                            </Row>

                            <Column>
                                {item?.colors && <Label size={18} style={{ fontFamily: font.bold, marginTop: 10, }}>Selecione a cor:</Label>}
                                {item?.colors ? <Row style={{ marginTop: 12, columnGap: 6, }}>
                                    <>
                                        {item?.colors.map((color, index) =>
                                            <Button style={{ justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: color == selectColor ? '#868686' : 'transparent' }} pv={2} ph={2} onPress={() => { setselectColor(color) }} >
                                                <Column style={{ width: 32, height: 32, borderRadius: 100, backgroundColor: color, }} />
                                            </Button>
                                        )}
                                    </>
                                </Row> : <Title font={font.book} size={18} style={{ marginTop: 8, }}>Cor única</Title>}
                            </Column>
                            <Column>
                                {item?.size && <Label size={18} style={{ fontFamily: font.bold, marginTop: 10, }}>Selecione o tamanho:</Label>}
                                {item?.size ? <Row style={{ marginTop: 12, columnGap: 6, }}>
                                    <>
                                        {item?.size.map((size, index) =>
                                            <Button radius={2} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: size == selectSize ? '#fff' : 'transparent', borderWidth: 2, borderColor: size == selectSize ? '#868686' : 'transparent' }} pv={12} ph={12} onPress={() => { setselectSize(size) }} >
                                                <Label>{size}</Label>
                                            </Button>
                                        )}
                                    </>
                                </Row> : <Title font={font.book} size={18} style={{ marginTop: 8, }}>Tamanho único</Title>}
                            </Column>
                        
                            <Row style={{ justifyContent: 'space-between', columnGap: 12, alignItems: 'center', marginTop: 12, }}>
                                <Row style={{ flexGrow: 1, borderColor: '#868686', borderWidth: 2, justifyContent: 'center', alignItems: 'center',  }}>
                                    <Pressable disabled={qtd == 1} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, }} onPress={() => { setqtd(qtd - 1) }}><AntDesign name='minus' size={18} color={color.title} /></Pressable>
                                    <Column style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, }}>
                                        <Label style={{ fontFamily: font.bold, }} size={18}>{qtd}</Label>
                                    </Column>
                                    <Pressable onPress={() => { setqtd(qtd + 1) }} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6, }}><AntDesign name='plus' size={18} color={color.title} /></Pressable>
                                </Row>
                                <Button disabled={successAdd} radius={1} style={{ backgroundColor: successAdd ? color.green : '#908F8F', flexGrow: 1, }} onPress={handleAdd}>
                                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                        {successAdd ?
                                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 12, }}>
                                                <Check size={18} color='#FFF' />
                                                <Label color='#fff' align='center' style={{ fontFamily: font.medium, }}>Adicionado ao carrinho</Label>
                                            </Row> :
                                            <Row style={{ justifyContent: 'center', alignItems: 'center', columnGap: 12, }}>
                                                <ShoppingCart size={18} color='#FFF' />
                                                <Label color="#fff" align='center' style={{ fontFamily: font.medium, }}>Adicionar ao carrinho</Label>
                                            </Row>
                                        }
                                    </Row>
                                </Button>
                            </Row>
                            <Column style={{ marginTop: 12, }}>
                                <Button bg={color.sc.sc1} pv={16} radius={1} onPress={handleAddFinalize}>
                                    <Label color='#fff' align='center'>Comprar já</Label>
                                </Button>
                                <Label style={{ marginTop: 12 }}>Parcelamos em até 10x sem juros.</Label>
                            </Column>
                        </Column>
                        <Column mh={margin.h}>
                            <Label size={18} style={{ fontFamily: font.bold, marginTop: 20, marginBottom: 10, }}>Descrição</Label>
                            <Label style={{ fontFamily: font.book, marginBottom: 10, }}>{item?.desc}</Label>
                            <Label size={18} style={{ fontFamily: font.bold, marginTop: 20, marginBottom: 0, }}>Categorias</Label>
                        </Column>
                        {item?.categories && <ScrollView style={{ marginVertical: 10, }} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 12, }}>
                            <Column style={{ width: 16 }} />
                            {item?.categories?.map((cat, index) => (<Column key={index}>
                                <Row style={{ marginBottom: -8, zIndex: 99, marginHorizontal: -4, justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                                    <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                                </Row>
                                <Pressable style={{ paddingHorizontal: 16, backgroundColor: '#fff', paddingVertical: 12, }} bg='#fff' onPress={() => { navigation.navigate('ShopSingleCategory', { category: cat }) }} >
                                    <Label align='center' color={color.label}>{cat?.name}</Label>
                                </Pressable>
                                <Row style={{ marginTop: -8, zIndex: 99, marginHorizontal: -4, justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                                    <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                                </Row>
                            </Column>))}
                            <Column style={{ width: 16 }} />
                        </ScrollView>}
                        <Column style={{ height: 70, }} />
                    </Column>
                </Scroll>
            </Main>
        )
    }
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