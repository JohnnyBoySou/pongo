
import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image } from '@theme/global'
import { FlatList } from 'react-native-gesture-handler';
import { Plus } from 'lucide-react-native';

export default function PetsDiarioScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    return (
        <Main>
            <Title align="center">Selecione o perfil do Pet</Title>

        </Main>
    )
}

const pet = {
    name: 'Aufredo',
    avatar: require('@imgs/pet4.png'),
    id: 4,
    type: 'Dog',
    genero: 'Macho',
    age: '8 anos',
    banhos: 23,
    tosas: 12,
    consultas: 8,
    bio: 'Alfredo é um cachorro amigável e brincalhão, com um pelo macio e brilhante. Ele adora correr no parque e fazer novos amigos, tanto humanos quanto outros bichinhos.',
    color: '#B7BCA3',
}