import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { Main, Scroll } from '@theme/global';

const { width, height } = Dimensions.get('window');

export default function AuthLoginScreen({ navigation, route, }) {
    const { color, font } = useContext(ThemeContext)

    return (
        <Main style={{}}>
            <Scroll>
                <Title>Login</Title>

            </Scroll>
        </Main>
    )
}