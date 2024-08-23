import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Title, Row, Column, useTheme, Label, Image, Button, Loader, LabelBT } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import { Linking, Text } from 'react-native';
import { listUser } from '@api/request/auth';
import { formatDateTime } from '@hooks/utils';

export default function AccountScreen({ navigation, }) {
    const { color, font, margin } = useTheme();


    const [user, setuser] = useState();
    const [loading, setloading] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const res = await listUser();
                setuser(res);
            } catch (error) {

            } finally {
                setloading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <Main >

            <Scroll>
                <TopMenu search={false} back={false} />

                {loading ? <Loader /> : <Column mh={margin.h} mv={24} style={{ paddingVertical: 24, paddingHorizontal: 20, borderRadius: 18, backgroundColor: color.light, }}>
                    <Title>Olá, {user?.nome}</Title>
                    <Column style={{ rowGap: 6, marginTop: 10, }}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Label size={14}>Pets cadastrados: </Label>
                        <Label size={14}>{user?.pets?.length}</Label>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Label size={14}>Quantidade de serviços utilizados: </Label>
                        <Label size={14}>{user?.totalservico}</Label>
                    </Row>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>
                        <Label size={14}>Data de cadastro: </Label>
                        <Label size={14}>{formatDateTime(user?.criado_em)}</Label>
                    </Row>
                    </Column>

                    {user?.desconto && (
                        <Label size={14} style={{ marginTop: 12, }}>Desconto de {user?.desconto} em todos os produtos PONGO.</Label>
                    )}

                </Column>}

                <Column mh={margin.h} style={{ rowGap: 22, marginVertical: 22, }}>

                    <Button style={{ backgroundColor: color.light, }} radius={18} pv={1} ph={1} onPress={() => { navigation.navigate('PetsList') }} >
                        <Row style={{ alignItems: 'center', }}>
                            <Image source={require('@imgs/ac2.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                            <Title size={20}>Meus pets</Title>
                        </Row>
                    </Button>
                    <Button style={{ backgroundColor: color.light, }} radius={18} pv={1} ph={1} onPress={() => { navigation.navigate('AccountDetails') }} >
                        <Row style={{ alignItems: 'center', }}>
                            <Image source={require('@imgs/profile.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                            <Title size={20}>Meu perfil</Title>
                        </Row>
                    </Button>
                    <Button style={{ backgroundColor: color.light, }} radius={18} pv={1} ph={1} onPress={() => { navigation.navigate('Services') }}>
                        <Row style={{ alignItems: 'center', }}>
                            <Image source={require('@imgs/ac3.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                            <Title size={20}>Histórico de serviços</Title>
                        </Row>
                    </Button>
                    <Button style={{ backgroundColor: color.light, }} radius={18} pv={1} ph={1} onPress={() => { navigation.navigate('ChatList') }}>
                        <Row style={{ alignItems: 'center', }}>
                            <Image source={require('@imgs/chat.png')} style={{ width: 80, height: 80, marginRight: 12, objectFit: 'contain', }} />
                            <Title size={20}>Histórico de conversas</Title>
                        </Row>
                    </Button>
                </Column>
                <Button onPress={() => { navigation.navigate('ChatNew') }} style={{ borderWidth: 2, borderColor: '#918C8B', }} pv={16} ph={1} mh={margin.h}>
                    <LabelBT color="#918C8B" style={{ textAlign: 'center', }}>Iniciar conversa</LabelBT>
                </Button>

                <Column style={{ height: 30, }} />
            </Scroll>
        </Main>
    )
}
/**
 *      <Button style={{ backgroundColor: color.light, }} radius={18} pv={1} ph={1} onPress={() => { navigation.navigate('MeusPedidos') }} >
                        <Row style={{ alignItems: 'center', }}>
                            <Image source={require('@imgs/ac1.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                            <Title size={20}>Meus pedidos</Title>
                        </Row>
                    </Button>
 */