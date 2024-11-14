import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image } from '@theme/global';
import { StatusBar } from 'expo-status-bar';
import TopMenu from '@components/Header/topmenu';
import { FlatList, Pressable } from 'react-native';
import { Search, ShoppingBag, X } from 'lucide-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { listProducts } from '@api/request/shop';

export default function ShopScreen({ navigation }) {
    const { color, margin } = useTheme();
    const [category, setcategory] = useState();
    const [loading, setloading] = useState();
    const [data, setdata] = useState();

    const cats = [
        {
            name: 'Camas',
            id: 1,
        },
        {
            name: 'Bowls',
            id: 2,
        },
        {
            name: 'Brinquedos',
            id: 3,
        },
        {
            name: 'Passeio',
            id: 4,
        },
        {
            name: 'Mantas',
            id: 6,
        },
        {
            name: 'Pet Care',
            id: 7,
        },
    ]

    const fetchData = async () => {
        setloading(true)
        try {
            const res = await listProducts()
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
        <Main style={{ backgroundColor: '#ECEBEB', paddingTop: 20 }}>
            <StatusBar backgroundColor='#fff' />
            <Scroll>
                <Column bg="#fff" style={{ borderBottomLeftRadius: 32, paddingTop: 30, borderBottomRightRadius: 32, }}>
                    <TopMenu search={false} back={false} />
                    <Image source={require('@imgs/shop.png')} style={{ width: '100%', marginTop: 30, height: 230, objectFit: 'contain', }} />
                </Column>
                <Column style={{ backgroundColor: '#ECEBEB', paddingTop: 20, }}>
                    <Row mh={margin.h}>

                        <Button style={{ backgroundColor: '#fff', flexGrow: 1, }} radius={100} onPress={() => { navigation.navigate('Search') }} >
                            <Row style={{ columnGap: 12, alignItems: 'center', }}>
                                <Image source={require('@imgs/icon.png')} style={{ width: 34, height: 34, borderRadius: 100, }} />
                                <Label>Pesquisar</Label>
                            </Row>
                        </Button>
                        <Button bg={color.sc.sc3} radius={6} style={{ marginLeft: 12, justifyContent: 'center', alignItems: 'center', }} onPress={() => { navigation.navigate('ShopCart') }} >
                            <ShoppingBag color='#fff' />
                        </Button>

                    </Row>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 12, }} style={{ marginVertical: 12, }}>
                        <Column style={{ width: 24 }} />

                        {cats.map((cat, index) =>
                            <Column>
                                <Row style={{ marginBottom: -8, zIndex: 99, marginHorizontal: -4, justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                                    <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                                </Row>
                                <Pressable style={{ paddingHorizontal: 16, backgroundColor: '#fff', paddingVertical: 12, }} bg={cat?.id == category?.id ? color.sc.sc3 : '#fff'} onPress={() => { navigation.navigate('ShopSingleCategory', { category: cat }) }} >
                                    <Label align='center' color={cat?.id == category?.id ? "#FFF" : color.label}>{cat?.name}</Label>
                                </Pressable>
                                <Row style={{ marginTop: -8, zIndex: 99, marginHorizontal: -4, justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                                    <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                                </Row>
                            </Column>
                        )}
                        <Column style={{ width: margin.h }} />
                    </ScrollView>
                </Column>

                <Column style={{ backgroundColor: '#ecebeb', }}>
                    <Row style={{ paddingHorizontal: margin.h, marginBottom: 12, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title size={24}>Novos produtos</Title>
                    </Row>
                    <Produtcs data={data} />
                    <Row style={{ paddingHorizontal: margin.h, marginTop: 20, marginBottom: 12, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title size={24}>Explore</Title>
                    </Row>
                    <Explore data={data} />
                </Column>

            </Scroll>
        </Main>
    )
}


const Produtcs = ({ data }) => {
    const navigation = useNavigation()
    const { color } = useTheme()
    const renderItem = ({ item }) => { 
        return (
            <Button pv={1} ph={1} radius={1} style={{ flexGrow: 1, }} onPress={() => { navigation.navigate('ShopSingleProduct', { id: item.id, }) }} >
                <Column style={{  width: 140, }}>
                    <Image source={{ uri: item?.img }} style={{ height: 140, width: 140, objectFit: 'cover', marginBottom: 6, }} />
                    <Title style={{ width: 140, }} size={14}>{item?.name?.length > 14 ? item?.name?.slice(0, 14) + '...' : item?.name}</Title>
                    <Column style={{ height: 4, }} />
                    <Title size={15}>{item?.price}</Title>
                    {item?.descont_percent && <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title size={12} style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{item?.old_price}</Title>
                        <Column style={{ backgroundColor: color.sc.sc3, paddingVertical: 4, paddingHorizontal: 4, marginRight: 4, marginBottom: 4, }}>
                            <Label size={10} style={{ color: "#fff" }}>{item?.descont_percent}</Label>
                        </Column>
                    </Row>}
                </Column>
            </Button>
        )
    }
    return (
        <FlatList
            data={data}
            ListHeaderComponent={<Column style={{ width: 12, }}></Column>}
            ListFooterComponent={<Column style={{ width: 12, }}></Column>}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ columnGap: 16 }}
            showsHorizontalScrollIndicator={false}
            horizontal
        />
    )
}


const Explore = ({ data }) => {
    const navigation = useNavigation()
    const { color } = useTheme()
    const renderItem = ({ item }) => {
        return (
            <Button pv={1} ph={1} radius={1} style={{ flexGrow: 1, }} onPress={() => { navigation.navigate('ShopSingleProduct', { id: item.id, }) }} >
                <Column style={{ flexGrow: 1, width: 150, }}>
                    <Image source={{ uri: item?.img }} style={{ height: 150, width: 150, objectFit: 'cover', marginBottom: 6, }} />
                    <Title size={15}>{item?.name}</Title>
                    <Column style={{ height: 4, }} />
                    <Title size={15}>{item?.price}</Title>
                    {item?.descont_percent && <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title size={12} style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>{item?.old_price}</Title>
                        <Column style={{ backgroundColor: color.sc.sc3, paddingVertical: 4, paddingHorizontal: 4, marginRight: 4, marginBottom: 4, }}>
                            <Label size={10} style={{  color: "#fff" }}>{item?.descont_percent}</Label>
                        </Column>
                    </Row>}
                </Column>
            </Button>
        )
    }
    return (
        <FlatList
            data={data}
            style={{ marginHorizontal: 28, }}
            ListFooterComponent={<Column style={{ width: 16, }}></Column>}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ rowGap: 12 }}
            columnWrapperStyle={{ columnGap: 12, }}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const Categories = () => {
    const renderItem = ({ item }) => {
        return (
            <Button pv={1} ph={1} radius={1} style={{ flexGrow: 1, }}>
                <Column style={{ flexGrow: 1, }}>
                    <Image source={{ uri: item.img }} style={{ height: 150, flexGrow: 1, objectFit: 'cover', borderRadius: 12, marginBottom: 6, }} />
                    <Title size={18}>{item.name}</Title>
                    <Column style={{ height: 4, }} />
                    <Label size={14}>{item.price}</Label>
                </Column>
            </Button>
        )
    }
    return (
        <FlatList
            data={data}
            style={{ marginHorizontal: 28, }}
            ListHeaderComponent={<Column style={{ width: 28, }}></Column>}
            ListFooterComponent={<Column style={{ width: 16, }}></Column>}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ rowGap: 12 }}
            columnWrapperStyle={{ columnGap: 12, }}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
        />
    )
}
/*

           

const CatsFlat = ({ }) => {

    const [loading, setloading] = useState(true);
    const [data, setdata] = useState(cats);

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                // const res = await getExplore()
                //setdata(res)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fecthData()
    }, [])


    const ExploreItem = ({ item }) => {
        const navigation = useNavigation()
        const { icon, name, price, id } = item
        return (
            <Button onPress={() => { navigation.navigate('ShopSingleService', { id: id, }) }} style={{ flexGrow: 1, backgroundColor: '#fff', }} radius={8} mv={1} mh={1} ph={12} pv={12}>
                <Column>
                    {icon}
                    <Label size={16} align="left" style={{ fontFamily: 'Font_Medium', marginTop: 6, }}>{name}</Label>
                </Column>
            </Button>
        )
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ExploreItem item={item} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={<Column style={{ width: 16, }}></Column>}
            ListFooterComponent={<Column style={{ width: 16, }}></Column>}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 12, }}
            contentContainerStyle={{ columnGap: 12 }}
        />
    )
}

const ItensFlat = ({ type }) => {

    const [loading, setloading] = useState(true);
    const [data, setdata] = useState(exp);

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                // const res = await getExplore()
                //setdata(res)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fecthData()
    }, [])



    const ExploreItem = ({ item }) => {
        const { img, name, price, id } = item
        return (
            <Button style={{ flexGrow: 1, }} radius={4} mv={1} mh={1} ph={1} pv={1}>
                <Column>
                    <Image source={{ uri: img }} style={{ width: 80, height: 100, objectFit: 'cover', borderRadius: 12, marginBottom: 6, }} />
                    <Title size={18}>{name}</Title>
                    <Column style={{ height: 4, }} />
                    <Label size={14}>{price}</Label>
                </Column>
            </Button>
        )
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ExploreItem item={item} />}
            keyExtractor={item => item.id}
            ListHeaderComponent={<Column style={{ width: 16, }}></Column>}
            ListFooterComponent={<Column style={{ width: 16, }}></Column>}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 12, }}
            contentContainerStyle={{ columnGap: 12 }}
        />
    )
}

const ExploreFlat = () => {

    const [loading, setloading] = useState(true);
    const [data, setdata] = useState(exp);

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                // const res = await getExplore()
                //setdata(res)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fecthData()
    }, [])



    const ExploreItem = ({ item }) => {
        const { img, name, price, id } = item
        return (
            <Button style={{ flexGrow: 1, }} radius={4} mv={1} mh={1} ph={1} pv={1}>
                <Column>
                    <Image source={{ uri: img }} style={{ height: 162, objectFit: 'cover', borderRadius: 12, marginBottom: 6, }} />
                    <Title size={18}>{name}</Title>
                    <Column style={{ height: 4, }} />
                    <Label size={14}>{price}</Label>
                </Column>
            </Button>
        )
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <ExploreItem item={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            style={{ marginVertical: 12, marginHorizontal: 28 }}
            contentContainerStyle={{ rowGap: 12 }}
            columnWrapperStyle={{ columnGap: 12, }}
        />
    )
}

const cats = [
    {
        id: 1,
        name: 'Camas e \nBerços',
        icon: <BedSingle size={32} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 2,
        name: 'Brinquedos e\n Acessórios',
        icon: <Shapes size={32} color="#91A6C4" strokeWidth={2} />,
    },
]

const exp = [
    {
        id: 1,
        name: 'Teste',
        img: 'https://i.pinimg.com/736x/2e/ab/9b/2eab9b19d939a71a3dad72678c83d9f1.jpg',
        price: 'R$ 150,00',
    },
    {
        id: 2,
        name: 'Teste',
        img: 'https://i.pinimg.com/736x/2e/ab/9b/2eab9b19d939a71a3dad72678c83d9f1.jpg',
        price: 'R$ 150,00',
    },
    {
        id: 3,
        name: 'Teste',
        img: 'https://i.pinimg.com/736x/2e/ab/9b/2eab9b19d939a71a3dad72678c83d9f1.jpg',
        price: 'R$ 100,00',
    },
    {
        id: 4,
        name: 'Teste',
        img: 'https://i.pinimg.com/736x/2e/ab/9b/2eab9b19d939a71a3dad72678c83d9f1.jpg',
        price: 'R$ 150,00',
    },
    {
        id: 5,
        name: 'Teste',
        img: 'https://i.pinimg.com/736x/2e/ab/9b/2eab9b19d939a71a3dad72678c83d9f1.jpg',
        price: 'R$ 100,00',
    },

]
*/