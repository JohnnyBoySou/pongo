import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, ScrollView, Image, } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Loader, LabelBT, Back } from '@theme/global';
import { FlatList } from 'react-native-gesture-handler';

//components
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';
import { formatDateTime, formatCurrency } from '@hooks/utils';

//API
import { listServices } from '@api/request/services';
import { servicesData } from '@api/data/services';
import { ArrowLeft } from 'lucide-react-native';
import ButtonPrimary from '@components/Buttons/index';
import Card from '@components/Card';
export default function ServicesScreen({ navigation, }) {

    const { color, font, margin } = useTheme();

    const [loading, setloading] = useState();
    const [page, setpage] = useState(1);
    const [selectService, setselectService] = useState();

    const [grooming, setgrooming] = useState([]);
    const [vet, setvet] = useState([]);
    const [hospitality, sethospitality] = useState([]);
    const [escola, setescola] = useState([]);
    const [creche, setcreche] = useState([]);

    const [groomingTypes, setgroomingTypes] = useState();
    const [vetTypes, setvetTypes] = useState();
    const [hotelTypes, sethotelTypes] = useState();
    const [escolaTypes, setescolaTypes] = useState();
    const [crecheTypes, setcrecheTypes] = useState();

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await listServices(page, filter?.name)
                const extractAndFormatData = (data) => {
                    return data ? Array.from(new Set(data.map(item => `${item.id_service}-${item.name}`)))
                        .map(key => ({ id: parseInt(key.split('-')[0]), name: key.split('-')[1] }))
                        : [];
                };

                const dataGrooming = res.dadosgroomings?.data.length > 0 ? res.dadosgroomings?.data : grooming;
                const dataVet = res.dadosvet?.data.length > 0 ? res.dadosvet?.data : vet;
                const dataHotel = res.dadospethospitalities?.data.length > 0 ? res.dadospethospitalities?.data : hospitality;
                const dataEscola = res.dadosescolapacotes?.data.length > 0 ? res.dadosescolapacotes?.data : escola;
                const dataCreche = res.dadoscreche?.data.length > 0 ? res.dadoscreche?.data : creche;

                setgrooming(dataGrooming);
                setvet(dataVet);
                sethospitality(dataHotel);
                setescola(dataEscola);
                setcreche(dataCreche);

                setcrecheTypes(extractAndFormatData(dataCreche));
                setgroomingTypes(extractAndFormatData(dataGrooming));
                setvetTypes(extractAndFormatData(dataVet));
                sethotelTypes(extractAndFormatData(dataHotel));
                setescolaTypes(extractAndFormatData(dataEscola));

            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fecthData()
    }, [page]);
    const [filteredData, setfilteredData] = useState();

    const handleFilter = (item) => {
        if (item == 'tudo') {
            setfilter({ name: 'Tudo', id: 0, })
            setfilteredData()
            return
        }
        setfilter(item)
        const data = selectService?.name == 'Grooming' ? grooming : selectService?.name == 'Veterinario' ? vet : selectService?.name == 'Hotel' ? hospitality : selectService?.name == 'Escola' ? escola : []
        setfilteredData(data.filter(i => i.id_service == item.id))
    }
    const data = filteredData ? filteredData : selectService?.name == 'Grooming' ? grooming : selectService?.name == 'Veterinario' ? vet : selectService?.name == 'Hotel' ? hospitality : selectService?.name == 'Escola' ? escola : selectService?.name == 'Day use' ? creche : []
    const types = selectService?.name == 'Grooming' ? groomingTypes : selectService?.name == 'Veterinario' ? vetTypes : selectService?.name == 'Hotel' ? hotelTypes : selectService?.name == 'Escola' ? escolaTypes : selectService?.name == 'Day use' ? crecheTypes : []
    const [filter, setfilter] = useState({ name: 'Tudo', id: 0, });

    return (
        <Main >
            <Scroll>
                <TopMenu back={false} search={false} />

                {selectService ?
                    <Column>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 12 }}>
                            <Button onPress={() => { setselectService(); handleFilter('tudo'); }} ph={1} pv={1} style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, marginLeft: 28, }} bg="#fff">
                                <ArrowLeft size={20} color={color.label} />
                            </Button>

                            <Button onPress={() => { handleFilter('tudo'); }} style={{ backgroundColor: filter?.id == 0 ? color.sc.sc3 : color.off, }} ph={15} pv={10}>
                                <LabelBT size={14} style={{ textAlign: 'center', color: filter?.id == 0 ? '#fff' : color.label, }}>Tudo</LabelBT>
                            </Button>
                            {types?.map((item, index) => (
                                <Button key={index} onPress={() => { handleFilter(item) }} style={{ backgroundColor: filter?.id == item?.id ? color.sc.sc3 : color.off, }} ph={15} pv={10}>
                                    <LabelBT size={14} style={{ textAlign: 'center', color: filter?.id == item?.id ? '#fff' : color.label, }}>{item.name}</LabelBT>
                                </Button>
                            ))}
                            <Column style={{ width: margin.h, }} />
                        </ScrollView>

                        <Column mh={margin.h} mv={20} >
                            {loading ? <Loader size={28} /> :
                                <FlatList
                                    data={data}
                                    keyExtractor={item => item.id}
                                    windowSize={4}
                                    updateCellsBatchingPeriod={100}
                                    contentContainerStyle={{ rowGap: 24, }}
                                    maxToRenderPerBatch={4}
                                    initialNumToRender={4}
                                    ListEmptyComponent={() => <Label size={16} style={{ textAlign: 'center', marginVertical: 60 }}>Nenhum resultado encontrado.</Label>}
                                    renderItem={({ item }) => <CardItem item={item} navigation={navigation} type={selectService.type} selectService={selectService} />}
                                    ListFooterComponent={() => <Column style={{ height: 60 }} >
                                        {data.length > 1 && <ButtonPrimary label="Mostrar mais" onPress={() => { setpage(page + 1) }} />}
                                    </Column>}
                                />}
                        </Column>

                        <Column style={{ height: 120 }} />
                    </Column>

                    : <Column mh={margin.h}>
                        <Back />
                        <Title size={26} style={{ marginVertical: 12, }}>Escolha um serviço</Title>
                        <FlatList
                            style={{ marginTop: 6, }}
                            data={servicesData}
                            columnWrapperStyle={{ columnGap: 20, }}
                            contentContainerStyle={{ rowGap: 20, }}
                            renderItem={({ item }) => <CardService item={item} setselectService={setselectService} />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                        />

                        <Column style={{ height: 120 }} />
                    </Column>}
            </Scroll>
            <TabBar />
        </Main >
    )
}


