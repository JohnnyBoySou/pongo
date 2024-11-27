import React, { useState, useRef } from 'react';
import { Main, Scroll, Title, Row, Column, Label, Button, SubLabel, U, LabelBT, Loader, useTheme, Back } from '@theme/global';
import { TextInput, } from 'react-native';
//ICONS
import { CircleCheck, CircleX, X } from 'lucide-react-native';

//FORMS
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';
import CheckBox from '@components/Forms/checkbox';
//API
import { registerUser, verifyEmail } from '@api/request/auth';

import Success from '@components/Forms/success';
import Error from '@components/Forms/error';

import { OneSignal } from 'react-native-onesignal';
import { createPreferences } from '@hooks/preferences';

export default function AuthRegisterScreen({ navigation, route, }) {
    const { color, font, margin, } = useTheme()

    const [name, setname] = useState();
    const [cpf, setcpf] = useState();
    const [email, setemail] = useState();
    const [tel, settel] = useState();
    const [password, setpassword] = useState();
    const [password2, setpassword2] = useState();



    const checkPasswordStrength = (password) => {
        const criteria = {
            length: password?.length >= 8,
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            number: /\d/.test(password),
        };
        return criteria;
    };

    const passwordCriteria = checkPasswordStrength(password);

    const [terms, setterms] = useState(true);
    const [confirm, setconfirm] = useState(false);
    const [loading, setloading] = useState(false);
    const [success, setsuccess] = useState();
    const [err, seterror] = useState();
    const handleRegister = async () => {
        setloading(true)
        setsuccess()
        seterror()
        try {
            const res = await registerUser({ name, email, password, cpf, tel, })
            console.log(res)
            if (res) {
                setsuccess('Verifique seu e-mail!')
                setconfirm(true)
                // navigation.navigate('Welcome', { name: name, })
            }
        } catch (error) {
            console.log(error.message)
            seterror(error.message)
        } finally {
            setloading(false)
        }
    }


    const cpfRef = useRef()
    const emailRef = useRef()
    const telRef = useRef()
    const passRef = useRef()
    const pass2Ref = useRef()


    return (
        <Main style={{}}>
            <Scroll>
                {!confirm ? <Column ph={28}>
                    <Back />
                    <Title size={26} style={{ marginTop: 20, marginBottom: 4, }}>Olá! Faça seu cadastro aqui.</Title>

                    <Column style={{ height: 16, }} />
                    <Input
                        label="Nome *"
                        placeholder="Nome"
                        value={name}
                        setValue={setname}
                        onSubmitEditing={() => { cpfRef.current?.focus() }}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="CPF *"
                        placeholder="CPF"
                        value={cpf}
                        ref={cpfRef}
                        onSubmitEditing={() => { emailRef.current?.focus() }}
                        setValue={setcpf}
                        mask="CPF"
                        keyboard="numeric"
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="E-mail *"
                        placeholder="Email"
                        ref={emailRef}
                        value={email}
                        onSubmitEditing={() => { telRef.current?.focus() }}
                        keyboard="email-address"
                        setValue={setemail}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="Telefone *"
                        placeholder="Telefone"
                        ref={telRef}
                        value={tel}
                        onSubmitEditing={() => { passRef.current?.focus() }}
                        setValue={settel}
                        keyboard="numeric"
                        mask="PHONE"
                    />
                    <Column style={{ height: 16, }} />

                    <Input
                        label="Senha *"
                        placeholder="Senha"
                        ref={passRef}
                        value={password}
                        onSubmitEditing={() => { pass2Ref.current?.focus() }}
                        setValue={setpassword}
                        pass
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="Confirme sua senha *"
                        placeholder="Confirme sua senha"
                        ref={pass2Ref}
                        value={password2}
                        setValue={setpassword2}
                        pass
                        onSubmitEditing={handleRegister}
                    />


                    <Label style={{ fontSize: 14, marginTop: 14, marginBottom: 4, }}>Sua senha deve conter pelo menos:</Label>
                    <Row style={{ marginTop: 8, columnGap: 8, alignItems: 'center', }}>
                        {passwordCriteria?.length ? <CircleCheck size={14} color={color.green} /> : <CircleX size={14} color={color.red} />}
                        <Label size={12} >Mínimo de 8 caracteres </Label>
                    </Row>
                    <Row style={{ marginTop: 8, columnGap: 8, alignItems: 'center', }}>
                        {passwordCriteria?.upperCase ? <CircleCheck size={14} color={color.green} /> : <CircleX size={14} color={color.red} />}
                        <Label size={12} >Uma letra MAIÚSCULA. </Label>
                    </Row>
                    <Row style={{ marginTop: 8, columnGap: 8, alignItems: 'center', }}>
                        {passwordCriteria?.lowerCase ? <CircleCheck size={14} color={color.green} /> : <CircleX size={14} color={color.red} />}
                        <Label size={12} >Uma letra minúscula. </Label>
                    </Row>
                    <Row style={{ marginTop: 8, columnGap: 8, alignItems: 'center', }}>
                        {passwordCriteria?.number ? <CircleCheck size={14} color={color.green} /> : <CircleX size={14} color={color.red} />}
                        <Label size={12} >Um número. </Label>
                    </Row>

                    <Column style={{ height: 16, }} />
                    {err ? <Error msg={err} /> : success ? <Success msg={success} /> : null}


                    <Button onPress={() => { navigation.navigate('Privacidade') }} pv={8} ph={8} radius={4} style={{ marginBottom: 32, }}>
                        <Row style={{ alignItems: 'center', }}>
                            <CheckBox status={terms} setstatus={setterms} />
                            <Label size={14} style={{ color: color.label, lineHeight: 16, marginLeft: 12, }}>Li e aceito os <U>Termos de uso e Privacidade</U></Label>
                        </Row>
                    </Button>


                    <Button bg='#918C8B' onPress={handleRegister} disabled={loading} radius={1}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {loading ?
                                <Loader color="#fff" /> :
                                <LabelBT color="#fff" align='center'>Criar conta</LabelBT>}
                        </Row>
                    </Button>
                    <Button radius={12} onPress={() => { navigation.navigate('AuthLogin') }} mv={12}>
                        <Column style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, }}>
                            <Label size={14} color={color.sc.sc3} align="center">Já tem uma conta?</Label>
                            <LabelBT size={14} color={color.sc.sc3} align="center">Clique aqui para entrar</LabelBT>
                        </Column>
                    </Button>
                    <Label size={14} style={{ lineHeight: 18, }} align='center' >Ao continuar, você concorda em receber chamadas e mensagens SMS ou pelo WhatsApp, inclusive automáticas, da Villa Pongo e de suas afiliadas, no número informado.</Label>

                    <Column style={{ height: 70, }} />
                </Column> : <ConfirmEmail email={email} name={name} navigation={navigation} setconfirm={setconfirm} />}
            </Scroll>
        </Main>
    )
}


