import React from 'react';
import { Image } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, useTheme, } from '@theme/global';

import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import { MoveRight } from 'lucide-react-native';
import TabBar from '@components/TabBar';
import Swiper from 'react-native-swiper';



export default function DayUseScreen() {

    const { color, font, margin } = useTheme();

    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} back={false} />

                <Header title="Day Use" />

                <Column mh={margin.h}>
                    <Image source={require('@imgs/img-escola-banner.png')} style={{ width: '100%', height: 223, marginVertical: 24 }} />
                    <Title style={{ textAlign: 'center', color: '#918C8B', fontSize: 18, paddingVertical: 6, paddingHorizontal: 40, lineHeight: 22 }}>Tenha todos os benefícios da Escola Pongo por um dia!</Title>

                    { /* <Button style={{ width: '100%', backgroundColor: color.pr.pr2, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: color.title }}>Contratar Day Use</Label>
                    </Button> */ }
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, paddingVertical: 6, marginVertical: 12 }}>Conheça a estrutura da Escola Pongo</Title>

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
                <Carrossel data={imgs} />

                <ListaRotinaEscola />

                <Column style={{ height: 120 }} />

                { /* <Column mh={margin.h} mv={margin.v}>
                    <Button style={{ width: '100%', backgroundColor: color.pr.pr2 }}>
                        <Text style={{ textAlign: 'center', color: color.title }}>Contratar Day Use</Text>
                    </Button>
                </Column> */ }



            </Scroll>
            <TabBar />
        </Main>
    );
}



const items = [
    "7:00 - Entrada e acompanhamento veterinário",
    "8:00 - Café da Manhã | Banho de Sol | Hora do Conto",
    "9:00 - Passeio no Parque Ibirapuera",
    "10:00 - Descanso | Musicoterapia",
    "11:00 - Almoço",
    "12:00 - Hora do Sono",
    "13:00 - Adestramento",
    "14:00 - Atividade do dia da semana",
    "15:00 - Atividades internas",
    "16:00 - Recreio",
    "17:00 - Passeio Parque",
    "18:00 - Higienização",
    "19:00 - Saída",
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
        </Column>
    );
}




const imgs = [
    require('@imgs/day-use1.jpg'),
    require('@imgs/day-use2.jpg'),
    require('@imgs/day-use3.jpg'),
    require('@imgs/day-use4.jpg'),
    require('@imgs/day-use5.jpg'),
]

function Carrossel({ data }) {
    return (
        <Swiper style={{ height: 180, overflow: 'hidden', borderRadius: 20 }} autoplay={true} loop={false}>
            {data?.map((img, index) => (
                <Column key={index} style={{ flex: 1, marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        source={img}
                    />
                </Column>
            ))}
        </Swiper>
    );
}