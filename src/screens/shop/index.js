import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image } from '@theme/global';
import { StatusBar } from 'expo-status-bar';
import TopMenu from '@components/Header/topmenu';
import { FlatList } from 'react-native';
import { Search } from 'lucide-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function ShopScreen() {
    const { color, margin } = useTheme();


    const cats = [
        {
            name: 'Camas',
            id: '1',
        },
        {
            name: 'Bowls',
            id: '2',
        },
        {
            name: 'Brinquedos',
            id: '3',
        },
        {
            name: 'Passeio',
            id: '4',
        },
        {
            name: 'Mantas',
            id: '6',
        },
        {
            name: 'Pet Care',
            id: '7',
        },
    ]
    return (
        <Main style={{ backgroundColor: '#ECEBEB', paddingTop: 20}}>
            <StatusBar backgroundColor='#fff' />
            <Scroll>
                <Column bg="#fff" style={{ borderBottomLeftRadius: 32, paddingTop: 30, borderBottomRightRadius: 32, }}>
                    <TopMenu search={false} back={false} />
                    <Image source={require('@imgs/shop.png')} style={{ width: '100%', marginTop: 30, height: 230, objectFit: 'contain', }} />
                </Column>
                <Column style={{ backgroundColor: '#ECEBEB', paddingTop: 20, }}>
                    <Button style={{ backgroundColor: '#fff', marginHorizontal: margin.h, }}>
                        <Row style={{ columnGap: 12, alignItems: 'center', }}>
                            <Search color={color.label} />
                            <Label>Pesquisar</Label>
                        </Row>
                    </Button>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 12, }} style={{ marginVertical: 12, }}>
                        <Column style={{ width: 16 }} />
                        {cats.map((cat, index) =>
                            <Button bg="#fff">
                                <Label>{cat?.name}</Label>
                            </Button>)}
                        <Column style={{ width: margin.h }} />
                    </ScrollView>

                    <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title>Novos produtos</Title>
                        <Button>
                            <Label>Ver todos</Label>
                        </Button>
                    </Row>
                    <Produtcs />
                </Column>
                <Column style={{ backgroundColor: '#ecebeb', paddingTop: 12, }}>



                    <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title>Explore</Title>
                        <Button>
                            <Label>Ver todos</Label>
                        </Button>
                    </Row>
                    <Explore />
                </Column>
            </Scroll>
        </Main>
    )
}


const Produtcs = () => {
    const navigation = useNavigation()
    const data = [
        {
            id: 1,
            img: 'https://i.pinimg.com/564x/cc/97/8a/cc978a648e92eb991131455e07f135e3.jpg',
            name: 'Teste',
            price: 'R$ 150,00',
        },
        {
            id: 2,
            img: 'https://i.pinimg.com/564x/cc/97/8a/cc978a648e92eb991131455e07f135e3.jpg',
            name: 'Teste',
            price: 'R$ 150,00',
        },
        {
            id: 3,
            img: 'https://i.pinimg.com/564x/cc/97/8a/cc978a648e92eb991131455e07f135e3.jpg',
            name: 'Teste',
            price: 'R$ 150,00',
        },
        {
            id: 4,
            img: 'https://i.pinimg.com/564x/cc/97/8a/cc978a648e92eb991131455e07f135e3.jpg',
            name: 'Teste',
            price: 'R$ 150,00',
        },
    ]

    const renderItem = ({ item }) => {
        return (
            <Button pv={1} ph={1} radius={1} style={{ flexGrow: 1, }} onPress={() => {navigation.navigate('ShopSingleProduct', { id: item.id,})}} >
                <Column style={{ marginRight: 16, }}>
                    <Image source={{ uri: item.img }} style={{ height: 100, width: 80, objectFit: 'cover', borderRadius: 12, marginBottom: 6, }} />
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
            style={{ marginVertical: 6, }}
            ListHeaderComponent={<Column style={{ width: 28, }}></Column>}
            ListFooterComponent={<Column style={{ width: 16, }}></Column>}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            horizontal
        />
    )
}


const Explore = () => {
    const data = [
        {
            id: 1,
            img: 'https://i.pinimg.com/564x/cc/97/8a/cc978a648e92eb991131455e07f135e3.jpg',
            name: 'Teste',
            price: 'R$ 150,00',
        },
        {
            id: 2,
            img: 'https://i.pinimg.com/564x/cc/97/8a/cc978a648e92eb991131455e07f135e3.jpg',
            name: 'Teste',
            price: 'R$ 150,00',
        },
        {
            id: 3,
            img: 'https://i.pinimg.com/564x/cc/97/8a/cc978a648e92eb991131455e07f135e3.jpg',
            name: 'Teste',
            price: 'R$ 150,00',
        },
        {
            id: 4,
            img: 'https://i.pinimg.com/564x/cc/97/8a/cc978a648e92eb991131455e07f135e3.jpg',
            name: 'Teste',
            price: 'R$ 150,00',
        },
    ]

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