import React, { useRef, useState } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Card, SCREEN_WIDTH, SCREEN_HEIGHT, LabelBT } from '@theme/global';
import { Search } from 'lucide-react-native';

//Components
import TopMenu from '@components/Header/topmenu';

import Chart from '@components/Charts';
import StarsRate from '@components/StarsRate/index';
import Calendario from '@components/Calendar';

export default function SchoolBoletimScreen({ navigation, }) {
    const { color, font, margin } = useTheme();

    const pagerRef = useRef();
    const ScrollButtons = useRef();
    const types = ['Boletim', 'Agenda', 'Métricas'];
    const [type, settype] = useState('Boletim');

    const handleScreen = (position) => {
        switch (position) {
            case 0:
                ScrollButtons.current?.scrollTo({ x: 0, y: 0, animated: true, });
                settype('Boletim');
                break;
            case 1:
                ScrollButtons.current?.scrollTo({ x: 0, y: 0, animated: true, });
                settype('Agenda');
                break;
            case 2:
                ScrollButtons.current?.scrollToEnd({ animated: true, });
                settype('Métricas');
                break;
            default:
                break;
        }
    }

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu search={false} back={false} />
                <Row mh={margin.h} mv={20} style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Column>
                        <Title size={22} style={{ lineHeight: 24, }}>Olá, Maria </Title>
                        <Label size={12} style={{ lineHeight: 16, marginTop: 4, color: color.pr.pr3 }}>Você está no perfil do: Aufredo </Label>
                    </Column>
                    <Button bg="#fff" onPress={() => { navigation.navigate('Search') }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }} >
                            <Search size={18} color={'#858585'} />
                            <Label size={12} style={{ marginLeft: 6, lineHeight: 16, }}>Pesquisar</Label>
                        </Row>
                    </Button>
                </Row>


                <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
                    <Column style={{ width: SCREEN_WIDTH, paddingHorizontal: margin.h, }}>
                        <Card>
                            <Row justifyContent='space-between'>
                                <Title>Plano Ret</Title>
                                <Title size={14} style={{ textAlign: 'right', }}>Segunda-feira {'\n'} 1 mês </Title>
                            </Row>
                            <Column style={{ rowGap: 7, }}>
                                <Title size={16} style={{ marginVertical: 2 }}>Incluso: </Title>
                                <Label size={12}>Uniforme </Label>
                                <Label size={12}>Pote hermético </Label>
                                <Label size={12}>Agenda </Label>
                                <Label size={12}>Desconto de 5% em todos os produtos PONGO. </Label>
                                <Title size={14} style={{ fontWeight: 700, marginVertical: 2 }}>Mensalidade: 1/1</Title>
                            </Column>
                        </Card>
                    </Column>
                    <Column style={{ width: SCREEN_WIDTH, paddingHorizontal: margin.h, }}>
                        <Card>
                            <Row justifyContent='space-between'>
                                <Title>Upgrade de plano</Title>
                            </Row>
                            <Column style={{ rowGap: 7, }}>
                                <Title size={14} style={{ marginTop: 12, marginBottom: 4, }}>Conheça as vantagens: </Title>
                                <Label size={12}>DayUse</Label>
                                <Label size={12}>Diaria no hotel</Label>
                                <Label size={12}>Desconto de 7% em todos os produtos PONGO. </Label>
                                <Button bg={color.sc.sc3+30} mtop={6}>
                                    <Title size={14} align="center" style={{ color: color.sc.sc3,  }}>Fazer upgrade</Title>
                                </Button>
                            </Column>
                        </Card>
                    </Column>
                </ScrollView>

                <Button style={{ backgroundColor: color.sc.sc3, marginTop: 20 }} pv={16} mh={margin.h} onPress={() => {navigation.navigate('PetsStory',{id: '1'})}} >
                    <LabelBT style={{ textAlign: 'center', color: color.light, fontSize: 14, }}>Ver Retrospectiva</LabelBT>
                </Button>


                <ScrollView ref={ScrollButtons} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 0, marginTop: 20, }}>
                    <Column style={{ width: margin.h, }} />
                    {types.map((item, index) => (
                        <Button onPress={() => { handleScreen(index) }} style={{ opacity: type == item ? 1 : 0.5, backgroundColor: type == item ? '#fff' : 'transparent', }} ph={16} pv={10}>
                            <LabelBT style={{ textAlign: 'center', color: color.title, fontSize: 14, }}>{item}</LabelBT>
                        </Button>
                    ))}
                    <Button onPress={() => { navigation.navigate('PetsDiario', { id: 1, }) }} style={{ backgroundColor: 'transparent', }} ph={16} pv={10}>
                        <LabelBT style={{ textAlign: 'center', color: color.title, fontSize: 14, }}>Diário</LabelBT>
                    </Button>
                    <Column style={{ width: margin.h, }} />
                </ScrollView>
                <Column pv={20}>
                    {type == 'Boletim' && <CardBoletim />}
                    {type == 'Agenda' && <CardAgenda />}
                    {type == 'Métricas' && <CardMetricas />}
                </Column>
            </Scroll>
        </Main>
    );
}

