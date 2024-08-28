import { Main, Button, Column, Label, Title, Row, Image, useTheme, useNavigate, Loader, LabelBT, Scroll, ButtonPrimary } from '@theme/global';
import { FlatList } from 'react-native-gesture-handler';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';
import { useEffect, useState } from 'react';
import { listChats } from '@api/request/chat';
import { formatDateTime } from '@hooks/utils';
import { TextInput } from 'react-native-gesture-handler';
import { MessageCircleMore, Search } from 'lucide-react-native';
import Back from '@components/Back';
import { searchChats, } from '@api/request/chat';

export default function ChatListScreen({ navigation }) {
    const { color, font, margin } = useTheme();
    const [loading, setloading] = useState();
    const [data, setdata] = useState([]);
    const [search, setsearch] = useState();
    const [page, setpage] = useState(1);

    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await listChats(page)
                setdata((prevdata) => [...prevdata, ...res])
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
                    <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginHorizontal: 28, marginTop: 10, }}>
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
                            <LabelBT color="#918C8B" style={{ textAlign: 'center', fontSize: 20 }}> <MessageCircleMore color={color.title} size={20} /> Iniciar conversa</LabelBT>
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
    const { avatar, unread, token_chat, criado_em, titulo } = item
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



