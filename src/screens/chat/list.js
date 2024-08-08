import { Main, Button, Column, Label, Title, Row, Image, useTheme, useNavigate } from '@theme/global';
import { FlatList } from 'react-native-gesture-handler';
import TopMenu from '@components/Header/topmenu';
import { Plus } from 'lucide-react-native';

export default function ChatListScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    return (
        <Main>
            <TopMenu search={false} />
            <Column mh={margin.h} mv={20}>
                <Title size={32}>Atendimento</Title>
            </Column>
            <FlatList
                data={chats}
                renderItem={({ item }) => <Chat item={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <Column style={{ height: 1, flexGrow: 1, backgroundColor: '#30303020', marginVertical: 4, borderRadius: 6, }} />}
            />
            <Button bg={color.blue} style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 30, right: 30, width: 56, height: 56, }}>
                <Plus size={32} color="#fff" strokeWidth={3} />
            </Button>
        </Main>
    )
}

const Chat = ({ item }) => {
    const { color } = useTheme();
    const { avatar, lastMsg, time, name, unread, id } = item
    const navigation = useNavigate()
    return (
        <Button onPress={() => { navigation.navigate('ChatDetails', { id: id, user: item }) }} >
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                <Image style={{ width: 56, height: 56, borderRadius: 100, backgroundColor: '#f7f7f7', }} source={{ uri: avatar }} />
                <Column style={{ flexGrow: 1, marginLeft: 12, }}>
                    <Title size={18}>{name}</Title>
                    <Label size={14} style={{ marginTop: 4, }}>{lastMsg} </Label>
                </Column>
                <Column style={{ alignItems: 'flex-end' }}>
                    <Label size={14}>{time}</Label>
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
        unread: 2,
        id: 1,
    },
    {
        name: 'Lucas',
        avatar: 'https://i.pravatar.cc/301',
        lastMsg: 'Vamos nos encontrar amanhã?',
        time: '09:30',
        unread: 0,
        id: 2,
    },
    {
        name: 'Ana',
        avatar: 'https://i.pravatar.cc/302',
        lastMsg: 'Parabéns pelo seu aniversário!',
        time: '08:20',
        unread: 1,
        id: 3,
    },
    {
        name: 'Mariana',
        avatar: 'https://i.pravatar.cc/304',
        lastMsg: 'Precisamos discutir o projeto.',
        time: '14:10',
        unread: 3,
        id: 5,
    },
    {
        name: 'Felipe',
        avatar: 'https://i.pravatar.cc/305',
        lastMsg: 'Bom dia!',
        time: '07:50',
        unread: 0,
        id: 6,
    },
];
