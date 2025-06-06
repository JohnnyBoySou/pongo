import { useState, useEffect } from 'react';
import { Main, Button, Column, Label, Title, Row, Image, Scroll, useTheme, useNavigate, LabelBT, Loader, Back } from '@theme/global';
import { RefreshCcw, Search } from 'lucide-react-native';
import { listChats, searchChats } from '@api/request/colaborador';
import { formatDateTime } from '@hooks/utils';
import { getPreferences } from '@hooks/colaborador';
import { RefreshControl, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import socket from '@hooks/socket';

export default function ChatColaboradorListScreen({ navigation }) {
    const { color, font, margin } = useTheme();
    const [user, setuser] = useState();
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([]);
    const [page, setpage] = useState(1);
    const isFocused = useIsFocused();

    const fecthData = async () => {
        setloading(true)
        try {
            const res = await listChats(page, 'C')
            const pref = await getPreferences()
            setuser(pref)
            setdata(res)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        fecthData();
    }, [isFocused])

    useEffect(() => {
        socket.on('atualizarlista', async () => {
            fecthData()
        });
    }, [socket]);


    const [search, setsearch] = useState();
    const handleSearch = async () => {
        if (search?.length > 1) {
            const res = await searchChats(search, 'C')
            setdata(res)
        } else {
            const res = await listChats(page, 'C')
            setdata(res)
        }
    }
    return (
        <Main>
            {loading ? <Loader /> :
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Chat item={item} user={user} />}
                    keyExtractor={item => item.id}
                    windowSize={8}
                    initialNumToRender={8}
                    maxToRenderPerBatch={8}
                    refreshing={loading}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={fecthData}
                            colors={[color.sc.sc3]}
                        />
                    }
                    ListHeaderComponent={
                        <Column>
                            <Column mh={margin.h} mv={20}>
                                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Title size={32}>Chats </Title>
                                    <Row>
                                        <Column style={{ justifyContent: 'center', }}>
                                            <Title size={16}>{user?.name}</Title>
                                            <Button pv={1} ph={14} style={{ alignSelf: 'flex-end' }} onPress={() => { navigation.navigate('AuthLoginColaborador') }} >
                                                <LabelBT size={14} color={color.red}>Sair</LabelBT>
                                            </Button>
                                        </Column>
                                        <Image source={{ uri: user?.avatar }} style={{ width: 54, borderRadius: 100, height: 54, objectFit: 'contain', }} />
                                    </Row>
                                </Row>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20, flex: 1, marginHorizontal: 24, }}>
                                    <Button onPress={fecthData} pv={1} ph={1} bg="#fff" style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                                        <RefreshCcw size={18} color={color.title} />
                                    </Button>
                                    <Row style={{ backgroundColor: '#fff', paddingRight: 8, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 12, }}>
                                        <TextInput
                                            value={search}
                                            onChangeText={(e) => setsearch(e)}
                                            placeholder='Pesquisar'
                                            onSubmitEditing={handleSearch}
                                            style={{ paddingHorizontal: 20, paddingVertical: 14, fontSize: 16, fontFamily: font.medium, flex: 1 }}
                                        />
                                        <Button bg={color.title} ph={1} pv={1} onPress={handleSearch} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} radius={8}>
                                            <Search size={18} color="#fff" />
                                        </Button>
                                    </Row>
                                </Row>
                            </Column>
                        </Column>
                    }
                    ListFooterComponent={() => <Column mv={40}>{data?.length === 20 &&
                        <Button mv={20} mh={28} onPress={() => { setpage(parseInt(page) + 1) }} bg={color.label} style={{ justifyContent: 'center', alignItems: 'center', }}><LabelBT color="#fff">Mostrar mais chats</LabelBT></Button>}</Column>}
                    ListEmptyComponent={() => <Label size={14} style={{ textAlign: 'center', marginVertical: 80, }}>Nenhum atendimento encontrado</Label>}
                    ItemSeparatorComponent={() => <Column style={{ height: 1, flexGrow: 1, backgroundColor: color.border, marginVertical: 4, borderRadius: 6, }} />}
                />
            }
        </Main>
    )
}


const Chat = ({ item, }) => {
    const { avatarcolaborador, unread, token_chat, criado_em, titulo, nomeusuario } = item
    const navigation = useNavigate()
    if (!item) return null
    return (
        <Column pv={12}>
            <TouchableOpacity onPress={() => { navigation.navigate('ChatDetails', { token: token_chat, user: item, type: 'C' }) }} style={{ paddingHorizontal: 28, paddingVertical: 2, }}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Image style={{ width: 56, height: 56, borderRadius: 100, backgroundColor: '#f7f7f7', }} source={{ uri: avatarcolaborador }} />
                    <Column style={{ flexGrow: 1, marginLeft: 12, }}>
                        <Title size={16}>{titulo} - {nomeusuario.length > 12 ? nomeusuario.slice(0, 12) + '...' : nomeusuario}</Title>
                        <Label size={12} style={{ marginTop: 4, }}>{formatDateTime(criado_em).slice(14)} </Label>
                    </Column>
                    <Column style={{ alignItems: 'flex-end' }}>
                        <Label size={14}>{formatDateTime(criado_em).slice(0, 10)}</Label>
                    </Column>
                </Row>
            </TouchableOpacity>
        </Column>
    )
}
//{unread > 0 && <Column style={{ backgroundColor: color.blue, marginTop: 4, width: 26, height: 26, justifyContent: 'center', borderRadius: 100, alignItems: 'center', }}><Label style={{ color: '#fff', fontFamily: 'Font_Bold', marginTop: 2, fontSize: 14 }}>{unread}</Label></Column>}
