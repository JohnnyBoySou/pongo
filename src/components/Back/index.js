import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
export default function Back({ }) {
    const { color, font, } = useTheme();
    const navigation = useNavigation();
    return (
        <Button onPress={() => { navigation.goBack() }} pv={0} ph={0} style={{ width: 48, height: 24, justifyContent: 'center', alignItems: 'center', }} bg="#918C8B">
            <ArrowLeft size={16} color="#fff" />
        </Button>
    )
}