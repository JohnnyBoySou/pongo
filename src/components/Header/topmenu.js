import { CircleUserRound, Menu, Search, ShoppingCart } from 'lucide-react-native';
import { Column, Row, Title, SCREEN_WIDTH, useTheme, Button } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

export default function TopMenu({ search = true, }) {
    const { color, margin } = useTheme();
    const navigation = useNavigation();
    return (
        <Column>
            <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', width: SCREEN_WIDTH, }}>
                <Pressable onPress={() => { navigation.goBack() }} style={{ width: 42, height: 42, justifyContent: 'center', alignItems: 'center', }}>
                    <Menu size={32} color="#CF5050" strokeWidth={2} />
                </Pressable>

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

    )
}
