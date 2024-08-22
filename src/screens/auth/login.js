import React, { useState, useRef, useEffect } from 'react';
import { Main, Scroll, Title, Row, Column, Label, Button, SubLabel, U, useTheme, SCREEN_WIDTH, LabelBT, SCREEN_HEIGHT } from '@theme/global';
import { ArrowLeft, CircleCheck, CircleX } from 'lucide-react-native';
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';
import CheckBox from '@components/Forms/checkbox';
import { Pressable } from 'react-native';
import { loginUser } from '@api/request/auth';
import Back from '../../components/Back';


export default function AuthLoginScreen({ navigation, }) {
    const { color, margin, } = useTheme()

    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [terms, setterms] = useState(true);
    const [name, setname] = useState('Maria');
    const modalForget = useRef()


    const [loading, setloading] = useState(false);
    const [success, setsuccess] = useState();
    const [error, seterror] = useState();
    const handleLogin = async () => {
        navigation.navigate('Welcome', { name: name, })
        return
        setloading(true)
        setsuccess()
        seterror()
        try {
            const res = await loginUser({ email, password, })
            console.log(res)
            if (res) {
                setsuccess('Conta criada com sucesso!')
                navigation.navigate('AddPet')
            }
        } catch (error) {

        } finally {
            setloading(false)
        }
    }


    const a = false;
    return (
        <Main style={{}}>
            <Scroll>
                <Column ph={28}>

                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 20, }}>
                        <Back />
                    </Row>

                    <Title size={26} style={{ marginTop: 20, marginBottom: 4, }}>Olá! Acesse sua conta utilizando seu e-mail e senha.</Title>

                    <Column style={{ height: 16, }} />
                    <Input
                        label="E-mail *"
                        placeholder="Email"
                        value={email}
                        setValue={setemail}
                    />
                    <Column style={{ height: 16, }} />


                    <Input
                        label="Senha *"
                        placeholder="Senha"
                        value={password}
                        pass={true}
                        setValue={setpassword}
                    />
                    <Column style={{ height: 16, }} />
                    <Pressable style={{ marginBottom: 24, }} onPress={() => { modalForget.current.expand() }}>
                        <U><LabelBT color={color.title} style={{ fontSize: 16, }}>Recuperar senha</LabelBT></U>
                    </Pressable>

                    <Row style={{ alignItems: 'center', marginBottom: 32, }}>
                        <CheckBox status={terms} setstatus={setterms} />
                        <Label size={14} style={{ color: color.label, lineHeight: 16, marginLeft: 12, }}>Li e aceito os <U>Termos de uso e Privacidade</U></Label>
                    </Row>

                    <Button bg='#918C8B'  disabled={loading} onPress={handleLogin}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {loading ?
                                <Loader color="#fff" /> :
                                <LabelBT color='#FFFFFF' align='center'>Continuar</LabelBT>}
                        </Row>
                    </Button>

                    <Button radius={12} onPress={() => { navigation.navigate('AuthRegister') }} mv={12}>
                        <Column style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, }}>
                            <Label size={14} color={color.sc.sc3} align="center">Ainda não tem uma conta?</Label>
                            <LabelBT size={14} color={color.sc.sc3} align="center" >Clique aqui para criar</LabelBT>
                        </Column>
                    </Button>

                    <Label size={14} align='center' >Ao continuar, você concorda em receber chamadas e mensagens SMS ou pelo WhatsApp, inclusive automáticas, da Villa Pongo e de suas afiliadas, no número informado.</Label>

                </Column>
            </Scroll>

            <Modal ref={modalForget} snapPoints={[0.1, SCREEN_HEIGHT]}>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <Title style={{  }}>Recuperar a senha</Title>
                </Column>
            </Modal>
        </Main>
    )
}

