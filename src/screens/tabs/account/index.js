import React, { useContext, } from 'react';
import { Main, Scroll, Title, Row, Column, useTheme, Label, Image, Button } from '@theme/global';
import TopMenu from '@components/Header/topmenu';

export default function AccountScreen({ navigation, }) {
    const { color, font, margin } = useTheme();

    const user = {
        name: 'Maria da Silva',
        email: 'wSb0A@example.com',
        pets: 2,
        day_use: '1 dia',
        desconto: '5%'
    }

    return (
        <Main style={{ backgroundColor: '#fff', }}>


            <Scroll>
                <TopMenu search={false} />
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, paddingTop: 10, }}>
                    <Title>Minha conta</Title>
                </Row>


                <Column mh={margin.h} mv={12} style={{ paddingVertical: 20, paddingHorizontal: 20, borderRadius: 18, borderWidth: 1, borderColor: color.border, }}>
                    <Title>Olá, {user?.name}</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                        <Label>Pets cadastrados:</Label>
                        <Label>{user?.pets}</Label>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 4, }}>
                        <Label>Day use disponíveis:</Label>
                        <Label>{user?.day_use}</Label>
                    </Row>

                    {user?.desconto && (
                        <Label style={{ marginTop: 12, }}>Desconto de {user?.desconto} em todos os produtos PONGO.</Label>
                    )}

                </Column>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, paddingTop: 10, }}>
                    <Title>Meu perfil</Title>
                </Row>

                <Column mh={margin.h}>
                    <Button style={{ borderWidth: 1, borderColor: color.border, marginTop: 12, }} radius={18} pv={1} ph={1}>
                        <Row style={{ alignItems: 'center', }}>
                            <Image source={require('@imgs/ac1.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                            <Title>Meus pedidos</Title>
                        </Row>
                    </Button>
                    <Button style={{ borderWidth: 1, borderColor: color.border, marginTop: 12, }} radius={18} pv={1} ph={1}>
                        <Row style={{ alignItems: 'center', }}>
                            <Image source={require('@imgs/ac2.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                            <Title>Meus pets</Title>
                        </Row>
                    </Button>
                    <Button style={{ borderWidth: 1, borderColor: color.border, marginTop: 12, }} radius={18} pv={1} ph={1}>
                        <Row style={{ alignItems: 'center', }}>
                            <Image source={require('@imgs/ac3.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                            <Title>Histórico de serviços</Title>
                        </Row>
                    </Button>
                </Column>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, paddingTop: 20, }}>
                    <Title>Suporte</Title>
                </Row>
                <Button style={{ backgroundColor: color.blue, marginTop: 12, }} radius={50} pv={16} ph={1} mh={margin.h}>
                    <Title align="center" color="#fff">Iniciar conversa</Title>
                </Button>
            </Scroll>
        </Main>
    )
}
