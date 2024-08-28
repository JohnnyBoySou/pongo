import React, { useState, useRef } from 'react';
import { Main, Scroll, Title, Row, Column, Button, Loader, LabelBT, Back, } from '@theme/global';

//Components
import Input from '@components/Forms/input';
import Success from '@components/Forms/success';
import Error from '@components/Forms/error';
//API

import { loginColaborador } from '@api/request/colaborador';
import { createPreferences } from '@hooks/colaborador';

export default function AuthLoginColaboradorScreen({ navigation, }) {
    const [loading, setloading] = useState(false);
    const [email, setemail] = useState('villapongo@pongo.com.br');
    const [password, setpassword] = useState('@Pongo0101');
    const passRef = useRef()

    const [success, setsuccess] = useState();
    const [error, seterror] = useState();

    const handleLogin = async () => {
        setloading(true)
        setsuccess()
        seterror()
        try {
            const res = await loginColaborador(email, password)
            setsuccess('Conectado com sucesso!')
            const saveUser = {
                "avatar": res?.avatar,
                "name": res?.nome,
                "email": res?.email,
                "token": res?.token,
            };
            const preferences = await createPreferences(saveUser)
            if(preferences){
                setTimeout(() => {
                    navigation.navigate('ChatColaboradorList', { name: res?.nome, user: res, })
                }, 1000);
            }
        } catch (error) {
            seterror(error.message)
        } finally {
            setloading(false)
        }
    }


    return (
        <Main style={{}}>
            <Scroll>

                    <Column ph={28}>
                        <Back />
                        <Title size={26} style={{ marginTop: 20, marginBottom: 4, }}>Área do Colaborador. Faça login com seu e-mail e senha.</Title>

                        <Column style={{ height: 16, }} />
                        <Input
                            label="E-mail *"
                            placeholder="Email"
                            value={email}
                            onSubmitEditing={() => { passRef.current.focus() }}
                            setValue={setemail}
                        />
                        <Column style={{ height: 16, }} />
                        <Input
                            label="Senha *"
                            placeholder="Senha"
                            value={password}
                            ref={passRef}
                            pass={true}
                            setValue={setpassword}
                            onSubmitEditing={handleLogin}
                        />
                        <Column style={{ height: 12, }} />

                        {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}

                        <Button bg='#918C8B' disabled={loading} onPress={handleLogin} mtop={12}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                {loading ?
                                    <Loader color="#fff" /> :
                                    <LabelBT color='#FFFFFF' align='center'>Continuar</LabelBT>}
                            </Row>
                        </Button>

                    </Column>
            </Scroll>


        </Main>
    )
}
