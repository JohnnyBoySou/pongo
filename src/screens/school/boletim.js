import React, { useRef, useState } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Card, SCREEN_WIDTH, SCREEN_HEIGHT, LabelBT } from '@theme/global';
import { Search } from 'lucide-react-native';

//Components
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import TopMenu from '@components/Header/topmenu';
import PagerView from 'react-native-pager-view';

import Chart from '@components/Charts';
import StarsRate from '@components/StarsRate/index';
import Calendario from '@components/Calendar';

export default function SchoolBoletimScreen() {
    const { color, font, margin } = useTheme();

    const pagerRef = useRef();
    const ScrollButtons = useRef();
    const types = ['Boletim', 'Agenda', 'Métricas', 'Diário'];
    const [type, settype] = useState('Boletim');

    const handleScreen = (position) => {
        pagerRef.current.setPage(position);
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
            case 3:
                ScrollButtons.current?.scrollToEnd({ animated: true, });
                settype('Diário');
                break;
            default:
                break;
        }
    }

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu search={false} />
                <Row mh={margin.h} mv={margin.v} align='center' justifyContent='space-between'>
                    <Column>
                        <Title>Olá, Maria</Title>
                        <Column style={{ height: 4, }} />
                        <Label size={12}>Você está no perfil do: Aufredo</Label>
                    </Column>
                    <Button bg="#fff" pv={8} ph={14}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Search size={18} color={'#858585'} />
                            <Label size={12} style={{ marginLeft: 6, lineHeight: 16, }}>Pesquisar</Label>
                        </Row>
                    </Button>
                </Row>

                <Column mh={margin.h}>
                    <Card>
                        <Row justifyContent='space-between'>
                            <Title>Plano Ret</Title>
                            <Text style={{ textAlign: 'right', fontWeight: 700 }}>Segunda-feira {'\n'} 1 mês </Text>
                        </Row>
                        <Column>
                            <Text style={{ fontWeight: 700, marginVertical: 2 }}>Incluso: </Text>
                            <Text style={{ fontWeight: 500, color: '#979797', fontSize: 11, marginVertical: 2 }}>Uniforme </Text>
                            <Text style={{ fontWeight: 500, color: '#979797', fontSize: 11, marginVertical: 2 }}>Pote hermético </Text>
                            <Text style={{ fontWeight: 500, color: '#979797', fontSize: 11, marginVertical: 2 }}>Agenda </Text>
                            <Text style={{ fontWeight: 500, color: '#979797', fontSize: 11, marginVertical: 2 }}>Desconto de 5% em todos os produtos PONGO. </Text>
                            <Text style={{ fontWeight: 700, marginVertical: 2 }}>Mensalidade: 1/1</Text>
                        </Column>
                    </Card>
                    <Column style={{height: 24, }} />
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
                </Column>

                <ScrollView ref={ScrollButtons} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 0 }}>
                    <Column style={{ width: margin.h, }} />
                    {types.map((item, index) => (
                        <Button onPress={() => { handleScreen(index) }} style={{ opacity: type == item ? 1 : 0.5, backgroundColor: type == item ? '#fff' : 'transparent', }} ph={16} pv={10}>
                            <LabelBT style={{ textAlign: 'center', color: color.title, fontSize: 14, }}>{item}</LabelBT>
                        </Button>
                    ))}
                    <Column style={{ width: margin.h, }} />
                </ScrollView>

                <PagerView style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, marginVertical: 12, }} initialPage={0} ref={pagerRef} onPageSelected={(event) => { handleScreen(event.nativeEvent.position) }}>
                    <CardBoletim key={0} />
                    <CardAgenda key={1} />
                    <CardMetricas key={2} />
                    <CardDiario key={3} />
                </PagerView>

            </Scroll>
        </Main>
    );
}

const CardDiario = () => {
    const { color, font, margin } = useTheme();
    return (
        <Column mh={margin.h}>
        </Column>
    )
}

const CardMetricas = () => {
    const { color, font, margin } = useTheme();
    return (
        <Column mh={margin.h} style={{}}>
            <Row>
                <Column bg="#fff" style={{ borderRadius: 16, rowGap: 6, flexGrow: 1, }} pv={20} ph={20}>
                    <Label size={14}>Passos</Label>
                    <Title size={16}>5.000</Title>
                    <Column style={{ height: 4, }} />
                    <Label size={14}>Refeições</Label>
                    <Title size={16}>23</Title>
                    <Column style={{ height: 4, }} />
                    <Label size={14}>Sonecas</Label>
                    <Title size={16}>10</Title>
                </Column>
                <Column style={{ width: 16, }} />
                <Column bg={color.sc.sc3} style={{ borderRadius: 16, }} pv={20} ph={20}>
                    <Title color="#fff">Performance</Title>
                    <Column style={{ height: 12, }} />
                    <Chart
                        value={58}
                        activeStrokeColor='#FFFFFF'
                        inActiveStrokeColor='#FFFFFF'
                        inActiveStrokeOpacity={0.3} />
                    <Column style={{ height: 12, }} />
                    <Title color="#fff" size={12}>Alteração de +11.03</Title>
                    <Label color="#fff" size={10}>Bônus comportamento +1.30</Label>
                </Column>
            </Row>
            <Row mv={16}>
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
                <Column style={{ width: 16, }} />
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
                    <Label style={{ fontFamily: font.medium, }}>Escola Pongo</Label>
                </Row>
                <Row style={{ alignItems: 'center', columnGap: 12, marginVertical: 6, }}>
                    <Column style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#BD9AEC', }} />
                    <Label style={{ fontFamily: font.medium, }}>Hotel Pongo</Label>
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