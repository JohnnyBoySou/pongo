import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { Row, Button, useTheme, Column, Loader } from '@theme/global';
import { analyzeAudio, scale } from 'react-native-audio-analyzer';
import { FontAwesome6 } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { ArrowDownToLine } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function AudioPlayerDownloaded({ audioUri = 'https://rr3---sn-a5msenes.googlevideo.com/videoplayback?expire=1724960199&ei=Z3nQZoz1DseWsfIPzYziiQU&ip=13.57.224.30&id=o-ADshwOu27QA9haFm6mCAGGkH7tRp72oKrewCr3xuJGEt&itag=139&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&siu=1&vprv=1&svpuc=1&xtags=drc%3D1&mime=audio%2Fmp4&rqh=1&gir=yes&clen=39353&dur=6.269&lmt=1656600972427094&keepalive=yes&c=IOS&txp=6311224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Csiu%2Cvprv%2Csvpuc%2Cxtags%2Cmime%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRQIgMK2RSLIMeFTNZY5anrSNEvYE6VfeXNkxueKKZEWUCy4CIQCTVUcxFaeJYW_k1B0Je_XI9y9KnQuVJ7uOC7ST5U5uRA%3D%3D&title=Pato%20maloqueiro%F0%9F%A6%86&redirect_counter=1&cm2rm=sn-o09sk7z&rrc=80&req_id=1de99e301c46a3ee&cms_redirect=yes&cmsv=e&mh=rp&mip=2804:5344:500b:f700:c53f:887:9383:1bdb&mm=34&mn=sn-a5msenes&ms=ltu&mt=1724938208&mv=u&mvi=3&pl=32&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRQIgBohFQX6KSXT-lwtbUo6tCO4-L0vY_n50bbp8i78PxPACIQDCkO2YqLcg34OHA0UKE88h2cgz-WQ3TQGLQncnoeTpYQ%3D%3D' }) {
    const [uri, setUri] = useState(audioUri);
    const { color } = useTheme();
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [result, setResult] = useState();
    const [isDownloaded, setIsDownloaded] = useState();
    const [loadingAudio, setloadingAudio] = useState(false);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const downloadAndSetUri = async () => {
        setloadingAudio(true);
        try {
            const { uri: localUri } = await FileSystem.downloadAsync(
                audioUri,
                FileSystem.documentDirectory + 'audiofile.mp3'
            );
            setUri(localUri);
            setIsDownloaded(true);
            fetchWaves(localUri);
        } catch (error) {
            console.error("Error downloading audio:", error);
        } finally {
            setloadingAudio(false);
        }
    };

    const fetchWaves = async (audioUri) => {
        const data = await analyzeAudio(audioUri);
        setResult(data);
    };

    const playSound = async () => {
        try {
            if (!uri) return;
            if (sound) {
                await sound.unloadAsync();
            }
            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: uri },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );
    
            console.log('Som criado', status);
            setSound(newSound);
            setIsPlaying(true);
    
        } catch (error) {
            console.error('Erro ao tentar reproduzir o som:', error);
        }
    };
    

    const onPlaybackStatusUpdate = status => {
        setPlaybackStatus(status);
        console.log(status)
        if (status.isLoaded && status.didJustFinish) {
            console.log('Audio finished');
            setIsPlaying(false);
        } else {
            console.log('Audio is playing', status.positionMillis);
        }
    };
    
    const pauseSound = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const stopSound = async () => {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
            setPlaybackStatus(null);
        }
    };

    const widthStyle = useAnimatedStyle(() => {
        return {
            width: isDownloaded ? withTiming(200, { duration: 300 }) : withTiming(60, { duration: 300 }),
        };
    });

    return (
        <Animated.View style={[{ backgroundColor: '#FFF', borderRadius: 12, height: 64,  justifyContent: 'center',   }, widthStyle]} pv={12} ph={12}>
            <Row style={{ alignItems: 'center', justifyContent: 'space-between', }}>
                {!isDownloaded ? <Button onPress={downloadAndSetUri} pv={4} ph={4} radius={100} style={{ backgroundColor: color.sc.sc3 + 40, width: 36, height: 36, marginLeft: 12,  justifyContent: 'center', alignItems: 'center' }}>
                    <Row>
                        {loadingAudio ? <Loader size={22} color={color.sc.sc3} /> : <ArrowDownToLine size={18} color={color.sc.sc3} />}
                    </Row>
                </Button> :
                    <Button onLongPress={stopSound} onPress={() => { isPlaying ? pauseSound() : playSound(); }} pv={1} ph={1} radius={100} style={{ backgroundColor: color.sc.sc3 + 40, marginLeft: 12, width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }}>
                        <Row>
                            {isPlaying ?
                                <FontAwesome6 name="pause" size={18} color={color.sc.sc3} /> :
                                <FontAwesome6 name="play" size={18} color={color.sc.sc3} />}
                        </Row>
                    </Button>}
                <Row style={{ justifyContent: 'center', maxWidth: 100, alignItems: 'center', backgroundColor: color.sc.sc3 + 40, marginHorizontal: 12, borderRadius: 12, overflow: 'hidden' }}>
                    {result?.length > 0 &&
                        scale(result.map((_) => _.amplitude)).map((value, index) => (
                            <View
                                key={index}
                                style={{
                                    height: value * 50, width: 5,
                                    maxHeight: 100,
                                    borderRadius: 100,
                                    backgroundColor: color.sc.sc3,
                                    marginHorizontal: 2,
                                }}
                            />
                        ))}
                </Row>
            </Row>
        </Animated.View>
    );
};

