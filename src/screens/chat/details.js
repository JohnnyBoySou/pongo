import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Main, Column, Label, Title, Row, Button, useTheme, SCREEN_HEIGHT, Image } from '@theme/global';

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


import Connect from '@api/request/socket/connect';
import { socket } from '@api/request/socket/socket';
import TopSheet from '@components/TopSheet/index';
import { Pressable } from 'react-native';
import Input from '@components/Forms/input';
import { listMessages } from '@api/request/chat';

export default function ChatDetailsScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const { user, token } = route.params;

    const [messages, setmessages] = useState(msgs);
    const flatMsg = useRef();
    const modalCamera = useRef();
    const [msg, setmsg] = useState();
    const [focusMsg, setfocusMsg] = useState(false);
    const [openCamera, setopenCamera] = useState(false);

    const [audioUri, setAudioUri] = useState(null);
    const [showBottom, setshowBottom] = useState();
    const [search, setsearch] = useState('');
    const topSheetRef = useRef();

    const closeTopSheet = () => {
        if (topSheetRef.current) {
            topSheetRef.current.close(); // Chama a função handleClose
        }
    };

    const expandTopSheet = () => {
        if (topSheetRef.current) {
            topSheetRef.current.expand(); // Chama a função handleExpand
        }
    };




    const [data, setdata] = useState();
    const [loading, setloading] = useState(true);
    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await listMessages(token)
                setdata(res)
            } catch (error) {
                console.log(error)
            } finally { setloading(false) }
        }
        fecthData();
    }, []);







    const searchResult = msgs.filter((item) => item.message.toLowerCase().includes(search.toLowerCase()));
    return (
        <Main style={{ backgroundColor: color.background, }}>
            <TopSheet
                ref={topSheetRef}
                bg={color.bg}
                min={
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center',  paddingTop: 30,}}>
                        <Row>
                            <Pressable pv={1} ph={1} onPress={() => { navigation.goBack() }} >
                                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <ArrowLeft size={28} color={color.sc.sc3} />
                                    <Column style={{ justifyContent: 'center', alignItems: 'flex-end', }}>
                                        <Image style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: color.sc.sc3, marginBottom: -12, }} source={{ uri: user?.avatar }} />
                                        <Connect />
                                    </Column>
                                </Row>
                            </Pressable>
                            <Column style={{ justifyContent: 'center', marginLeft: 12, }}>
                                <Title>{user?.name}</Title>
                                <Label style={{ marginTop: 2, }} size={14}>Visto por último {user?.lastOnline}</Label>
                            </Column>
                        </Row>
                        <Row style={{ columnGap: 8, marginRight: 16, }}>
                            <Button onPress={expandTopSheet} ph={0} pv={0} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                                <Search size={22} color={color.sc.sc3} />
                            </Button>
                        </Row>

                    </Row>
                }
                max={<Column>
                    <Column style={{ marginTop: 30, }}>
                        <Button onPress={closeTopSheet} ph={0} pv={0} mv={12} style={{ width: 42, marginLeft: 12, height: 42, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                            <X size={22} color={color.sc.sc3} />
                        </Button>
                        <Input
                            placeholder="Pesquisar"
                            value={search}
                            label="Pesquisar"
                            setValue={setsearch}
                        />

                    </Column>

                    {searchResult &&<Label style={{ marginVertical: 12, }}>Resultados</Label>}
                    {search.length > 1 &&
                        <Animated.FlatList
                            entering={FadeInDown}
                            exiting={FadeOutDown}
                            data={searchResult}
                            renderItem={({ item }) => <Message item={item} />}
                            keyExtractor={item => item.id}
                            style={{ }}
                        />}
                </Column>}
                valueMin={120}
                valueMax={SCREEN_HEIGHT - 100}
            />

            <Column style={{ height: 90, }} />

            <FlatList
                ref={flatMsg}
                data={messages}
                ListHeaderComponent={<Column style={{ alignSelf: 'center', marginTop: 25, backgroundColor: color.sc.sc3, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, marginBottom: 20, }}>
                    <Label color="#fff">Inicio do chat em 12 de Jun, 2024</Label>
                </Column>}
                renderItem={({ item }) => <Message item={item} />}
                keyExtractor={item => item.id}
                style={{ paddingHorizontal: margin.h, }}
                onScroll={(event) => {
                    if (event.nativeEvent.contentOffset.y > 200) {
                        setshowBottom(false);
                    } else {
                        setshowBottom(true);
                    }
                }}
            />
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
                    style={{ backgroundColor: focusMsg ? color.sc.sc3 + 40 : color.sc.sc3 + 20, color: color.title, width: '68%', marginHorizontal: 12, fontSize: 16, borderRadius: 100, paddingHorizontal: 12, paddingVertical: 8, marginVertical: 12, }}
                />
                <Column style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', marginRight: 12, }}>
                    {msg?.length > 0 ?
                        <SendButton message={msg} setmessage={setmsg} setmessages={setmessages} messages={messages} />
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
const SendButton = ({ message, setmessage, setmessages, messages }) => {
    const { color } = useTheme();
    const handleNewMessage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const hour = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;
        const mins = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;

        /*  socket.emit("message", {
              message: message,
              chat_id: id,
              user_id: user.id,
              timestamp: { hour, mins },
          });
          */
        setmessage('');
        setmessages([...messages, { id: messages.length + 1, name: 'João', message: message, time: `${hour}:${mins}`, author: true }]);
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
    const { author, time, message, name, } = item;
    return (
        <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', marginBottom: 20, }}>

            <Column style={{ backgroundColor: author ? color.off2 : color.sc.sc3 + 30, marginBottom: 6, borderRadius: 12, borderTopLeftRadius: author ? 12 : 0, borderTopRightRadius: author ? 0 : 12 }} ph={12} pv={12}>
                <Label>{message}</Label>
            </Column>
            <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', }}>
                <Label size={14} lineHeight={16}>{time}</Label>
            </Column>
        </Column>
    )
}

const msgs = [
    {
        id: 1,
        name: 'João',
        message: 'Olá, tudo bem?',
        time: '10:00',
        type: 'U',
    },
    {
        id: 2,
        name: 'Atendente Pongo',
        message: 'Bom dia, como posso ajudar?',
        time: '10:02',
        type: 'C',
    }
];
