import React, { useState, useRef, useEffect } from 'react';
import { Main, Column, Label, Title, Row, Button, useTheme, SCREEN_HEIGHT, Image, Loader } from '@theme/global';
import { KeyboardAvoidingView, Platform } from 'react-native';
//icons
import { ArrowDown, ArrowLeft, Camera, Search, Send, X, } from 'lucide-react-native';

//components
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutDown, ZoomIn, ZoomOut, } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Modal from '@components/Modal/index';

//contxt
import AudioRecord from './audio';
import AudioPlayer from './player';

import TopSheet from '@components/TopSheet/index';
import { listMessages } from '@api/request/chat';
import { assinarChat, enviarMsg, } from '@api/request/chat';
import { formatDateTime } from '@hooks/utils';

import socket from '@hooks/socket';

import CameraChat from '@components/Chat/image';
import AudioPlayerDownloaded from '@components/Chat/player';

import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function ChatDetailsScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const { user, token, type } = route.params;
    const flatMsg = useRef();
    const modalCamera = useRef();
    const topSheetRef = useRef();
    const focusSearch = useRef()

    const [imagem, setimagem] = useState();
    const [msg, setmsg] = useState();
    const [messages, setmessages] = useState([]);
    const [chat, setchat] = useState();
    const [focusMsg, setfocusMsg] = useState(false);
    const [openCamera, setopenCamera] = useState(false);

    const [audioUri, setAudioUri] = useState(null);
    const [showBottom, setshowBottom] = useState(null);
    const [search, setsearch] = useState('');

    const searchResult = messages?.filter((item) => item?.mensagem?.toLowerCase().includes(search.toLowerCase()));

    const [loading, setloading] = useState(true);

    const fecthData = async () => {
        setloading(true)
        try {
            assinarChat(token)
            const res = await listMessages(token, type)
            if (res?.chatconversa) {
                setchat(res?.chat)
                setshowBottom(res?.chatconversa.length > 10 ? true : false)
                const tp = type === 'U' ? 'C' : 'U'
                const userObject = res.chatconversa.find(item => item.type == tp);
                const colaboradorimg = userObject?.colaborador?.avatar ? { uri: userObject?.colaborador?.avatar } : require('@imgs/btn-onde-estamos.png')
                const usuarioimg = userObject?.usuario.avatar ? { uri: userObject?.usuario.avatar } : require('@imgs/btn-onde-estamos.png')
                setimagem(type === 'U' ? colaboradorimg : usuarioimg)
                setmessages(res?.chatconversa.reverse())
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
        }
    }

    const isFocused = useIsFocused();
    useEffect(() => {
        console.log('abriu', isFocused)
        fecthData();
    }, [isFocused]);

    useEffect(() => {
        socket.on('chat message', async (dados) => {
            setmessages((msgs) => [...msgs, dados])
        });
       
    }, [socket]);

    useEffect(() => {
        flatMsg.current?.scrollToEnd({ animated: true });
    }, [msg, messages]);




    const handleNewMessage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        const params = {
            message: msg,
            token: token,
            user: user,
            type: type,
        }
        enviarMsg(params, type)
        setmsg('');
    };




    return (
        <Main>
            <TopSheet
                bg="#fff"
                valueMin={110}
                valueMax={SCREEN_HEIGHT - 20}
                ref={topSheetRef}
                min={<Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingTop: 30, }}>
                    <Row>
                        <Button pv={1} ph={1} onPress={() => { navigation.goBack() }} >
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <ArrowLeft size={28} color={color.sc.sc3} />
                                <Column style={{ justifyContent: 'center', alignItems: 'flex-end', width: 52, height: 52, }}>
                                    <Image style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: color.sc.sc3, }} source={imagem} />
                                </Column>
                            </Row>
                        </Button>
                        {!loading &&
                            <Column style={{ justifyContent: 'center', marginLeft: 12, }}>
                                <Title>{chat?.titulo}</Title>
                                <Label style={{ marginTop: 2, }} size={14}>Visto por último {formatDateTime(chat?.alterado_em).slice(14)}</Label>
                            </Column>}
                    </Row>
                    <Row style={{ columnGap: 8, marginRight: 16, }}>
                        <Button onPress={() => { topSheetRef.current?.expand(); focusSearch.current?.focus() }} ph={0} pv={0} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                            <Search size={22} color={color.sc.sc3} />
                        </Button>
                    </Row>

                </Row>}
                max={<Column style={{ paddingTop: 30, }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <TextInput
                            value={search}
                            ref={focusSearch}
                            onChangeText={(e) => setsearch(e)}
                            placeholder="Pesquisar"
                            style={{ fontFamily: font.medium, fontSize: 16, borderWidth: 1, flexGrow: 1, borderColor: color.sc.sc3, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, }}
                        />
                        <Button onPress={() => { topSheetRef.current.close() }} ph={1} pv={1} style={{ width: 42, marginLeft: 12, height: 42, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                            <X size={22} color={color.sc.sc3} />
                        </Button>
                    </Row>
                    {search.length > 0 && <Label style={{ marginVertical: 12, }}>Resultados</Label>}
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
                    ListHeaderComponent={<Column style={{ alignSelf: 'center', marginTop: 25, backgroundColor: color.sc.sc3, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, marginBottom: 20, }}><Label color="#fff">Criado em {formatDateTime(user?.criado_em)}</Label></Column>}
                    renderItem={({ item }) => <Message item={item} type={type} />}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    removeClippedSubviews
                    style={{ paddingHorizontal: margin.h, paddingBottom: 30, }}
                    onScroll={(event) => {
                        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
                        const isNearBottom = contentSize.height - (contentOffset.y + layoutMeasurement.height) < 200;
                        setshowBottom(!isNearBottom);
                    }}

                />}
            <Column style={{ height: 52, }} />

            {showBottom && <Animated.View entering={ZoomIn} exiting={ZoomOut} style={{ position: 'absolute', bottom: 80, alignSelf: 'center', }}>
                <Button onPress={() => { flatMsg.current.scrollToEnd({ animated: true }); }} radius={100} ph={0} pv={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', backgroundColor: color.sc.sc3, }}>
                    <ArrowDown size={22} color="#fff" />
                </Button>
            </Animated.View>}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                style={{ flex: 1, position: 'absolute', bottom: 20, }}
            >

                {audioUri && <AudioPlayer audioUri={audioUri} type={type} token={token} user={user} />}
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
                        multiline
                        placeholderTextColor={color.sc.sc3}
                        onSubmitEditing={handleNewMessage}
                        style={{ fontFamily: font.medium, backgroundColor: focusMsg ? "#f7f7f7" : color.sc.sc3 + 20, color: color.title, width: '68%', marginHorizontal: 12, fontSize: 18, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, marginVertical: 12, }}
                    />
                    <Column style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', marginRight: 12, }}>
                        {msg?.length > 0 ?
                            <Button onPressIn={handleNewMessage} bg={color.sc.sc3} ph={0} pv={0} style={{ justifyContent: 'center', alignItems: 'center', width: 46, height: 46, }}>
                                <Animated.View entering={ZoomIn} exiting={ZoomOut} >
                                    <Send size={22} color="#fff" />
                                </Animated.View>
                            </Button>
                            :
                            <AudioRecord onAudioRecord={(uri) => setAudioUri(uri)} />
                        }
                    </Column>
                </Row>
            </KeyboardAvoidingView>
            <Modal ref={modalCamera} snapPoints={[0.1, SCREEN_HEIGHT - 76]} onClose={() => setopenCamera(false)} bg={color.bg}>
                {openCamera && <CameraChat token={token} user={user} setopenCamera={setopenCamera} modalCamera={modalCamera} type={type} />}
            </Modal>
        </Main>
    )
}


const Message = ({ item, type }) => {
    const { color, font } = useTheme();
    const author = item?.type == type ? true : false;
    const tipo = item?.type_menssagem
    const navigation = useNavigation()
    if (tipo === 'audio') {
        return (
            <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', marginBottom: 20, }}>
                <Column >
                    <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{formatDateTime(item?.criado_em)}</Label>
                    {item?.type === 'C' && <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{item.colaborador?.name}</Label>}
                    {item?.type === 'U' && <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{item.usuario?.name}</Label>}
                </Column>
                <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', marginTop: 6, }}>
                    <AudioPlayerDownloaded audioUri={item?.mensagem} />
                </Column>
            </Column>
        )
    }
    if (tipo === 'imagem') {
        return (
            <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', marginBottom: 20, }}>
                <Column >
                    <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{formatDateTime(item?.criado_em)}</Label>
                    {item?.type === 'C' && <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{item.colaborador?.name}</Label>}
                    {item.type === 'U' && <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{item.usuario?.name}</Label>}
                </Column>
                <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', marginTop: 6, width: 200, height: 200, }}>
                    <Button onPress={() => { navigation.navigate('ChatSingleImage', { img: item?.mensagem }) }} radius={1} pv={1} ph={1}>
                        <Image source={{ uri: item?.mensagem }} style={{ width: 200, height: 200, borderRadius: 12, }} />
                    </Button>
                </Column>
            </Column>
        )
    }
    else if (tipo === 'texto') {
        return (
            <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', marginBottom: 20, }}>
                <Column >
                    <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{formatDateTime(item?.criado_em)}</Label>
                    {item?.type === 'C' && <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{item.colaborador?.name}</Label>}
                    {item.type === 'U' && <Label size={12} lineHeight={16} style={{ alignSelf: author ? 'flex-end' : 'flex-start' }}>{item.usuario?.name}</Label>}
                </Column>
                <Column style={{ backgroundColor: author ? color.off2 : color.sc.sc3 + 30, marginTop: 6, borderRadius: 12, borderTopLeftRadius: author ? 12 : 0, borderTopRightRadius: author ? 0 : 12 }} ph={12} pv={12}>
                    <Label color="#000">{item?.mensagem}</Label>
                </Column>
            </Column>
        )
    }
    else {
        return null
    }
}
