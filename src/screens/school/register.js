import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import PlanosList from '@components/Planos';


export default function SchoolRegisterScreen({ navigation, }) {
    const { color, font, } = useTheme();
    const handleRegister = (item) => {
        navigation.navigate('SchoolRegister', { item: item })
    }
    return (
        <Main>
            <Scroll>
                <Column>
                    <TopMenu search={false} cart={false} />
                    <Column style={{ height: 20, }}></Column>
                    <Title align="center">Cadastrar na escola</Title>
                    <Title size={18}>Selecione o plano</Title>
                    <PlanosList destino={handleRegister} />
                </Column>
            </Scroll>
        </Main>
    )
}

