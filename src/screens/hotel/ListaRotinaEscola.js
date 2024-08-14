import React, { useState } from 'react';
import { Pressable, TextInput, ScrollView, Image, FlatList, View, Text } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT, useTheme, } from '@theme/global';
import { MoveRight } from 'lucide-react-native';


const items = [
    "7:00 - Entrada e acompanhamento veterinário",
    "8:00 - Café da Manhã | Banho de Sol | Hora do Conto",
    "9:00 - Passeio no Parque Ibirapuera",
    "10:00 - Descanso | Musicoterapia",
    "11:00 - Almoço",
    "12:00 - Hora do Sono",
    "13:00 - Adestramento",
    "14:00 - Atividade do dia da semana",
    "15:00 - Atividades internas",
    "16:00 - Recreio",
    "17:00 - Passeio Parque",
    "18:00 - Higienização",
    "19:00 - Saída",
];

export default function ListaRotinaEscola() {

    const { color, font, margin } = useTheme();

    return (
        <View>
            {items.map((item, index) => (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 5,
                        borderRadius: 8,
                        backgroundColor: index % 2 === 0 ? '#ffffff' : '#ECEBEB', // Cor intercalada
                    }}
                >
                    <Row mh={margin.h} alignItems='center'>
                        <MoveRight size={24} color={'#D9D9D9'} style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: 11, fontWeight: 500, color: '#979797' }}>
                            {item}
                        </Text>
                    </Row>
                </View>
            ))}
        </View>
    );
}
