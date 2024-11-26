import React from 'react';
import { Image, View } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Button } from '@theme/global';

import { MoveRight, Play } from 'lucide-react-native';

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

    const a = false;
    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} back={false} />

                <Header title="ESCOLA VILLA PONGO" />

                <Column mh={margin.h}>
                    <Image source={require('@imgs/img-escola-banner3.png')} style={{ width: '100%', height: 223, marginVertical: 24 }} />
                    <Title style={{ textAlign: 'center', color: '#918C8B', fontSize: 18, paddingVertical: 6, lineHeight: 22 }}>A proposta da Escola Villa PONGO se ampara no cuidado de cada animal, com consciência de suas possibilidades e limitações. Estimulando a construção de vínculos, conectando-os com a natureza e mergulhando em experiências multissensoriais. </Title>
                    {a && <Button onPress={handleRegister} style={{ width: '100%', backgroundColor: color.sc.sc3, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: '#fff' }}>Cadastrar pré-matrícula</Label>
                    </Button>}

                    <Column style={{ paddingVertical: 20 }}>
                        <Label size={14}>Os cães têm cinco fases de desenvolvimento: a primeira é a neonatal, até um ano de idade, depois a adolescência, logo em seguida a fase adulta e por último a terceira idade</Label>
                        <Column style={{ height: 10 }} />
                        <Label>Baseada nessa ordem cronológica, dividimos nossas classes em duas:</Label>

                        <Column style={{ height: 20 }} />
                        <Title align="left" style={{ paddingVertical: 6, }}>EDUCAÇÃO INFANTIL (até dois anos de idade)</Title>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>O principal objetivo nesta fase, é promover nos pequenos Pets o desenvolvimento dos aspectos físico, cognitivo, social e emocional, além de fomentar a exploração, as descobertas e a experimentação. É nesta fase também que os cachorros mais novos começam a interagir com pessoas de fora do seu círculo familiar e comunitário através de passeios no parque, e atividades com outros cães</Label>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>E como lidar com “bebês” e “crianças” exige cuidados especiais e muito tato, a proposta tem realização de brincadeiras, adestramento de comandos básicos e atividades prazerosas que além de ensinar, divertem!</Label>
                        <Column style={{ height: 20 }} />
                        <Title align="left" style={{ paddingVertical: 6, }}>ENSINO FUNDAMENTAL (adolescentes e adultos, por que pra sempre serão nossas crianças)</Title>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>O objetivo principal nesta fase, é promover atividades cognitivas com a realização de jogos e brincadeiras, provas de agilidade, atividades prazerosas, adestramento em nível superior, a felicidade e o bem estar do seu mascote!</Label>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>É nesta fase que seu Pet passa por um período de transição, deixando de ser um filhote para se tornar um adulto. Ele passará por algumas mudanças comportamentais e para isso, mantê-lo ocupado, com alimentação saudável e com uma rica rotina ele terá um temperamento seguro, independente e livre de ansiedade.</Label>
                        <Column style={{ height: 20 }} />

                        <Title align="left" style={{ paddingVertical: 6, textDecorationLine: "underline", textDecorationStyle: "solid", }}>Sobre os monitores:</Title>
                        <Column style={{ height: 10 }} />
                        <Label size={14} align="left">Com uma equipe formada por profissionais qualificados, com sólidos conhecimentos, unidos pelo objetivo primordial de proporcionar bem estar, diversão num ambiente estimulador, dinâmico, acolhedor, seguro e, acima de tudo, feliz! Ainda conta com duas veterinárias responsáveis que estarão em tempo integral aptas e de prontidão para atender os primeiros socorros em caso de acidente.</Label>
                        <Column style={{ height: 20 }} />
                        <Title align="left" style={{ paddingVertical: 6, textDecorationLine: "underline", textDecorationStyle: "solid", }}>Sobre o espaço:</Title>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>Uma extensão da sua casa, a Villa PONGO foi projetada para oferecer um ambiente acolhedor, seguro e limpo, proporcionando aos bebês Pets, a partir dos 6 meses, um desenvolvimento saudável e cercado de afeto.</Label>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>A estrutura foi cuidadosamente planejada para atender as normas de segurança, higiene e conforto dos animais. Os espaços contam com: piscina, solário, área externa, jardim com grama natural, espaço de estimulação equipado com material adequado, sala do sono com camas PONGO individuais, assistida constantemente por monitores e veterinários, e espaço tranquilo para alimentação, onde cada Pet terá o seu comedouro PONGO em acrílico etiquetado com nome.</Label>

                        <Column style={{ height: 20 }} />
                        <Title align="left" style={{ paddingVertical: 6, textDecorationLine: "underline", textDecorationStyle: "solid", }}>Rotina:</Title>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>Nossa prioridade é o bem estar do seu melhor amigo, portanto, entendemos que estabelecer uma rotina para os momentos de alimentação, brincadeiras, passeios e sono, seja importante para situá-lo no tempo e no espaço, conferindo-lhe a sensação de segurança e conforto.</Label>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>Desde a acolhida carinhosa pela manhã, o seu Pet terá banho de sol, em dias quentes e específicos a piscina (rasa), brincadeiras ao ar livre, musicoterapia, passeios no Parque Ibirapuera, alimentação balanceada de acordo com as orientações da família, estimulação adequada para a faixa etária, brincadeiras, hora do sono, momento da higiene até a despedida, nos empenhamos em manter um atendimento de qualidade, condizente com a confiança depositada na contratação de nossos serviços.</Label>
                        <Column style={{ height: 10 }} />
                        <Label size={14}>As refeições são enviadas pelos tutores e são introduzidas (não obrigatório) alimentos 100% naturais pela veterinária nutricionista e preparadas diariamente na escola. O cardápio é enviado mensalmente aos pais, que podem fazer adaptações de acordo com as necessidades do Pet! Como exemplo, teremos frutas frescas no café da manhã, proteína na hora do almoço e petiscos na hora do recreio.</Label>
                        <Column mh={margin.h} mv={margin.v} style={{ paddingTop: 20 }}>
                            <Title align="center" style={{ textDecorationLine: "underline", textDecorationStyle: "solid",}}>Cada aluno receberá sua mochila, que conta com uniforme, plaquinha de identificação, agenda, brinquedo, pote hermético para envio da alimentação, toalha e manta, todos itens das coleções PONGO. </Title>
                        </Column>
                    </Column>
                </Column>
                <Column mv={margin.v} style={{ marginRight: margin.h }}>
                        <Image source={require('@imgs/extensao-da-sua-casa.png')} style={{ width: '100%', height: 180, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
                    </Column>
                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, color: '#979797', paddingVertical: 6, marginVertical: 12 }}>Conheça a estrutura da Escola PONGO</Title>

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
                        <Label style={{ fontSize: 13 }}>Sala do sono e descanço com camas PONGO individuais, higienizadas diariamente.</Label>
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


                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, color: '#979797', paddingVertical: 6, marginVertical: 12, textAlign: 'center' }}>Planos Oferecidos</Title>
                </Column>
                <PlanosList destino={handleRegister} />


                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 18, color: '#979797', paddingVertical: 6, marginTop: 12, textAlign: 'center' }}>Rotina na escola</Title>
                    <Label style={{ fontSize: 12, color: '#979797', textAlign: 'center' }}>Integral 7:00 ás 19:00</Label>

                </Column>
                <Column mv={margin.v} >
                    <Carrossel />
                </Column>
                <ListaRotinaEscola />

                <Row mh={margin.h} mv={margin.v} alignItems='center'>
                    <Image source={require('@imgs/shop.png')} style={{ width: 158, height: 264, objectFit: 'contain', marginRight: 12, }} />
                    <Column>
                        <Title style={{ fontSize: 18, marginVertical: 12 }}>Atividades</Title>
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

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Obrigatório atestado médico veterinário.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginVertical: 12 }}>Controle contra pulgas e carrapatos.</Label>

                        <Label style={{ color: '#fff', fontSize: 13, marginTop: 12 }}>Respeitar os horários de entrada e saída.</Label>
                        <Label style={{ color: '#fff', fontSize: 11, marginTop: 6 }}>(Horário de entrada permitido até as 9:00am. Após o horário de saída, haverá uma tolerância de 15 minutos, excedido esse tempo, o aluno dormirá no Hotel sendo acrescentado a PERNOITE).</Label>

                        <Column style={{ height: 80 }} />

                    </Column>



                </View>
            </Scroll>

            <TabBar />
        </Main>
    );
}

