import React, { useState, useEffect } from 'react';
import { Main, Column, Label, Title, Row, Button, useTheme, Image, Loader, Back, LabelBT } from '@theme/global';
import { createChat } from '@api/request/chat';
import socket from '@hooks/socket';


export default function ChatNewScreen({ navigation, }) {
    const { color, font, } = useTheme();
    const [loading, setloading] = useState();
    const [titulo, settitulo] = useState('Preciso de ajuda');

    const fecthData = async () => {
        setloading(true)
        try {
            const res = await createChat(titulo)
            if (res) {
                socket.emit('atualizarlista', {});
                navigation.replace('ChatDetails', { token: res.token, user: res.chat, type: 'U' })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }

    const helps = ['Loja', 'Escola', 'Hotel', 'Vet', 'Grooming','Outros']

    return (
        <Main style={{ justifyContent: 'center', }}>
            <Column style={{ marginHorizontal: 28, marginTop: -40, }}>
                <Back />

                {loading ?
                    <Column style={{ backgroundColor: '#fff', borderRadius: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center', }} pv={20} ph={30}>
                        <Image source={require('@imgs/chatload.png')} style={{ width: 200, height: 200, objectFit: 'contain' }} />
                        <Label align='center' style={{ marginVertical: 20, }}>Por favor aguarde, você será {'\n'}direcionado para o atendente {'\n'}disponível em 5 segundos</Label>
                        <Loader size={32} color={color.pr.pr1} />
                    </Column> :
                    <Column style={{ backgroundColor: '#fff', borderRadius: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center', }} pv={20} ph={20}>
                        <Title>Qual é o motivo do contato?</Title>
                        <Row style={{ flexWrap: 'wrap', rowGap: 8, columnGap: 8, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        {helps?.map((item, index) => (
                            <Button radius={1} key={index} onPress={() => {settitulo(item)}} style={{ backgroundColor: item == titulo ? color.sc.sc3 : color.sc.sc3+30, }} pv={8} ph={16}>
                                <LabelBT style={{ color: item == titulo ? '#fff' : color.sc.sc3, fontSize: 16, }}>{item}</LabelBT>
                            </Button>
                        ))}
                        </Row>
                        <Button radius={1} onPress={fecthData} style={{ backgroundColor: color.sc.sc1, width: '100%', justifyContent: 'center', alignItems: 'center',  }} pv={14} ph={16} mtop={20} >
                            <LabelBT color="#fff" style={{ fontSize: 16, }}>Prosseguir</LabelBT>
                        </Button>
                    </Column>
                }
            </Column>

        </Main>
    )
}