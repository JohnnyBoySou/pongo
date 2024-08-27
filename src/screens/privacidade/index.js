import { Main,  Column} from '@theme/global';
//import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft } from 'lucide-react-native';
import Header from '@components/Header';

export default function PrivacidadeScreen({ navigation, }) {
    return (
        <Main style={{ backgroundColor: '#fff', }}>
            <StatusBar style="dark" backgroundColor='#fff' />
            <Header rose title="Termos de Uso" />
           
        </Main>
    )
}

/**
 *  <WebView
                style={{ flex: 1,}}
                source={{ uri: 'https://www.iubenda.com/privacy-policy/92173065' }}
            />
 */