/*
 <Column style={{ height: 24, }} />
                   <Title>Retrospectiva do semestre</Title>
                   <Column bg="#fff" ph={8} pv={10} mv={12} style={{ borderRadius: 16, }}>
                       <InstagramStories
                           stories={stories}
                           showName={true}
                           progressColor="#ffffff90"
                           progressActiveColor="#ffffff"
                           modalAnimationDuration={300}
                           storyAnimationDuration={300}
                           animationDuration={3000}
                           avatarListContainerProps={{
                               showsHorizontalScrollIndicator: false,
                           }}
                           avatarListContainerStyle={{ columnGap: 12, }}
                           textStyle={{
                               color: '#fff',
                               fontFamily: font.medium,
                           }}
                           nameTextStyle={{
                               fontFamily: font.medium,
                               textAlign: 'center',
                               fontSize: 12,
                           }}
                           avatarBorderColors={[color.sc.sc3,]}
                           closeIconColor={'#fff'}
                       />
                   </Column>
*/
const CardMetricas = () => {
    const { color, font, margin } = useTheme();
    return (
        <Column mh={margin.h} style={{}}>
            <Row>
                <Column bg="#fff" style={{ borderRadius: 16, rowGap: 12, flexGrow: 1, }} pv={20} ph={20}>
                    <Label size={14}>Passos</Label>
                    <Title size={16}>5.000</Title>
                    <Label size={14}>Refeições</Label>
                    <Title size={16}>23</Title>
                    <Label size={14}>Sonecas</Label>
                    <Title size={16}>10</Title>
                </Column>
                <Column style={{ width: 24, }} />
                <Column bg={color.sc.sc3} style={{ borderRadius: 16, rowGap: 12, }} pv={20} ph={20}>
                    <Title color="#fff">Performance</Title>
                    <Chart
                        value={58}
                        activeStrokeColor='#FFFFFF'
                        inActiveStrokeColor='#FFFFFF'
                        inActiveStrokeOpacity={0.3} />
                    <Title color="#fff" size={12}>Alteração de +11.03</Title>
                    <Label color="#fff" size={10}>Bônus comportamento +1.30</Label>
                </Column>
            </Row>
            <Row mv={24} style={{ columnGap: 24, }}>
                <Column bg='#E5C8C9' style={{ borderRadius: 16, }} pv={20} ph={20}>
                    <Title color="#fff">Socialização</Title>
                    <Column style={{ height: 12, }} />
                    <Chart
                        value={87}
                        activeStrokeColor='#FFFFFF'
                        inActiveStrokeColor='#FFFFFF'
                        inActiveStrokeOpacity={0.3} />
                    <Column style={{ height: 12, }} />
                    <Title color="#fff" size={12}>Alteração de +11.03</Title>
                </Column>
                <Column bg="#fff" style={{ borderRadius: 16, rowGap: 6, flexGrow: 1, }} pv={20} ph={20}>
                    <Label size={14}>Banhos</Label>
                    <Title size={16}>52</Title>
                    <Column style={{ height: 4, }} />
                    <Label size={14}>Tosas</Label>
                    <Title size={16}>14</Title>
                    <Column style={{ height: 4, }} />
                    <Label size={14}>Consultas</Label>
                    <Title size={16}>5</Title>
                </Column>
            </Row>
            <Column style={{ height: 8, }} />
            <Title>Métricas gerais</Title>
            <Column style={{ height: 12, }} />
            <Row style={{ backgroundColor: '#434343', borderRadius: 16, columnGap: 8, justifyContent: 'space-between', alignItems: 'center', }} pv={20} ph={20} >
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Title size={14} color="#fff">Semestre passado</Title>
                    <Column style={{ height: 12, }} />
                    <Chart
                        value={80}
                        activeStrokeColor='#FFFFFF'
                        inActiveStrokeColor='#FFFFFF'
                        inActiveStrokeOpacity={0.3} />
                    <Title color="#fff" size={12}></Title>
                </Column>
                <Column style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Title size={14} color="#fff">Semestre presente</Title>
                    <Column style={{ height: 12, }} />
                    <Chart
                        value={80}
                        activeStrokeColor='#FFFFFF'
                        inActiveStrokeColor='#FFFFFF'
                        inActiveStrokeOpacity={0.3} />
                    <Title color="#fff" size={12}>Alteração de +7%</Title>
                </Column>
            </Row>

        </Column>
    )
}

