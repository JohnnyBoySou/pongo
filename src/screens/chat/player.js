import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { Row, Button, useTheme, Loader } from '@theme/global';
import { Send, Trash } from 'lucide-react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { analyzeAudio, scale } from 'react-native-audio-analyzer';
import { FontAwesome6 } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
import { enviarAudio } from '@api/request/chat';

const AudioPlayer = ({ audioUri, type, token, user }) => {
    const [uri, seturi] = useState(audioUri);
    const { color, font, margin } = useTheme();
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackStatus, setPlaybackStatus] = useState(null);

    const [result, setResult] = useState();

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);


    useEffect(() => {
        const fetchWaves = async () => {
            const data = await analyzeAudio(uri);
            setResult(data);
        }
        fetchWaves();
    }, [])


    const playSound = async () => {
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: uri },
            { shouldPlay: true },
            onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
    };

    const onPlaybackStatusUpdate = status => {
        setPlaybackStatus(status);
        if (status.didJustFinish) {
            setIsPlaying(false);
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

    const excludeSound = () => {
        seturi(null);
    }

    const [loading, setloading] = useState(false);
    const handleSendAudio = async () => {
        const base64Audio = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const fileExtension = uri.split('.').pop();
        if (base64Audio) {
            setloading(true)
            try {
                const params = {
                    user: user,
                    token: token,
                    audio: `data:audio/${fileExtension};base64,${base64Audio}`,
                }
                const res = await enviarAudio(params, type)
            } catch (error) {
                console.log(error)
            } finally {
                seturi(null);
                setloading(false)
            }
        }
    };

    if (!uri) return null;
    return (
        <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={{ zIndex: 2, backgroundColor: color.off, paddingVertical: 12, paddingHorizontal: 12, }}>
            <Row style={{ alignItems: 'center', justifyContent: 'space-between', alignItems: 'center', }}>
                <Button onLongPress={stopSound} onPress={() => { isPlaying ? pauseSound() : playSound() }} pv={1} ph={1} radius={100} style={{ backgroundColor: color.sc.sc3 + 40, width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }}>
                    <Row>
                        {isPlaying ?
                            <FontAwesome6 name="pause" size={22} color={color.sc.sc3} /> :
                            <FontAwesome6 name="play" size={22} color={color.sc.sc3} />}
                    </Row>
                </Button>
                <Row style={{ justifyContent: 'center', maxWidth: 100, alignItems: 'center', backgroundColor: color.sc.sc3 + 40, marginHorizontal: 12, borderRadius: 12, overflow: 'hidden', }}>
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

                <Row style={{ columnGap: 8, }}>
                    <Button onPress={excludeSound} radius={100} style={{ backgroundColor: color.red, width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }}>
                        <Trash size={20} color="#fff" />
                    </Button>
                    <Button onPress={handleSendAudio} radius={100} style={{ backgroundColor: color.green, width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }}>
                       
                            <Row>
                            {loading ? <Loader color="#fff"/> :
                                <Send size={20} color="#fff" /> }
                            </Row>
                    </Button>
                </Row>
            </Row>
        </Animated.View>
    );
};

export default AudioPlayer;