function Carrossel() {
    const navigation = useNavigation();
    return (
        <Swiper style={{ height: 220, overflow: 'hidden', borderRadius: 20 }} autoplay={true} loop={false}>
            <Column style={{ marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ width: '100%', height: 220, objectFit: 'cover', }}
                    source={require('@imgs/pet5.jpeg')}
                />
            </Column>
            <Column style={{ marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ width: '100%', height: 220, objectFit: 'cover', }}
                    source={require('@imgs/pet6.jpeg')}
                />
            </Column>
            <Column style={{ marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ width: '100%', height: 220, objectFit: 'cover', }}
                    source={require('@imgs/pet7.jpeg')}
                />
            </Column>
            <Column style={{ marginHorizontal: 28, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', }}>
                <Image
                    style={{ width: '100%', height: 220, objectFit: 'cover', }}
                    source={require('@imgs/pet1.jpeg')}
                />
            </Column>
            <Button
                radius={20}
                pv={1}
                ph={1}
                onPress={() => { navigation.navigate('Video', { video: 2 }) }}
                style={{ marginHorizontal: 28, height: 220, }}>
                <Column>
                    <Image
                        style={{ width: '100%', height: 220, objectFit: 'cover', }}
                        source={require('@imgs/video2.png')}
                    />
                    <Column style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', top: 80, width: 64, height: 64, borderRadius: 100, backgroundColor: '#fff', zIndex: 99, }} >
                        <Play size={24} color='#000' />
                    </Column>
                </Column>
            </Button>
        </Swiper>
    );
}

function ListaRotinaEscola() {
    const { color, font, margin } = useTheme();
    const rotina = [
        "7:00 - 9:00 | ENTRADA ",
        "9:00 - 10:00 | TRIAGEM E PASSEIO ",
        "10:00 - 11:00 | Café da manhã e socialização ",
        "11:00 - 12:00 | Almoço ",
        "12:00 - 13:00 | Musicoterapia ",
        "13:00 - 14:00 | Adestramento ",
        "14:00 - 15:00 | Fisioterapia ",
        "15:00 - 16:00 | Recreio ",
        "16:00 - 17:00 | Jantar e triagem ",
        "17:00 - 18:00 | Atividade do dia ",
        "18:00 - 19:00 | Higienização e saída ",
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
                    <Label style={{ fontSize: 12, fontFamily: font.medium, textTransform: 'uppercase' }}>
                        {item}
                    </Label>
                </Row>
            ))}
            <Label size={14} style={{ marginHorizontal: 20, marginVertical: 12, }}>Alterações nas atividades são previstas em função das diferentes modalidades: Educação Infantil, Ensino Fundamental e Médio.</Label>
        </View>
    );
}
