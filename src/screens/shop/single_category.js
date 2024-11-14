import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, Loader, Card } from '@theme/global';
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

    const fetchData = async () => {
        setloading(true)
        try {
            const res = await listProductsCategory(category.id)
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

                    <Column style={{ columnGap: 8, marginVertical: 12, backgroundColor: '#fff', marginHorizontal: margin.h,}}>
                        <Row style={{ marginTop: -4, zIndex: 99, marginHorizontal: -6, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                            <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                        </Row>
                        <Label align='center' style={{ letterSpacing: .5, marginTop: 6, }}>Categoria</Label>
                        <Title align='center' style={{ marginBottom: 6, }}>{category?.name}</Title>
                        <Row style={{ marginBottom: -4, zIndex: 99, marginHorizontal: -6, justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                            <Column style={{ width: 14, height: 14, borderRadius: 100, backgroundColor: color.bg, }}></Column>
                        </Row>
                    </Column>
                    <Categories data={data} />
                </Scroll>
            </Main>
        )
    }
}

const Categories = ({ data }) => {
    const navigation = useNavigation()
    const { color } = useTheme()
    const renderItem = ({ item }) => {
        return (
            <Button pv={1} ph={1} radius={1} style={{ flexGrow: 1, }} onPress={() => { navigation.push('ShopSingleProduct', { id: item.id, }) }} >
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
            ListHeaderComponent={<Column style={{ width: 28, }}></Column>}
            ListFooterComponent={<Column style={{ width: 16, }}></Column>}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ rowGap: 12 }}
            columnWrapperStyle={{ columnGap: 12, }}
            numColumns={2}
            ListEmptyComponent={<Column>
                <Title align="center">Não encontramos nenhum produto para esse categoria...</Title>
            </Column>}
            showsHorizontalScrollIndicator={false}
        />
    )
}