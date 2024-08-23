import React, { useContext, useState } from 'react';
import { ScrollView, Image, Pressable, Text, Linking } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Apple } from 'lucide-react-native';
import Header from '@components/Header';
import Swiper from 'react-native-swiper';
import Input from '@components/Forms/input';

export default function InstitucionalLocalScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');

    const openAppleMaps = (latitude, longitude) => {
        const url = `http://maps.apple.com/?ll=${latitude},${longitude}`

        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    Alert.alert("Erro", "Não foi possível abrir o Apple Maps");
                }
            })
            .catch((err) => Alert.alert("Erro ao abrir o mapa", err.message));
    };

    // Array de dados das lojas
    const lojas = [
        {
            local: "Shopping Cidade Jardim",
            loja: "Pongo",
            endereco: "Av. Magalhães de Castro, 12000 - 2 Piso - Cidade Jardim, São Paulo - SP, 05502-001",
            horariosSemana: "Segunda a Sábado das 10h às 22:00h",
            horariosFeriado: "Domingos e Feriados das 14:00h às 20:00h",
            lat: "-23.5981196",
            long: "-46.6976166"
        },
        {
            local: "Vila Nova Conceição",
            loja: "Villa Pongo",
            endereco: "Av. Antônio Joaquim de Moura Andrade, 80 - Vila Nova Conceição, São Paulo - SP, 04507-000",
            horariosSemana: "Segunda a Sábado das 90h às 20:00h",
            horariosFeriado: "Domingos e Feriados Fechado",
            lat: "-23.5871167",
            long: "-46.6647227"
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
                                paddingVertical: margin.h,
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

                            <Button bg={color.pr.pr2} mtop={12} onPress={() => openAppleMaps(loja.lat, loja.long)}>
                                <Text align="center" style={{ textAlign: 'center', color: color.pr.pr3 }}>Ver no mapa</Text>
                            </Button>
                        </Pressable>
                    ))}




                </Column>

            </Scroll>
        </Main>
    )
}




