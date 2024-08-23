import React, { useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image, Button, SCREEN_WIDTH } from '@theme/global'

//Components
import Back from '@components/Back';
import TabBar from '@components/TabBar';

//API
import { singlePet } from '@api/request/pets';
import { useNavigation } from '@react-navigation/native';

export default function PetsProfileScreen({ navigation, route }) {
    const id = route?.params?.id ? route?.params?.id : 1;

    const [data, setdata] = useState();
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await singlePet(id)
                console.log(res)
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
        <Main style={{ paddingTop: 0, }}>
            <Pet pet={data} />
            <TabBar />
        </Main>
    )
}


const Pet = ({ pet }) => {
    const { color, font, margin } = useTheme();
    const navigation = useNavigation()
    return (
        <Scroll>
            <Column style={{ flex: 1, }}>
                <Column style={{ zIndex: 99, marginTop: 30, marginLeft: 28, }}>
                    <Back />
                </Column>

                <Image source={{ uri: pet?.img }} style={{ width: SCREEN_WIDTH, height: 320, objectFit: 'cover', marginTop: -76, alignSelf: 'center', borderBottomLeftRadius: 130, borderBottomRightRadius: 130, }} />
                <Row style={{ backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 8, paddingVertical: 8, borderRadius: 100, marginTop: -26, justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title size={18} align="center" color={color.sc.sc3} style={{ marginHorizontal: 20, }}>{pet?.name}</Title>
                </Row>



                <Column style={{ borderTopLeftRadius: 150, borderTopRightRadius: 150, marginTop: -100, paddingTop: 180, zIndex: -99, paddingBottom: 180 }} bg="#918C8B">
                    <Row style={{ columnGap: 12, paddingHorizontal: 20, }}>
                        <Column>
                            <Title color="#fff" size={16}>Tags</Title>
                            <Title color={color.title} size={14} font={font.medium} style={{ marginVertical: 12, backgroundColor: '#E5C8C9', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' }}>{pet?.race}</Title>
                            <Title color={color.title} size={14} font={font.medium} style={{ backgroundColor: '#E5C8C9', borderRadius: 100, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' }}>{pet?.age} ano{pet?.age > 1 ? 's' : ''}</Title>
                        </Column>
                        <Column style={{ width: '70%', }}>
                            <Title color="#fff" size={16}>Bio</Title>
                            <Label color="#fff" size={14} lineHeight={16} style={{ marginTop: 12, letterSpacing: 0.2, }}>{pet?.bio ? pet?.bio : 'Nenhuma bio informada'}</Label>
                        </Column>
                    </Row>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, marginVertical: 20, columnGap: 20, }}>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, }}>
                            <Title >Banhos</Title>
                            <Label >{pet?.banhos}</Label>
                        </Column>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, }}>
                            <Title >Tosas</Title>
                            <Label >{pet?.tosas}</Label>
                        </Column>
                        <Column style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, }}>
                            <Title >Consultas</Title>
                            <Label >{pet?.consultas}</Label>
                        </Column>
                    </Row>


                    <Row style={{ justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <Button ph={4} pv={4} radius={6}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require("@imgs/pr1.png")} style={{ width: 50, height: 50, marginBottom: 6, borderRadius: 100, }} />
                                <Title size={16} color="#fff">Escola</Title>
                            </Column>
                        </Button>
                        <Button ph={4} pv={4} radius={6}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require("@imgs/pr2.png")} style={{ width: 50, height: 50, marginBottom: 6, borderRadius: 100, }} />
                                <Title size={16} color="#fff">Agenda</Title>
                            </Column>
                        </Button>
                        <Button ph={4} pv={4} radius={6} onPress={() => { navigation.navigate('PetsDiario', { id: pet?.id }) }} >
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require("@imgs/pr3.png")} style={{ width: 50, height: 50, marginBottom: 6, borderRadius: 100, }} />
                                <Title size={16} color="#fff">Diário</Title>
                            </Column>
                        </Button>
                    </Row>

                </Column>

            </Column>
        </Scroll>
    )
}

/*
 <Button ph={4} pv={4} radius={6}>
                            <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require("@imgs/pr4.png")} style={{ width: 50, height: 50, marginBottom: 6, }} />
                                <Title size={16} color="#fff">Novo</Title>
                            </Column>
                        </Button>
*/


