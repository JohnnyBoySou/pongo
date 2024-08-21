import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
export default function NotifySingleScreen({ navigation, }) {
    const { color, font, } = useTheme();
    return (
        <Main>
            <Scroll>
                <Column>
                    <Title>Single</Title>
                </Column>
            </Scroll>
        </Main>
    )
}