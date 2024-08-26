import { Main, Button, Column, Label, Title, Row, Image, useTheme, useNavigate, Loader, LabelBT, Scroll } from '@theme/global';
import { FlatList } from 'react-native-gesture-handler';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';
import { useEffect, useState } from 'react';
import { listChats } from '@api/request/chat';
import { formatDateTime } from '@hooks/utils';
import { TextInput } from 'react-native-gesture-handler';
import { Search } from 'lucide-react-native';
import Back from '@components/Back';
import { searchChats } from '../../api/request/chat';

export default function ChatListScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    const [loading, setloading] = useState();
    const [data, setdata] = useState();
    const [search, setsearch] = useState();

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await listChats()
                setdata(res)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fecthData();
    }, [])


    const handleSearch = async () => {
        if (search?.length > 1) {
            try {
                const res = await searchChats(search)
                setdata(res)
            } catch (error) {
                
            }
        } else { return }
    }




    return (
        <Main>
            <Scroll>

                <TopMenu cart={false} search={false} back={false} />
                <Column mh={margin.h} mv={12}>
                    <Title>Suas conversas</Title>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 28, marginTop: 10,   }}>
                        <Back />
                        <Row style={{ backgroundColor: '#fff', paddingRight: 8, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 8, }}>
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
                {loading ? <Loader /> :
                    <Column>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <Chat item={item} />}
                            keyExtractor={item => item.id}
                            windowSize={10}
                            maxToRenderPerBatch={6}
                            ListEmptyComponent={() => <Label size={14} style={{ textAlign: 'center', marginVertical: 80, }}>Nenhum atendimento encontrado</Label>}

                            ItemSeparatorComponent={() => <Column style={{ height: 1, flexGrow: 1, backgroundColor: color.border, marginVertical: 4, borderRadius: 6, }} />}
                        />
                        <Button onPress={() => { navigation.navigate('ChatNew') }} style={{ borderWidth: 2, borderColor: '#918C8B', }} pv={16} ph={1} mh={margin.h} mtop={30}>
                            <LabelBT color="#918C8B" style={{ textAlign: 'center', }}>Iniciar conversa</LabelBT>
                        </Button>
                        <Column style={{ height: 100, width: 20, }}></Column>
                    </Column>

                }
            </Scroll>

            <TabBar />
        </Main>
    )
}

const Chat = ({ item }) => {
    const { color } = useTheme();
    console.log(item)
    const { avatar, lastMsg, time, name, unread, id, token_chat, criado_em, criado_por, status, titulo } = item
    const navigation = useNavigate()
    return (
        <Button onPress={() => { navigation.navigate('ChatDetails', { token: token_chat, user: item }) }} radius={4}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Image style={{ width: 56, height: 56, borderRadius: 100, backgroundColor: '#f7f7f7', }} source={{ uri: avatar }} />
                <Column style={{ flexGrow: 1, marginLeft: 12, }}>
                    <Title size={18}>{titulo}</Title>
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


const chats = [
    {
        name: 'Carol',
        avatar: 'https://i.pravatar.cc/300',
        lastMsg: 'Ola, tudo bem?',
        time: '10:15',
        lastOnline: '11:40',
        unread: 2,
        id: 1,
    },
    {
        name: 'Lucas',
        avatar: 'https://i.pravatar.cc/301',
        lastMsg: 'Vamos nos encontrar amanhã?',
        time: '09:30',
        lastOnline: '09:40',
        unread: 0,
        id: 2,
    },
    {
        name: 'Ana',
        avatar: 'https://i.pravatar.cc/302',
        lastMsg: 'Parabéns pelo seu aniversário!',
        time: '08:20',
        unread: 1,
        lastOnline: '09:10',
        id: 3,
    },
    {
        name: 'Mariana',
        avatar: 'https://i.pravatar.cc/304',
        lastMsg: 'Precisamos discutir o projeto.',
        time: '14:10',
        lastOnline: '15:10',
        unread: 3,
        id: 5,
    },
    {
        name: 'Felipe',
        avatar: 'https://i.pravatar.cc/305',
        lastMsg: 'Bom dia!',
        time: '07:50',
        lastOnline: '08:40',
        unread: 0,
        id: 6,
    },
];
