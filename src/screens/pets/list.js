
import React, { useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image, Button, Back, Loader, LabelBT, } from '@theme/global'
import { FlatList, TextInput, RefreshControl } from 'react-native'
//components
import TopMenu from '@components/Header/topmenu';
//API
import { listPets } from '@api/request/pets';
import TabBar from '@components/TabBar';

import { Search } from 'lucide-react-native';
import Card from '@components/Card';

export default function PetsListScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    const [data, setdata] = useState([]);

    const [loading, setloading] = useState(true);

    const fecthData = async () => {
        setloading(true)
        try {
            const res = await listPets()
            setdata(res)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fecthData()
    }, []);

    const [filteredData, setfilteredData] = useState();

    const [value, setvalue] = useState();

    const handleSearch = () => {
        const values = data.filter((item) => {
            if (item.name.toLowerCase().includes(value.toLowerCase())) {
                return item
            }
        })
        setfilteredData(values)
    }


    return (
        <Main>
            <TopMenu search={false} back={false} />

            {loading ? <Loader /> :
                <FlatList
                    ListHeaderComponent={
                        <Column>
                            <Column>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 24, marginTop: 10, }}>
                                    <Back />
                                    <Row style={{ backgroundColor: '#fff', paddingRight: 8, borderRadius: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 12, }}>
                                        <TextInput
                                            value={value}
                                            onChangeText={(e) => setvalue(e)}
                                            placeholder='Pesquisar'
                                            onSubmitEditing={handleSearch}
                                            style={{ paddingHorizontal: 20, paddingVertical: 14, fontSize: 16, fontFamily: font.medium, flex: 1 }}

                                        />
                                        <Button bg={color.title} ph={1} pv={1} onPress={handleSearch} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} radius={1}>
                                            <Search size={18} color="#fff" />
                                        </Button>
                                    </Row>
                                </Row>
                            </Column>
                            <Title align="center" size={24} style={{ marginBottom: 10, marginTop: 40, }}>Escolha o perfil do Pet</Title>
                        </Column>
                    }

                    data={filteredData ? filteredData : data}
                    renderItem={({ item }) => <Pet pet={item} navigation={navigation} />}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => <Label align="center" style={{ marginVertical: 50, }}>Nenhum pet encontrado.</Label>}
                    contentContainerStyle={{ rowGap: 20, marginHorizontal: 28, }}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={fecthData}
                            colors={[color.sc.sc3]}
                        />
                    }
                />}
            <TabBar />
        </Main>
    )
}


const Pet = ({ pet, navigation }) => {
    const { color } = useTheme()
    const avatar = pet?.img ? { uri: pet?.img } : require('@imgs/img_default.png')
    return (
        <Card >
            <Button onPress={() => { navigation.navigate('PetsProfile', { id: pet?.id, }) }} radius={12} pv={12} ph={18} bg="#fff" >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={avatar} bg="#fff" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 100, }} />
                        <Column style={{ marginLeft: 14, }}>
                            <Title size={18} >{pet?.name}</Title>
                            <Label size={16} style={{ marginTop: 4, }}>{pet?.age} ano{pet?.age > 1 ? 's' : ''}</Label>
                        </Column>
                    </Row>
                    <Button bg={color.sc.sc3 + 30} pv={8}>
                        <LabelBT size={16} color={color.sc.sc3}>Escolher</LabelBT>
                    </Button>
                </Row>
            </Button>
        </Card>
    )
}



/**
 *  ListFooterComponent={
                    <Button onPress={() => navigation.navigate('AddPet')} radius={12} pv={12} ph={12}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Column style={{ borderRadius: 100, backgroundColor: color.sc.sc3, width: 80, height: 80, justifyContent: 'center', alignItems: 'center', }}>
                                <Plus size={38} color="#fff" strokeWidth={2} />
                            </Column>
                            <Title size={18} align="center" style={{ marginTop: 10, }}>Adicionar pet</Title>
                            <Label size={16} align="center" style={{ marginTop: 2, }}>Adicione um novo pet a sua lista</Label>
                        </Column>
                    </Button>
                }
 */