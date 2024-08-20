import React, { useContext, useState } from 'react';
import { ScrollView, Image, Pressable, Text } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Apple } from 'lucide-react-native';
import Header from '@components/Header';
import Swiper from 'react-native-swiper';
import Input from '@components/Forms/input';

export default function InstitucionalOndeEstamosScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    // Array de dados das lojas
    const lojas = [
        {
            local: "Shopping Cidade Jardim",
            loja: "PONGO Outfitters",
            endereco: "Av. Magalhães de Castro, 12.000 | Cidade Jardim | São Paulo/SP | 05502-001",
            horariosSemana: "Segunda a Sábado das 10h às 22:00h",
            horariosFeriado: "Domingos e Feriados das 14:00h às 20:00h",
        },
        {
            local: "Shopping Iguatemi",
            loja: "PONGO Exclusive",
            endereco: "Av. Brig. Faria Lima, 2232 | Jardim Paulistano | São Paulo/SP | 01489-900",
            horariosSemana: "Segunda a Sábado das 10h às 22:00h",
            horariosFeriado: "Domingos e Feriados das 14:00h às 20:00h",
        },
        // Adicione mais lojas conforme necessário
    ];

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <Header title="Onde estamos" />
                <Column mh={margin.h} >
                    {lojas.map((loja, index) => (
                        <Pressable
                            key={index}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: '#D9D9D9',
                                marginBottom: 8,
                                paddingHorizontal: margin.h,
                                paddingVertical: margin.v,
                            }}
                        >
                            <Row style={{ alignItems: 'center' }}>
                                <Image source={require('@imgs/localizacao.png')} style={{ width: 20, height: 24, marginRight: 14, borderRadius: 20 }} />
                                <Title style={{ color: '#979797' }}>{loja.local}</Title>
                            </Row>

                            <Column mv={margin.v}>
                                <Text style={{ color: '#979797' }}>{loja.loja}</Text>
                                <Text style={{ color: '#979797' }}>{loja.endereco}</Text>
                                <Text style={{ color: '#979797' }}>{loja.horariosSemana}</Text>
                                <Text style={{ color: '#979797' }}>{loja.horariosFeriado}</Text>
                            </Column>

                            <Button bg={color.pr.pr2} mtop={12}>
                                <Text align="center" style={{ textAlign: 'center', color: color.pr.pr3 }}>Ver no mapa</Text>
                            </Button>
                        </Pressable>
                    ))}




                </Column>

            </Scroll>
        </Main>
    )
}




