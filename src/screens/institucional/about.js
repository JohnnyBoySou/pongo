import React from 'react';
import { Image, View, Text } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, ButtonPrimary } from '@theme/global';


//Components
import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';
import Swiper from 'react-native-swiper';
import PlanosList from '@components/Planos';

import { useNavigation } from '@react-navigation/native';
import TabBar from '@components/TabBar';


export default function InstitucionalAboutScreen() {
    const navigation = useNavigation();
    const { color, font, margin } = useTheme();
    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu back={false} search={false} />
                <Header title="Sobre a Villa Pongo" />

                <Column mh={margin.h} style={{ rowGap: 18, }}>
                    <Label style={{ fontSize: 14, lineHeight: 18,  }}>
                        Desde que a PONGO abriu suas portas, em 2021, recebemos tutores e seus pets necessitados de tudo que envolve o dia a dia deles.
                    </Label>

                    <Label style={{ fontSize: 14, lineHeight: 18, }}>
                        Desde produtos de qualidade e atendimento personalizado à serviços, como um lugar de confiança para deixar os pets quando viajam, um lugar com infraestrutura e contato com a natureza e profissionais capacitados, atenciosos e amorosos.
                    </Label>

                    <Label style={{ fontSize: 14, lineHeight: 18, fontStyle: 'italic' }}>A Villa PONGO vem pra suprir todas essas necessidades</Label>
                </Column>

                <Column style={{ marginRight: margin.h, marginVertical: 32 }}>
                    <Image source={require('@imgs/extensao-da-sua-casa.png')} style={{ width: '100%', height: 180, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
                </Column>


                <Column mh={margin.h} style={{ rowGap: 18, }}>
                    <Label style={{  fontSize: 14, lineHeight: 18, }}>
                        No coração da Vila Nova Conceição, na cidade de São Paulo, em frente ao Parque Ibirapuera, nossa nova sede conta com quase 1000m2. Com amplo jardim, piscina, salas internas com janelas e portas balcão que trazem ventilação e iluminação natural para atividades indoor, nossas instalações contam também com salas para Escola, Banho e Tosa, quartos aconchegantes para Hotel, Atendimento Clínico Veterinário e a mais querida loja de produtos da PONGO.
                    </Label>

                    <Label style={{ fontSize: 14, lineHeight: 18, }}>
                        Com estacionamento e segurança 24 horas, oferecemos Day Use, Adestramento, Dog Walker, Taxi Dog, Festas de Aniversário para cães e gatos e muito mais.
                    </Label>
                </Column>

                <Column style={{ marginLeft: margin.h, marginVertical: 32 }}>
                    <Image source={require('@imgs/sobre-nos-2.png')} style={{ width: '100%', height: 180, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                </Column>

                <Column mh={margin.h} style={{ rowGap: 18, }}>
                    <Label style={{  fontSize: 14, lineHeight: 18, }}>
                        A proposta da Villa PONGO se ampara no cuidado de cada animal, com consciência de suas possibilidades e limitações. Estimulando a construção de vínculos, conectando-os com a natureza e mergulhando em experiências multissetoriais.
                    </Label>

                    <Label style={{  fontSize: 14, lineHeight: 18, }}>
                        O dia a dia do Pet em nossas dependências será supervisionado por veterinários e monitores profissionais que amam os animais mais do que tudo.
                    </Label>

                    <Label style={{  fontSize: 14, lineHeight: 18, }}>
                        Temos como MISSÃO, promover a saúde, a felicidade e o bem estar animal trazendo praticidade, confiança e amparo para o tutor.
                    </Label>

                    <Label style={{  fontSize: 14, lineHeight: 18, }}>
                        Nossa VISÃO é ser um lugar de referência pela alta qualidade nos serviços e produtos.
                    </Label>

                    <Label style={{  fontSize: 14, lineHeight: 18,}}>
                        E para isso estamos apoiados em nossos PRINCÍPIOS e VALORES que são Respeito, Alteridade, Responsabilidade, Pioneirismo, Inovação, Ética e Excelência.
                    </Label>

                    <ButtonPrimary onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.border, marginTop: 20, }} label="Voltar"/>
                </Column>
                <Column style={{ height: 120 }} />
            </Scroll>
            <TabBar />
        </Main>
    );
}
