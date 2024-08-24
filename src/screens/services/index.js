import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, ScrollView, Image, } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Loader, LabelBT } from '@theme/global';
import { FlatList } from 'react-native-gesture-handler';

//components
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';
import { formatDateTime } from '@hooks/utils';

//API
import { listServices } from '@api/request/services';
import { useNavigation } from '@react-navigation/native';
import { servicesData } from '@api/data/services';
import { ArrowLeft } from 'lucide-react-native';

export default function ServicesScreen({ navigation, }) {

    const { color, font, margin } = useTheme();
    const [query, setquery] = useState();
    const [focus, setfocus] = useState(false);
    const handleSearch = () => {
    }


    const [data, setdata] = useState([]);
    const [loading, setloading] = useState();
    const [page, setpage] = useState(1);
    const [selectService, setselectService] = useState('');
    const [filter, setfilter] = useState();


    const [grooming, setgrooming] = useState();
    const [vet, setvet] = useState();
    const [hospitality, sethospitality] = useState();
    const [creche, setcreche] = useState();
    const [escola, setescola] = useState();

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await listServices(page)
                console.log(res.dadospethospitalities?.data)
                setgrooming(res.dadosgroomings?.data)
                setvet(res.dadosvet?.data)
                sethospitality(res.dadospethospitalities?.data)
                setcreche(res.dadoscreche?.data)
                setescola(res.dadosescolapacotes?.data)


            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fecthData()
    }, [selectService, page,]);
    const [filteredData, setfilteredData] = useState();

    const handleFilter = (item) => {
        setfilter(item)
        setfilteredData(data.filter(i => i.id_service == item.id))
    }

    return (
        <Main >
            <Scroll>
                <TopMenu back={false} search={false} />

                {selectService ?
                    <Column>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 12 }}>
                            <Button onPress={() => { setselectService(''); setfilteredData([]) }} ph={1} pv={1} style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, marginLeft: 28, }} bg="#fff">
                                <ArrowLeft size={20} color={color.label} />
                            </Button>


                            {selectService?.itens?.map((item, index) => (
                                <Button key={index} onPress={() => { handleFilter(item) }} style={{ backgroundColor: filter?.id == item?.id ? color.sc.sc3 : 'transparent', }} ph={15} pv={10}>
                                    <LabelBT size={14} style={{ textAlign: 'center', color: filter?.id == item?.id ? '#fff' : color.label, }}>{item.name}</LabelBT>
                                </Button>
                            ))}
                            <Column style={{ width: margin.h, }} />
                        </ScrollView>

                        <Column mh={margin.h} mv={20} >
                            {loading ? <Loader size={28} /> :
                                <FlatList
                                    data={filteredData ? filteredData : selectService.name == 'Grooming' ? grooming : selectService.name == 'Veterinario' ? vet : selectService.name == 'Hotel' ? hospitality : selectService.name == 'Creche' ? creche : selectService.name == 'Escola' ? escola : []}
                                    keyExtractor={item => item.id}
                                    windowSize={4}
                                    updateCellsBatchingPeriod={100}
                                    maxToRenderPerBatch={4}
                                    initialNumToRender={4}
                                    ListEmptyComponent={() => <Label size={16} style={{ textAlign: 'center', marginVertical: 60 }}>Nenhum resultado encontrado.</Label>}
                                    renderItem={({ item }) => <Card item={item} navigation={navigation} />}
                                />}
                        </Column>

                        <Column style={{ height: 60 }} />
                    </Column>

                    : <Column mh={margin.h}>
                        <Title size={26} style={{ marginVertical: 12, }}>Escolha um serviço</Title>
                        <FlatList
                            style={{ marginTop: 6, }}
                            data={servicesData}
                            columnWrapperStyle={{  columnGap: 20, }}
                            contentContainerStyle={{ rowGap: 20, }}
                            renderItem={({ item }) => <CardService item={item} setselectService={setselectService} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                        />
                        <Button style={{ backgroundColor: color.pr.pr1, }} pv={16} marginTop={24} marginBottom={24}>
                            <LabelBT style={{ color: color.light, textAlign: 'center' }}>Solicitar novo serviço</LabelBT>
                        </Button>
                        <Column style={{ height: 100 }} />
                    </Column>}
            </Scroll>
            <TabBar />
        </Main >
    )
}


const Card = ({ item, navigation }) => {
    const { color, font, margin } = useTheme()
    const { name, id, img, status, criado_em, entrada, payment, value, pet, } = item

    const types = [
        {
            name: 'Não iniciado',
            color: '#788BA4',
        },
        {
            name: 'Em andamento',
            color: '#EBD269'
        },
        {
            name: 'Concluído',
            color: '#778428'
        },
        {
            name: 'Cancelado',
            color: '#C9A9AA'
        },
        {
            name: null,
            color: '#303030'
        }
    ];
    const selectStatus = types.find(i => i.name == status)
    return (
        <Button onPress={() => { navigation.navigate('ServicesSingle', { pet: item, id: item.id, }) }} radius={2} pv={1} ph={1}>
            <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
                <Row style={{ alignItems: 'flex-start', }}>
                    <Image
                        source={{ uri: img, }}
                        style={{ width: 62, height: 80, borderRadius: 12, borderWidth: 0.8, borderColor: '#ecebeb', objectFit: 'contain' }} />
                    <Column mh={12} >
                        <Label style={{ fontSize: 14, color: '#434343', fontWeight: 700, marginBottom: 3 }}>{name}</Label>
                        <Label style={{ fontSize: 10, color: '#858585', fontWeight: 200, marginBottom: 8 }}>Pedido #{id}</Label>
                        <Label style={{ fontSize: 14, color: '#858585', fontWeight: 600 }}>R$ {value},00</Label>
                    </Column>
                    <Column style={{ backgroundColor: selectStatus.color, borderBottomLeftRadius: 8, position: 'absolute', right: -15, top: -15, }}>
                        <Title style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                            {status ? status : 'Não informado'}
                        </Title>
                    </Column>
                </Row>
                <Column style={{ marginTop: 12 }}>
                    <Label size={14} marginBottom={6}>Data da compra: {formatDateTime(criado_em)}</Label>
                    <Label size={14} marginBottom={6}>Agendamento: {formatDateTime(entrada)}</Label>
                    <Label size={14} marginBottom={6}>Pagamento: {payment?.type ? payment?.type : 'Não informado'}, {payment?.vezes > 1 ? 'x' + payment?.vezes : 'à vista'}</Label>
                    <Row>
                        <Image source={{ uri: pet?.img }} style={{ width: 54, height: 54, borderRadius: 100, objectFit: 'conver' }} />
                        <Label size={14} marginBottom={6}>Pet: {pet?.name}</Label>
                    </Row>
                </Column>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }} >
                    <Row>

                    </Row>
                    <Title style={{ fontSize: 12, lineHeight: 15, color: '#858585', fontWeight: 500 }}>{pet?.item} item: R$ {value},00</Title>
                </Row>
            </Column>
        </Button>

    )
}

