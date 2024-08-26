import React from 'react';
import { Image, View } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, useTheme, } from '@theme/global';

import { MoveRight } from 'lucide-react-native';

//Components
import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import Swiper from 'react-native-swiper';
import PlanosList from '@components/Planos';

import { useNavigation } from '@react-navigation/native';
import TabBar from '@components/TabBar';


export default function SchoolPongoScreen() {
    const navigation = useNavigation();
    const { color, font, margin } = useTheme();
    const handleRegister = (item) => {
        navigation.navigate('SchoolRegister', { item: item })
    }

    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} back={false} />

                <Header title="Escola Pongo" />
                <Carrossel data={imgs} />

                <Column mh={margin.h}>
                    <Image source={require('@imgs/img-escola-banner3.png')} style={{ width: '100%', height: 223, marginVertical: 24 }} />
                    <Label style={{ textAlign: 'center', color: '#918C8B', fontStyle: 'italic', fontSize: 18, paddingVertical: 6 }}>Estimule a construção de vínculos, conecte-os com a natureza e mergulhe em experiências multissensoriais.</Label>
                    { /* <Button style={{ width: '100%', backgroundColor: color.pr.pr2, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: color.title }}>Cadastrar pré-matrícula</Label>
                    </Button> */ }
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginVertical: 12 }}>Conheça a estrutura da Escola Pongo</Title>

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
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginVertical: 12, textAlign: 'center' }}>Planos Oferecidos</Title>
                </Column>
                <PlanosList destino={handleRegister} />

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, fontWeight: 700, color: '#979797', paddingVertical: 6, marginTop: 12, textAlign: 'center' }}>Rotina na escola</Title>
                    <Label style={{ fontSize: 12, color: '#979797', textAlign: 'center' }}>Integral 7:00 ás 19:00</Label>

                </Column>
                <Column mv={margin.v}>
                    <Carrossel data={imgs2} />
                </Column>
                <ListaRotinaEscola />

                <Row mh={margin.h} mv={margin.v} alignItems='center'>
                    <Image source={require('@imgs/atividades.png')} style={{ width: 198, height: 264 }} />

                    <Column>
                        <Title style={{ fontSize: 18, fontWeight: 700, color: '#434343', marginVertical: 12 }}>Atividades</Title>
                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>SEGUNDAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Fisioterapia</Label>
                            </Row>
                        </View>

                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>TERÇAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Agility</Label>
                            </Row>
                        </View>

                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>QUARTAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Piquenipe no parque</Label>
                            </Row>
                        </View>

                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>QUINTAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Agility</Label>
                            </Row>
                        </View>

                        <View style={{ marginBottom: 4 }}>
                            <Label style={{ fontSize: 12 }}>SEXTAS-FEIRAS</Label>
                            <Row alignItems='center'>
                                <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                                <Label style={{ fontSize: 12 }}>Piscina</Label>
                            </Row>
                        </View>
                    </Column>
                </Row>

                <View style={{ backgroundColor: '#918C8B', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <Column mh={margin.h} mv={margin.v} >
                        <Title style={{ color: '#fff', textAlign: 'center', marginTop: 33, marginBottom: 18 }}>Normas</Title>

                        <Label style={{ color: '#fff', fontSize: 14, marginVertical: 12 }}>Para maior segurança do seu Pet, dos amigos dele e de nossos profissionais, seguiremos as exigências:</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Triagem de matrícula:</Label>

                        <Row alignItems='center'>
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, color: '#ffffff' }}>Apresentação de carteira de vacinação</Label>
                        </Row>

                        <Row alignItems='center'>
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, color: '#ffffff' }}>Triagem Veterinária + Exame coproparasitológico</Label>
                        </Row>

                        <Row alignItems='center'>
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, color: '#ffffff' }}>Triagem Comportamental</Label>
                        </Row>

                        <Row alignItems='center' style={{ marginBottom: 12 }}>
                            <MoveRight size={24} color={'#707070'} style={{ marginRight: 8 }} />
                            <Label style={{ fontSize: 12, color: '#ffffff' }}> Adaptação por período pré determinado (de 2 a 6 horas)</Label>
                        </Row>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Machos acima de 12 meses devem estar castrados.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Fêmeas não podem estar no cio.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Uso obrigatório do uniforme.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Controle contra pulgas e carrapatos.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginTop: 12 }}>Respeitar os horários de entrada e saída.</Label>
                        <Label style={{ color: '#fff', fontSize: 11, marginTop: 6 }}>(Horário de entrada permitido até as 9:00am. Após o horário de saída, haverá uma tolerância de 15 minutos, excedido esse tempo, o aluno dormirá no Hotel sendo acrescentado a PERNOITE).</Label>

                        <Column style={{ height: 80 }} />

                        { /* <Button style={{ backgroundColor: '#fff', marginVertical: 32 }}>
                            <Text style={{ fontSize: 12, color: '#434343', textAlign: 'center', fontWeight: 400 }}>Cadastrar pré-matrícula</Text>
                        </Button> */ }
                    </Column>



                </View>
            </Scroll>

            <TabBar />
        </Main>
    );
}

const imgs = [
    'https://caninablog.wordpress.com/wp-content/uploads/2013/10/dia-das-bruxas-pet_escola_075-1.jpg',
    'https://www.decao.com.br/adestramento-de-cao/imagens/daycare-para-caes-de-raca.jpg',
    'https://www.decao.com.br/adestramento-de-cao/imagens/quanto-custa-escola-para-caes.jpg',
]
const imgs2 = [
    'https://lh6.googleusercontent.com/VAViVE0QG6wpW2yeSzQA7tPOrNFf3hlmUrwr7mogM3oShMFGVVNPRpKFs6Sf23tL_c6tITmB5glV2WSR3O1a4Zxd4zj9o7sb39WLMpaA0n20IG3EK-JkeEvA8-OmWF6GeuLB3qwrUsDbALDzrQm27BZJqIdqTTEHXt-TTsaUKem2jwyQKWehdB8vPJtEdw',
    'https://s2-g1.glbimg.com/AjCheGSkmh-QkcBw00ttWUBROtk=/0x0:1600x1200/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/n/d/zQ8s7VQtajoP3ePt9dIg/whatsapp-image-2022-07-19-at-17.40.44.jpeg',
    'https://www.melhoresdestinos.com.br/wp-content/uploads/2021/04/cachorro-hotel-capa.jpg',
]

function Carrossel({ data }) {
    return (
        <Swiper style={{ height: 180, overflow: 'hidden', borderRadius: 20 }} autoplay={true}>
            {data?.map((img, index) => (
                <Column key={index} style={{ flex: 1, marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        source={{ uri: img }}
                    />
                </Column>
            ))}
        </Swiper>
    );
}


function ListaRotinaEscola() {
    const { color, font, margin } = useTheme();
    const rotina = [
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

    return (
        <View>
            {rotina.map((item, index) => (
                <Row
                    key={index}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                        paddingHorizontal: margin.h,
                        borderRadius: 8,
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#ECEBEB', // Cor intercalada
                    }}
                >
                    <MoveRight size={24} color='#D9D9D9' style={{ marginRight: 8 }} />
                    <Label style={{ fontSize: 12, fontFamily: font.medium, }}>
                        {item}
                    </Label>
                </Row>
            ))}
        </View>
    );
}
