import { WebView as Web } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';

export default function WebView({ source }) {

    const handleWebBrowser = async () => {
        await WebBrowser.openBrowserAsync(source);
    }
    return (
        <Web style={{ flex: 1, }} source={{ uri: source }} />
    )

};