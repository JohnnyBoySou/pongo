import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, SubLabel } from '@theme/global';
import { useNavigation } from '@react-navigation/native';

export default function ButtonPrimary({ login = false, type = 'Default', label, pv = 15, ph = 20, fontStyle, onPress, ...props }) {
    const { color, font, } = useTheme();
    const navigation = useNavigation();
    const bg = type === 'Default' ? '#918C8B' : type === 'Light' ? '#ECEBEB' : '#202020';
    const text = type === 'Default' ? color.light : type === 'Light' ? '#434343' : '#fff';
    return (
        <Button {...props} onPress={onPress} pv={pv} ph={ph} style={{ justifyContent: 'center', alignItems: 'center', }} bg={bg} >
            <Row>
                <SubLabel style={{ fontStyle, color: text, }}>{label}</SubLabel>
            </Row>
        </Button>
    )
}