import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, SCREEN_WIDTH, Image } from '@theme/global';
import Header from '@components/Header';
import { AntDesign } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Animated, FlatList } from 'react-native';
import { ExpandingDot } from "react-native-animated-pagination-dots";
import HeaderInternal from '@components/HeaderInternal';

export default function ShopSingleServiceScreen({ navigation, }) {
    const { color, font, margin } = useTheme();
    const item = {
        name: 'Banho',
        price: 'R$ 150,00',
        sell: 125,
        comments: 12,
        comments_id: 4122,
        stars: 3,
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
        imgs: [
            'https://i.pinimg.com/564x/2e/a0/48/2ea048b875052b305d3a67a035bc6ba3.jpg',
            'https://i.pinimg.com/564x/ba/54/32/ba543221aff7d5b0dcd0dbfe3b812a21.jpg',
            'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
            'https://i.pinimg.com/564x/dd/a1/64/dda164fbda3fd4dc3adeb0c4b41731c1.jpg',
            'https://i.pinimg.com/564x/1c/36/62/1c366227f7749c1ec00dc0bcef7a4641.jpg',
            'https://i.pinimg.com/564x/b9/a2/e0/b9a2e050a46aa656d725f3618a0126ab.jpg',
        ]
    }

    return (
        <Main>
            <Scroll>
                <Column>
                <HeaderInternal />
                    <Header title={item?.name} />
                    <Gallery imgs={item?.imgs} />

                    <Column mh={margin.h} mv={12}>
                        <Title size={20} >{item?.name}</Title>
                        <Title style={{ color: color.label, fontFamily: font.medium, marginTop: 8, }}>{item?.price}</Title>
                        <Row mv={12} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <StarsRate stars={item?.stars} />
                            <Label size={14}>{item?.sell} vendidos</Label>
                            <Label size={14}>{item?.comments} comentários</Label>
                        </Row>
                        <Title size={16}>Selecione o Pet</Title>
                        <Button radius={100} mv={12} ph={0} pv={0} style={{ backgroundColor: '#F7F7F7', justifyContent: 'center', alignItems: 'center', }}>
                            <Title size={18} color={color.sc.sc3}>Selecione aqui</Title>
                        </Button>
                        <Button radius={100} ph={0} pv={0} style={{ backgroundColor: color.sc.sc3, justifyContent: 'center', alignItems: 'center', }}>
                            <Title size={18} color="#fff">Adicionar a cesta</Title>
                        </Button>
                        <Column style={{ height: 12, }} />
                        <Title size={16}>Descrição</Title>
                        <Label size={14} style={{ lineHeight: 16, marginTop: 6, }}>{item?.desc}</Label>

                        <Column style={{ height: 12, }} />
                        <Title size={16}>Feedbacks</Title>
                    </Column>
                </Column>
            </Scroll>
        </Main>
    )
}
const StarsRate = ({ stars }) => {
    const { color } = useTheme();
    const data = Object.keys(Array.from({ length: stars }, (v, i) => i));
    const unstar = Object.keys(Array.from({ length: 5 - stars }, (v, i) => i));
    return (
        <Row>
            {data.map((item, index) => (
                <MotiView from={{ opacity: 0, rotateX: '32deg' }} animate={{ opacity: 1, rotateX: '0deg' }}>
                    <AntDesign name="star" size={18} color={color.yellow} />
                </MotiView>
            ))}
            {unstar.map((item, index) => (
                <AntDesign name="staro" size={18} color={color.yellow} />
            ))}
        </Row>
    )
}

const Gallery = ({ imgs }) => {
    const { color, margin } = useTheme();
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <Column>
            <FlatList
                data={imgs}
                horizontal
                ListHeaderComponent={<Row style={{ width: SCREEN_WIDTH, paddingHorizontal: margin.h, columnGap: 12, }}>
                    <Column style={{ rowGap: 12, }}>
                        <Image source={{ uri: imgs[0] }} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, }} />
                        <Image source={{ uri: imgs[1] }} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, }} />
                        <Image source={{ uri: imgs[2] }} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12, }} />
                    </Column>
                    <Column>
                        <Image source={{ uri: imgs[3] }} style={{ width: 200, height: 264, borderRadius: 12, objectFit: 'cover' }} />
                    </Column>
                </Row>}
                pagingEnabled
                keyExtractor={item => item}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                removeClippedSubviews
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false, })}
                renderItem={({ item }) => (
                    <MotiView
                        from={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'timing', duration: 300 }}
                        style={{ width: SCREEN_WIDTH, justifyContent: 'center', alignItems: 'center', }}
                    >
                        <Image source={{ uri: item }} style={{ width: 264, height: 264, objectFit: 'cover', borderRadius: 12, }} />
                    </MotiView>
                )}
            />


            <ExpandingDot
                data={imgs}
                expandingDotWidth={24}
                scrollX={scrollX}
                inActiveDotOpacity={0.6}
                inActiveDotColor='#fff'
                activeDotColor={color.primary}
                style={{  }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                }}
                containerStyle={{
                    bottom: 10,
                    right: 48,
                    backgroundColor: '#ffffff50',
                    borderRadius: 12, 
                    paddingHorizontal: 4, paddingVertical: 4,
                }}
            />

        </Column>
    )
}