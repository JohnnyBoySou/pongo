import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, SubLabel, ButtonPrimary, Back, Image } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Check, Pencil } from 'lucide-react-native';
import { updateUser, listUser } from '@api/request/auth';

import * as ImagePicker from 'expo-image-picker';
import { updatePreferences } from '@hooks/preferences';
import Input from '@components/Forms/input';

export default function AccountDetailsScreen({ navigation }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [error, setError] = useState();


    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [cpf, setcpf] = useState('123.456.223-01');
    const [email, setemail] = useState();
    const [password, setpassword] = useState();


    const [date, setdate] = useState();
    const [loading, setloading] = useState(true);

    const [avatar, setavatar] = useState();
    const [old_avatar, setold_avatar] = useState();
    const [disabled, setdisabled] = useState(true);

    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await listUser();
                setavatar(res.avatar);
                setdate(res);
                setold_avatar(res.avatar);
                setname(res.name);
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false);
            }
        }
        setTimeout(() => {
            fecthData();
        }, 500);
    }, []);

    const [temporaryImg, settemporaryImg] = useState(false);
    const handleImage = async () => {
        const responsey = await ImagePicker.launchImageLibraryAsync({ base64: true, quality: 1, });
        if (!responsey.canceled) {
            setavatar(responsey.assets[0].base64);
            settemporaryImg(responsey.assets[0].uri);
            setdisabled(false);
        } else {
            setavatar(old_avatar?.length > 0 ? old_avatar : null)
        }
    }

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
                "email": date?.email,
            };
            if (avatar !== old_avatar) {
                params.avatar = avatar
            }

            const update = await updateUser(params);
            const pr = {
                "avatar": update.avatar,
                "name": update.name,
                "whatsapp": update.whatsapp,
            };

            const preferences = await updatePreferences(pr);
            if (preferences) {
                setloading(false);
                setdisabled(true);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false);
            setdisabled(true);
        }


    }
    const profile = temporaryImg ? { uri: `file://${temporaryImg}` } : avatar ? { uri: avatar } : require('@imgs/user_placeholder.png')

    return (
        <Main>
            <Scroll>
                <Column style={{ paddingHorizontal: margin.h, }}>
                    <Back />
                    <Column style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20, }}>
                        <Image style={{ width: 144, height: 144, borderRadius: 100, alignSelf: 'center', marginBottom: 20, }} contentFit="cover" transition={1000} cachePolicy="disk" source={profile} />
                        <ButtonPrimary onPress={handleImage} label="Escolher foto de perfil" />
                    </Column>
                    <Column style={{ marginBottom: 20, }}>
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
                            label="Senha *"
                            placeholder="Senha"
                            value={password}
                            setValue={setpassword}
                            pass
                            disabled
                        />
                    </Column>

                    <ButtonPrimary onPress={() => { navigation.navigate('AccountReset',) }} label="Redefinir minha senha" />

                    <Label style={{ borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12, textAlign: 'center', }}>
                        As alterações podem levar alguns minutos para serem processadas
                    </Label>
                </Column>
                <Column style={{ height: 120, }} />
            </Scroll>

            <Button onPress={() => {
                if (disabled) {
                    setdisabled(false)
                }
                else {
                    handleSave()
                    setdisabled(true)
                }
            }} disabled={loading} style={{ height: 52, borderRadius: 100, position: 'absolute', right: 24, bottom: 24, paddingHorizontal: 16, backgroundColor: disabled ? color.primary : color.green, justifyContent: 'center', alignItems: 'center', }}>
                <Row>
                    {loading ? <ActivityIndicator size="small" color="#fff" />
                        : disabled ?
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Pencil size={18} color="#fff" />
                                <Title style={{ color: "#fff", marginHorizontal: 8, fontSize: 16, fontFamily: 'Font_Medium', }}>Editar</Title>
                            </Row> :
                            <Row style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Check size={22} color="#fff" />
                                <Title style={{ color: "#fff", marginHorizontal: 8, fontSize: 16, fontFamily: 'Font_Medium', }}>Pronto</Title>
                            </Row>}
                </Row>
            </Button>
        </Main>
    )
}

