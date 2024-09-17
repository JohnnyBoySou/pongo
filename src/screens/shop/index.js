import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image } from '@theme/global';
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';

export default function ShopScreen() {

    return (
        <Main style={{}}>
            <StatusBar backgroundColor='#CCCCCC' />
            <WebView style={{ flex: 1, }} source={{ uri: 'https://pongo.com.br/' }} />
        </Main>
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