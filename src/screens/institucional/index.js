import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { Main, Scroll, Column, Label, SubLabel, Title, Row } from '@theme/global';
import { ThemeContext } from 'styled-components/native';

import { Apple } from 'lucide-react-native';

export default function InstitucionalScreen({ navigation, }) {

    const { color, font, margin } = useContext(ThemeContext);

    return (
        <Main>
            <Scroll>
                <Column>
                    <Row>
                        <Title>Hello world!!</Title>
                    </Row>
                    <Label></Label>
                    <SubLabel></SubLabel>
                    <Apple size={12} color={color.primary} />
                </Column>
            </Scroll>
        </Main>
    )
}