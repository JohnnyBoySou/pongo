import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Image, useTheme } from '@theme/global';
import Back from '@components/Back';
import TabBar from '@components/TabBar';
import TopMenu from '@components/Header/topmenu';
export default function InstitucionalSingleGaleriaScreen({ navigation, route }) {
    const img = route.params?.img
    return (
        <Main>
            <TopMenu search={false} back={false} />
            <Image source={{ uri: img, }} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            <TabBar />
        </Main>
    )
}