const CardItem = ({ item, navigation, type, selectService }) => {
    const { margin, color, font } = useTheme()
    const { name, id, img, status, criado_em, entrada, payment, value, pet, check_in, check_out } = item
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

    if (type == 'escola_pacote') {
        return (
            <Card num={14}>
                <Button onPress={() => { navigation.navigate('ServicesSingle', { pet: item, id: item.id, service: selectService }) }} radius={12} pv={1} ph={1}>
                    <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', }}>
                        <Row style={{ alignItems: 'flex-start', alignItems: 'center', }}>
                            <Image
                                source={selectService.img}
                                style={{ width: 62, height: 80, borderRadius: 12, objectFit: 'contain' }} />
                            <Column mh={12} >
                                <Title size={14} style={{ marginBottom: 3 }}>{item?.name}</Title>
                                <Label size={10} style={{ marginBottom: 8 }}>Pedido #{id}</Label>
                                <Label size={14} >{formatCurrency(value)}</Label>
                            </Column>
                            <Column style={{ backgroundColor: selectStatus.color, borderBottomLeftRadius: 8, position: 'absolute', right: -15, top: -15, }}>
                                <Title style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                                    {status ? status : 'Não iniciado'}
                                </Title>
                            </Column>
                        </Row>
                        <Column style={{ marginTop: 12 }}>
                            <Label size={14} marginBottom={6}>Check-in: {formatDateTime(check_in)}</Label>
                            <Label size={14} marginBottom={6}>Check-out: {formatDateTime(check_out)}</Label>
                            <Label size={14} marginBottom={6}>Pet: {pet?.name}</Label>
                        </Column>
                    </Column>
                </Button>
            </Card>

        )
    }
    else if (type == 'grooming') {
        return (
            <Card num={14}>
                <Button onPress={() => { navigation.navigate('ServicesSingle', { pet: item, id: item.id, service: selectService }) }} radius={12} pv={1} ph={1}>
                    <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', }}>
                        <Row style={{ alignItems: 'flex-start', alignItems: 'center', }}>
                            <Image
                                source={selectService.img}
                                style={{ width: 62, height: 80, borderRadius: 12, objectFit: 'contain' }} />
                            <Column mh={12} >
                                <Title size={14} style={{ marginBottom: 3 }}>{item?.name}</Title>
                                <Label size={10} style={{ marginBottom: 8 }}>Pedido #{id}</Label>
                                <Label size={14} >{formatCurrency(value)}</Label>
                            </Column>
                            <Column style={{ backgroundColor: selectStatus.color, borderBottomLeftRadius: 8, position: 'absolute', right: -15, top: -15, }}>
                                <Title style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                                    {status ? status : 'Não iniciado'}
                                </Title>
                            </Column>
                        </Row>
                        <Column style={{ marginTop: 12 }}>
                            <Label size={14} marginBottom={6}>Data da compra: {formatDateTime(criado_em)}</Label>
                            <Label size={14} marginBottom={6}>Agendamento: {formatDateTime(entrada)}</Label>
                            <Label size={14} marginBottom={6}>Pet: {pet?.name}</Label>
                        </Column>
                    </Column>
                </Button>
            </Card>
        )
    }
    else if (type == 'vet') {
        return (
            <Card num={14}>
                <Button onPress={() => { navigation.navigate('ServicesSingle', { pet: item, id: item.id, service: selectService }) }} radius={12} pv={1} ph={1}  >
                    <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', }}>
                        <Row style={{ alignItems: 'flex-start', alignItems: 'center', }}>
                            <Image
                                source={selectService.img}
                                style={{ width: 62, height: 80, borderRadius: 12, objectFit: 'contain' }} />
                            <Column mh={12} >
                                <Title size={14} style={{ marginBottom: 3 }}>{item?.name}</Title>
                                <Label size={10} style={{ marginBottom: 8 }}>Pedido #{id}</Label>
                                <Label size={14} >{formatCurrency(value)}</Label>
                            </Column>
                            <Column style={{ backgroundColor: selectStatus.color, borderBottomLeftRadius: 8, position: 'absolute', right: -15, top: -15, }}>
                                <Title style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                                    {status ? status : 'Não iniciado'}
                                </Title>
                            </Column>
                        </Row>
                        <Column style={{ marginTop: 12 }}>
                            <Label size={14} marginBottom={6}>Data da compra: {formatDateTime(criado_em)}</Label>
                            <Label size={14} marginBottom={6}>Agendamento: {formatDateTime(entrada)}</Label>
                            <Label size={14} marginBottom={6}>Pet: {pet?.name}</Label>
                        </Column>
                    </Column>
                </Button>
            </Card>
        )
    }
    else if (type == 'hospitalitie') {
        return (
            <Card num={14}>
                <Button onPress={() => { navigation.navigate('ServicesSingle', { pet: item, id: item.id, service: selectService }) }} radius={12} pv={1} ph={1}>
                    <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', }}>
                        <Row style={{ alignItems: 'flex-start', alignItems: 'center', }}>
                            <Image
                                source={selectService.img}
                                style={{ width: 62, height: 80, borderRadius: 12, objectFit: 'contain' }} />
                            <Column mh={12} >
                                <Title size={14} style={{ marginBottom: 3 }}>{item?.name}</Title>
                                <Label size={10} style={{ marginBottom: 8 }}>Pedido #{id}</Label>
                                <Label size={14} >{formatCurrency(value)}</Label>
                            </Column>
                            <Column style={{ backgroundColor: selectStatus.color, borderBottomLeftRadius: 8, position: 'absolute', right: -15, top: -15, }}>
                                <Title style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                                    {status ? status : 'Não iniciado'}
                                </Title>
                            </Column>
                        </Row>
                        <Column style={{ marginTop: 12 }}>
                            <Label size={14} marginBottom={6}>Data da compra: {formatDateTime(criado_em)}</Label>
                            <Label size={14} marginBottom={6}>Check-in: {formatDateTime(check_in)}</Label>
                            <Label size={14} marginBottom={6}>Check-out: {formatDateTime(check_out)}</Label>
                        </Column>
                    </Column>
                </Button>
            </Card>
        )
    }
    return (
        <Button onPress={() => { navigation.navigate('ServicesSingle', { pet: item, id: item.id, service: selectService }) }} radius={2} pv={1} ph={1}>
            <Column pv={15} ph={15} style={{ backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
                <Row style={{ alignItems: 'flex-start', alignItems: 'center', }}>
                    <Image
                        source={selectService.img}
                        style={{ width: 62, height: 80, borderRadius: 12, objectFit: 'contain' }} />
                    <Column mh={12} >
                        <Title size={14} style={{ marginBottom: 3 }}>{item?.name}</Title>
                        <Label size={10} style={{ marginBottom: 8 }}>Pedido #{id}</Label>
                        <Label size={14} >{formatCurrency(value)}</Label>
                    </Column>
                    <Column style={{ backgroundColor: selectStatus.color, borderBottomLeftRadius: 8, position: 'absolute', right: -15, top: -15, }}>
                        <Title style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                            {status ? status : 'Não iniciado'}
                        </Title>
                    </Column>
                </Row>
                <Column style={{ marginTop: 12 }}>
                    <Label size={14} marginBottom={6}>Data da compra: {formatDateTime(criado_em)}</Label>
                    <Label size={14} marginBottom={6}>Agendamento: {formatDateTime(entrada)}</Label>
                    <Label size={14} marginBottom={6}>Check-in: {formatDateTime(check_in)}</Label>
                    <Label size={14} marginBottom={6}>Check-out: {formatDateTime(check_out)}</Label>
                    <Label size={14} marginBottom={6}>Colaborador responsável: {item?.colaborador}</Label>
                    <Label size={14} marginBottom={6}>Pet: {pet?.name}</Label>
                </Column>
            </Column>
        </Button>

    )
}

const CardService = ({ item, setselectService, }) => {
    const { name, label, price, img } = item
    return (
        <Card num={14}>
            <Button pv={1} ph={1} radius={12} mh={0} mv={0} style={{ flexGrow: 1, }} onPress={() => { setselectService(item) }} >
                <Card num={12}>
                    <Column style={{ backgroundColor: '#FFF', flexGrow: 1, paddingVertical: 24, paddingHorizontal: 24, }}>
                        <Image source={img} style={{ width: 76, height: 76, borderRadius: 8, }} />
                        <Column style={{ justifyContent: 'center', }}>
                            <Column style={{ height: 12, }} />
                            <Title size={16}>{name}</Title>
                            <Column style={{ height: 6, }} />
                            <Label size={14}>{label}</Label>
                            <Column style={{ height: 12, }} />
                        </Column>
                    </Column>
                </Card>
            </Button>
        </Card>
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