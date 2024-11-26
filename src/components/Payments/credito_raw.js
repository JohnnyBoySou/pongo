import React, { useEffect, useState, useContext, } from 'react';
import { ActivityIndicator, Pressable, TextInput, Vibration } from 'react-native';
import { Column, Label, Title, Row, Button, LabelBT } from '@theme/global';
import { payCredito, } from '@api/request/payments';

import { MotiView } from 'moti';
import { ThemeContext } from 'styled-components/native';
import { BookUser, Calendar, Check, CreditCard, X, Lock } from 'lucide-react-native';
import { TextInputMask } from 'react-native-masked-text';

import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';

export default function PaymentCreditoShop({ item, }) {
    console.log(item)
    const [error, seterror] = useState();
    const [loading, setloading] = useState(false);
    const [success, setsuccess] = useState();

    const [nome, setnome] = useState('');
    const [cvv, setcvv] = useState('');
    const [mes, setmes] = useState('');
    const [numerocartao, setnumerocartao] = useState('');
    const [cpf, setcpf] = useState('');

    const [focusNome, setfocusNome] = useState();
    const [focusCvv, setfocusCvv] = useState();
    const [focusMes, setfocusMes] = useState();
    const [focusNumerocartao, setfocusNumerocartao] = useState();
    const [focusCPF, setfocusCPF] = useState();

    const { color, font } = useContext(ThemeContext);

    const handleBuyService = async () => {
        setloading(true)
        seterror()
        setsuccess()
        const params = {
            nome: nome,
            cvv: cvv,
            meseano: mes,
            numerocartao: numerocartao,
            cpf: cpf,
        }
        try {
            const res = await payCredito(params)
            setsuccess(true)
            seterror()
            Vibration.vibrate(300);
        } catch (error) {
            seterror(error.message)
            Vibration.vibrate(300);
        } finally {
            setloading(false)
        }
    }

    const visible = nome.length > 0 && cvv.length === 3 && mes.length === 5 && numerocartao.length === 19 ? true : false

    return (
        <Column >

            <Column style={{ marginTop: 12, }}>
                <Column style={{ backgroundColor: color.sc.sc3, borderRadius: 12, flexGrow: 1, paddingVertical: 16, paddingHorizontal: 16, }}>
                    <Title style={{ fontSize: 8, lineHeight: 16, letterSpacing: 1, color: "#fff", }}>NOME COMPLETO</Title>
                    <Column style={{ width: 180, height: 20, backgroundColor: focusNome ? '#fff' : '#ffffff60', borderRadius: 1, marginBottom: 8, }} />
                    <Title style={{ fontSize: 8, lineHeight: 16, letterSpacing: 1, color: "#fff", }}>NÚMERO DO CARTÃO</Title>
                    <Column style={{
                        width: 200, height: 20, backgroundColor: focusNumerocartao ? '#fff' : '#ffffff60', borderRadius: 1
                        ,
                    }} />
                    <Row style={{ marginVertical: 6, }}>
                        <Column style={{ marginRight: 12, }}>
                            <Title style={{ fontSize: 8, lineHeight: 16, letterSpacing: 1, color: "#fff", }}>CVV</Title>
                            <Column style={{ width: 60, height: 20, backgroundColor: focusCvv ? '#fff' : '#ffffff60', borderRadius: 1, }} />
                        </Column>
                        <Column>
                            <Title style={{ fontSize: 8, lineHeight: 16, letterSpacing: 1, color: "#fff", }}>VENCIMENTO</Title>
                            <Column style={{ width: 80, height: 20, backgroundColor: focusMes ? '#fff' : '#ffffff60', borderRadius: 1, }} />
                        </Column>
                    </Row>
                </Column>
            </Column>

            <Column>
                <Row style={{ borderRadius: 1, marginTop: 24, borderWidth: 2, borderColor: focusNome ? "#939393" : color.border, }}>
                    <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 1, }}>
                        <BookUser color={focusNome ? '#939393' : '#00000030'} size={22} />
                    </Column>
                    <TextInput
                        onFocus={() => setfocusNome(true)}
                        onBlur={() => setfocusNome(false)}
                        onChangeText={(e) => setnome(e)}
                        value={nome}
                        autoFocus={true}
                        style={{ fontFamily: font.medium, fontSize: 18, color: color.title, paddingVertical: 12, width: '78%', }} placeholder='Nome completo' placeholderTextColor="#11111190" />
                </Row>

                <Row style={{ borderRadius: 1, marginTop: 12, borderWidth: 2, borderColor: focusNumerocartao ? "#939393" : color.border, }}>
                    <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                        <CreditCard color={focusNumerocartao ? '#939393' : '#00000030'} size={22} />
                    </Column>
                    <TextInputMask
                        type={'credit-card'}
                        onFocus={() => setfocusNumerocartao(true)}
                        onBlur={() => setfocusNumerocartao(false)}
                        onChangeText={(e) => setnumerocartao(e)}
                        value={numerocartao}
                        keyboardType='number-pad'
                        style={{ fontFamily: font.medium, fontSize: 18, color: color.title, paddingVertical: 12, width: '78%', }} placeholder='Número do cartão' placeholderTextColor="#11111190" />
                </Row>

                <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                    <Row style={{ borderRadius: 1, marginTop: 12, borderWidth: 2, borderColor: focusCvv ? "#939393" : color.border, width: '42%', }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                            <Lock color={focusCvv ? '#939393' : '#00000030'} size={22} />
                        </Column>
                        <TextInputMask
                            type={'custom'}
                            options={{ mask: '999' }}
                            onFocus={() => setfocusCvv(true)}
                            onBlur={() => setfocusCvv(false)}
                            onChangeText={(e) => setcvv(e)}
                            value={cvv}
                            keyboardType='number-pad'
                            style={{ fontFamily: font.medium, fontSize: 18, color: color.title, paddingVertical: 12, flexGrow: 1, }} placeholder='CVV' placeholderTextColor="#11111190" />
                    </Row>
                    <Row style={{ borderRadius: 1, marginTop: 12, borderWidth: 2, borderColor: focusMes ? "#939393" : color.border, width: '52%', }}>
                        <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 100, }}>
                            <Calendar color={focusMes ? '#939393' : '#00000030'} size={22} />
                        </Column>
                        <TextInputMask
                            type={'custom'}
                            options={{ mask: '99/99' }}
                            onFocus={() => setfocusMes(true)}
                            onBlur={() => setfocusMes(false)}
                            onChangeText={(e) => setmes(e)}
                            value={mes}
                            keyboardType='number-pad'
                            style={{ fontFamily: font.medium, fontSize: 18, color: color.title, paddingVertical: 12, flexGrow: 1, }} placeholder='Mês/Ano' placeholderTextColor="#11111190" />
                    </Row>
                </Row>

                <Row style={{ borderRadius: 1, marginTop: 12, borderWidth: 2, borderColor: focusCPF ? "#939393" : color.border, }}>
                    <Column style={{ justifyContent: 'center', width: 52, height: 52, alignItems: 'center', borderRadius: 1, }}>
                        <BookUser color={focusCPF ? '#939393' : '#00000030'} size={22} />
                    </Column>
                    <TextInputMask
                        type={'cpf'}
                        onFocus={() => setfocusCPF(true)}
                        onBlur={() => setfocusCPF(false)}
                        onChangeText={(e) => setcpf(e)}
                        value={cpf}
                        style={{ fontFamily: font.medium, fontSize: 18, color: color.title, paddingVertical: 12, width: '78%', }} placeholder='CPF do titular' placeholderTextColor="#11111190" />
                </Row>
            </Column>

            <BuyService handleBuyService={handleBuyService} loading={loading} error={error} success={success} disabled={!visible} />
            <Column style={{ height: 100, }} />
        </Column>
    )
}

