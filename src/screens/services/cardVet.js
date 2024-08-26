import React from 'react';
import { Image, } from 'react-native';
import { Column, Label, Title, Row, Button, LabelBT, useTheme, } from '@theme/global';
import Header from '@components/Header';
import { formatDateTime, formatCurrency } from '@hooks/utils';

export default function CardVet({ item, navigation, service }) {
    const { color, font, margin } = useTheme()
    const { name, criado_em, check_in, check_out, value, status, id_pet_pet, tutor, entrada, nomecolaborador, id, pet } = item
    const types = [
        {
            name: 'Não iniciado',
            color: '#788BA4',
        },
        {
            name: 'Em andamento',
            color: '#EBD269'
        },
        {
            name: 'Concluído',
            color: '#778428'
        },
        {
            name: 'Cancelado',
            color: '#C9A9AA'
        },
        {
            name: null,
            color: '#303030'
        }
    ];
    const selectStatus = types.find(i => i?.name == status)
    const data = [{
        title: 'Check-in ',
        label: 'Realizou o check-in no estabelecimento ' + formatDateTime(check_in),
    }, {
        title: 'Check-out ',
        label: 'Realizou o check-out no estabelecimento ' + formatDateTime(check_out),
    },
    ]

    if (!item) return null
    return (
        <Column>
            <Header title={name} />
            <Row style={{ alignItems: 'flex-start', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 12, marginBottom: 20, }} mh={margin.h} pv={14} ph={14} >
                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        source={service?.img}
                        style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', }} />
                    <Column mh={12} >
                        <Title size={16} style={{ marginBottom: 3 }}>{name}</Title>
                        <Label size={10} style={{ marginBottom: 8 }}>Pedido #{id}</Label>
                        <Label size={14}>{formatCurrency(value)}</Label>
                    </Column>
                </Row>
                <Column style={{ backgroundColor: selectStatus.color, borderRadius: 8, position: 'absolute', right: 12, bottom: 12, }}>
                    <Title style={{ fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, color: '#fff', fontWeight: 500, TitleAlign: 'center' }}>
                        {status ? status : 'Não informado'}
                    </Title>
                </Column>
            </Row>

            <Column style={{ marginVertical: 12, }} mh={margin.h}>
                <Label size={14} marginBottom={6}>Data da compra: {formatDateTime(criado_em)}</Label>
                <Label size={14} marginBottom={6}>Agendamento: {formatDateTime(entrada)}</Label>
                <Label size={14} marginBottom={6}>Colaborador responsável: {nomecolaborador}</Label>
            </Column>
            <Column style={{ marginVertical: 12, }} mh={margin.h}>
                <Title style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 6 }} marginBottom={6}>Dados gerais</Title>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Column>
                        <Label size={14} marginBottom={6}>Nome: {tutor.name}</Label>
                        <Label size={14} marginBottom={6}>Endereço: {tutor?.endereco}</Label>
                        <Label size={14} marginBottom={6}>Nome do pet: {pet?.name}</Label>
                    </Column>
                    <Button onPress={() => { navigation.navigate('PetsProfile', { id: id_pet_pet }) }} pv={1} ph={1} radius={6}>
                        <Image source={{ uri: pet?.img }} style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', }} />
                    </Button>
                </Row>
            </Column>

            <Row style={{ justifyContent: 'space-between', alignItems: 'flex-start' }} mh={margin.h}>
                <Column style={{ marginTop: 12, }}>
                    <Title style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 6 }} marginBottom={6}>Informações do pedido</Title>
                    <Label style={{ fontSize: 14 }} marginBottom={6}>Status do pagamento: {status ? status : 'Não informado'}</Label>
                    <Label size={14} marginBottom={6}>Data da transação: {formatDateTime(criado_em)}</Label>
                    <Label size={14} marginBottom={6}>Número: #{id}</Label>
                </Column>
            </Row>


            <Column mh={margin.h} mv={30}>
                <Button onPress={() => { navigation.navigate('ServicesDiario', { id: id_pet_pet, pet: pet, tipo: 'vet' }) }} style={{ width: '100%', backgroundColor: color.sc.sc3, }}><LabelBT style={{ color: color.light, textAlign: 'center' }}>Diário do pet</LabelBT></Button>
            </Column>
            <Column style={{ height: 120, }} />
        </Column>
    )
}