const CardAgenda = () => {
    const [day, setday] = useState();
    const { color, font, margin } = useTheme();
    return (
        <Column mh={28}>
            <Calendario day={["2024-08-05", "2024-08-12", "2024-08-19", "2024-08-26"]} setday={setday} disabled={true} />
            <Column pv={20}>
                <Row style={{ alignItems: 'center', columnGap: 12, marginVertical: 6, }}>
                    <Column style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: color.sc.sc3, }} />
                    <Label style={{ fontFamily: font.medium, }}>Banho</Label>
                </Row>
                <Row style={{ alignItems: 'center', columnGap: 12, marginVertical: 6, }}>
                    <Column style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#EBD269', }} />
                    <Label style={{ fontFamily: font.medium, }}>Tosa</Label>
                </Row>
                <Row style={{ alignItems: 'center', columnGap: 12, marginVertical: 6, }}>
                    <Column style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#778428', }} />
                    <Label style={{ fontFamily: font.medium, }}>Hospital veterinário</Label>
                </Row>
                <Row style={{ alignItems: 'center', columnGap: 12, marginVertical: 6, }}>
                    <Column style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#E5C8C9', }} />
                    <Label style={{ fontFamily: font.medium, }}>Escola PONGO</Label>
                </Row>
                <Row style={{ alignItems: 'center', columnGap: 12, marginVertical: 6, }}>
                    <Column style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#BD9AEC', }} />
                    <Label style={{ fontFamily: font.medium, }}>Hotel PONGO</Label>
                </Row>
                <Row style={{ alignItems: 'center', columnGap: 12, marginVertical: 6, }}>
                    <Column style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#858585', }} />
                    <Label style={{ fontFamily: font.medium, }}>Day Use</Label>
                </Row>
            </Column>
        </Column>
    )
}

const CardBoletim = () => {
    const { color, font, margin } = useTheme();
    return (
        <Row mh={margin.h} style={{ backgroundColor: '#fff', borderRadius: 12, }} pv={12} ph={12}>
            <Column>
                <Image source={{ uri: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
                <Label style={{ marginTop: 12, fontSize: 12, }}> Nota: 8</Label>
                <Text style={{ color: color.waves, fontWeight: 700, fontSize: 12, textDecorationLine: 'underline' }}>Ver no diário</Text>
            </Column>

            <View style={{ width: 250, marginLeft: 12, paddingRight: 24 }}>
                <Row style={{ justifyContent: 'space-between', marginRight: 20, }}>
                    <Title size={14}>Alimentação</Title>
                    <Label align="right" size={12}>Status: Concluído{'\n'}12/06 | 15:30 </Label>
                </Row>
                <Column>
                    <Row style={{ alignItems: 'center', }}>
                        <Label size={10}>Comportamento:</Label>
                        <StarsRate stars={4} size={12} />
                    </Row>
                    <Row mv={3} style={{ alignItems: 'center', }}>
                        <Label size={10}>Obediência:</Label>
                        <StarsRate stars={4} size={12} />
                    </Row>
                    <Column>
                        <Label size={11}>Recadinho:</Label>
                        <Label size={12} style={{ width: 220, marginVertical: 2, }}>Comeu todos os petiscos mas tentou pegar um do colega Aufredo, sem sucesso.</Label>
                    </Column>
                </Column>


            </View>
        </Row>
    )
}

const stories = [
    {
        id: 'user1',
        name: 'User 1',
        imgUrl: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
        stories: [
            { id: 'story1', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story2', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story3', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story4', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
        ]
    },
    {
        id: 'user1',
        name: 'User 1',
        imgUrl: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
        stories: [
            { id: 'story1', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story2', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story3', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story4', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
        ]
    },
    {
        id: 'user1',
        name: 'User 1',
        imgUrl: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
        stories: [
            { id: 'story1', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story2', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story3', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story4', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
        ]
    },
    {
        id: 'user1',
        name: 'User 1',
        imgUrl: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
        stories: [
            { id: 'story1', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story2', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story3', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story4', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
        ]
    },
    {
        id: 'user1',
        name: 'User 1',
        imgUrl: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
        stories: [
            { id: 'story1', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story2', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story3', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story4', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
        ]
    },
    {
        id: 'user1',
        name: 'User 1',
        imgUrl: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
        stories: [
            { id: 'story1', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story2', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story3', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story4', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
        ]
    },
    {
        id: 'user1',
        name: 'User 1',
        imgUrl: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
        stories: [
            { id: 'story1', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story2', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story3', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            { id: 'story4', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
        ]
    },
];