import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, Loader } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import Swiper from 'react-native-swiper';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { addProduct } from '@hooks/cart';
import { singleProduct, listProductsCategory } from '@api/request/shop';
import { Check, ShoppingCart } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function ShopSingleCategoryScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const [data, setdata] = useState();
    const [loading, setloading] = useState();
    const category = route?.params.category

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

    const fetchData = async () => {
        setloading(true)
        try {
            const res = await listProductsCategory(category.id)
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

    if (loading) return <Main><Loader /></Main>
    else {
        return (
            <Main>
                <Scroll>
                    <TopMenu search={false} back={true} />
                    <Column style={{ columnGap: 8, marginVertical: 12,}}>
                        <Label align='center' style={{ letterSpacing: .5, }}>Categoria</Label>
                        <Title align='center'>{category?.name}</Title>
                    </Column>
                    <Categories data={data}/>
                </Scroll>
            </Main>
        )
    }
}

const Categories = ({data}) => {
    const navigation = useNavigation()

    const renderItem = ({ item }) => {
        return (
            <Button pv={1} ph={1} radius={1} style={{ flexGrow: 1, }} onPress={() => { navigation.push('ShopSingleProduct', { id: item.id, }) }} >
                <Column style={{ flexGrow: 1, width: 150, }}>
                    <Image source={{ uri: item?.img }} style={{ height: 150, width: 150, objectFit: 'cover', marginBottom: 6, }} />
                    <Title size={15}>{item?.name}</Title>
                    <Column style={{ height: 4, }} />
                    <Title size={15}>{item?.price}</Title>
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