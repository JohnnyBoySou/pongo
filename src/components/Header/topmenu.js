import { CircleUserRound, Menu, Search, ShoppingCart, X } from 'lucide-react-native';
import { Column, Row, Title, SCREEN_WIDTH, useTheme, Button, SCREEN_HEIGHT } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { useRef, useState } from 'react';
import SideBar from './sidebar';

export default function TopMenu({ search = true, }) {
    const { color, margin } = useTheme();
    const navigation = useNavigation();

    const [isOpen, setisOpen] = useState(false);

    const sidebar = useRef()

    const toggleSide = () => {
        if (isOpen) {
            setisOpen(false)
            sidebar.current?.close()
        } else {
            setisOpen(true)
            sidebar.current?.expand()
        }
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
                <Column style={{ backgroundColor: 'blue', }}>
                    <Button onPress={toggleSide} ph={0} pv={0} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }} bg={color.sc.sc3 + 30}>
                        <X size={22} color={color.sc.sc3} />
                    </Button>
                    <Column style={{ backgroundColor: 'red', }}>
                        <Title>Sidebar</Title>
                    </Column>
                </Column>
            </SideBar>
        </>

    )
}
