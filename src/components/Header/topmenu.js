import { Bell, CalendarCheck, ChevronRight, CircleHelp, CircleUserRound, FileClock, Heart, Hotel, Menu, PackageCheck, School, Search, Settings, ShoppingCart, Store, X } from 'lucide-react-native';
import { Column, Row, Title, SCREEN_WIDTH, useTheme, Button, Label, SubLabel, Image } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import SideBar from './sidebar';
import Back from '@components/Back';
import Animated, { FadeInRight, FadeInUp, FadeOutRight } from 'react-native-reanimated';
import { getPreferences } from '@hooks/preferences';

export default function TopMenu({ search = true, cart = false, back = true, handleSearch, value, setvalue }) {
    const { color, margin, font } = useTheme();
    const navigation = useNavigation();
    const [user, setuser] = useState();
    const [isOpen, setisOpen] = useState(true);

    const sidebar = useRef()
    const toggleSide = () => {
        if (isOpen) {
            sidebar.current?.close()
            setisOpen(false)
        } else {
            setisOpen(true)
            sidebar.current?.expand()
        }
    }

    const getSearch = () => {
        navigation.navigate('Search')
    }

    const getAvatar = async () => {
        try {
            const res = await getPreferences()
            setuser(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAvatar()
    }, []);

    const [focusSearch, setfocusSearch] = useState();
    return (
        <>
            <Column>
                <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', width: SCREEN_WIDTH, }}>
                    <Button ph={1} pv={1} onPress={toggleSide} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                        <Menu size={32} color={color.icons} strokeWidth={2} />
                    </Button>
                    <Row style={{ alignItems: 'center', columnGap: 12, }}>

                        <Button pv={1} ph={1} onPress={() => { navigation.navigate('Tabs', { screen: 'Account' }) }} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                            <Row>
                                {user?.avatar ? <Image source={{ uri: user?.avatar }} style={{ width: 38, height: 38, borderRadius: 100, }} /> : <CircleUserRound size={32} color={color.icons} strokeWidth={1.5} />}
                            </Row>
                        </Button>
                    </Row>
                </Row>

                <Row style={{ marginHorizontal: margin.h, alignItems: 'center', marginTop: 4, }}>
                    {back &&
                        <Column style={{ marginRight: 12, }}>
                            <Back />
                        </Column>
                    }
                    {search &&
                        <Button mv={14} style={{ backgroundColor: color.light, flex: 1, borderWidth: 2, borderColor: focusSearch ? color.label : 'transparent', }} onPress={getSearch} pv={10}>
                            <Row style={{ alignItems: 'center', }}>
                                <Image source={require('@imgs/icon.png')} style={{ width: 42, height: 42, borderRadius: 120, }} />
                                <Label style={{ marginLeft: 12, }}>Pesquisar</Label>
                            </Row>
                        </Button>
                    }
                </Row>
            </Column>
            <SideBar ref={sidebar} >
                {!isOpen &&
                    <Column style={{ marginHorizontal: 28, borderRadius: 12, marginTop: 12 }}>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', }}>
                            <Animated.Image entering={FadeInUp.delay(100)} exiting={FadeOutRight} source={require('@imgs/icon.png')} style={{ width: 42, height: 52, borderRadius: 120, }} />
                            <Button onPress={toggleSide} ph={0} pv={0} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} bg={color.secundary}>
                                <X size={22} color={color.primary} />
                            </Button>
                        </Row>
                        {screens.map((screen, index) => (
                            <Animated.View key={index} entering={FadeInRight.delay(index * 150)} exiting={FadeOutRight} style={{ marginTop: 8 }}>
                                <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Button mleft={-20} style={{}} onPress={() => { if (screen?.private) { if(user?.name){navigation.navigate(screen?.screen)}else{navigation.navigate('AuthLogin')} } else { navigation.navigate(screen?.screen) } }} >
                                        <SubLabel style={{ color: color.pr.pr3, fontFamily: font.medium, fontSize: 16, letterSpacing: - 0.6, }}>{screen?.name}</SubLabel>
                                    </Button>
                                    <ChevronRight size={24} color={color.title} />
                                </Row>
                            </Animated.View>
                        ))}
                    </Column>}
            </SideBar>
        </>

    )
}

/*
 <Button pv={1} ph={1} onPress={() => { navigation.navigate('Notifications') }} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                            <Bell size={24} color={color.icons} strokeWidth={1.5} />
                        </Button> */

const screens = [

    {
        id: 1,
        name: 'LOJA PONGO',
        screen: 'Shop',
    },
    {
        id: 2,
        name: 'VILLA PONGO',
        screen: 'VillaPongo',
    },
    {
        id: 3,
        name: 'MINHA CONTA',
        screen: 'Account',
        private: true,
    },
    {
        id: 5,
        name: 'INICIAR CONVERSA',
        screen: 'ChatNew',
        private: true,
    },
    {
        id: 8,
        name: 'MINHAS CONVERSAS',
        screen: 'ChatList',
        private: true,
    },
    {
        id: 6,
        name: 'CONHEÇA MAIS',
        screen: 'Institucional',
    },
    {
        id: 7,
        name: 'F.A.Q',
        screen: 'Faq',
    },
]




/**
 * 
 *   <Column style={{ }}>
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
 */

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