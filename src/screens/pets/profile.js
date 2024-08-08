import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image, Button, SCREEN_WIDTH } from '@theme/global'
import { FlatList } from 'react-native-gesture-handler';
import { Pencil, Plus } from 'lucide-react-native';

export default function PetsProfileScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    return (
        <Main>
            <FlatList
                data={pets}
                renderItem={({ item }) => <Pet pet={item} />}
                horizontal
                pagingEnabled
                keyExtractor={item => item.id}
                style={{ flex: 1, }}
            />
        </Main>
    )
}


const Pet = ({ pet }) => {
    const { color, font, margin } = useTheme();
    return (
        <Column bg={color.primary} style={{ flex: 1, width: SCREEN_WIDTH,}}>
            <Column style={{ borderBottomLeftRadius: 100, borderBottomRightRadius: 100, backgroundColor: pet?.color, overflow: 'hidden', width: SCREEN_WIDTH, height: 300, }}>
                <Image source={pet?.avatar} style={{ width: 300, height: 320, objectFit: 'contain', marginTop: 10, alignSelf: 'center', }} />
            </Column>
            <Row style={{ backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 8, paddingVertical: 8, borderRadius: 100, marginTop: -26, justifyContent: 'space-between', alignItems: 'center', }}>
                <Title size={18} align="center" color={color.sc.sc3} style={{ marginHorizontal: 20, }}>{pet?.name}</Title>
                <Button ph={1} pv={1} style={{ backgroundColor: color.sc.sc3 + 40, justifyContent: 'center', alignItems: 'center', width: 36, height: 36, }}><Pencil size={18} color={color.sc.sc3} /></Button>
            </Row>

            <Column  style={{ borderTopLeftRadius: 150, borderTopRightRadius: 150, marginTop: -100, paddingTop: 120, zIndex: -99, }}>
                <Row style={{ columnGap: 12, paddingHorizontal: 20, }}>
                    <Column>
                        <Title color="#fff" size={16}>Tags</Title>
                        <Title color="#fff" size={14} font={font.medium} style={{ marginTop: 12, backgroundColor: pet?.color, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' }}>{pet?.type}</Title>
                        <Title color="#fff" size={14} font={font.medium} style={{ marginVertical: 6, backgroundColor: pet?.color, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' }}>{pet?.genero}</Title>
                        <Title color="#fff" size={14} font={font.medium} style={{ backgroundColor: pet?.color, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' }}>{pet?.age}</Title>
                    </Column>
                    <Column style={{ width: '70%', }}>
                        <Title color="#fff" size={16}>Bio</Title>
                        <Label color="#fff" size={14} lineHeight={16} style={{ marginTop: 12, letterSpacing: 0.2, }}>{pet?.bio}</Label>
                    </Column>
                </Row>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  marginHorizontal: margin.h, marginVertical: 20, }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12, }}>
                        <Label>Banhos</Label>
                        <Title>{pet?.banhos}</Title>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12, }}>
                        <Label>Tosas</Label>
                        <Title>{pet?.tosas}</Title>
                    </Column>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 12, }}>
                        <Label>Consultas</Label>
                        <Title>{pet?.consultas}</Title>
                    </Column>
                </Row>


                <Row style={{ justifyContent: 'space-evenly', alignItems: 'center', }}>
                    <Button ph={4} pv={4} radius={6}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require("@imgs/pr1.png")} style={{ width: 50, height: 50, marginBottom: 6, }} />
                            <Title size={16} color="#fff">Escola</Title>
                        </Column>
                    </Button>
                    <Button ph={4} pv={4} radius={6}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require("@imgs/pr2.png")} style={{ width: 50, height: 50, marginBottom: 6, }} />
                            <Title size={16} color="#fff">Agenda</Title>
                        </Column>
                    </Button>
                    <Button ph={4} pv={4} radius={6}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require("@imgs/pr3.png")} style={{ width: 50, height: 50, marginBottom: 6, }} />
                            <Title size={16} color="#fff">Diário</Title>
                        </Column>
                    </Button>
                    <Button ph={4} pv={4} radius={6}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image source={require("@imgs/pr4.png")} style={{ width: 50, height: 50, marginBottom: 6, }} />
                            <Title size={16} color="#fff">Novo</Title>
                        </Column>
                    </Button>

                </Row>

            </Column>




        </Column>
    )
}




const pets = [
    {
        name: 'Aufredo',
        avatar: require('@imgs/pet4.png'),
        id: 4,
        type: 'Dog',
        genero: 'Macho',
        age: '8 anos',
        banhos: 23,
        tosas: 12,
        consultas: 8,
        bio: 'Alfredo é um cachorro amigável e brincalhão, com um pelo macio e brilhante. Ele adora correr no parque e fazer novos amigos, tanto humanos quanto outros bichinhos.',
        color: '#B7BCA3',
    },

    {
        name: 'Melt',
        avatar: require('@imgs/pet3.png'),
        id: 3,
        type: 'Dog',
        genero: 'Macho',
        age: '6 anos',
        color: '#EBD269',
        bio: 'Melt é um cachorro massa de mais.',
        banhos: 12,
        tosas: 5,
        consultas: 6,
    }



]
