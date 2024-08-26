import React, { useState } from 'react';
import { Pressable, TextInput, ScrollView, Image, FlatList, View, Text } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT, useTheme, } from '@theme/global';

import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';

import { MoveRight } from 'lucide-react-native';

import TabBar from '@components/TabBar';




export default function GroomingScreen() {

    const { color, font, margin } = useTheme();



    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} back={false} />

                <Header title="Grooming" />

                <Column mv={margin.v} style={{ marginLeft: margin.h }}>
                    <Image source={{ uri: 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/2147569900/images/8a0f66d-c653-c22-a52b-fb3b3c3f4717_dog-groomer-pomeranian-GettyImages-1383177683.jpg' }} style={{ width: '100%', height: 180, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                </Column>

                <Column mh={margin.h}>

                    <Text style={{ textAlign: 'center', color: '#918C8B', fontSize: 18, paddingVertical: 6, fontWeight: 700, lineHeight: 22 }}>O banho e a tosa regular do seu Pet, mantém o pelo e pelagem saudáveis. </Text>

                    { /* <Button style={{ width: '100%', backgroundColor: color.pr.pr2, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: color.title }}>Contratar Day Use</Label>
                    </Button> */ }
                </Column>

                <Column mh={margin.h} mv={margin.v}>



                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Pelagem curta ou comprida todas requerem atenção e cuidado. Nos passeios ao ar livre, os pelos pegam pó, sujeira, pólen, insetos e outros germes. Apesar dos óleos naturais manterem a pelagem relativamente limpa, banhos frequentes são necessários para eliminar bactérias, fungos, pelos mortos e protegê-lo de pulgas e outras infecções.</Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Acreditamos que seu Pet merece o melhor, e é por isso que nossa missão é cuidar, dar atenção, amor e elevarmos o banho do seu melhor amigo a um novo patamar.</Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Nossa equipe é formada por amantes de animais e profissionais altamente treinados e dedicados. Também estarão atentos a qualquer mudança temperamental, procura de caroços e inchaços estranhos, podendo detectar anormalidades precocemente. </Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Utilizamos produtos de alta qualidade, os melhores e mais recomendados do mercado Pet. De shampoos hipoalergênicos a condicionadores nutritivos, cada produto é escolhido cuidadosamente para promover a saúde e a felicidade do seu mascote. Usamos técnicas especializadas para garantir que cada pelagem seja tratada com carinho e cuidado, deixando seu pet limpo, cheiroso e completamente relaxado. </Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Nossos groomers especializados estão comprometidos em criar estilos únicos que refletem a personalidade do seu pet. Seja um corte da moda ou um estilo mais clássico ou padrão.</Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Mimaremos seu amigo com tratamentos de spa especiais, como hidratação profunda, massagens terapêuticas e tratamentos de pele. </Label>
                    <Label style={{ fontSize: 14 }}>Nosso Banho e Tosa proporciona uma experiência positiva e uma experiência de luxo. </Label>


                </Column>

                <Column mv={margin.v} style={{ marginRight: margin.h }}>
                    <Image source={{ uri: 'https://ewcstatic.thehartford.com/thehartford/the_hartford/pubimgs/M/higcom-image-marquee-pet-groomer-sc-885.jpg' }} style={{ width: '100%', height: 180, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ fontSize: 16, fontWeight: 700, color: '#979797', paddingVertical: 6, marginTop: 12, textAlign: 'center' }}>
                        Seu mascote sairá da Villa PONGO com um visual deslumbrante, de laços e gravatas da loja PONGO e com cheirinho do nosso perfume que é tão amado pelos nossos clientes!
                    </Title>


                </Column>

                <Column style={{ height: 80 }} />

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