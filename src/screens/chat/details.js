import React, { useState, useRef } from 'react';
import { Main, Column, Label, Title, Row, Button, useTheme, SCREEN_HEIGHT, Image } from '@theme/global';

//icons
import { ArrowDown, Camera, Send, X, } from 'lucide-react-native';


//components
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Animated, {ZoomIn, ZoomOut, } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Modal from '@components/Modal/index';

//contxt
import CameraChat from './image';
import AudioRecord from './audio';
import AudioPlayer from './player';

export default function ChatDetailsScreen({ navigation, }) {
    const { color, font, margin } = useTheme();

    const flatMsg = useRef();
    const modalCamera = useRef();
    const [msg, setmsg] = useState();
    const [focusMsg, setfocusMsg] = useState(false);
    const [openCamera, setopenCamera] = useState(false);

    const [audioUri, setAudioUri] = useState(null);
    console.log(audioUri)
    const [showBottom, setshowBottom] = useState();



    return (
        <Main style={{ backgroundColor: '#f7f7f7', }}>
            <Row ph={margin.h} pv={12} style={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', }}>

                <Row>
                    <Image style={{ width: 52, height: 52, borderRadius: 100, backgroundColor: color.sc.sc3, }} />
                    <Column style={{ justifyContent: 'center', marginLeft: 12, }}>
                        <Title>Carol</Title>
                        <Label>Digitando...</Label>
                    </Column>
                </Row>
                <Button onPress={() => { navigation.goBack() }} ph={0} pv={0} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                    <X size={22} color={color.sc.sc3} />
                </Button>
            </Row>
            <FlatList
                ref={flatMsg}
                data={messages}
                ListHeaderComponent={<Column style={{ height: 12, }} />}
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

            <Row style={{ backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, }}>
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
                        <SendButton message={msg} setmessage={setmsg} />
                        :
                        <AudioRecord  onAudioRecord={(uri) => setAudioUri(uri)} />
                    }
                </Column>
            </Row>

            <Modal ref={modalCamera} snapPoints={[0.1, SCREEN_HEIGHT]} onClose={() => setopenCamera(false)}>
                {openCamera && <CameraChat setopenCamera={setopenCamera} modalCamera={modalCamera} />}
            </Modal>
        </Main>
    )
}
const SendButton = ({ message, setmessage }) => {
    const { color } = useTheme();
    const sendMessage = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setmessage('')
    }
    return (
        <Button onPressIn={sendMessage} bg={color.sc.sc3} ph={0} pv={0} style={{ justifyContent: 'center', alignItems: 'center', width: 46, height: 46, }}>
            <Animated.View entering={ZoomIn} exiting={ZoomOut} >
                <Send size={22} color="#fff" />
            </Animated.View>
        </Button>
    )
}

const Message = ({ item }) => {
    const { author, time, message, name, } = item;
    return (
        <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', marginBottom: 30, }}>
            <Column style={{ alignSelf: author ? 'flex-end' : 'flex-start', }}>
                <Title size={16} >{name}</Title>
                <Label size={14} lineHeight={16}>{time}</Label>
            </Column>
            <Column style={{ backgroundColor: author ? '#fff' : '#DFDFDF', marginTop: 8, borderRadius: 12, borderTopLeftRadius: author ? 12 : 0, borderTopRightRadius: author ? 0 : 12 }} ph={12} pv={12}>
                <Label>{message}</Label>
            </Column>
        </Column>
    )
}

const messages = [
    {
        id: 1,
        name: 'João',
        message: 'Olá, tudo bem?',
        time: '10:00',
        author: true,
    },
    {
        id: 2,
        name: 'Atendente Pongo',
        message: 'Bom dia, como posso ajudar?',
        time: '10:02',
        author: false,
    },
    {
        id: 3,
        name: 'João',
        message: 'Estou com um problema no meu pedido, ele ainda não chegou.',
        time: '10:05',
        author: true,
    },
    {
        id: 4,
        name: 'Atendente Pongo',
        message: 'Entendo. Pode me fornecer o número do pedido para verificarmos?',
        time: '10:06',
        author: false,
    },
    {
        id: 5,
        name: 'João',
        message: 'Claro, o número do pedido é 123456.',
        time: '10:08',
        author: true,
    },
    {
        id: 6,
        name: 'Atendente Pongo',
        message: 'Obrigado. Vou verificar o status e já retorno com uma resposta.',
        time: '10:10',
        author: false,
    },
    {
        id: 7,
        name: 'Atendente Pongo',
        message: 'Verifiquei que o pedido está em trânsito e deve chegar até amanhã.',
        time: '10:15',
        author: false,
    },
    {
        id: 8,
        name: 'João',
        message: 'Obrigado pela informação. Vou aguardar.',
        time: '10:17',
        author: true,
    }
];
