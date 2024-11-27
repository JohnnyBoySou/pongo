import React, { useContext } from 'react';
import { Image, Linking } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, ButtonPrimary } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';

export default function InstitucionalLocalScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const openAppleMaps = (latitude, longitude) => {
        const url = `http://maps.apple.com/?q=${latitude},${longitude}`

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

    const lojas = [
        {
            local: "Vila Nova Conceição",
            loja: "Villa PONGO",
            endereco: "Av. Antônio Joaquim de Moura Andrade, 80 - Vila Nova Conceição, São Paulo - SP, 04507-000",
            horariosSemana: "Segunda a Sábado das 09h às 20:00h",
            horariosFeriado: "Domingos e Feriados Fechado",
            lat: "-23.5870897",
            long: "-46.6649326,20z",
        },
    ];

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu back={false} search={false} />
                <Header title="Onde estamos" />
                <Column mh={margin.h} style={{ rowGap: 24, }}>
                    {lojas.map((loja, index) => (
                        <Column
                            key={index}
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 1,
                                paddingHorizontal: margin.h,
                                paddingVertical: margin.h,
                            }}
                        >
                            <Row style={{ alignItems: 'center' }}>
                                <Image source={require('@imgs/localizacao.png')} style={{ width: 20, height: 24, marginRight: 14, borderRadius: 20 }} />
                                <Title style={{}}>{loja.local}</Title>
                            </Row>

                            <Column mv={margin.v} style={{ rowGap: 8, }}>
                                <Label style={{ lineHeight: 18, }}>{loja.loja}</Label>
                                <Label style={{ lineHeight: 18, }}>{loja.endereco}</Label>
                                <Label style={{ lineHeight: 18, }}>{loja.horariosSemana}</Label>
                                <Label style={{ lineHeight: 18, }}>{loja.horariosFeriado}</Label>
                            </Column>

                            <ButtonPrimary bg={color.pr.pr2} mtop={12} onPress={() => openAppleMaps(loja.lat, loja.long)} label="Ver no mapa" type="Light" />
                        </Column>
                    ))}
                    <Column style={{ height: 120, }} />

                </Column>

            </Scroll>
            <TabBar />
        </Main>
    )
}




