import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image } from '@theme/global';
import { ActivityIndicator } from 'react-native';
export default function ChatNewScreen({ navigation, }) {
    const { color, font, } = useTheme();

    const user = {
        name: 'Carol',
        avatar: 'https://i.pravatar.cc/300',
        lastMsg: 'Ola, tudo bem?',
        time: '10:15',
        lastOnline: '11:40',
        unread: 2,
        id: 1,
    }


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('ChatDetails', { user: user, id: user.id })
        }, 4000)
    }, [])


    return (
        <Main style={{ justifyContent: 'center', }}>
            <Column style={{ backgroundColor: '#fff', borderRadius: 24, marginHorizontal: 28, justifyContent: 'center', alignItems: 'center', }} pv={20} ph={30}>
                <Image source={require('@imgs/chatload.png')} style={{ width: 200, height: 200, objectFit: 'contain' }} />
                <Label align='center' style={{ marginVertical: 20, }}>Por favor aguarde, você será {'\n'}direcionado para o atendente {'\n'}disponível em 5 segundos</Label>
                <ActivityIndicator size={32} color={color.pr.pr1} />
            </Column>
        </Main>
    )
}