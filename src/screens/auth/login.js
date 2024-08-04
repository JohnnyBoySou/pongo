import React, {useState, useRef, useEffect } from 'react';
import { Main, Scroll, Title, Row, Column, Label, Button, SubLabel, U, useTheme, SCREEN_WIDTH } from '@theme/global';
import { ArrowLeft, CircleCheck, CircleX } from 'lucide-react-native';
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';


export default function AuthLoginScreen({ navigation, }) {
    const { color, margin, } = useTheme()

    const [email, setemail] = useState();
    const [password, setpassword] = useState();

    const modalForget = useRef()

    return (
        <Main style={{}}>
            <Scroll>
                <Column ph={28}>
                    <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                        <ArrowLeft size={20} color="#fff" />
                    </Button>
                    <Title style={{ fontSize: 26, marginVertical: 20, }}>Olá! &#128075; Entre na sua conta Villa Pongo</Title>

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
                        setValue={setpassword}
                    />
                    <Column style={{ height: 16, }} />
                    

                 

                </Column>
            </Scroll>

            <Modal ref={modalForget} snapPoints={[0.1, 200]}>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <SubLabel style={{ color: color.secundary, fontSize: 18, }}>Requisitos para a senha</SubLabel>
                </Column>
            </Modal>
        </Main>
    )
}

