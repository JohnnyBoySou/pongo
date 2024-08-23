import React, { useRef, useState } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, Card, SCREEN_WIDTH, SCREEN_HEIGHT, LabelBT } from '@theme/global';
import { Search } from 'lucide-react-native';

//Components
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import TopMenu from '@components/Header/topmenu';
import PagerView from 'react-native-pager-view';

import Chart from '@components/Charts';
import StarsRate from '@components/StarsRate/index';
import Calendario from '@components/Calendar';
import TabBar from '@components/TabBar';

export default function NotificationsScreen({ navigation, }) {
    const { color, font, margin } = useTheme();

    const pagerRef = useRef();
    const ScrollButtons = useRef();
    const types = ['Serviços', 'Sistema'];
    const [type, settype] = useState('Serviços');

    const handleScreen = (position) => {
        switch (position) {
            case 0:
                ScrollButtons.current?.scrollTo({ x: 0, y: 0, animated: true, });
                settype('Serviços');
                break;
            case 1:
                ScrollButtons.current?.scrollTo({ x: 0, y: 0, animated: true, });
                settype('Sistema');
                break;

            default:
                break;
        }
    }

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>
                <TopMenu search={false} back={false} />


                <ScrollView ref={ScrollButtons} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ columnGap: 0, marginTop: 20, paddingHorizontal: margin.h, width: '100%', justifyContent: 'center' }}>

                    {types.map((item, index) => (
                        <Button onPress={() => { handleScreen(index) }} style={{ opacity: type == item ? 1 : 0.5, backgroundColor: type == item ? '#fff' : 'transparent', }} ph={16} pv={10}>
                            <LabelBT style={{ textAlign: 'center', color: color.title, fontSize: 14, }}>{item}</LabelBT>
                        </Button>
                    ))}

                </ScrollView>

                <Column pv={20}>
                    {type == 'Serviços' && <CardServicos />}
                    {type == 'Sistema' && <CardSistema />}
                </Column>
            </Scroll>
            <TabBar />
        </Main>
    );
}



const CardSistema = () => {
    const { color, font, margin } = useTheme();
    return (
        <>
            <Row mh={margin.h} pv={12} ph={12}>
                <Column>
                    <Image source={{ uri: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} style={{ width: 40, height: 40, borderRadius: 40, objectFit: 'cover' }} />
                </Column>

                <View style={{ width: 250, marginLeft: 12 }}>
                    <Row style={{ justifyContent: 'space-between', marginRight: 20, }}>
                        <Column>
                            <Title size={14}>Alimentação</Title>
                            <Label size={12} style={{ marginVertical: 8, color: '#434343' }}>Status: agendado 12/07</Label>
                        </Column>
                        <Column>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 4, backgroundColor: "#D9D9D9", borderRadius: 10 }}>
                                <Label align="right" size={11} >Informações </Label>
                            </View>
                            <Label align="right" size={11} style={{ marginTop: 6 }}> 13 minutos</Label>
                        </Column>
                    </Row>
                </View>
            </Row>
            <Column style={{ height: 1, backgroundColor: '#D9D9D9', width: '100%' }} />
        </>
    )
}



const CardServicos = () => {
    const { color, font, margin } = useTheme();
    return (
        <>
            <Row mh={margin.h} pv={12} ph={12}>
                <Column>
                    <Image source={{ uri: 'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} style={{ width: 40, height: 40, borderRadius: 40, objectFit: 'cover' }} />
                </Column>

                <View style={{ width: 250, marginLeft: 12 }}>
                    <Row style={{ justifyContent: 'space-between', marginRight: 20, }}>
                        <Column>
                            <Title size={14}>Alimentação</Title>
                            <Label size={12} style={{ marginVertical: 8, color: '#434343' }}>Status: agendado 12/07</Label>
                        </Column>
                        <Column>
                            <View style={{ paddingHorizontal: 10, paddingVertical: 4, backgroundColor: "#D9D9D9", borderRadius: 10 }}>
                                <Label align="right" size={11} >Informações </Label>
                            </View>
                            <Label align="right" size={11} style={{ marginTop: 6 }}> 13 minutos</Label>
                        </Column>
                    </Row>
                </View>
            </Row>
            <Column style={{ height: 1, backgroundColor: '#D9D9D9', width: '100%' }} />
        </>
    )
}

