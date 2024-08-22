import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
export default function Back({ }) {
    const { color, font, } = useTheme();
    const navigation = useNavigation();
    return (
        <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 46, height: 28, justifyContent: 'center', alignItems: 'center', }} bg='#D9D9D9'>
            <ArrowLeft size={16} color='#918C8B' />
        </Button>
    )
}