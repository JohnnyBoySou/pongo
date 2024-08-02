import React from 'react';
import { ArrowLeft } from 'lucide-react-native';
import { Column, Row, Title } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { Pressable } from 'react-native';

const Header = ({ title, }) => {
    const { color, margin } = React.useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16,  }}>
            <Pressable onPress={() => { navigation.goBack() }} style={{ backgroundColor: color.sc.sc3, width: 42, height: 28, borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                <ArrowLeft color="#fff" />
            </Pressable>

            <Title style={{ textAlign: 'center', fontSize: 22, lineHeight: 26, }}>{title}</Title>

            <Column style={{ width: 42, height: 42, }}></Column>
        </Row>
    )
}

export default Header;