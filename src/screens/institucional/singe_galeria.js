import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Image, useTheme } from '@theme/global';
export default function InstitucionalSingleGaleriaScreen({ navigation, route }) {
    const img = route.params?.img
    return (
        <Main>
            <Image source={{ uri: img, }} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Main>
    )
}