export const ConfirmEmail = ({ email, name, navigation, setconfirm }) => {
    const { color, font, margin, } = useTheme();
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    const [code, setCode] = useState(new Array(4).fill(''));
    const inputs = useRef([]);
    const handleChange = (text, index) => { if (isNaN(text)) return; const newCode = [...code]; newCode[index] = text; setCode(newCode); if (text !== '' && index < 3) { inputs.current[index + 1].focus(); } };
    const handleKeyPress = (event, index) => { if (event.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') { inputs.current[index - 1].focus(); } };

    const handleVerify = async () => {
        seterror()
        setsuccess()
        setloading(true)
        if (code.join('').length === 4) {
            try {
                const res = await verifyEmail(email, code.join(''))
                if (res) {
                    setsuccess('E-mail confirmado! Aguarde um momento...')
                    const saveUser = {
                        "avatar": res?.avatar,
                        "name": res?.nome,
                        "email": res?.email,
                        "token": res?.token,
                    };
                    OneSignal.login(res.uiid)
                    const preferences = await createPreferences(saveUser)
                    setTimeout(() => {
                        navigation.replace('Tabs')
                    }, 500);
                }
            } catch (error) {
                seterror(error.message)
            } finally {
                setloading(false)
            }
        } else {
            seterror('Preencha o código de verificação')
            setloading(false)
        }
    }

    return (
        <Column style={{ marginHorizontal: margin.h, }}>
            <Column style={{ marginTop: 24, }}>
                <Button onPress={() => { setconfirm(false) }} style={{ backgroundColor: '#fff', alignSelf: 'flex-start', width: 56, height: 56, justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                    <X size={24} color={color.title} />
                </Button>
                <Title size={26} style={{ marginBottom: 8, }}>Confirme seu e-mail</Title>
                <Label>Digite o código enviado em seu e-mail</Label>
            </Column>
            {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

            <Row style={{ borderRadius: 8, marginTop: 12, justifyContent: 'space-between', alignItems: 'center', columnGap: 16, }}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        style={{
                            height: 84,
                            backgroundColor: digit == index ? '#F7F7F7' : '#FFF',
                            color: color.title,
                            fontFamily: font.medium,
                            borderRadius: 12,
                            flexGrow: 1,
                            textAlign: 'center',
                            fontSize: 32,
                        }}
                        keyboardType="number-pad"
                        maxLength={1}
                        ref={(input) => (inputs.current[index] = input)}
                    />
                ))}</Row>
            <Button disabled={loading} onPress={handleVerify} style={{ marginTop: 20, backgroundColor: color.primary, }} radius={1} pv={16} ph={24}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                    {loading ? <Loader color="#fff" size={26} /> : <Title size={18} color="#fff">Verificar código</Title>}
                </Row>
            </Button>
        </Column>
    )
}