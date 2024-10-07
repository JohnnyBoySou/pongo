import React, { useContext, useState, useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonPrimary, Back, Image, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Check, Pencil } from 'lucide-react-native';
import { updateUser, listUser, excludeUser } from '@api/request/auth';
import * as ImagePicker from 'expo-image-picker';
import { updatePreferences, excludePreferences } from '@hooks/preferences';
import Success from '@components/Forms/success';
import Error from '@components/Forms/error';
import TopMenu from '@components/Header/topmenu';
import Input from '@components/Forms/input';
import TabBar from '@components/TabBar';
import { editNotifications } from '@api/request/auth';
import Modal from '@components/Modal';

export default function AccountDetailsScreen({ navigation }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [error, setError] = useState();
    const [success, setsuccess] = useState();
    const excludeRef = useRef()
    const [name, setname] = useState('*******');
    const [tel, settel] = useState('*** *******');
    const [cpf, setcpf] = useState('***.***.***-**');
    const [email, setemail] = useState('.........@......');
    const [bairro, setbairro] = useState('....');
    const [cidade, setcidade] = useState('.....');
    const [cep, setcep] = useState('.....-...');
    const [complemento, setcomplemento] = useState('.....');
    const [rua, setrua] = useState('...');

    const [loading, setloading] = useState(true);

    const [avatar, setavatar] = useState();
    const [old_avatar, setold_avatar] = useState();
    const [notify, setnotify] = useState();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await listUser();
                setavatar(res.avatar);
                setold_avatar(res.avatar);
                setname(res.nome);
                settel(res.telefone);
                setemail(res.email);
                setcpf(res.cpf);
                setrua(res.rua);
                setcep(res.cep);
                setbairro(res.bairro);
                setcidade(res.cidade);
                setcomplemento(res.complemento);
                setnotify(false);
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false);
            }
        }
        fecthData();
    }, []);

    const [temporaryImg, settemporaryImg] = useState(false);
    const handleImage = async () => {
        const responsey = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 1, });
        if (!responsey.canceled) {
            setavatar(responsey.assets[0].base64);
            settemporaryImg(responsey.assets[0].uri);
        } else {
            setavatar(old_avatar?.length > 0 ? old_avatar : null)
        }
    }
    const [password, setpassword] = useState();
    const handleSave = async () => {
        setError('')

        if (!name || name.length < 4) {
            return setError('Nome completo deve ter pelo menos 4 letras');
        }
        if (tel.length < 10) {
            return setError('Telefone inválido');
        }

        setloading(true);

        try {
            const params = {
                "name": name,
                "tel": tel,
                "email": email,
                "cpf": cpf,
                "cep": cep,
                "complemento": complemento,
                "bairro": bairro,
                "cidade": cidade,
                "rua": rua,
            };
            if (avatar !== old_avatar) {
                params.avatar = avatar
            }

            const update = await updateUser(params);
            const pr = {
                "avatar": update.avatar,
                "name": update.name,
                "tel": update.tel,
                "email": update.email,
                "cpf": update.cpf,
                "cep": update.cep,
                "complemento": update.complemento,
                "bairro": update.bairro,
                "cidade": update.cidade,
                "rua": update.rua,
            };

            const preferences = await updatePreferences(pr);
            if (preferences) {
                setloading(false);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
        }


    }
    const profile = temporaryImg ? { uri: `file://${temporaryImg}` } : avatar ? { uri: avatar } : require('@imgs/user_placeholder.png')
    const handleExit = async () => {
        try {
            const res = await excludeUser(password)
            setsuccess(res.message)
            await excludePreferences()
            setTimeout(() => {
                navigation.navigate('AuthLogin')
            }, 1000);
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }


    const toggleNotification = async () => {
        try {
            const res = await editNotifications(notify)
        } catch (error) {

        } finally {
            setnotify(!notify)
        }
    };
    return (
        <Main>
            <Scroll>
                <TopMenu search={false} />
                <Column style={{ paddingHorizontal: margin.h, }}>
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                        <Image style={{ width: 144, height: 144, borderRadius: 100, alignSelf: 'center', marginBottom: 20, }} contentFit="cover" transition={1000} cachePolicy="disk" source={profile} />
                        <Button onPress={handleImage} style={{ borderWidth: 2, borderColor: color.label, }} pv={8}>
                            <LabelBT size={16} align="center">Escolher foto de perfil</LabelBT>
                        </Button>
                    </Column>
                    <Column style={{ marginBottom: 20, }}>
                        <Input
                            label="CPF *"
                            placeholder="CPF"
                            value={cpf}
                            setValue={setcpf}
                            mask="CPF"
                            disabled
                        />
                        <Column style={{ height: 16, }} />
                        <Input
                            label="E-mail *"
                            placeholder="Email"
                            value={email}
                            setValue={setemail}
                            disabled
                        />
                        <Column style={{ height: 16, }} />
                        <Input
                            label="Nome *"
                            placeholder="Nome"
                            value={name}
                            setValue={setname}
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
                            label="Cidade *"
                            placeholder="Cidade"
                            value={cidade}
                            setValue={setcidade}
                        />
                        <Column style={{ height: 16, }} />
                        <Input
                            label="Bairro *"
                            placeholder="Bairro"
                            value={bairro}
                            setValue={setbairro}
                        />
                        <Column style={{ height: 16, }} />
                        <Input
                            label="Rua *"
                            placeholder="Rua"
                            value={rua}
                            setValue={setrua}
                        />
                        <Column style={{ height: 16, }} />
                        <Input
                            label="Complemento *"
                            placeholder="Complemento"
                            value={complemento}
                            setValue={setcomplemento}
                        />
                        <Column style={{ height: 16, }} />
                        <Input
                            label="CEP *"
                            placeholder="Código postal"
                            value={cep}
                            setValue={setcep}
                            mask="CEP"
                        />
                        <Column style={{ height: 16, }} />

                    </Column>

                    <Button onPress={toggleNotification} style={{ borderWidth: 2, borderColor: color.label, }} pv={8}>
                        <LabelBT align="center" size={16}>{notify ? 'Ativar' : 'Desativar'} notificações</LabelBT>
                    </Button>
                    <Button onPress={() => { navigation.navigate('AuthLogin',) }} style={{ borderWidth: 2, borderColor: color.label, }} pv={8} mv={18}>
                        <LabelBT align="center" size={16}>Redefinir minha senha</LabelBT>
                    </Button>

                    <Button onPress={() => { excludeRef.current?.expand() }} bg={color.red + 10} pv={10} ph={1} >
                        <LabelBT color={color.red} style={{ textAlign: 'center', }}>Excluir conta</LabelBT>
                    </Button>


                </Column>
                <Column style={{ height: 160, }} />
            </Scroll>
            <Modal ref={excludeRef} snapPoints={[0.1, 600]}>
                <Column style={{ marginHorizontal: margin.h, rowGap: 12, }}>
                    <Title>Para prosseguir com a exclusão digite sua senha:</Title>
                    <Input
                        value={password}
                        setValue={setpassword}
                        placeholder="Senha"
                        label="Senha"
                        secure
                    />
                    {success ? <Success msg={success} /> : error ? <Error msg={error} /> : null}
                    <Button onPress={handleExit} bg={color.red + 10} pv={10} ph={1} >
                        <LabelBT color={color.red} style={{ textAlign: 'center', }}>Excluir conta</LabelBT>
                    </Button>
                </Column>
            </Modal>
            <TabBar />
            <Button onPress={handleSave} disabled={loading} style={{ height: 52, borderRadius: 100, position: 'absolute', alignSelf: 'center', bottom: 100, paddingHorizontal: 16, backgroundColor: color.sc.sc1, justifyContent: 'center', alignItems: 'center', }}>
                <Row>
                    {loading ? <ActivityIndicator size="small" color="#fff" />
                        :
                        <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Check size={22} color="#fff" />
                            <Title style={{ color: "#fff", marginHorizontal: 8, fontSize: 16,  }}>Salvar</Title>
                        </Row>}
                </Row>
            </Button>
        </Main>
    )
}
