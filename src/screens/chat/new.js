import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Image, Loader, Back } from '@theme/global';
import { createChat } from '@api/request/chat';

export default function ChatNewScreen({ navigation, }) {
    const { color, font, } = useTheme();
    const [loading, setloading] = useState();    
    const [data, setdata] = useState();
    const [titulo, settitulo] = useState('Preciso de ajuda');
    
    useEffect(() => {
        const fecthData = async () => {
            setloading(true)
            try {
                const res = await createChat(titulo)
                console.log(res)
                if(res){
                    navigation.navigate('ChatDetails', { token: res.token, user: res.chat, })
                }
            } catch (error) {
                console.log(error)
            } finally{
                setloading(false)
            }
        }
        fecthData();
    }, [])
    


    return (
        <Main style={{ justifyContent: 'center', }}>
            <Column style={{ marginHorizontal: 28, marginTop: -40, }}>
                <Back />
            <Column style={{ backgroundColor: '#fff', borderRadius: 24, marginTop: 20, justifyContent: 'center', alignItems: 'center', }} pv={20} ph={30}>
                <Image source={require('@imgs/chatload.png')} style={{ width: 200, height: 200, objectFit: 'contain' }} />
                <Label align='center' style={{ marginVertical: 20, }}>Por favor aguarde, você será {'\n'}direcionado para o atendente {'\n'}disponível em 5 segundos</Label>
                <Loader size={32} color={color.pr.pr1} />
            </Column>
            </Column>

        </Main>
    )
}