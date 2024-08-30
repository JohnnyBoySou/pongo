import React, {  } from 'react';
import { Main, Image, Column } from '@theme/global';
import Back from '@components/Back';
export default function ChatSingleImageScreen({ navigation, route }) {
    const img = route.params?.img
    return (
        <Main style={{ justifyContent: 'center',   }}>
            <Column style={{  position: 'absolute', top: 50, left: 28, zIndex: 99, }}>
                <Back />
            </Column>
            <Image source={{ uri: img, }} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Main>
    )
}