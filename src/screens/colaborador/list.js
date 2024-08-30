import { useState, useEffect } from 'react';
import { Main, Button, Column, Label, Title, Row, Image, useTheme, useNavigate, LabelBT, Scroll, Loader } from '@theme/global';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { Search } from 'lucide-react-native';
import { listChats, searchChats } from '@api/request/colaborador';
import { formatDateTime } from '@hooks/utils';
import { getPreferences } from '@hooks/colaborador';
import { RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

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


    const [search, setsearch] = useState();
    const handleSearch = async () => {
        if (search?.length > 1) {
            const res = await searchChats(search, 'C')
            setdata(res)
        } else { return }
    }
    return (
        <Main>
            <Scroll>

                <Column mh={margin.h} mv={20}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Title size={32}>Chats </Title>
                        <Row>
                            <Column style={{ justifyContent: 'center', }}>
                                <Title size={14}>{user?.name}</Title>
                                <Button pv={1} ph={1} style={{ alignSelf: 'flex-end' }} onPress={() => { navigation.navigate('AuthLoginColaborador') }} >
                                    <LabelBT size={14} color={color.red}>Sair</LabelBT>
                                </Button>
                            </Column>
                            <Image source={{ uri: user?.avatar }} style={{ width: 54, borderRadius: 100, height: 54, objectFit: 'contain', marginLeft: 12, }} />
                        </Row>
                    </Row>
                </Column>

                <Row style={{ backgroundColor: '#fff', paddingRight: 8, borderRadius: 10, marginHorizontal: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
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

                <Column>

                </Column>

                <FlatList
                    data={data}
                    renderItem={({ item }) => <Chat item={item} user={user} />}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <Column style={{ height: 1, flexGrow: 1, backgroundColor: color.border, marginVertical: 4, borderRadius: 6, }} />}
                    windowSize={10}
                    onRefresh={() => { fecthData() }}
                    refreshing={loading}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={fecthData}
                            colors={[color.sc.sc3]}
                        />
                    }
                    maxToRenderPerBatch={6}
                    ListFooterComponent={() => <Column>{data?.length > 1 &&
                        <Button mv={20} mh={28} onPress={() => { setpage(parseInt(page) + 1) }} bg={color.label} style={{ justifyContent: 'center', alignItems: 'center', }}><LabelBT color="#fff">Mostrar mais chats</LabelBT></Button>}</Column>}
                    ListEmptyComponent={() => <Label size={14} style={{ textAlign: 'center', marginVertical: 80, }}>Nenhum atendimento encontrado</Label>}
                />
            </Scroll>
        </Main>
    )
}


const Chat = ({ item, }) => {
    const { color } = useTheme();
    const { avatarcolaborador, unread, token_chat, criado_em, titulo, nomeusuario } = item
    const navigation = useNavigate()
    if (!item) return null
    return (
        <Button onPress={() => { navigation.navigate('ChatDetails', { token: token_chat, user: item, type: 'C' }) }} radius={4} ph={28}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Image style={{ width: 56, height: 56, borderRadius: 100, backgroundColor: '#f7f7f7', }} source={{ uri: avatarcolaborador }} />
                <Column style={{ flexGrow: 1, marginLeft: 12, }}>
                    <Title size={18}>{titulo} - {nomeusuario.length > 12 ? nomeusuario.slice(0, 12) + '...' : nomeusuario}</Title>
                    <Label size={14} style={{ marginTop: 4, }}>{formatDateTime(criado_em).slice(14)} </Label>
                </Column>
                <Column style={{ alignItems: 'flex-end' }}>
                    <Label size={14}>{formatDateTime(criado_em).slice(0, 10)}</Label>
                    {unread > 0 && <Column style={{ backgroundColor: color.blue, marginTop: 4, width: 26, height: 26, justifyContent: 'center', borderRadius: 100, alignItems: 'center', }}><Label style={{ color: '#fff', fontFamily: 'Font_Bold', marginTop: 2, fontSize: 14 }}>{unread}</Label></Column>}
                </Column>
            </Row>
        </Button>
    )
}
