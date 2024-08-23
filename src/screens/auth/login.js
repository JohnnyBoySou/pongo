import React, { useState, useRef, useEffect } from 'react';
import { Main, Scroll, Title, Row, Column, Label, Button, SubLabel, U, useTheme, Loader, LabelBT, SCREEN_HEIGHT, Back, } from '@theme/global';
import { X, Mail, CircleX, CircleCheck, } from 'lucide-react-native';

//Components
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';
import CheckBox from '@components/Forms/checkbox';
import Success from '@components/Forms/success';
import Error from '@components/Forms/error';
//API
import { loginUser, resetPasswordCode, resetPassword, resetPasswordNew } from '@api/request/auth';
import { createPreferences } from '@hooks/preferences';
import { TextInput } from 'react-native';

import Animated, { FadeInDown, SlideInRight, SlideOutRight } from 'react-native-reanimated';

export default function AuthLoginScreen({ navigation, }) {
    const { color, margin, } = useTheme()

    const [loading, setloading] = useState(false);
    const [email, setemail] = useState('admin@admin.com');
    const [password, setpassword] = useState('123456');
    const [terms, setterms] = useState(true);

    const modalForget = useRef()
    const passRef = useRef()

    const [success, setsuccess] = useState();
    const [error, seterror] = useState();

    const handleLogin = async () => {
        setloading(true)
        setsuccess()
        seterror()
        try {
            const res = await loginUser(email, password)
            if (res?.nome) {
                setsuccess('Conectado com sucesso!')
                const saveUser = {
                    "avatar": res?.avatar,
                    "name": res?.name,
                    "email": res?.email,
                    "token": res?.token,
                };
                //  if (res.uiid) {
                //       OneSignal.login(res.uiid)
                //     }
                const preferences = await createPreferences(saveUser)
                if (preferences) {
                    console.log(saveUser)
                    setTimeout(() => {
                        navigation.navigate('Welcome', { name: res?.nome, })
                    }, 600);
                }
            }
        } catch (error) {
            console.log(error.message)
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
                    <Title size={26} style={{ marginTop: 20, marginBottom: 4, }}>Olá! Acesse sua conta utilizando seu e-mail e senha.</Title>

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
                    <Button pv={12} radius={8} ph={8} mv={8} onPress={() => { modalForget.current.expand() }}>
                        <U><LabelBT color={color.title} style={{ fontSize: 16, }}>Recuperar senha</LabelBT></U>
                    </Button>

                    <Row style={{ alignItems: 'center', marginBottom: 32, }}>
                        <CheckBox status={terms} setstatus={setterms} />
                        <Label size={14} style={{ color: color.label, lineHeight: 16, marginLeft: 12, }}>Li e aceito os <U>Termos de uso e Privacidade</U></Label>
                    </Row>

                    {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}

                    <Button bg='#918C8B' disabled={loading} onPress={handleLogin}>
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

            <Modal ref={modalForget} snapPoints={[0.1, SCREEN_HEIGHT]} bg={color.bg}>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <ForgetPassword handleExit={() => { modalForget.current.close() }} />
                </Column>
            </Modal>
        </Main>
    )
}


const ForgetPassword = ({ handleExit, }) => {
    const { color, font, margin, } = useTheme();

    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();

    const [type, settype] = useState('Redefinir');
    const [email, setemail] = useState('');
    const [codigo, setcode] = useState('');
    const [password, setpassword] = useState('');
    const [passwordRepeat, setpasswordRepeat] = useState('');

    const [step, setstep] = useState(1);
    const handleSend = async () => {
        seterror()
        setsuccess()
        setloading(true)
        try {
            const res = await resetPassword(email)
            if (res?.email) {
                setstep(2)
            } else {
                seterror(res)
            }
        } catch (error) {
            console.log(error)
            seterror(error)
        } finally {
            setloading(false)
        }
    }

    const handleVerify = async () => {
        seterror()
        setsuccess()
        setloading(true)
        if (digit1?.length === 1 && digit2?.length === 1 && digit3?.length === 1 && digit4?.length === 1) {
            try {
                const res = await resetPasswordCode(email, digit1 + digit2 + digit3 + digit4)
                if (res?.codigo) {
                    setcode(res?.codigo)
                    settype('Nova senha')
                } else {
                    seterror(res)
                }
            } catch (error) {
                console.log(error)
                seterror(error)
            }
            finally {
                setloading(false)
            }
        }
    }

    const params = { password: password, password_confirmation: passwordRepeat, email: email, codigo: codigo }

    const handleReset = async () => {
        setloading(true)
        seterror()
        setsuccess()
        try {
            const res = await resetPasswordNew(params)
            setsuccess(res?.message)
            setTimeout(() => {
                handleExit('Entrar')
            }, 2000);

        } catch (error) {
            console.log(error)
            seterror(error)
        } finally {
            setloading(false)
        }
    }

    const [digit1, setdigit1] = useState();
    const [digit2, setdigit2] = useState();
    const [digit3, setdigit3] = useState();
    const [digit4, setdigit4] = useState();

    const [focus1, setfocus1] = useState();
    const [focus2, setfocus2] = useState();
    const [focus3, setfocus3] = useState();
    const [focus4, setfocus4] = useState();

    const fc1 = useRef()
    const fc2 = useRef()
    const fc3 = useRef()
    const fc4 = useRef()

    const isPasswordStrong = () => {
        return Object.values(passwordCriteria).every(criterion => criterion);
    };

    const checkPasswordStrength = (password) => {
        const criteria = {
            length: password?.length >= 8,
            upperCase: /[A-Z]/.test(password),
            lowerCase: /[a-z]/.test(password),
            number: /\d/.test(password),
            repeat: password == passwordRepeat
        };
        return criteria;
    };
    const passwordCriteria = checkPasswordStrength(password);

    return (
        <Animated.View >
            <Button onPress={() => handleExit('Entrar')} style={{ width: 42, backgroundColor: color.primary, alignSelf: 'flex-end', height: 42, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                <X size={24} color="#fff" />
            </Button>

            {type === 'Redefinir' && <Column>

                {step == 1 && <Column>
                    <Title style={{ marginBottom: 20, }} size={26}>Preencha seu e-mail</Title>
                    <Input
                        label="E-mail *"
                        placeholder="Email"
                        value={email}
                        onSubmitEditing={handleSend}
                        setValue={setemail}
                    />
                    <Column style={{ height: 10, }} />
                    {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}

                    <Button disabled={loading} onPress={handleSend} style={{ backgroundColor: color.primary, marginBottom: 20, marginTop: 10, }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {loading ? <Loader color="#fff" size={27} /> : <LabelBT color="#fff">Enviar código</LabelBT>}
                        </Row>
                    </Button>
                </Column>}

                {step == 2 && <Column>
                    <Title size={26} style={{ marginBottom: 20, }}>Insira o código de verificação</Title>
                    <Row style={{ borderRadius: 8, justifyContent: 'space-between', alignItems: 'center', marginHorizontal: margin.h, columnGap: 12, marginBottom: 10, }}>
                        <TextInput
                            onFocus={() => setfocus1(true)}
                            onBlur={() => setfocus1(false)}
                            value={digit1}
                            onSubmitEditing={() => { fc2.current?.focus() }}
                            ref={fc1}
                            selectionColor='transparent'
                            onChangeText={(e) => { setdigit1(e); if (e.length === 1) fc2.current?.focus() }}
                            keyboardType='numeric' style={{ color: color.title, fontFamily: font.bold, textAlign: 'center', borderRadius: 12, backgroundColor: focus1 ? "#fff" : color.secundary, fontSize: 32, justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 74, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus2(true)}
                            onBlur={() => setfocus2(false)}
                            value={digit2}
                            ref={fc2}
                            onSubmitEditing={() => { fc3.current?.focus() }}
                            underlineColorAndroid='transparent'
                            selectionColor='transparent'
                            onChangeText={(e) => { setdigit2(e); if (e.length === 1) fc3.current?.focus() }}
                            keyboardType='numeric' style={{ color: color.title, fontFamily: font.bold, textAlign: 'center', borderRadius: 12, backgroundColor: focus2 ? "#fff" : color.secundary, fontSize: 32, justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 74, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus3(true)}
                            onBlur={() => setfocus3(false)}
                            value={digit3}
                            onSubmitEditing={() => { fc4.current?.focus() }}
                            ref={fc3}
                            selectionColor='transparent'
                            onChangeText={(e) => { setdigit3(e); if (e.length === 1) fc4.current?.focus() }}
                            keyboardType='numeric' style={{ color: color.title, fontFamily: font.bold, textAlign: 'center', borderRadius: 12, backgroundColor: focus3 ? "#fff" : color.secundary, fontSize: 32, justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 74, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                        <TextInput
                            onFocus={() => setfocus4(true)}
                            onBlur={() => setfocus4(false)}
                            value={digit4}
                            ref={fc4}
                            selectionColor='transparent'
                            onSubmitEditing={handleVerify}
                            onChangeText={(e) => setdigit4(e)}
                            keyboardType='numeric' style={{ color: color.title, fontFamily: font.bold, textAlign: 'center', borderRadius: 12, backgroundColor: focus4 ? "#fff" : color.secundary, fontSize: 32, justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 74, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                    </Row>
                    {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

                    <Button disabled={loading || digit1 == '' || digit2 == '' || digit3 == '' || digit4 == ''} onPress={handleVerify} style={{ marginTop: 10, backgroundColor: digit4 ? color.primary : color.secundary, marginBottom: 20, }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {loading ? <Loader color="#fff" size={27} /> : <LabelBT color={digit4 ? '#fff' : color.label} align="center">Verificar código</LabelBT>}
                        </Row>
                    </Button>
                </Column>}
            </Column>
            }

            {type == 'Nova senha' && <Column>
                <Title style={{ marginBottom: 20, }} size={26}>Crie uma nova senha</Title>
                <Input
                    label="Senha *"
                    placeholder="Senha"
                    value={password}
                    setValue={setpassword}
                    pass
                />
                <Column style={{ height: 16, }} />
                <Input
                    label="Confirme sua senha *"
                    placeholder="Confirme sua senha"
                    value={passwordRepeat}
                    setValue={setpasswordRepeat}
                    onSubmitEditing={handleReset}
                    pass
                />

                <Label style={{ fontSize: 14, marginTop: 30, marginBottom: 4, }}>Sua senha deve conter pelo menos:</Label>
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
                <Row style={{ marginTop: 8, columnGap: 8, alignItems: 'center', }}>
                    {passwordCriteria?.repeat ? <CircleCheck size={14} color={color.green} /> : <CircleX size={14} color={color.red} />}
                    <Label size={12} >As senhas devem ser iguais. </Label>
                </Row>

                <Column style={{ height: 20, }} />
                {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

                <Button disabled={loading || !isPasswordStrong()} onPress={handleReset} style={{ marginTop: 20, backgroundColor: isPasswordStrong() ? color.primary : color.secundary, marginBottom: 20, }}>
                    <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                        {loading ? <Loader animating={loading} color="#fff" size={27} /> : <LabelBT color={isPasswordStrong() ? '#fff' : color.label} align="center">Definir nova senha</LabelBT>}
                    </Row>
                </Button>
            </Column>
            }
        </Animated.View>
    )
}