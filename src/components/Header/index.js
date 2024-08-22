import React from 'react';
import { Column, Row, Title } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import Back  from '@components/Back';

const Header = ({ title, }) => {
    const { color, margin } = React.useContext(ThemeContext);
    const navigation = useNavigation();
    return (
        <Row style={{ paddingHorizontal: margin.h, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16,  }}>
            <Back/>
            <Title style={{ textAlign: 'center', fontSize: 22, lineHeight: 26, }}>{title}</Title>

            <Column style={{ width: 42, height: 42, }}></Column>
        </Row>
    )
}

export default Header;