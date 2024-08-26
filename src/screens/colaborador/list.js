import { useState } from 'react';
import { Main, Button, Column, Label, Title, Row, Image, useTheme, useNavigate, LabelBT } from '@theme/global';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TopMenu from '@components/Header/topmenu';

export default function ChatColaboradorListScreen({ navigation,  route}) {
    const { color, font, margin } = useTheme();
    const user = route.params?.user ? route.params?.user : { name: 'Carol', avatar: 'https://i.pravatar.cc/300', }
    const filter = ['Em aberto', 'Concluídos', 'Cancelados', 'Todos']
    const [selectFilter, setselectFilter] = useState('Em aberto');
    return (
        <Main>
            <Column mh={margin.h} mv={20}>
                <Row style={{ justifyContent: 'space-between', alignItems: 'center',  }}>

                <Title size={32}>Chats</Title>

                <Row>
                    <Column style={{ justifyContent: 'center',   }}>
                        <Title>{user?.name}</Title>
                        <Button pv={1} mtop={-4} onPress={() => {navigation.navigate('AuthLoginColaborador')}} >
                            <LabelBT size={14} color={color.red}>Sair</LabelBT>
                        </Button>
                    </Column>
                    <Image source={{uri: user?.avatar}} style={{width: 54, borderRadius: 100, height: 54, objectFit: 'contain'}} />
                </Row>
                </Row>
            </Column>
            <Column>
            <ScrollView horizontal style={{  marginBottom: 20, }} contentContainerStyle={{ columnGap: 12,  }} showsHorizontalScrollIndicator={false}>
                <Column style={{width: 10, }} />
                {filter.map((item, index) => <Button key={index} onPress={() => { setselectFilter(item) }} radius={100} style={{ paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center',  paddingVertical: 12, backgroundColor: selectFilter === item ? color.sc.sc3 : color.sc.sc3 + 20, }}><Label style={{ color: selectFilter === item ? "#fff" : color.sc.sc3, fontFamily: 'Font_Bold', }}>{item}</Label></Button>)}
                <Column style={{width: 28, }} />
            </ScrollView>
            </Column>
            <FlatList
                data={chats}
                renderItem={({ item }) => <Chat item={item} />}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <Column style={{ height: 1, flexGrow: 1, backgroundColor: color.border, marginVertical: 4, borderRadius: 6, }} />}
            />
        </Main>
    )
}

const Chat = ({ item }) => {
    const { color } = useTheme();
    const { avatar, lastMsg, time, name, unread, id } = item
    const navigation = useNavigate()
    return (
        <Button onPress={() => { navigation.navigate('ChatDetails', { id: id, user: item }) }} radius={4}>
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