const CardService = ({ item, setselectService }) => {
    const { name, label, price, img } = item
    return (
        <Button pv={12} ph={12} radius={12} mh={0} mv={0} style={{ backgroundColor: '#FFF', flexGrow: 1, }} onPress={() => { setselectService(item) }} >
                <Column>
                    <Image source={img} style={{ width: 76, height: 76, borderRadius: 8, marginRight: 12, }} />
                    <Column style={{ justifyContent: 'center', }}>
                        <Column style={{ height: 12, }} />
                        <Title size={16}>{name}</Title>
                        <Column style={{ height: 6, }} />
                        <Label size={14}>{label}</Label>
                        <Column style={{ height: 12, }} />
                    </Column>
                </Column>
        </Button>
    )
}





/**
 * 
 * const images = [
    'https://thoseoldpets.co.uk/wp-content/uploads/2022/08/img_1899-2-1.png',
    'https://thoseoldpets.co.uk/wp-content/uploads/2022/08/img_1899-2-1.png',
    'https://thoseoldpets.co.uk/wp-content/uploads/2022/08/img_1899-2-1.png'
];
 * const ItemAlternative = ({ item }) => {
    const { color, font, margin } = useTheme()
    const { name } = item

    return (
        <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <Column style={{ alignItems: 'flex-start', }}>

                <FlatList
                    data={images.slice(0, 4)}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Column style={{ position: 'relative', marginRight: 10 }}>
                            <Image source={{ uri: item }} style={{ width: 62, height: 80, borderRadius: 12, borderWidth: 0.8, borderColor: '#ecebeb', objectFit: 'contain' }} />
                            {index === 3 && images.length > 4 && (
                                <Column style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', borderRadius: 12 }}>
                                    <Label style={{ color: '#fff', fontWeight: 'bold' }}>+{images.length - 4} itens</Label>
                                </Column>
                            )}
                        </Column>
                    )}
                />

                <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                    <Column style={{ marginTop: 16 }} >
                        <Label style={{ fontSize: 14, color: '#434343', fontWeight: 700, marginBottom: 3 }}>{name}</Label>
                        <Label style={{ fontSize: 10, color: '#858585', fontWeight: 200, marginBottom: 8 }}>Pedido #987654323456</Label>
                        <Label style={{ fontSize: 14, color: '#858585', fontWeight: 600 }}>R$300,00</Label>
                    </Column>
                    <Column style={{ backgroundColor: color.sc.sc3, borderRadius: 8, marginTop: 13 }}>
                        <Title style={{ fontSize: 10, paddingHorizontal: 8, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                            Informações
                        </Title>
                    </Column>
                </Row>

            </Column>
            <Column style={{ marginTop: 12 }}>
                <Label size={14} marginBottom={6}>Data da compra: 12/06/2024 as 14:23:00</Label>
                <Label size={14} marginBottom={6}>Previsão de entrega: 14/06/2024</Label>
                <Label size={14} marginBottom={6}>Pagamento: Crédito 3x</Label>
                <Label size={14} marginBottom={6}>Pets: 2 (Aufredo, Pitoco)</Label>
            </Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }} >
                <Row>
                </Row>
                <Title style={{ fontSize: 12, color: '#858585', fontWeight: 500 }}>2 item: R$300,00</Title>
            </Row>
        </Column >
    )
}


                <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, }}>
                    <Pressable onPress={() => { navigation.goBack() }} style={{ backgroundColor: '#fff', width: 70, height: 36, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                        <ArrowLeft color="#242424" />
                    </Pressable>

                    <Column style={{ flex: 1, marginLeft: 32, height: 36 }}>
                        <Row style={{ alignItems: 'center', backgroundColor: '#fff', borderRadius: 30, paddingLeft: 12 }}>

                            <Search color="#858585" style={{ width: '10%' }} />
                            <TextInput
                                value={query}
                                onChangeText={e => { setquery(e); query?.length > 3 ? handleSearch() : null }}
                                onFocus={() => setfocus(true)}
                                onBlur={() => setfocus(false)}
                                placeholder='Buscar'
                                placeholderTextColor={color.title + 60}
                                onSubmitEditing={handleSearch}
                                style={{ borderRadius: 30, padding: 6, width: '90%', fontFamily: font.bold, fontSize: 16, color: color.secundary, borderWidth: 2, borderColor: focus ? color.primary : '#fff' }}
                            />

                        </Row>
                    </Column>

                </Row>
 */