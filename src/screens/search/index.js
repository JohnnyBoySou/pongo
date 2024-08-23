import React, { useContext, useState, useEffect } from 'react';
import { Main, Scroll, Column, Row, Button, Title, Image, Label } from '@theme/global';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import Back from '@components/Back';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';

export default function SearchScreen({ navigation, route }) {
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

                <Column style={{ marginHorizontal: margin.h, marginTop: margin.h, flex: 1, }}>
                    <Title color='#858585'>Recentes</Title>
                </Column>
                <ItensFlat type="Produtos" />
            </Scroll>
            <TabBar />
        </Main>
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
                    <Image source={{ uri: img }} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 12, marginBottom: 6, }} />
                    <Label size={15}>{name} {'\n'} {price}</Label>

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