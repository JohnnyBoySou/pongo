import React, { useState, useRef } from 'react';
import { Main, Scroll, Title, Row, Column, Label, Button, U, useTheme, Loader, LabelBT, SCREEN_HEIGHT, } from '@theme/global';
import { X, CircleX, CircleCheck, ArrowLeft, } from 'lucide-react-native';

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

import Animated, { } from 'react-native-reanimated';
import { ConfirmEmail } from './register';
import { OneSignal } from 'react-native-onesignal';

export default function AuthLoginScreen({ navigation, }) {
    const { color, margin, } = useTheme()

    const [loading, setloading] = useState(false);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState();
    const [terms, setterms] = useState(true);

    const modalForget = useRef()

    const [success, setsuccess] = useState();
    const [error, seterror] = useState();

    const [type, settype] = useState();

    const handleLogin = async () => {
        setloading(true)
        setsuccess()
        seterror()
        try {
            const res = await loginUser(email, password)
            setname(res?.nome)
            if (res?.status === 'Pendente') {
                seterror('Confirme seu e-mail para ativar sua conta. Aguarde um momento...')
                setTimeout(() => {
                    settype('ConfirmEmail')
                }, 2000);
                return
            }
            else if (res?.status == 'Inativo') {
                seterror('Sua conta foi desativada, entre em contato com o suporte')
                return
            }
            else if (res?.status === 'Ativo') {
                setsuccess('Conectado com sucesso!')
                const saveUser = {
                    "avatar": res?.avatar,
                    "name": res?.nome,
                    "email": res?.email,
                    "token": res?.token,
                };
                if (res?.uiid) {
                    OneSignal.login(res?.uiid)
                }
                const preferences = await createPreferences(saveUser)
                if (preferences) {
                    setTimeout(() => {
                        navigation.navigate('Tabs', { name: res?.nome, })
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

    const passwordRef = useRef()

    return (
        <Main style={{}}>
            <Scroll>

                {type === 'ConfirmEmail' ? <ConfirmEmail navigation={navigation} email={email} name={name} setconfirm={settype} /> :
                    <Column ph={28}>
                        <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg='#FFFFFF'>
                            <ArrowLeft size={20} color='#858585' />
                        </Button>
                        <Title size={26} style={{ marginTop: 20, marginBottom: 4, }}>Olá! Acesse sua conta utilizando seu e-mail e senha.</Title>
                        <Column style={{ height: 16, }} />
                        <Input
                            label="E-mail *"
                            placeholder="Email"
                            value={email}
                            keyboard='email-address'
                            setValue={setemail}
                            onSubmitEditing={() => { passwordRef?.current?.focus() }}
                        />
                        <Column style={{ height: 16, }} />
                        <Input
                            label="Senha *"
                            placeholder="Senha"
                            value={password}
                            ref={passwordRef}
                            pass={true}
                            keyboard='password'
                            setValue={setpassword}
                            onSubmitEditing={handleLogin}
                        />
                        <Button pv={12} radius={8} ph={8} mv={8} onPress={() => { modalForget.current.expand() }}>
                            <U><LabelBT color={color.title} style={{ fontSize: 16, }}>Recuperar senha</LabelBT></U>
                        </Button>

                        <Button onPress={() => { navigation.navigate('Privacidade') }} pv={8} ph={8} radius={4} style={{ marginBottom: 12, }}>
                            <Row style={{ alignItems: 'center', }}>
                                <CheckBox status={terms} setstatus={setterms} />
                                <Label size={14} style={{ color: color.label, lineHeight: 16, marginLeft: 12, }}>Li e aceito os <U>Termos de uso e Privacidade </U> </Label>
                            </Row>
                        </Button>

                        {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}

                        <Button bg='#918C8B' disabled={loading} onPress={handleLogin} style={{ marginTop: 12, }}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                {loading ?
                                    <Loader color="#fff" /> :
                                    <LabelBT color='#FFFFFF' align='center'>Continuar</LabelBT>}
                            </Row>
                        </Button>

                        <Button radius={12} onPress={() => { navigation.navigate('AuthRegister') }} mv={12} bg={color.sc.sc3 + 20}>
                            <Column style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, }}>
                                <Label size={14} color={color.sc.sc3} align="center">Ainda não tem uma conta?</Label>
                                <LabelBT size={14} color={color.sc.sc3} align="center" >Clique aqui para criar</LabelBT>
                            </Column>
                        </Button>

                        <Label size={14} align='center' >Ao continuar, você concorda em receber chamadas e mensagens SMS ou pelo WhatsApp, inclusive automáticas, da Villa PONGO e de suas afiliadas, no número informado.</Label>

                        <Row mv={18} style={{ columnGap: 12, }}>
                            <Button radius={12} onPress={() => { navigation.navigate('AuthLoginColaborador') }} bg={color.label + 20} style={{ flexGrow: 1, }}>
                                <Column style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, }}>
                                    <Label size={14} align="center">Entrar como</Label>
                                    <LabelBT size={14} align="center">Colaborador</LabelBT>
                                </Column>
                            </Button>
                            <Button onPress={() => { navigation.navigate('Tabs', { screen: 'Home' }) }} bg={color.label + 20} radius={12} style={{ flexGrow: 1, }}>
                                <Column style={{ justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, }}>
                                    <Label size={14} align="center">Entrar como</Label>
                                    <LabelBT size={14} align="center">Visitante</LabelBT>
                                </Column>
                            </Button>
                        </Row>


                    </Column>}
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


    const [code, setCode] = useState(new Array(4).fill(''));
    const inputs = useRef([]);
    const handleChange = (text, index) => { if (isNaN(text)) return; const newCode = [...code]; newCode[index] = text; setCode(newCode); if (text !== '' && index < 3) { inputs.current[index + 1].focus(); } };
    const handleKeyPress = (event, index) => { if (event.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') { inputs.current[index - 1].focus(); } };



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
        console.log('aq')
        console.log(code.join(''))
        if (code.join('')?.length === 4) {
            console.log('parou aq')
            try {
                const res = await resetPasswordCode(email, code.join(''))
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
        setloading(false)
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
                        keyboard='email-address'
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
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                style={{
                                    height: 84,
                                    backgroundColor: digit == index ? '#505050' : '#303030',
                                    color: "#fff",
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
                        ))}
                    </Row>
                    {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

                    <Button disabled={loading || code.join('').length == 0} onPress={handleVerify} style={{ marginTop: 10, backgroundColor: code.join('').length == 4 ? color.primary : color.secundary, marginBottom: 20, }}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {loading ? <Loader color="#fff" size={27} /> : <LabelBT color={code.join('').length == 4 ? '#fff' : color.label} align="center">Verificar código</LabelBT>}
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