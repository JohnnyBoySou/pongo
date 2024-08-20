import React, { useState, useRef } from 'react';
import { Main, Scroll, Title, Row, Column, Label, Button, SubLabel, U, LabelBT, Loader, useTheme } from '@theme/global';
import { TextInput, ActivityIndicator } from 'react-native';
//ICONS
import { ArrowLeft, CircleCheck, CircleX } from 'lucide-react-native';

//FORMS
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';
import CheckBox from '@components/Forms/checkbox';

//API
import { registerUser, verifyEmail } from '@api/request/auth';
import Success from '@components/Forms/success';
import Error from '@components/Forms/error';
import { useNavigation } from '@react-navigation/native';
import { createPreferences } from '@hooks/preferences';

export default function AuthRegisterScreen({ navigation, route, }) {
    const { color, font, margin, } = useTheme()

    const [name, setname] = useState();
    const [cpf, setcpf] = useState();
    const [email, setemail] = useState();
    const [tel, settel] = useState();
    const [password, setpassword] = useState();
    const [password2, setpassword2] = useState();

    const passStrong = useRef()

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
    const porcentagePassword = Object.values(passwordCriteria).filter((e) => e).length / Object.values(passwordCriteria).length * 100;
    const messagePassword = porcentagePassword < 50 ? 'Fraca' : porcentagePassword < 80 ? 'Razoável' : 'Forte';
    const colorPassword = porcentagePassword < 50 ? color.red : porcentagePassword < 80 ? '#f5ad42' : color.green;

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
                //navigation.navigate('AddPet')
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
                {!confirm ? <Column ph={28}>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                        <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3}>
                            <ArrowLeft size={20} color="#fff" />
                        </Button>
                        <Button mright={-14} radius={12} onPress={() => { navigation.navigate('AuthLogin') }} >
                            <Column style={{ justifyContent: 'center', alignItems: 'flex-end', backgroundColor: color.sc.sc3 + 20, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, }}>
                                <Label size={14} color={color.sc.sc3}>Já tem uma conta?</Label>
                                <LabelBT size={14} color={color.sc.sc3}>Entre agora mesmo!</LabelBT>
                            </Column>
                        </Button>
                    </Row>
                    <Title size={26} style={{ marginTop: 20, marginBottom: 4, }}>Crie sua conta</Title>
                    <Label size={18}>Crie sua conta na Villa Pongo para aproveitar de beneficios exclusivos.</Label>

                    <Column style={{ height: 16, }} />
                    <Input
                        label="Nome *"
                        placeholder="Nome"
                        value={name}
                        setValue={setname}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="CPF *"
                        placeholder="CPF"
                        value={cpf}
                        setValue={setcpf}
                        mask="CPF"
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="E-mail *"
                        placeholder="Email"
                        value={email}
                        setValue={setemail}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="Telefone *"
                        placeholder="Telefone"
                        value={tel}
                        setValue={settel}
                        mask="PHONE"
                    />
                    <Column style={{ height: 16, }} />

                    <Input
                        label="Senha *"
                        placeholder="Senha"
                        value={password}
                        setValue={setpassword}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="Confirme sua senha *"
                        placeholder="Confirme sua senha"
                        value={password2}
                        setValue={setpassword2}
                    />

                    {password?.length >= 1 &&
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Column style={{ backgroundColor: color.off, height: 10, borderRadius: 30, width: 100, }}>
                                <Column style={{ width: porcentagePassword, height: 10, borderRadius: 100, backgroundColor: colorPassword, }} />
                            </Column>
                            <Button onPress={() => { passStrong.current.expand() }} >
                                <U>
                                    <SubLabel style={{ color: colorPassword }}>{messagePassword}</SubLabel>
                                </U>
                            </Button>
                        </Row>
                    }

                    <Column style={{ height: 16, }} />
                    {err ? <Error msg={err} /> : success ? <Success msg={success} /> : null}


                    <Row style={{ alignItems: 'center', marginBottom: 32, }}>
                        <CheckBox status={terms} setstatus={setterms} />
                        <Label size={14} style={{ color: color.label, lineHeight: 16, marginLeft: 12, }}>Li e aceito os <U>Termos de {'\n'}uso e Privacidade</U></Label>
                    </Row>


                    <Button bg={color.sc.sc3} mbottom={24} onPress={handleRegister} disabled={loading}>
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            {loading ?
                                <Loader color="#fff" /> :
                                <LabelBT style={{ color: '#fff', }} align='center'>Criar conta</LabelBT>}
                        </Row>
                    </Button>

                    <Label size={14} style={{ lineHeight: 18, }} align='center' >Ao continuar, você concorda em receber chamadas e mensagens SMS ou pelo WhatsApp, inclusive automáticas, da Villa Pongo e de suas afiliadas, no número informado.</Label>

                    <Column style={{ height: 70, }} />
                </Column> : <ConfirmEmail email={email} />}
            </Scroll>

            <Modal ref={passStrong} snapPoints={[0.1, 200]}>
                <Column style={{ marginHorizontal: margin.h, marginVertical: margin.v, }}>
                    <SubLabel style={{ color: color.secundary, fontSize: 18, }}>Requisitos para a senha</SubLabel>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.length ? <CircleCheck size={18} color={color.green} /> : <CircleX size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, }}>Mínimo de 8 caracteres</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.upperCase ? <CircleCheck size={18} color={color.green} /> : <CircleX size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, }}>Uma letra MAIÚSCULA.</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.lowerCase ? <CircleCheck size={18} color={color.green} /> : <CircleX size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, }}>Uma letra minúscula.</Label>
                    </Row>
                    <Row style={{ marginTop: 8, }}>
                        {passwordCriteria?.number ? <CircleCheck size={18} color={color.green} /> : <CircleX size={18} color={color.red} />}
                        <Label style={{ fontSize: 16, marginLeft: 12, }}>Um número.</Label>
                    </Row>
                </Column>
            </Modal>
        </Main>
    )
}


