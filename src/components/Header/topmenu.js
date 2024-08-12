import { CalendarCheck, CircleHelp, CircleUserRound, FileClock, Heart, Hotel, Menu, PackageCheck, School, Search, Settings, ShoppingCart, Store, X } from 'lucide-react-native';
import { Column, Row, Title, SCREEN_WIDTH, useTheme, Button, SCREEN_HEIGHT } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import SideBar from './sidebar';

export default function TopMenu({ search = true, }) {
    const { color, margin, font } = useTheme();
    const navigation = useNavigation();

    const [isOpen, setisOpen] = useState(false);

    const sidebar = useRef()
    const toggleSide = () => {
        if (isOpen) {
            sidebar.current?.close()
        } else {
            sidebar.current?.expand()
        }
        setisOpen(!isOpen)
    }

    return (
        <>
            <Column>
                <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', width: SCREEN_WIDTH, }}>
                    <Button ph={1} pv={1} onPress={toggleSide} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                        <Menu size={32} color="#CF5050" strokeWidth={2} />
                    </Button>
                    <Row style={{ alignItems: 'center', columnGap: 12, }}>
                        <Pressable onPress={() => { navigation.navigate('Cart') }} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                            <ShoppingCart size={32} color={color.label} strokeWidth={1.6} />
                        </Pressable>
                        <Pressable onPress={() => { navigation.navigate('Tabs', { screen: 'Account' }) }} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                            <CircleUserRound size={32} color={color.label} strokeWidth={1.6} />
                        </Pressable>
                    </Row>
                </Row>
                {search && <Button mh={28} mv={24} style={{ borderWidth: 2, borderColor: '#30303030', }} onPress={() => { navigation.navigate('Search') }} >
                    <Row>
                        <Search size={24} color={color.label} strokeWidth={1.6} />
                        <Title size={18} style={{ fontFamily: 'Font_Medium', marginLeft: 12, color: color.label, }}>Pesquisar</Title>
                    </Row>
                </Button>}
            </Column>
            <SideBar ref={sidebar}>
                <ScrollView>
                <Column>
                    <Button onPress={toggleSide} ph={0} pv={0} style={{ width: 42, height: 42, alignSelf: 'flex-end', marginVertical: 20, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                        <X size={22} color={color.sc.sc3} />
                    </Button>
                    <Column style={{ }}>
                        {bts.map((bt, index) => (
                            <Button pv={12} ph={12} onPress={() => { navigation.navigate(bt.screen) }} key={index} style={{ backgroundColor: color.sc.sc3+30, marginBottom: 12, }} radius={12}>
                                <Row style={{ alignItems: 'center',  }}>
                                    <Column style={{ backgroundColor: "#fff", paddingHorizontal: 6, paddingVertical: 6, marginRight: 12,  borderRadius: 8,  }}>
                                        {bt.icon}
                                    </Column>
                                    <Title size={18} font={font.medium} color={color.sc.sc3}>{bt.title}</Title>
                                </Row>
                            </Button>
                        ))}

                        <Row>
                            <Button bg={color.sc.sc3} pv={1} ph={1} style={{ height: 42, justifyContent: 'center', alignItems: 'center', }}>
                                <Row style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 8 }}>
                                    <Settings size={24} color="#FFF" strokeWidth={2} />
                                    <Title color="#fff" size={18} font={font.medium} style={{ marginHorizontal: 8, }}>Configurações</Title>
                                </Row>
                            </Button>

                        </Row>  

                    </Column>
                </Column>
                </ScrollView>

            </SideBar>
        </>

    )
}

const bts = [
    {
        id: 1,
        title: 'Favoritos',
        screen: 'Favorites',
        icon: <Heart size={20} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 2,
        title: 'Cesta',
        screen: 'Cart',
        icon: <ShoppingCart size={20} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 3,
        title: 'Loja Pongo',
        screen: 'Shop',
        icon: <Store size={20} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 4,
        title: 'Escola Pongo',
        screen: 'School',
        icon: <School size={20} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 5,
        title: 'Day Use',
        screen: 'School',
        icon: <CalendarCheck size={20} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 6,
        title: 'Hotel Pongo',
        screen: 'School',
        icon: <Hotel size={20} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 7,
        title: 'Histórico de serviços',
        screen: 'School',
        icon: <FileClock size={20} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 8,
        title: 'Meus pedidos',
        screen: 'School',
        icon: <PackageCheck size={20} color="#91A6C4" strokeWidth={2} />,
    },
    {
        id: 9,
        title: 'Dúvidas frequentes',
        screen: 'School',
        icon: <CircleHelp size={20} color="#91A6C4" strokeWidth={2} />,
    },
]