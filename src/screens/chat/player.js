import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Audio } from 'expo-av';
import { Main, Column, Label, Title, Row, Button, useTheme, SCREEN_HEIGHT, Image } from '@theme/global';
import { Pause, Play, Send, StopCircle } from 'lucide-react-native';
import Animated, { SlideInDown, SlideInUp, SlideOutDown } from 'react-native-reanimated';
import { analyzeAudio, scale, sample } from 'react-native-audio-analyzer';
import { ScrollView } from 'react-native-gesture-handler';


const AudioPlayer = ({ audioUri }) => {
    const [uri, seturi] = useState(audioUri);
    const { color, font, margin } = useTheme();
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackStatus, setPlaybackStatus] = useState(null);
    const [seconds, setSeconds] = useState();
    const [totalSeconds, setTotalSeconds] = useState();

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
            console.log(data)
            setResult(data);
        }
        fetchWaves();
    }, [])

    useEffect(() => {
        if (playbackStatus) {
            setSeconds(Math.floor(playbackStatus.positionMillis / 1000));
            if (playbackStatus.durationMillis) {
                setTotalSeconds(Math.floor(playbackStatus.durationMillis / 1000));
            }
        }
    }, [playbackStatus]);

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

    if (!uri) return null;
    return (
        <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={{ zIndex: -2, backgroundColor: '#d7d7d7', paddingVertical: 12, paddingHorizontal: 12, }}>
            <Row style={{ alignItems: 'center', }}>

                <Button onPress={() => { isPlaying ? pauseSound() : playSound() }} radius={12} style={{ backgroundColor: 'blue', width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }}>
                    <Row>
                        {isPlaying ? <Pause size={20} color="#fff" /> : <Play size={20} color="#fff" />}
                    </Row>
                </Button>


                <ScrollView horizontal >
                    <Row >
                        {result?.length > 0 &&
                            scale(result.map((_) => _.amplitude)).map((value, index) => (
                                <View
                                    key={index}
                                    style={{
                                        height: value * 100, width: 3,
                                        backgroundColor: 'blue',
                                        marginHorizontal: 2,
                                    }}
                                />
                            ))}
                    </Row>
                </ScrollView>
                <ScrollView horizontal >
                    <Row>
                        {result?.length > 0 &&
                            scale(
                                sample(
                                    result.map((_) => _.amplitude),
                                    20
                                )
                            ).map((value, index) => (
                                <View
                                    key={index}
                                    style={{
                                        height: value * 100, width: 3,
                                        backgroundColor: 'blue',
                                        marginHorizontal: 2,
                                    }}
                                />
                            ))}
                    </Row>
                </ScrollView>


                <Text>  {seconds} / {totalSeconds}  </Text>


                <Button onPress={excludeSound} radius={100} style={{ backgroundColor: color.green, width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }}>
                    <Send size={20} color="#fff" />
                </Button>
                <Button onPress={stopSound} radius={100} style={{ backgroundColor: color.green, width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }}>
                    <Send size={20} color="#fff" />
                </Button>
            </Row>
        </Animated.View>
    );
};

export default AudioPlayer;

