import React, { useState } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Card } from '@theme/global';
import { Search } from 'lucide-react-native';


//Components
import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import Swiper from 'react-native-swiper';

import Chart from '@components/Charts';

import { useNavigation } from '@react-navigation/native';
import StarsRate from '@components/StarsRate/index';
import { Calendario } from '@components/Calendar';


export default function SchoolBoletimScreen() {
    const { color, font, margin } = useTheme();
    const types = ['Boletim', 'Agenda', 'Métricas', 'Diário'];
    const [filter, setfilter] = useState('Boletim');

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu search={false} />
                <Header title="Escola Pongo" />

                <Row mh={margin.h} mv={margin.v} align='center' justifyContent='space-between'>
                    <View>
                        <Title>Olá, Maria</Title>
                        <Text style={{ fontSize: 12 }}>Você está no perfil do: Aufredo</Text>
                    </View>
                    <View>
                        <Button style={{ backgroundColor: '#fff' }}>
                            <Row align='center'>
                                <Search size={18} color={'#858585'} />
                                <Text style={{ fontSize: 12, color: '#858585', textAlign: 'center', fontWeight: 400 }}>  Pesquisar</Text>
                            </Row>
                        </Button>
                    </View>
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

                    <Button style={{ width: '100%', backgroundColor: color.waves, marginVertical: 24 }}>
                        <Text style={{ textAlign: 'center', color: '#fff' }}>Ver retrospectiva do semestre </Text>
                    </Button>
                </Column>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 0 }}>
                    <Column style={{ width: margin.h, }} />
                    {types.map((item, index) => (
                        <Button onPress={() => { setfilter(item) }} style={{ opacity: filter == item ? 1 : 0.5, }} ph={12} pv={4}>
                            <Title style={{ textAlign: 'center', fontSize: 16, lineHeight: 26, textDecorationLine: filter == item ? 'underline' : 'none', textDecorationStyle: 'solid', }}>{item}</Title>
                        </Button>
                    ))}
                    <Column style={{ width: margin.h, }} />
                </ScrollView>


                <CardMetricas />
                <CardBoletim />

            </Scroll>
        </Main>
    );
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
                <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
                    <Title size={14} color="#fff">Semestre passado</Title>
                    <Column style={{ height: 12, }} />
                    <Chart
                        value={80}
                        activeStrokeColor='#FFFFFF'
                        inActiveStrokeColor='#FFFFFF'
                        inActiveStrokeOpacity={0.3} />
                    <Title color="#fff" size={12}></Title>
                </Column>
                <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
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
    return (
        <Calendario day={[]} setday={setday} disabled={true} />
    )
}


const CardBoletim = () => {
    const { color, font, margin } = useTheme();
    return (
        <View>
            <Column style={{ height: 1, backgroundColor: '#D9D9D9', marginBottom: 16 }} mv={margin.v}>
            </Column>

            <Row mh={margin.h}>
                <Column>
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                        style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />

                    <Label style={{
                        marginTop: 12, fontSize: 12
                    }}> Note: 8</Label>
                    <Text style={{ color: color.waves, fontWeight: 700, fontSize: 12, textDecorationLine: 'underline' }}> Ver no diário</Text>


                </Column>

                <View style={{ width: 250, marginLeft: 12, paddingRight: 24 }}>

                    <Row style={{ justifyContent: 'space-between', width: 'auto' }}>
                        <Text style={{ textAlign: 'left', fontSize: 14, fontWeight: 700 }}>Alimentação</Text>
                        <Text style={{ textAlign: 'right', fontSize: 11, color: '#858585' }}>Status: concluído {'\n'} 12/06 | 15:30 </Text>
                    </Row>

                    <Column>
                        <Row align='center' style={{ marginBottom: 3 }}>
                            <Text style={{ fontSize: 11 }}>Comportamento:</Text>
                            <StarsRate stars={4} size={15} />

                        </Row>

                        <Row align='center' mv={3}>
                            <Text style={{ fontSize: 11 }}>Obediência:</Text>
                            <StarsRate stars={4} size={15} />

                        </Row>

                        <Text style={{ marginTop: 3, fontSize: 11 }}>Recadinho:</Text>
                        <Text style={{ color: '#858585', fontSize: 11 }}>Comeu todos os petiscos mas tentou pegar um do colega Aufredo, sem sucesso</Text>
                    </Column>


                </View>
            </Row>

            <Column style={{ width: '100vw', height: 1, backgroundColor: '#D9D9D9', marginTop: 16 }}>
            </Column>
        </View>
    )
}