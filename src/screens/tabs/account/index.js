import React, { useContext, useEffect, useState } from 'react';
import { Main, Scroll, Title, Row, Column, useTheme, Label, Image, Button, Loader, LabelBT, ButtonPR, ButtonPrimary } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import { listUser } from '@api/request/auth';
import { formatDateTime } from '@hooks/utils';
import { getPreferences, excludePreferences } from '@hooks/preferences';
import { useIsFocused } from '@react-navigation/native';
import { MessageCircleMore } from 'lucide-react-native';
import Card from '../../../components/Card';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

export default function AccountScreen({ navigation, }) {
    const { color, font, margin } = useTheme();

    const isFocused = useIsFocused();
    const [user, setuser] = useState();
    const [loading, setloading] = useState();
    const fetchData = async () => {
        setloading(true)
        try {
            const pref = await getPreferences()
            if (pref?.token) {
                try {
                    const res = await listUser();
                    setuser(res)
                } catch (error) {
                    navigation.navigate('AuthLogin')
                }
            }
            else {
                navigation.navigate('AuthLogin')
            }
        } catch (error) {
            console.log('aq')
            navigation.navigate('AuthLogin')
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleChat = async () => {
        try {
            const res = await getPreferences()
            if (res?.token) {
                navigation.navigate('ChatNew')
            }
            else {
                navigation.navigate('AuthLogin')
            }
        } catch (error) {
            return
        }
    }
    const handleExit = () => {
        navigation.navigate('AuthLogin')
        excludePreferences()
    }
    if (!user) {
        return null
    }
    return (
        <Main >
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchData}  />}>
                <TopMenu search={false} back={false} />
                {loading ? <Loader /> : user ? <Column mh={margin.h} mv={24} style={{ paddingVertical: 24, paddingHorizontal: 20, borderRadius: 18, backgroundColor: color.light, }}>
                    <Title>Olá, {user?.nome}</Title>
                    <Column style={{ rowGap: 6, marginTop: 10, }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Label size={14}>Pets cadastrados: </Label>
                            <Label size={14}>{user?.pets?.length}</Label>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Label size={14}>Quantidade de serviços utilizados: </Label>
                            <Label size={14}>{user?.totalservico}</Label>
                        </Row>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Label size={14}>Data de cadastro: </Label>
                            <Label size={14}>{formatDateTime(user?.criado_em)}</Label>
                        </Row>
                    </Column>
                </Column> :
                    <Column mh={margin.h} mv={24} style={{ paddingVertical: 24, paddingHorizontal: 20, borderRadius: 18, backgroundColor: color.light, }}>
                        <Title>Olá, Visitante!</Title>
                        <Column style={{ height: 6, }} />
                        <Label>Faça login para acessar a sua conta.</Label>
                        <Column style={{ height: 12, }} />
                        <ButtonPrimary label="Fazer login" onPress={() => { navigation.navigate('AuthLogin') }} />
                    </Column>

                }

                <Column mh={margin.h} style={{ rowGap: 22, marginVertical: 22, }}>
                    <Card bg={color.bg} num={12}>
                        <Button style={{ backgroundColor: color.light, }} pv={12} ph={12} radius={12} mh={0} onPress={() => { navigation.navigate('PetsList') }} >
                            <Row style={{ alignItems: 'center', }}>
                                <Image source={require('@imgs/ac2.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                                <Column>
                                    <Title size={16}>PETS</Title>
                                    <Column style={{ height: 4, }} />
                                    <Label size={14}>Clique para selecionar</Label>
                                </Column>

                            </Row>
                        </Button>
                    </Card>
                    <Card num={12}>
                        <Button style={{ backgroundColor: color.light, }} pv={12} ph={12} radius={12} mh={0} onPress={() => { navigation.navigate('AccountDetails') }} >
                            <Row style={{ alignItems: 'center', }}>

                                <Image source={require('@imgs/profile.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                                <Column>
                                    <Title size={16}>PERFIL</Title>
                                    <Column style={{ height: 4, }} />
                                    <Label size={14}>Clique para editar</Label>
                                </Column>
                            </Row>
                        </Button>
                    </Card>
                    <Card num={12}>
                        <Button style={{ backgroundColor: color.light, }} pv={12} ph={12} radius={12} mh={0} onPress={() => { navigation.navigate('Services') }}>
                            <Row style={{ alignItems: 'center', }}>
                                <Image source={require('@imgs/ac3.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                                <Column>
                                    <Title size={16}>SERVIÇOS</Title>
                                    <Column style={{ height: 4, }} />
                                    <Label size={14}>Clique para visualizar</Label>
                                </Column>

                            </Row>
                        </Button>
                    </Card>
                    <Card num={12}>
                        <Button style={{ backgroundColor: color.light, }} pv={12} ph={12} radius={12} mh={0} onPress={() => { navigation.navigate('Products') }}>
                            <Row style={{ alignItems: 'center', }}>
                                <Image source={require('@imgs/ac3.png')} style={{ width: 80, height: 80, marginRight: 12, }} />
                                <Column>
                                    <Title size={16}>PRODUTOS</Title>
                                    <Column style={{ height: 4, }} />
                                    <Label size={14}>Clique para visualizar</Label>
                                </Column>
                            </Row>
                        </Button>
                    </Card>
                    <Card num={12}>
                        <Button style={{ backgroundColor: color.light, }} pv={12} ph={12} radius={12} mh={0} onPress={() => { navigation.navigate('ChatList') }}>
                            <Row style={{ alignItems: 'center', }}>
                                <Image source={require('@imgs/chat.png')} style={{ width: 80, height: 80, marginRight: 12, objectFit: 'contain', }} />
                                <Column>
                                    <Title size={16}>CONVERSAS</Title>
                                    <Column style={{ height: 4, }} />
                                    <Label size={14}>Clique para visualizar</Label>
                                </Column>
                            </Row>
                        </Button>
                    </Card>
                </Column>
                <Button onPress={handleChat} style={{ borderWidth: 2, borderColor: '#918C8B', }} pv={16} ph={1} mh={margin.h}>
                    <LabelBT color="#918C8B" style={{ textAlign: 'center', fontSize: 20 }}> <MessageCircleMore color={color.title} size={20} /> Iniciar conversa</LabelBT>
                </Button>
                <Button onPress={handleExit} bg={color.red + 10} pv={16} ph={1} mh={margin.h} mv={25}>
                    <LabelBT color={color.red} style={{ textAlign: 'center', }}>Sair</LabelBT>
                </Button>

                <Column style={{ height: 30, }} />
            </ScrollView>
        </Main >
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