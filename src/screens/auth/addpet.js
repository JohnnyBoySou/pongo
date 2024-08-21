import React, { useState, useRef } from 'react';
import { Column, Title, Main, Row, Label, Button, LabelBT, useTheme, Scroll, SubLabel } from '@theme/global';
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';
import TextArea from '@components/Forms/textarea';
import CheckBox from '@components/Forms/checkbox';

export default function AddPetScreen({ navigation, route, }) {
    const { color, margin, font } = useTheme()

    const [name, setname] = useState();
    const [date, setdate] = useState();
    const [type, settype] = useState();
    const [genero, setgenero] = useState();
    const [selectColor, setselectColor] = useState();
    const [desc, setdesc] = useState('');




    const modalForget = useRef()
    const animals = [
        {
            label: 'Dog',
        },
        {
            label: 'Cat',
        },
    ]

    const generos = [
        {
            id: 'macho',
            label: 'Macho',
        },
        {
            id: 'femea',
            label: 'Fêmea',
        },
        {
            id: 'outro',
            label: 'Outro',
        },
    ]

    const colors = [
        { cl: '#E5C8C9' },
        { cl: '#91A6C4' },
        { cl: '#778428' },
        { cl: '#EBD269' },
        { cl: '#918C8B' }
    ]

    const handlePet = () => {
        navigation.navigate('Tabs', { screen: 'Home', })
    }

    return (
        <Main style={{}}>
            <Scroll>
                <Column ph={28}>
                    <Button pv={8} ph={20} bg={color.sc.sc3 + 30} onPress={() => { navigation.navigate('Tabs', { screen: 'Home', }) }} style={{ alignSelf: 'flex-end', marginBottom: 20, }}>
                        <LabelBT color={color.sc.sc3} align="center">Pular</LabelBT>
                    </Button>

                    <Title font={'Voyage_Medium'} align="center" size={28}>VILLA PONGO</Title>
                    <Title size={24} align='center'>Comece pelo seu Pet</Title>

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

                    <TextArea
                        label="Descrição *"
                        placeholder="Escreva uma descrição para o seu pet"
                        value={desc}
                        setValue={setdesc}
                    />
                    <Label size={14} style={{ marginTop: 12, marginBottom: 6, alignSelf: 'flex-end', backgroundColor: '#918C8B', color: '#fff', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 4, marginTop: -30, marginRight: 8, }} >{desc?.length}/200</Label>
                    <Column style={{ height: 16, }} />


                    <Column style={{ height: 12, }} />
                    <Title size={18} font={font.medium}>Seu pet é um *</Title>
                    <Row style={{ marginVertical: 6, columnGap: 12, }}>
                        {animals.map((item) => (
                            <Button radius={12} onPress={() => { settype(item.label) }} pv={6} ph={6} >
                                <Row style={{ alignItems: 'center', }}>
                                    <CheckBox size={24} status={type === item.label} setstatus={() => { settype(item.label) }} />
                                    <Label size={18} style={{ marginLeft: 8, }} >{item?.label}</Label>
                                </Row>
                            </Button>
                        ))}
                    </Row>


                    <Column style={{ height: 12, }} />
                    <Title size={18} font={font.medium}>Gênero *</Title>
                    <Row style={{ marginVertical: 6, columnGap: 8, }}>
                        {generos.map((item, index) => (
                            <Button radius={12} onPress={() => { setgenero(item.id) }} pv={6} ph={6} >
                                <Row style={{ alignItems: 'center', }}>
                                    <CheckBox status={genero === item.id} setstatus={() => { setgenero(item.id) }} size={24} />
                                    <Label size={18} style={{ marginLeft: 8, }} >{item?.label}</Label>
                                </Row>
                            </Button>
                        ))}
                    </Row>

                    <Column style={{ height: 12, }} />
                    <Title size={18} font={font.medium}>Escolha uma cor para o perfil do seu Pet *</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 6, }}>
                        {colors.map((item, index) => (
                            <Button onPress={() => { setselectColor(item.cl) }} style={{ backgroundColor: item.cl, borderWidth: 6, borderColor: selectColor === item.cl ? item.cl + 80 : 'transparent', width: 42, height: 52, }} ph={0} pv={0} radius={100}  >
                                <Column style={{}}>
                                </Column>
                            </Button>
                        ))}
                    </Row>



                    <Button bg='#918C8B' mbottom={24} mtop={24} onPress={handlePet} >
                        <LabelBT style={{ color: '#fff', }} align='center'>Pronto</LabelBT>
                    </Button>

                    <Column style={{ height: 80, }}></Column>
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