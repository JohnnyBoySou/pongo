import React, { useState, useRef } from 'react';
import { View, Pressable } from 'react-native';
import { Column, Title, Main, Row, Label, Button, LabelBT, useTheme, Scroll, U, SubLabel } from '@theme/global';
import { ArrowLeft } from 'lucide-react-native';
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';
import CheckBox from '@components/Forms/checkbox';

export default function AddPetScreen({ navigation, route, }) {
    const { color, margin, font } = useTheme()

    const [name, setname] = useState();
    const [date, setdate] = useState();
    const [terms, setterms] = useState(true);
    const [type, settype] = useState();
    const modalForget = useRef()


    const animals = [
        {
            icon: '🐱',
            label: 'Gato',
            color: color.sc.sc2,
        },
        {
            icon: '🐶',
            label: 'Cão',
            color: color.sc.sc3,
        },
    ]

    return (
        <Main style={{}}>
            <Scroll>
                <Column ph={28}>
                    <Button pv={8} ph={20} bg={color.sc.sc3 + 30} onPress={() => { navigation.navigate('Tabs', { screen: 'Home', }) }} style={{ alignSelf: 'flex-end', marginBottom: 20, }}>
                        <LabelBT color={color.sc.sc3} align="center">Pular</LabelBT>
                    </Button>
                    <Title size={28} align='center'>Começe pelo seu Pet</Title>
                    <Label size={18} align='center'>Preencha os dados do seu pet ou clique em pular logo acima</Label>

                    <Column style={{ height: 16, }} />
                    <Input
                        label="Nome *"
                        placeholder="Nome"
                        value={name}
                        setValue={setname}
                    />
                    <Column style={{ height: 16, }} />
                    <Input
                        label="Data de nascimento *"
                        placeholder="Data de nascimento"
                        value={date}
                        setValue={setdate}
                    />
                    <Column style={{ height: 16, }} />



                    <Title color={color.sc.sc3}>Seu pet é um *</Title>
                    <Row style={{ marginVertical: 12, columnGap: 20,}}>
                    {animals.map((item, index) => (
                        <Button style={{ backgroundColor: type === item.label ? item.color : item.color + 50, width: 100, }} radius={12} onPress={() => { settype(item.label) }} >
                            <Column style={{ alignItems: 'center',  }}>
                                <Title style={{ fontSize: 32, }}>{item?.icon}</Title>
                                <SubLabel size={18} color={type === item.label ? '#FFF' : '#00000090'}>{item?.label}</SubLabel>
                            </Column>
                        </Button>
                    ))}
                    </Row>

                    <Button bg={color.sc.sc3} mbottom={24}>
                        <LabelBT style={{ color: '#fff', }} align='center'>Entrar</LabelBT>
                    </Button>

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