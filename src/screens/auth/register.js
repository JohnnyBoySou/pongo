import React, { useContext, useState, useRef, useEffect } from 'react';
import { Dimensions, Pressable } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Main, Scroll, Title, Row, Column, Label, Button, SubLabel, U, LabelBT, } from '@theme/global';
import { ArrowLeft, CircleCheck, CircleX } from 'lucide-react-native';
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';
import CheckBox from '@components/Forms/checkbox';

const { width, height } = Dimensions.get('window');

export default function AuthRegisterScreen({ navigation, route, }) {
    const { color, font, margin, } = useContext(ThemeContext)

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

    const [terms, setterms] = useState();
    return (
        <Main style={{}}>
            <Scroll>
                <Column ph={28}>
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
                    <Title size={26} style={{  marginTop: 20, marginBottom: 4, }}>Crie sua conta 😎 </Title>
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
                        maxLength={14}
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
                        maxLength={16}
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
                    <Column style={{ height: 16, }} />

                    {password?.length >= 1 &&
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: -10, }}>
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

                    <Row style={{ alignItems: 'center', marginBottom: 32, }}>
                        <CheckBox status={terms} setstatus={setterms} />
                        <Label size={14} style={{ color: color.label, lineHeight: 16, marginLeft: 12, }}>Li e aceito os <U>Termos de {'\n'}uso e Privacidade</U></Label>
                    </Row>

                    <Button bg={color.sc.sc3} mbottom={24}>
                        <LabelBT style={{ color: '#fff', }} align='center'>Criar conta</LabelBT>
                    </Button>

                    <Label size={14} align='center' >Ao continuar, você concorda em receber chamadas e mensagens SMS ou pelo WhatsApp, inclusive automáticas, da Villa Pongo e de suas afiliadas, no número informado.</Label>

                    <Column style={{height: 70, }} />
                </Column>
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

