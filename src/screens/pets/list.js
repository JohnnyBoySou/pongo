
import React, { useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image, Button, Back, Loader, } from '@theme/global'
import { FlatList } from 'react-native-gesture-handler';
//components
import TopMenu from '@components/Header/topmenu';
//API
import { listPets } from '@api/request/pets';
import TabBar from '@components/TabBar';



export default function PetsListScreen({ navigation, }) {
    const { color, font, margin } = useTheme();

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState();
    useEffect(() => {
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

        fecthData()
    }, []);


    return (
        <Main>
            <TopMenu search={false} />
            <Column style={{ marginLeft: margin.h, marginVertical: 20, }}>
                <Back />
            </Column>
            <Title align="center">Selecione o perfil do Pet</Title>

            {loading ? <Loader /> : 
            <FlatList
                data={data}
                renderItem={({ item }) => <Pet pet={item} navigation={navigation} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-evenly', marginHorizontal: 20, }}
                contentContainerStyle={{ marginTop: 20, }}

            />}

            <TabBar />
        </Main>
    )
}


const Pet = ({ pet, navigation }) => {
    const avatar = pet?.img ? { uri: pet?.img } : require('@imgs/img_default.png')
    return (
        <Button onPress={() => { navigation.navigate('PetsProfile', { id: pet?.id, }) }} radius={12} pv={12} ph={12}>
            <Column style={{}}>
                <Image source={avatar} bg="#fff" style={{ width: 110, height: 110, objectFit: 'cover', marginTop: 10, borderRadius: 100,  }} />
                <Title size={18} align="center" style={{ marginTop: 10, }}>{pet?.name}</Title>
                <Label size={16} align="center" style={{ marginTop: 2, }}>{pet?.age} anos</Label>
            </Column>
        </Button>
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