import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image, Button, SCREEN_WIDTH, Loader, LabelBT } from '@theme/global'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TabBar from '@components/TabBar';
import { listDiario } from '@api/request/pets';
import { formatDateTime } from '@hooks/utils';

import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import TopMenu from '@components/Header/topmenu';

import Animated from 'react-native-reanimated';

export default function ServicesDiarioScreen({ navigation, route }) {
    const { color, margin } = useTheme();
    const id = route.params?.id 
    const pet = route.params?.pet
    const tipo = route.params?.tipo

    const [loading, setloading] = useState();
    const [data, setdata] = useState();

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await listDiario(id, tipo)
                console.log(res)
                setdata(res)
            } catch (error) {
                console.log(error)
            } finally { setloading(false) }
        }
        fecthData()
    }, [])

    return (
        <Main>
            <Scroll>
                <TopMenu />
                <Row style={{ backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center', borderRadius: 12, alignItems: 'center', marginVertical: 12, marginHorizontal: margin.h, paddingVertical: 6, paddingHorizontal: 8, }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={{ uri: pet?.img }} style={{ width: 56, height: 56, borderRadius: 12, objectFit: 'cover', }} />
                        <Column style={{ justifyContent: 'center', marginVertical: 20, marginHorizontal: 12, }}>
                            <Title size={18}>{pet?.name}</Title>
                        </Column>
                    </Row>

                    <Button pv={6} ph={14} style={{ backgroundColor: color.sc.sc3 + 30, }} onPress={() => { navigation.navigate('PetsList') }} >
                        <LabelBT size={16} color={color.sc.sc3}>Alterar</LabelBT>
                    </Button>
                </Row>

                {loading ? <Loader /> :
                    <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item, index }) => <CardDiario item={item} index={index} />}
                    showsVerticalScrollIndicator={false}
                    updateCellsBatchingPeriod={500}
                    initialNumToRender={5}
                    ListEmptyComponent={<Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 50, }}><Label>Nenhuma publicação encontrada.</Label></Column>}
                    maxToRenderPerBatch={5}
                    onEndReachedThreshold={0.5} // Define o quão próximo do fim da lista a função deve ser chamada
                    ListFooterComponent={<Column style={{ marginVertical: 20, height: 120, }} />}
                />}

            </Scroll>
            <TabBar />
        </Main>
    )
}

const CardDiario = ({ item, index }) => {
    const { margin } = useTheme();
    const navigation = useNavigation()
    const { criado_em, descricao, imgs } = item
    const { name, avatar } = item?.colaborador
    const img = avatar ? { uri: avatar } : require('@imgs/btn-sobre-nos.png')
    const galeria = [imgs.primary, imgs.secondary, imgs.tertiary, imgs.quaternary,]
    const good = galeria.filter(i => i !== null)
    return (
        <Animated.View>
            <Column mv={4} bg="#fff" style={{ paddingBottom: 20, }}>
                <Row style={{ alignItems: 'center', marginTop: 12, }} mh={margin.h}>
                    <Image source={img} style={{ width: 54, marginRight: 12, height: 54, borderRadius: 8, backgroundColor: '#fff', }} />
                    <Column style={{ justifyContent: 'center', rowGap: 5, }}>
                        <Title size={18}>{name}</Title>
                        <Label size={14}>{formatDateTime(criado_em)}</Label>
                    </Column>
                </Row>
                <Column mh={margin.h}>
                    <RenderHtml
                        contentWidth={0.8 * SCREEN_WIDTH}
                        source={{ html: descricao }}
                    />
                </Column>
                <ScrollView horizontal contentContainerStyle={{ columnGap: 20, }} showsHorizontalScrollIndicator={false}>
                    <Column style={{ width: 10, }} />
                    {good.map((item, index) => <Button radius={12} pv={1} ph={1} onPress={() => { navigation.navigate('PetsSingleGaleria', { img: item }) }} >
                        <Image source={{ uri: 'https://app.aocto.com/' + item }} key={index} style={{ width: 240, height: 240, borderRadius: 12, alignSelf: 'center', objectFit: 'cover', backgroundColor: '#30303050', }} />
                    </Button>
                    )}
                    <Column style={{ width: 28, }} />
                </ScrollView>
            </Column>
        </Animated.View>

    )
}

