import React, { useContext } from 'react';
import { Image, Pressable, View } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import Header from '@components/Header';
import { useNavigation } from '@react-navigation/native';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';

export default function InstitucionalGaleriaScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    const data = {
        grid: {
            imgs: ['aea', '', '', '', ''],
            videos: ['', '', '', '', ''],
            type: 'mansery',
        },
        grid: {
            imgs: ['aea', '', '', '', ''],
            videos: ['', '', '', '', ''],
            type: 'pinterest',
        },
    }


    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu back={false} search={false} />
                <Header title="Galeria" />
                <Column mh={margin.h} >

                    <Galeria data={data} />

                </Column>
                
                <Column style={{ height: 120 }} />
            </Scroll>
            <TabBar />
        </Main>
    )
}



const Galeria = ({ data }) => {
    const { grid } = data
    const Grid = ({ item }) => {
        const { imgs, videos } = item
        return (
            <Column>
                <VideoCard url={videos[0]} />
                <Row style={{ width: '100%', gap: 16, justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {imgs?.slice(0, 4).map((item, index) => <ImageCard key={index} url={item} />)}
                </Row>
                <VideoCard url={videos[1]} />
            </Column>
        )
    }
    return (
        <>
            <Grid item={grid} />
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


const ImageCard = () => {
    const navigation = useNavigation();
    return (
        <View style={{ width: 150 }}>
            <Pressable style={{ backgroundColor: '#fff', borderRadius: 20 }} onPress={() => { navigation.navigate('InstitucionalSingleGaleria', { img: 'https://caninablog.wordpress.com/wp-content/uploads/2013/10/dia-das-bruxas-pet_escola_075-1.jpg' }) }} >
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
    )
}

