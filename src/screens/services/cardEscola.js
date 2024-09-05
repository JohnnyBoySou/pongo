import React, { useEffect } from 'react';
import { FlatList, Image, } from 'react-native';
import { Column, Label, Title, Row, Button, LabelBT, useTheme, } from '@theme/global';
import StepIndicator from 'react-native-step-indicator';
import Header from '@components/Header';
import { formatDateTime, formatCurrency } from '@hooks/utils';
import { Check } from 'lucide-react-native';

export default function CardEscola({ item, navigation, service }) {
    const { color, font, margin } = useTheme()
    const { name, criado_em, check_in, check_out, id_service, status, id_pet_pet, tutor, nomecolaborador, value, id, pet } = item
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
                        {status ? status : 'Não iniciado'}
                    </Title>
                </Column>
            </Row>

            <Column style={{ marginVertical: 12, }} mh={margin.h}>
                <Label size={14} marginBottom={6}>Check-in: {formatDateTime(check_in)}</Label>
                <Label size={14} marginBottom={6}>Check-out: {formatDateTime(check_out)}</Label>
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
                    <Label style={{ fontSize: 14 }} marginBottom={6}>Status do pagamento: {status ? status : 'Não iniciado'}</Label>
                    <Label size={14} marginBottom={6}>Data da transação: {formatDateTime(criado_em)}</Label>
                    <Label size={14} marginBottom={6}>Número: #{id}</Label>
                </Column>
            </Row>


            <Steps data={data} status={status} />
            <Column mh={margin.h}>
                <Button onPress={() => { navigation.navigate('ServicesDiario', { id: id_service, pet: pet, tipo: 'escola_pacote' }) }} style={{ width: '100%', backgroundColor: color.sc.sc3, }}><LabelBT style={{ color: color.light, textAlign: 'center' }}>Diário do pet</LabelBT></Button>
            </Column>
            <Column style={{ height: 120, }} />
        </Column>
    )
}

function Steps({ data, status }) {
    const { font, color } = useTheme()
    const Indicator = ({ item }) => {
        return (
            <Column mv={12}>
                <Title size={14}>{item?.title}</Title>
                <Label size={12} style={{ maxWidth: 250, lineHeight: 16, marginTop: 2, }}>{item?.label}</Label>
            </Column>
        );
    };

    const stepIndicatorStyles = {
        stepIndicatorSize: 30,
        stepStrokeWidth: 0,
        currentStepIndicatorSize: 30,
        currentStepStrokeWidth: 0,
        separatorStrokeWidth: 3,

        separatorFinishedColor: '#37CB84',
        separatorUnFinishedColor: '#c3cfe3',

        stepIndicatorUnFinishedColor: '#dce5f2',
        stepIndicatorFinishedColor: '#37CB84',
        stepIndicatorCurrentColor: '#91A6C4',
    };
    const step = status === 'Concluído' ? 2 : status === 'Em andamento' ? 1 : status === 'Não iniciado' ? 0 : status == null ? 0 : 3
    return (
        <Row style={{ marginHorizontal: 28, }}>
            <StepIndicator
                customStyles={stepIndicatorStyles}
                stepCount={2}
                direction="vertical"
                currentPosition={2}
                renderStepIndicator={({ position, stepStatus, }) => <Column style={{ alignItems: 'center', }}>{stepStatus === 'finished' ? <Check size={18} color="#fff" /> : <Label style={{ lineHeight: 18, fontFamily: font.bold, color: stepStatus === 'current' ? "#fff" : color.sc.sc3, }} >{position + 1}</Label>}</Column>}
                renderLabel={({ stepStatus, label }) => <Label style={{ fontSize: 12, fontFamily: font.medium, color: stepStatus === 'current' ? color.sc.sc3 : stepStatus === 'finished' ? color.green : color.label, }}>{label}</Label>}
            />
            <FlatList
                style={{ flexGrow: 1 }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Indicator item={item} />}
            />
        </Row>
    );
}
