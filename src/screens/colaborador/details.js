import React, { useState, useRef, useEffect } from 'react';
import { Main, Column, Label, Title, Row, Button, useTheme, SCREEN_HEIGHT, Image, Loader } from '@theme/global';

//icons
import { ArrowDown, ArrowLeft, Camera, Search, Send, X, } from 'lucide-react-native';

//components
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutDown, ZoomIn, ZoomOut, } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Modal from '@components/Modal/index';

//contxt
import CameraChat from './image';
import AudioRecord from './audio';
import AudioPlayer from './player';

import TopSheet from '@components/TopSheet/index';
import Input from '@components/Forms/input';
import { formatDateTime } from '@hooks/utils';
import { enviarMsg, assinarChat, listMessages } from '@api/request/colaborador';
import socket from '@hooks/socket';

export default function ChatDetailsColaboradorScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const { user, token, profile } = route.params;
    const flatMsg = useRef();
    const modalCamera = useRef();
    const topSheetRef = useRef();

    const [chat, setchat] = useState();
    const [msg, setmsg] = useState();
    const [messages, setmessages] = useState([]);
    const [focusMsg, setfocusMsg] = useState(false);
    const [openCamera, setopenCamera] = useState(false);

    const [audioUri, setAudioUri] = useState(null);
    const [showBottom, setshowBottom] = useState();
    const [search, setsearch] = useState('');

    const [loading, setloading] = useState(true);
    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                assinarChat(token)
                const res = await listMessages(token)
                if (res?.chatconversa) {
                    setmessages(res?.chatconversa.reverse())
                    setchat(res?.chat)
                }
            } catch (error) {
                console.log(error)
            } finally { setloading(false) }
        }
        fecthData();
    }, []);

    useEffect(() => {
        socket.on('chat message', async (dados) => {
            setmessages((msgs) => [...msgs, dados])
        });
        return () => {
            socket.off('chat message', async (dados) => {
                setmessages((msgs) => [...msgs, dados])
            });
        };
    }, [socket]);

    const searchResult = messages?.filter((item) => item?.message?.toLowerCase().includes(search.toLowerCase()));
    useEffect(() => {
        flatMsg.current?.scrollToEnd();
    },[messages])

    return (
        <Main>
            <TopSheet
                ref={topSheetRef}
                bg="#fff"
                min={<Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: 30, }}>
                    <Row>
                        <Button pv={1} ph={1} onPress={() => { navigation.goBack() }} >
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <ArrowLeft size={28} color={color.sc.sc3} />
                                <Column style={{ justifyContent: 'center', alignItems: 'flex-end', width: 52, height: 52, }}>
                                    <Image style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: color.sc.sc3, }} source={{ uri: user?.avatar }} />
                                </Column>
                            </Row>
                        </Button>
                        <Column style={{ justifyContent: 'center', marginLeft: 12, }}>
                            <Title>{chat?.titulo}</Title>
                            <Label style={{ marginTop: 2, }} size={14}>Visto por último {formatDateTime(chat?.alterado_em).slice(14)}</Label>
                        </Column>
                    </Row>
                    <Row style={{ columnGap: 8, marginRight: 16, }}>
                        <Button onPress={() => { topSheetRef.current?.expand() }} ph={0} pv={0} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                            <Search size={22} color={color.sc.sc3} />
                        </Button>
                    </Row>

                </Row>
                }
                max={<Column>
                    <Column style={{ marginTop: 20, }}>
                        <Button onPress={() => { topSheetRef.current.close() }} ph={0} pv={0} mv={12} style={{ width: 42, marginLeft: 12, height: 42, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                            <X size={22} color={color.sc.sc3} />
                        </Button>
                        <Input
                            placeholder="Pesquisar"
                            value={search}
                            label="Pesquisar"
                            setValue={setsearch}
                        />
                    </Column>
                    {searchResult && <Label style={{ marginVertical: 12, }}>Resultados</Label>}
                    {search.length > 1 &&
                        <Animated.FlatList
                            entering={FadeInDown}
                            exiting={FadeOutDown}
                            data={searchResult}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            removeClippedSubviews
                            renderItem={({ item }) => <Message item={item} />}
                            keyExtractor={index => index}
                        />}
                </Column>}
                valueMin={110}
                valueMax={SCREEN_HEIGHT - 20}
            />

            <Column style={{ height: 90, }} />


            {loading ?
                <Column style={{ flex: 1, marginTop: 40, }}>
                    <Loader size={32} />
                </Column>
                :
                <FlatList
                    ref={flatMsg}
                    data={messages}
                    ListHeaderComponent={<Column style={{ alignSelf: 'center', marginTop: 25, backgroundColor: color.sc.sc3, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, marginBottom: 20, }}>
                        <Label color="#fff">Criado em {formatDateTime(user?.criado_em)}</Label>
                    </Column>}
                    renderItem={({ item }) => <Message item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    removeClippedSubviews
                    style={{ paddingHorizontal: margin.h, }}
                    onScroll={(event) => {
                        if (event.nativeEvent.contentOffset.y > 200) {
                            setshowBottom(false);
                        } else {
                            setshowBottom(true);
                        }
                    }}
                />}
            {showBottom && <Animated.View entering={ZoomIn} exiting={ZoomOut} style={{ position: 'absolute', bottom: 80, alignSelf: 'center', }}>
                <Button onPress={() => { flatMsg.current.scrollToEnd({ animated: true }); }} radius={100} ph={0} pv={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', backgroundColor: color.sc.sc3, }}>
                    <ArrowDown size={22} color="#fff" />
                </Button>
            </Animated.View>}

            {audioUri && <AudioPlayer audioUri={audioUri} />}

            <Row style={{ backgroundColor: color.off2, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, zIndex: 99, }}>
                <Button onPress={() => { modalCamera.current.expand(); setopenCamera(true) }} ph={0} pv={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 20}>
                    <Camera size={22} color={color.sc.sc3} />
                </Button>
                <TextInput
                    value={msg}
                    onChangeText={setmsg}
                    onFocus={() => setfocusMsg(true)}
                    onBlur={() => setfocusMsg(false)}
                    placeholder='Escreva uma mensagem'
                    textBreakStrategy='highQuality'
                    multiline
                    placeholderTextColor={color.sc.sc3}
                    style={{ fontFamily: font.medium, backgroundColor: focusMsg ? color.sc.sc3 + 40 : color.sc.sc3 + 20, color: color.title, width: '68%', marginHorizontal: 12, fontSize: 16, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 8, marginVertical: 12, }}
                />
                <Column style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', marginRight: 12, }}>
                    {msg?.length > 0 ?
                        <SendButton message={msg} setmessage={setmsg} token={token} user={user}  profile={profile}/>
                        :
                        <AudioRecord onAudioRecord={(uri) => setAudioUri(uri)} />
                    }
                </Column>
            </Row>
            <Modal ref={modalCamera} snapPoints={[0.1, SCREEN_HEIGHT]} onClose={() => setopenCamera(false)}>
                {openCamera && <CameraChat setopenCamera={setopenCamera} modalCamera={modalCamera} />}
            </Modal>
        </Main>
    )
}
const SendButton = ({ message, setmessage, token, user, profile }) => {
    const { color } = useTheme();
    const handleNewMessage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        const params = {
            message: message,
            token: token,
            user: user,
            profile: profile,
        }
        enviarMsg(params)
        setmessage('');
    };

    return (
        <Button onPressIn={handleNewMessage} bg={color.sc.sc3} ph={0} pv={0} style={{ justifyContent: 'center', alignItems: 'center', width: 46, height: 46, }}>
            <Animated.View entering={ZoomIn} exiting={ZoomOut} >
                <Send size={22} color="#fff" />
            </Animated.View>
        </Button>
    )
}

const Message = ({ item }) => {
    const { color, font } = useTheme();
    const author = item?.type === 'C' ? true : false;
    if (!item) return null
    return (
        <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', marginBottom: 20, }}>
            <Column >
                <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{formatDateTime(item?.criado_em)}</Label>
                {author && <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{item.colaborador?.name}</Label>}
                {!author && <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{item.usuario?.name}</Label>}
            </Column>
            <Column style={{ backgroundColor: author ? color.off2 : color.sc.sc3 + 30,  marginTop: 6, borderRadius: 12, borderTopLeftRadius: author ? 12 : 0, borderTopRightRadius: author ? 0 : 12 }} ph={12} pv={12}>
                <Label color="#000">{item?.mensagem}</Label>
            </Column>
        </Column>
    )
}
