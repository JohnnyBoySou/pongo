import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Image, useTheme } from '@theme/global';
import Back from '@components/Back';
export default function PetsSingleGaleriaScreen({ navigation, route }) {
    const img = route.params?.img
    return (
        <Main>
            <Column style={{ marginHorizontal: 28, marginVertical: 28, }}>
                <Back />
            </Column>
            <Image source={{ uri: img, }} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Main>
    )
}