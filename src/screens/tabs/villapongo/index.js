import React, { } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Card from '@components/Card';
export default function VillaPongoScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    return (
        <Main>
            <Scroll>
                <Column>

                    <TopMenu search={false} back={false} />
                    <Column mh={margin.h} mv={20}>
                        <Title size={26}>Serviços</Title>
                        <FlatList
                            style={{ marginTop: 20, }}
                            data={data}
                            renderItem={({ item }) => <CardServices item={item} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            initialNumToRender={10}
                            contentContainerStyle={{ rowGap: 20, }}
                            maxToRenderPerBatch={10}
                            removeClippedSubviews
                        />
                    </Column>

                </Column>
            </Scroll>
        </Main>
    )
}

const CardServices = ({ item }) => {
    const { name, img } = item
    const navigation = useNavigation()
    return (
        <Card num={12}>
            <Button pv={12} ph={12} radius={12} mh={0} mv={0} style={{ backgroundColor: '#FFF', }} onPress={() => { navigation.navigate(item.screen) }} >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Row>
                        <Image style={{ width: 72, height: 72, borderRadius: 8, marginRight: 12, }} source={img} />
                        <Column style={{ justifyContent: 'center', }}>
                            <Title size={16}>{name}</Title>
                            <Column style={{ height: 4, }} />
                            <Label size={14}>Clique e saiba mais</Label>
                        </Column>
                    </Row>
                    <Column>
                    </Column>
                </Row>
            </Button>
        </Card>
    )
}

const data = [
    {
        name: 'ESCOLA',
        time: 'Tempo de duração',
        id: 3,
        img: require('@imgs/escola.png'),
        screen: 'School',
    },
    {
        name: 'HOTEL',
        time: 'Tempo de duração',
        id: 1,
        img: require('@imgs/hotel.png'),
        screen: 'Hotel',
    },
    {
        name: 'DAY USE',
        time: 'Tempo de duração',
        id: 2,
        img: require('@imgs/day use.png'),
        screen: 'DayUse',
    },
    {
        name: 'VET',
        time: 'Tempo de duração',
        id: 4,
        img: require('@imgs/vet.png'),
        screen: 'Veterinario',
    },

]

/*
{
        name: 'GROOMING',
        time: 'Tempo de duração',
        id: 5,
        img: require('@imgs/grooming.png'),
        screen: 'Grooming',
    },
 */