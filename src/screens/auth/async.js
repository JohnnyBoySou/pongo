import React, { useEffect } from 'react';
import { Main, Title, Loader } from '@theme/global';

export default function AsyncStaticScreen({ navigation, }) {
    //verificacoes e animação
    useEffect(() => {
        navigation.navigate('Tabs')
    }, [])
    return (
        <Main style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Loader size={24} />
        </Main>
    )
}