import React, { useContext, useState } from 'react';
import { ScrollView, Image, Pressable, View } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row, Button, LabelBT } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { Apple } from 'lucide-react-native';
import Header from '@components/Header';
import Swiper from 'react-native-swiper';
import Input from '@components/Forms/input';
import Modal from '@components/Modal';

export default function InstitucionalGaleriaScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const [name, setname] = useState();
    const [tel, settel] = useState();
    const [type, settype] = useState('Pongo');





    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <Header title="Galeria" />
                <Column mh={margin.h} >

                    <Galeria />

                </Column>

            </Scroll>
        </Main>
    )
}



const Galeria = () => {
    return (
        <>
            <VideoCard />
            <Row style={{ width: '100%', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <ImageCard />
                <ImageCard />
                <ImageCard />
                <ImageCard />
            </Row>
            <VideoCard />
        </>


    )
}

const VideoCard = () => {
    return (
        <Column>
            <Pressable style={{ backgroundColor: '#fff', borderRadius: 20, marginBottom: 8 }}>
                <View style={{ position: 'relative', borderRadius: 20 }}>
                    <Image
                        source={{ uri: 'https://caninablog.wordpress.com/wp-content/uploads/2013/10/dia-das-bruxas-pet_escola_075-1.jpg' }}
                        style={{ width: '100%', height: 160, borderRadius: 20 }}
                    />
                    <Image
                        source={require('@imgs/play-icon.png')}
                        style={{
                            width: 40,
                            height: 40,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: [{ translateX: -20 }, { translateY: -20 }],
                        }}
                    />
                </View>
            </Pressable>
            <Row style={{ alignItems: 'center', justifyContent: 'space-between', marginVertical: 16 }}>
                <Title>Titulo de video 1</Title>
                <Label>10/10/2024</Label>
            </Row>
        </Column>
    );
};


const ImageCard = () => (
    <View style={{ width: 150 }}>
        <Pressable style={{ backgroundColor: '#fff', borderRadius: 20 }}>
            <Image
                source={{ uri: 'https://caninablog.wordpress.com/wp-content/uploads/2013/10/dia-das-bruxas-pet_escola_075-1.jpg' }}
                style={{ width: '100%', height: 160, borderRadius: 20 }}
            />
        </Pressable>
        <Column style={{ alignItems: 'flex-start', marginVertical: 8 }}>
            <Title style={{ fontSize: 16 }}>Titulo foto 1</Title>
            <Label style={{ fontSize: 10 }}> 10/10/2024</Label>
        </Column>
    </View>
);

