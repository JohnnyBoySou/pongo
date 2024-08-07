import React, { useState, useRef } from 'react';
import { Column, Title, Main, Row, Label, Button, LabelBT, useTheme, Scroll, SubLabel } from '@theme/global';
import Input from '@components/Forms/input';
import Modal from '@components/Modal/index';
import TextArea from '@components/Forms/textarea';

export default function AddPetScreen({ navigation, route, }) {
    const { color, margin, font } = useTheme()

    const [name, setname] = useState();
    const [date, setdate] = useState();
    const [type, settype] = useState();
    const [genero, setgenero] = useState();
    const [selectColor, setselectColor] = useState();
    const [desc, setdesc] = useState();
    
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
        {cl: '#E5C8C9'},
        {cl: '#91A6C4'},
        {cl: '#778428'},
        {cl: '#EBD269'},
        {cl: '#918C8B'}
    ]

    return (
        <Main style={{}}>
            <Scroll>
                <Column ph={28}>
                    <Button pv={8} ph={20} bg={color.sc.sc3 + 30} onPress={() => { navigation.navigate('Tabs', { screen: 'Home', }) }} style={{ alignSelf: 'flex-end', marginBottom: 20, }}>
                        <LabelBT color={color.sc.sc3} align="center">Pular</LabelBT>
                    </Button>

                    <Title font={'Voyage_Medium'} align="center" size={28}>VILLA PONGO</Title>
                    <Title size={24} align='center'>Comece pelo seu Pet</Title>
                    <Label size={16} align='center'>Preencha os dados do seu pet ou clique em pular logo acima</Label>

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
                    <Column style={{ height: 16, }} />


                    <Title color={color.sc.sc3} size={18} font={font.medium}>Seu pet é um *</Title>
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


                    <Title color={color.sc.sc3} size={18} font={font.medium}>Gênero *</Title>
                    <Row style={{ marginVertical: 12, columnGap: 12, }}>
                    {generos.map((item, index) => (
                        <Button style={{ backgroundColor: genero === item.id ? color.sc.sc3 : color.sc.sc3 + 50,  }} radius={16} onPress={() => { setgenero(item.id) }} >
                            <Column style={{ alignItems: 'center',  }}>
                                <SubLabel size={18} color={genero === item.id ? '#FFF' : '#00000090'}>{item?.label}</SubLabel>
                            </Column>
                        </Button>
                    ))}
                    </Row>

                    <Title color={color.sc.sc3} size={18} font={font.medium}>Escolha uma cor para o perfil do seu Pet *</Title>
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 12, }}>
                        {colors.map((item, index) => (
                            <Button onPress={() => {setselectColor(item.cl)}}  style={{ backgroundColor: item.cl, borderWidth: 6, borderColor: selectColor === item.cl ? item.cl+80 : 'transparent', width: 42, height: 52,}} ph={0} pv={0} radius={100}  >
                                <Column style={{ }}>
                                </Column>
                            </Button>
                        ))}
                    </Row>

                

                    <Button bg={color.sc.sc3} mbottom={24} mtop={24} >
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