const ConfirmEmail = ({ email }) => {
    const { color, font, margin, } = useTheme();
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
    const [success, setsuccess] = useState();
    const navigation = useNavigation();

    const handleVerify = async () => {
        seterror()
        setsuccess()
        setloading(true)
        if (digit1?.length === 1 && digit2?.length === 1 && digit3?.length === 1 && digit4?.length === 1) {
            try {
                const res = await verifyEmail(email, digit1 + digit2 + digit3 + digit4)
                if (res) {
                    setsuccess('Email verificado com sucesso! Aguarde um momento...')
                    const saveUser = {
                        "token": res.token,
                    };
                    // OneSignal.login(res.uiid)
                    const preferences = await createPreferences(saveUser)
                    setTimeout(() => {
                        navigation.replace('AddPets')
                    }, 500);
                }
            } catch (error) {
                console.log(error)
                seterror(error.message)
            } finally {
                setloading(false)
            }
        } else {
            seterror('Preencha o código de verificação')
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

    return (
        <Column style={{ marginHorizontal: margin.h, }}>
            <Column style={{ marginTop: 24, }}>
                <Title style={{ marginBottom: 8, }}>Código de verificação</Title>
                <Label>Confira seu e-mail e copie o código enviado.</Label>
            </Column>
            {success ? <Success msg={success} show={true} /> : error ? <Error msg={error} show={true} /> : null}

            <Row style={{ borderRadius: 8, marginTop: 12, justifyContent: 'space-between', alignItems: 'center', columnGap: 16, }}>
                <TextInput
                    onFocus={() => setfocus1(true)}
                    onBlur={() => setfocus1(false)}
                    value={digit1}
                    onSubmitEditing={() => { fc2.current?.focus() }}
                    ref={fc1}
                    selectionColor='transparent'
                    onChangeText={(e) => { setdigit1(e); if (e.length === 1) fc2.current?.focus() }}
                    keyboardType='numeric' style={{ color: color.sc.sc3, fontFamily: font.bold, textAlign: 'center', borderRadius: 12, backgroundColor: focus1 ? "#fff" : color.sc.sc3+40, fontSize: 32, justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 74,}} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                <TextInput
                    onFocus={() => setfocus2(true)}
                    onBlur={() => setfocus2(false)}
                    value={digit2}
                    ref={fc2}
                    onSubmitEditing={() => { fc3.current?.focus() }}
                    underlineColorAndroid='transparent'
                    selectionColor='transparent'
                    onChangeText={(e) => { setdigit2(e); if (e.length === 1) fc3.current?.focus() }}
                    keyboardType='numeric' style={{ color: color.sc.sc3, fontFamily: font.bold, textAlign: 'center', borderRadius: 12, backgroundColor: focus2 ? "#fff" : color.sc.sc3+40, fontSize: 32, justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 74, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                <TextInput
                    onFocus={() => setfocus3(true)}
                    onBlur={() => setfocus3(false)}
                    value={digit3}
                    onSubmitEditing={() => { fc4.current?.focus() }}
                    ref={fc3}
                    selectionColor='transparent'
                    onChangeText={(e) => { setdigit3(e); if (e.length === 1) fc4.current?.focus() }}
                    keyboardType='numeric' style={{color: color.sc.sc3, fontFamily: font.bold, textAlign: 'center', borderRadius: 12,  backgroundColor: focus3 ? "#fff" : color.sc.sc3+40, fontSize: 32, justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 74, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
                <TextInput
                    onFocus={() => setfocus4(true)}
                    onBlur={() => setfocus4(false)}
                    value={digit4}
                    ref={fc4}
                    selectionColor='transparent'
                    onSubmitEditing={handleVerify}
                    onChangeText={(e) => setdigit4(e)}
                    keyboardType='numeric' style={{color: color.sc.sc3, fontFamily: font.bold, textAlign: 'center', borderRadius: 12, backgroundColor: focus4 ? "#fff" : color.sc.sc3+40, fontSize: 32, justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 74, }} placeholder='*' placeholderTextColor="#11111190" maxLength={1} />
            </Row>
            <Button disabled={loading} onPress={handleVerify} style={{ marginTop: 20, backgroundColor: color.sc.sc3, }} pv={16} ph={24}>
                <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                    {loading ? <ActivityIndicator animating={loading} color="#fff" size={26} /> : <Title size={16} color="#fff">Verificar código</Title>}
                </Row>
            </Button>
        </Column>
    )
}