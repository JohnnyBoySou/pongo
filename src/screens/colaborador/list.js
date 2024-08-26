import { useState, useEffect } from 'react';
import { Main, Button, Column, Label, Title, Row, Image, useTheme, useNavigate, LabelBT } from '@theme/global';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { Search } from 'lucide-react-native';
import { listChats, searchChats } from '@api/request/colaborador';
import { formatDateTime } from '@hooks/utils';
import { getPreferences } from '@hooks/colaborador';

export default function ChatColaboradorListScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const [user, setuser] = useState();
    //alterar as cores e pesquisar por nome 

    const [loading, setloading] = useState();
    const [data, setdata] = useState();


    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await listChats()
                const pref = await getPreferences()
                setuser(pref)
                setdata(res)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fecthData();
    }, [])
    const [search, setsearch] = useState();
    const handleSearch = async () => {
        console.log('aq')
        if (search?.length > 1) {
            try {
                const res = await searchChats(search)
                console.log(res)
                setdata(res)
            } catch (error) {
                
            }
        } else { return }
    }
    return (
        <Main>
            <Column mh={margin.h} mv={20}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Title size={32}>Chats</Title>
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
                renderItem={({ item }) => <Chat item={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <Column style={{ height: 1, flexGrow: 1, backgroundColor: color.border, marginVertical: 4, borderRadius: 6, }} />}
                windowSize={10}
                maxToRenderPerBatch={6}
                ListEmptyComponent={() => <Label size={14} style={{ textAlign: 'center', marginVertical: 80, }}>Nenhum atendimento encontrado</Label>}
            />
        </Main>
    )
}


const Chat = ({ item }) => {
    const { color } = useTheme();
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

/**
 * <ScrollView horizontal style={{  marginBottom: 20, }} contentContainerStyle={{ columnGap: 12,  }} showsHorizontalScrollIndicator={false}>
                <Column style={{width: 10, }} />
                {filter.map((item, index) => <Button key={index} onPress={() => { setselectFilter(item) }} radius={100} style={{ paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center',  paddingVertical: 12, backgroundColor: selectFilter === item ? color.sc.sc3 : color.sc.sc3 + 20, }}><Label style={{ color: selectFilter === item ? "#fff" : color.sc.sc3, fontFamily: 'Font_Bold', fontSize: 15, }}>{item} </Label></Button>)}
                <Column style={{width: 28, }} />
            </ScrollView>
              const filter = ['Em aberto', 'Concluídos', 'Cancelados', 'Todos']
    const [selectFilter, setselectFilter] = useState('Em aberto');
 */