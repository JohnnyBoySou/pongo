import { Main } from '@theme/global';
import { StatusBar } from 'expo-status-bar';
import Header from '@components/Header';

import { WebView } from 'react-native-webview';

export default function PrivacidadeScreen() {
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" backgroundColor='#fff' />
            <Header rose title="Termos de Uso" />
            <WebView style={{ flex: 1, }} source={{uri: 'https://pongo.engenhariadigital.net/termos.html'}} />
        </Main>
    )
}
