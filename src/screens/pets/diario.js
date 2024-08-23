import React, { useContext, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, useTheme, Image, Button, SCREEN_HEIGHT } from '@theme/global'
import { FlatList } from 'react-native-gesture-handler';
import { Plus, Heart, MessageCircle, } from 'lucide-react-native';
import Header from '@components/Header/index';
import Modal from '@components/Modal/index';
import TabBar from '@components/TabBar';

export default function PetsDiarioScreen({ navigation, }) {
    const { color, font, margin } = useTheme();

    const modalComment = useRef(null);

    const openComment = (id_comment) => {
        modalComment.current.expand();
    }


    return (
        <Main>
            <Scroll>
                <Column style={{ borderRadius: 100, borderWidth: 4, borderColor: color.border, alignSelf: 'center', }}>
                    <Column style={{ backgroundColor: pet.color, borderRadius: 100, marginHorizontal: 8, marginVertical: 8, justifyContent: 'center', alignItems: 'center', width: 155, height: 155, alignSelf: 'center', overflow: 'hidden', }}>
                        <Image source={pet.avatar} style={{ width: 155, height: 155, objectFit: 'contain', marginBottom: -20, }} />
                    </Column>
                </Column>

                <Column style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 20, }}>
                    <Title size={24}>{pet?.titulo}</Title>
                </Column>


                <Title align="center">Diário 12/06/2024</Title>
                <FlatList
                    data={diario}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <CardDiario item={item} openComment={openComment} />}
                    showsVerticalScrollIndicator={false}
                />


                <Modal ref={modalComment} snapPoints={[0.1, SCREEN_HEIGHT - 30]}>
                    <Column>
                        <Title align="center">Comentários</Title>
                    </Column>
                </Modal>

            </Scroll>
            <TabBar />
        </Main>
    )
}

const CardDiario = ({ item, openComment }) => {
    const { color, font, margin } = useTheme();
    const { img, name, id, reaction, comment_id, data, time, legenda, } = item
    return (
        <Column mh={margin.h} mv={margin.v}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginVertical: 12, }}>
                <Title>{name}</Title>
                <Label>{time}</Label>
            </Row>
            <Image source={{ uri: img }} style={{ width: '100%', height: 300, alignSelf: 'center', borderRadius: 12, objectFit: 'cover', }} />
            <Row mv={8}>
                <Button style={{ justifyContent: 'center', alignItems: 'center', width: 42, height: 42, }}>
                    <Heart size={24} color="#91A6C4" strokeWidth={2} />
                </Button>
                <Button pv={2} ph={2} style={{ justifyContent: 'center', alignItems: 'center', width: 42, height: 42, }} onPress={() => { openComment(comment_id) }} >
                    <MessageCircle size={24} color="#91A6C4" strokeWidth={2} />
                </Button>
            </Row>
            <Label>{legenda}</Label>
        </Column>
    )
}



const pet = {
    name: 'Aufredo',
    avatar: require('@imgs/pet4.png'),
    id: 4,
    titulo: 'Titulo da pongo',
    type: 'Dog',
    genero: 'Macho',
    age: '8 anos',
    banhos: 23,
    tosas: 12,
    consultas: 8,
    bio: 'Alfredo é um cachorro amigável e brincalhão, com um pelo macio e brilhante. Ele adora correr no parque e fazer novos amigos, tanto humanos quanto outros bichinhos.',
    color: '#B7BCA3',
}


const diario = [
    {
        id: 1,
        img: 'https://i.pinimg.com/564x/d0/5a/4d/d05a4dbb60da51e10fea696440299b24.jpg',
        legenda: 'Legenda do teste',
        data: '12/10/2024',
        time: '12 minutos atrás',
        reaction: 'Heart',
        comment_id: '1223',
        name: 'Aufredo',
    },
    {
        id: 2,
        img: 'https://i.pinimg.com/736x/59/9c/ae/599caebf766728d63a040df49b355bf9.jpg',
        legenda: '',
        data: '',
        time: '',
        reaction: 'Heart',
        comment_id: '1223',
        name: 'Aufredo',
    },
]