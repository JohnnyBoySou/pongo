import React, { useState } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, } from '@theme/global';

import { Star } from 'lucide-react-native';
import { Search } from 'lucide-react-native';


//Components
import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import Swiper from 'react-native-swiper';
import PlanosList from '@components/Planos';

import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import RatingReact from './reactRating';


export default function SchoolBoletimScreen() {
    const navigation = useNavigation();
    const { color, font, margin } = useTheme();
    const handleRegister = (item) => {
        navigation.navigate('SchoolRegister', { item: item })
    }

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
                    <Card style={{ backgroundColor: '#ffffff', paddingHorizontal: 24, paddingVertical: 19 }}>
                        <Row justifyContent='space-between'>
                            <View>
                                <Title>Plano Ret</Title>
                            </View>

                            <View>
                                <Text style={{ textAlign: 'right', fontWeight: 700 }}>Segunda-feira {'\n'} 1 mês </Text>
                            </View>
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



                <View>
                    <Column style={{ width: '100vw', height: 1, backgroundColor: '#D9D9D9', marginBottom: 16 }} mv={margin.v}>
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
                                    <RatingReact nota={4} />

                                </Row>

                                <Row align='center' mv={3}>
                                    <Text style={{ fontSize: 11 }}>Obediência:</Text>
                                    <RatingReact nota={4} />

                                </Row>

                                <Text style={{ marginTop: 3, fontSize: 11 }}>Recadinho:</Text>
                                <Text style={{ color: '#858585', fontSize: 11 }}>Comeu todos os petiscos mas tentou pegar um do colega Aufredo, sem sucesso</Text>
                            </Column>


                        </View>
                    </Row>

                    <Column style={{ width: '100vw', height: 1, backgroundColor: '#D9D9D9', marginTop: 16 }}>
                    </Column>
                </View>
                <View>
                    <Column style={{ width: '100vw', height: 1, backgroundColor: '#D9D9D9', marginBottom: 16 }} mv={margin.v}>
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
                                    <RatingReact nota={4} />

                                </Row>

                                <Row align='center' mv={3}>
                                    <Text style={{ fontSize: 11 }}>Obediência:</Text>
                                    <RatingReact nota={4} />

                                </Row>

                                <Text style={{ marginTop: 3, fontSize: 11 }}>Recadinho:</Text>
                                <Text style={{ color: '#858585', fontSize: 11 }}>Comeu todos os petiscos mas tentou pegar um do colega Aufredo, sem sucesso</Text>
                            </Column>


                        </View>
                    </Row>

                    <Column style={{ width: '100vw', height: 1, backgroundColor: '#D9D9D9', marginTop: 16 }}>
                    </Column>
                </View>
                <View>
                    <Column style={{ width: '100vw', height: 1, backgroundColor: '#D9D9D9', marginBottom: 16 }} mv={margin.v}>
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
                                    <RatingReact nota={4} />

                                </Row>

                                <Row align='center' mv={3}>
                                    <Text style={{ fontSize: 11 }}>Obediência:</Text>
                                    <RatingReact nota={4} />

                                </Row>

                                <Text style={{ marginTop: 3, fontSize: 11 }}>Recadinho:</Text>
                                <Text style={{ color: '#858585', fontSize: 11 }}>Comeu todos os petiscos mas tentou pegar um do colega Aufredo, sem sucesso</Text>
                            </Column>


                        </View>
                    </Row>

                    <Column style={{ width: '100vw', height: 1, backgroundColor: '#D9D9D9', marginTop: 16 }}>
                    </Column>
                </View>





            </Scroll>
        </Main>
    );
}



