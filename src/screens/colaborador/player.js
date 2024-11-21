import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';
import { Row, Button, useTheme } from '@theme/global';
import { Send, Trash } from 'lucide-react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
//import { analyzeAudio, scale } from 'react-native-audio-analyzer';
import { FontAwesome6 } from '@expo/vector-icons';
//import { Buffer } from 'react-native-buffer';

import * as Haptics from 'expo-haptics';

const AudioPlayer = ({ audioUri }) => {
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


    //  useEffect(() => {
    //   const fetchWaves = async () => {
    //        const data = await analyzeAudio(uri);
    //        setResult(data);
    //     }
    //      fetchWaves();
    //  }, [])


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

    const handleSendAudio = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const hour = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;
        const mins = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;

        const audio64 = 1//Buffer.from(uri).toString('base64');

        /*  socket.emit("upload", {
              audio: audio64,
              chat_id: id,
              user_id: user.id,
              timestamp: { hour, mins },
          });*/
        seturi(null);
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


                <Row style={{ columnGap: 8, }}>
                    <Button onPress={excludeSound} radius={100} style={{ backgroundColor: color.red, width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }}>
                        <Trash size={20} color="#fff" />
                    </Button>
                    <Button onPress={handleSendAudio} radius={100} style={{ backgroundColor: color.green, width: 46, height: 46, justifyContent: 'center', alignItems: 'center', }}>
                        <Send size={20} color="#fff" />
                    </Button>
                </Row>
            </Row>
        </Animated.View>
    );
};

export default AudioPlayer;

/*
<Row style={{ justifyContent: 'center', maxWidth: 100, alignItems: 'center', backgroundColor: color.sc.sc3+40, marginHorizontal: 12, borderRadius: 12, overflow: 'hidden', }}>
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
                </Row> */