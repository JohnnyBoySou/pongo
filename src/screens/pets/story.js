import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
export default function PetsStoryScreen({ navigation, }) {
    const { color, font, } = useTheme();
    return (
        <Main>
            <Scroll>
                <Column>
                    <Title>Storys</Title>
                </Column>
            </Scroll>
        </Main>
    )
}