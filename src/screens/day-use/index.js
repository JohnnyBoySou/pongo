import React from 'react';
import { Image } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Button } from '@theme/global';

import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import { MoveRight, Play } from 'lucide-react-native';
import TabBar from '@components/TabBar';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';


export default function DayUseScreen({navigation}) {

    const { color, font, margin } = useTheme();

    const handleRegister = () => {
        navigation.navigate('DayUseRegister')
    }

    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} back={false} />

                <Header title="DAY USE VILLA PONGO" />

                <Column mh={margin.h}>
                    <Image source={require('@imgs/img-escola-banner.png')} style={{ width: '100%', height: 223, marginVertical: 24, objectFit: 'contain' }} />
                    <Title style={{ textAlign: 'center', color: '#918C8B', fontSize: 18, paddingVertical: 6, paddingHorizontal: 40, lineHeight: 22 }}>Tenha todos os benefícios da Escola PONGO por um dia!</Title>

                    <Button onPress={handleRegister} style={{ width: '100%', backgroundColor: color.sc.sc3, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: '#fff' }}>Contratar Day Use</Label>
                    </Button>
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, paddingVertical: 6, marginVertical: 12 }}>Conheça a estrutura da Escola PONGO</Title>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Atende as normas de segurança, higiene e conforto.
                            Câmera de monitoramento em todos os ambientes.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Ambientes internos com ar condicionado.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Ambientes externos com piscina, solário, área externa, jardim com grama natural e espaço de estimulação equipado com material adequado.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Sala do sono e descanço com camas PONGO
                            individuais, higienizadas diariamente.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Televisão, som ambiente e lareira em dias de frio.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Refeições em ambiente tranquilo com comedouro individual PONGO em acrílico etiquetado com nome.</Label>
                    </Row>

                    <Row alignItems='flex-start' pv={6} style={{ marginRight: 24 }}>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Label style={{ fontSize: 13 }}>Obrigatório atestado médico veterinário.</Label>
                    </Row>

                </Column>

                <Column mv={margin.v} style={{ marginRight: margin.h }}>
                    <Image source={require('@imgs/extensao-da-sua-casa.png')} style={{ width: '100%', height: 180, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, paddingVertical: 6, marginTop: 12, textAlign: 'center' }}>Rotina na escola</Title>
                    <Label style={{ fontSize: 12, color: '#979797', textAlign: 'center' }}>Integral 7:00 ás 19:00</Label>

                    <Column mv={margin.v}>
                    </Column>
                </Column>
                <Column mv={margin.v}>
                    <Carrossel />
                </Column>

                <ListaRotinaEscola />
                <Button onPress={handleRegister} style={{  backgroundColor: color.sc.sc3, marginTop: 12, marginHorizontal: 28, }}>
                    <Label style={{ textAlign: 'center', color: '#fff' }}>Contratar Day Use</Label>
                </Button>
                <Column style={{ height: 120 }} />

                

            </Scroll>
            <TabBar />
        </Main>
    );
}



const items = [
    "7:00 - 9:00 | Entrada",
    "9:00 - 10:00 | Triagem e Passeio",
    "10:00 - 11:00 | Café da manhã e socialização",
    "11:00 - 12:00 | Almoço",
    "12:00 - 13:00 | Musicoterapia",
    "13:00 - 14:00 | Adestramento",
    "14:00 - 15:00 | Fisioterapia",
    "15:00 - 16:00 | Recreio",
    "16:00 - 17:00 | Jantar e triagem",
    "17:00 - 18:00 | Atividade do dia",
    "18:00 - 19:00 | Higienização e saída",
];

function ListaRotinaEscola() {
    const { color, font, margin } = useTheme();
    return (
        <Column mv={24}>
            {items.map((item, index) => (
                <Row
                    key={index}
                    style={{
                        paddingHorizontal: margin.h,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                        borderRadius: 8,
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#ECEBEB',
                    }}
                >
                    <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                    <Label style={{ fontSize: 11, fontWeight: 500, color: '#979797' }}>
                        {item}
                    </Label>
                </Row>
            ))}
            <Label size={14} style={{ marginHorizontal: 20, marginVertical: 12, }}>Alterações nas atividades são previstas em função das diferentes modalidades: Educação Infantil, Ensino Fundamental e Médio.</Label>

        </Column>
    );
}



function Carrossel() {
    const navigation = useNavigation();
    return (
        <Swiper style={{ height: 220, }} autoplay={true} loop={false}>
            <Column style={{ marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ width: '100%', height: 220, objectFit: 'cover', }}
                    source={require('@imgs/pet2.jpeg')}
                />
            </Column>
            <Column style={{ marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ width: '100%', height: 220, objectFit: 'cover', }}
                    source={require('@imgs/pet3.jpeg')}
                />
            </Column>
            <Column style={{ marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ width: '100%', height: 220, objectFit: 'cover', }}
                    source={require('@imgs/pet4.jpeg')}
                />
            </Column>
            <Column style={{ marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ width: '100%', height: 220, objectFit: 'cover', }}
                    source={require('@imgs/pet8.jpeg')}
                />
            </Column>
            <Button
                radius={20}
                pv={1}
                ph={1}
                onPress={() => { navigation.navigate('Video', { video: 1 }) }}
                style={{ marginHorizontal: 28, height: 220, }}>
                <Column>
                    <Image
                        style={{ width: '100%', height: 220, objectFit: 'cover', }}
                        source={require('@imgs/video1.png')}
                    />
                    <Column style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center',  alignSelf: 'center', top: 80, width: 64, height: 64, borderRadius: 100, backgroundColor: '#fff', zIndex: 99, }} >
                        <Play size={24} color='#000' />
                    </Column>
                </Column>
            </Button>
        </Swiper>
    );
}