import { Main} from '@theme/global';
import { StatusBar } from 'expo-status-bar';
import Header from '@components/Header';
import WebView from '@components/WebView';

export default function PrivacidadeScreen() {
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" backgroundColor='#fff' />
            <Header rose title="Termos de Uso" />
            <WebView source='https://www.iubenda.com/privacy-policy/92173065' />
        </Main>
    )
}
