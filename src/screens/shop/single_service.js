import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
export default function ShopSingleServiceScreen({ navigation, }) {
    const { color, font, } = useTheme();
    return (
        <Main>
            <Scroll>
                <Column>
                    <Title>Shop Single Service</Title>
                </Column>
            </Scroll>
        </Main>
    )
}