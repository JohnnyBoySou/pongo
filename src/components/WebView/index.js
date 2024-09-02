//import { WebView as Web } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

export default function WebView({ source }) {

    const handleWebBrowser = async () => {
        await WebBrowser.openBrowserAsync(source);
    }
    return null;
    return (
        <Web style={{ flex: 1, }} source={{ uri: source }} />
    )

};