const BuyService = ({ handleBuyService, loading, error, success, disabled }) => {
    const { color } = useContext(ThemeContext);
    const widthValue = useSharedValue(162);
    const heightValue = useSharedValue(52);
    const radiusValue = useSharedValue(100);
    const bottomValue = useSharedValue(20);
    const backgroundValue = useSharedValue(error ? '#850505' : '#00A3FF');
    const navigation = useNavigation();

    useEffect(() => {
        if (success && !loading) {
            // Sucesso
            backgroundValue.value = withSpring(color.green);
            setTimeout(() => {
                navigation.navigate('DonateSuccess', { success: success });
            }, 1500);
        } else if (error && !loading) {
            // Erro
            bottomValue.value = withTiming(20, { duration: 300 });
            widthValue.value = withTiming('100%', { duration: 300 });
            heightValue.value = withTiming(52, { duration: 300 });
            radiusValue.value = withTiming(100, { duration: 300 });
            backgroundValue.value = withTiming('#f55353');
        }
        else if (loading && !error && !success) {
            // loading
            radiusValue.value = withTiming(100, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            widthValue.value = withTiming(52, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            heightValue.value = withTiming(52, { duration: 600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
            bottomValue.value = withSpring(20);
        } else if (!loading && !error && !success) {
            // Normal
            bottomValue.value = withTiming(20, { duration: 300 });
            widthValue.value = withTiming('100%', { duration: 300 });
            heightValue.value = withTiming(52, { duration: 300 });
            radiusValue.value = withTiming(100, { duration: 300 });
            backgroundValue.value = withTiming('#778428', { duration: 300 });
        }
    }, [success, error, loading]);


    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: widthValue.value,
            height: heightValue.value,
            backgroundColor: backgroundValue.value,
            bottom: bottomValue.value,
        };
    });
    return (
        <Pressable onPress={handleBuyService} style={{  alignSelf: 'center', zIndex: 99, width: '100%', marginTop:42, alignSelf: 'center' }}>
            <Animated.View style={[{ borderRadius: 1, }, animatedStyle]}>
                <Column style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                    {loading ? <ActivityIndicator size="large" color="#fff" />
                        : <Label style={{ color: '#fff', textAlign: 'center', }}>{error?.length > 0 ? error : 'Verificar e continuar'}</Label>}
                </Column>
                {success &&
                    <MotiView from={{ opacity: 0, }} animate={{ opacity: 1, }} transition={{ type: 'timing', duration: 500, }} delay={500} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                        <MotiView from={{ opacity: 0, scale: 0, }} animate={{ opacity: 1, scale: 1, }} style={{ width: 100, height: 100, borderRadius: 1, backgroundColor: "#ffffff50", justifyContent: 'center', alignItems: 'center', }}>
                            <Check size={32} color="#fff" />
                        </MotiView>
                    </MotiView>}
            </Animated.View>
        </Pressable>

    );
};