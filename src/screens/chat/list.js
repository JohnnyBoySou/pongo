import { Main, Button, Column, Label, Title, Row, Image, useTheme, useNavigate, Loader, LabelBT, Scroll, ButtonPrimary } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';
import { useEffect, useState } from 'react';
import { listChats } from '@api/request/chat';
import { formatDateTime } from '@hooks/utils';
import { MessageCircleMore, Search } from 'lucide-react-native';
import Back from '@components/Back';
import { searchChats, } from '@api/request/chat';
import { RefreshControl, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

//import socket from '@hooks/socket';

export default function ChatListScreen({ navigation }) {
    const { color, font, margin } = useTheme();
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([]);
    const [search, setsearch] = useState();
    const [page, setpage] = useState(1);
    const isFocused = useIsFocused();

    const fecthData = async () => {
        setloading(true)
        try {
            const res = await listChats(page, 'U')
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


    //useEffect(() => {
        //    socket.on('chat message', async (dados) => {
        //    setmessages((msgs) => [...msgs, dados])
        //   });
   // }, [socket]);

    const handleSearch = async () => {
        if (search?.length > 1) {
            try {
                const res = await searchChats(search, 'U')
                setdata(res)
            } catch (error) {

            }
        } else {
            const res = await listChats(page, 'U')
            setdata(res)
        }
    }

    return (
        <Main>
            {loading ? <Loader /> :
                <Column>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Chat item={item} />}
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
                        ListHeaderComponent={() => <Column>
                            <TopMenu cart={false} search={false} back={false} />
                            <Column mh={margin.h} mv={12}>
                                <Title size={26}>Suas conversas</Title>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 24, marginTop: 10, }}>
                                    <Back />
                                    <Row style={{ backgroundColor: '#fff', paddingRight: 8, borderRadius: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 12, }}>
                                        <TextInput
                                            value={search}
                                            onChangeText={(e) => setsearch(e)}
                                            placeholder='Pesquisar'
                                            onSubmitEditing={handleSearch}
                                            style={{ paddingHorizontal: 20, paddingVertical: 18, fontSize: 16, fontFamily: font.medium, flex: 1 }}
                                        />
                                        <Button bg={color.title} ph={1} pv={1} onPress={handleSearch} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} radius={1}>
                                            <Search size={18} color="#fff" />
                                        </Button>
                                    </Row>
                                </Row>
                            </Column>
                        </Column>
                        }
                        ListEmptyComponent={() => <Label size={14} style={{ textAlign: 'center', marginVertical: 80, }}>Nenhum atendimento encontrado</Label>}
                        ItemSeparatorComponent={() => <Column style={{ height: 1, flexGrow: 1, backgroundColor: color.border, marginVertical: 4, borderRadius: 6, }} />}
                    />
                    <Button radius={1} bg={color.bg} onPress={() => { navigation.navigate('ChatNew') }} style={{ borderWidth: 2, borderColor: '#918C8B', position: 'absolute', bottom: 45, }} pv={16} ph={1} mh={margin.h} >
                        <LabelBT color="#918C8B" style={{ textAlign: 'center', fontSize: 20 }}> <MessageCircleMore color={color.title} size={20} /> Iniciar conversa</LabelBT>
                    </Button>
                    <Column style={{ height: 100, width: 20, }}></Column>
                </Column>
            }
            <TabBar />
        </Main>
    )
}

const Chat = ({ item, }) => {
    const { alterado_em, unread, token_chat, criado_em, titulo, avatarcolaborador } = item
    const navigation = useNavigate()


    const img = avatarcolaborador ? { uri: avatarcolaborador } : require('@imgs/btn-onde-estamos.png')
    return (
        <Column pv={12}>
        <TouchableOpacity onPress={() => { navigation.navigate('ChatDetails', { token: token_chat, user: item, type: 'U', }) }} style={{ paddingHorizontal: 28, paddingVertical: 2,}}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Image style={{ width: 56, height: 56, borderRadius: 100, backgroundColor: '#f7f7f7', }} source={img} />
                <Column style={{ flexGrow: 1, marginLeft: 12, }}>
                    <Title size={16}>{titulo}</Title>
                    <Label size={12} style={{ marginTop: 4, }}>{formatDateTime(alterado_em).slice(14)}</Label>
                </Column>
                <Column style={{ alignItems: 'flex-end' }}>
                    <Label size={14}>{formatDateTime(criado_em).slice(0, 10)}</Label>
                </Column>
            </Row>
        </TouchableOpacity>
        </Column>
    )
}



