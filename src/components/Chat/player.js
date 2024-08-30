import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { Row, Button, useTheme, Column, Loader } from '@theme/global';
import { analyzeAudio, scale } from 'react-native-audio-analyzer';
import { FontAwesome6 } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { ArrowDownToLine } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export default function AudioPlayerDownloaded({ audioUri }) {
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
    
            await newSound.setVolumeAsync(1.5);

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

