import React from 'react';
import { Column, Row, Title, Button } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import Back  from '@components/Back';
import { CircleHelp, } from 'lucide-react-native';

const Header = ({ title, }) => {
    const { color, margin } = React.useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16,  }}>
            <Back/>
            <Title style={{ textAlign: 'center', fontSize: 22, lineHeight: 26, }}>{title.length > 16 ? title.slice(0, 16) + '...' : title}</Title>
            <Button pv={1} ph={1} style={{ width: 46, height: 46, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff',}}  onPress={() => {navigation.navigate('Faq')}}>
                <CircleHelp color={color.primary} />
            </Button>
        </Row>
    )
}

export default Header;