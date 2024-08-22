
import React, { useContext } from 'react';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image, Button } from '@theme/global'
import { FlatList } from 'react-native-gesture-handler';
import { Plus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Back from '@components/Back';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';

export default function PetsListScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    return (
        <Main>

            <TopMenu search={false} />
            <Column style={{ marginLeft: margin.h, marginBottom: 30, }}>
                <Back />
            </Column>
            <Title align="center">Selecione o perfil do Pet</Title>
            <FlatList
                data={pets}
                renderItem={({ item }) => <Pet pet={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-evenly', marginHorizontal: 20, }}
                contentContainerStyle={{ marginTop: 20, }}

            />

            <TabBar />
        </Main>
    )
}


const Pet = ({ pet }) => {
    const navigation = useNavigation()
    return (
        <Button onPress={() => { navigation.navigate('PetsProfile') }} radius={12} pv={12} ph={12}>
            <Column style={{}}>
                <Column style={{ borderRadius: 100, backgroundColor: pet?.color, overflow: 'hidden', width: 100, height: 100, }}>
                    <Image source={pet?.avatar} style={{ width: 110, height: 110, objectFit: 'contain', marginTop: 10, }} />
                </Column>
                <Title size={18} align="center" style={{ marginTop: 10, }}>{pet?.name}</Title>
                <Label size={16} align="center" style={{ marginTop: 2, }}>{pet?.age}</Label>
            </Column>
        </Button>
    )
}

const pets = [
    {
        name: 'Lilica',
        avatar: require('@imgs/pet1.png'),
        id: 1,
        age: '12 anos',
        color: '#E5C8C9',
    },
    {
        name: 'Lua',
        avatar: require('@imgs/pet2.png'),
        id: 1,
        age: '4 anos',
        color: '#91A6C4',
    },
    {
        name: 'Melt',
        avatar: require('@imgs/pet3.png'),
        id: 3,
        age: '6 anos',
        color: '#EBD269',
    },
    {
        name: 'Aufredo',
        avatar: require('@imgs/pet4.png'),
        id: 4,
        age: '8 anos',
        color: '#B7BCA3',
    },

]


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