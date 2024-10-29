import React, { useState, useRef } from 'react';
import { Main, Row, Button, useTheme } from '@theme/global';
import { Video } from 'expo-av';
import { Pause, Play, VolumeX, Volume, Volume1, ArrowLeft } from 'lucide-react-native';

const video1 = require('@imgs/video1.mp4');
const video2 = require('@imgs/video2.mp4');

export default function VideoScreen({ navigation, route }) {
    const { color, font, } = useTheme();
    const video = route.params.video == 1 ? video1 : video2;
    const [isMuted, setisMuted] = useState(false);
    const [isPlay, setisPlay] = useState(true);
    const videoRef = useRef(null);

    const handlePlay = () => {
        if (isPlay) {
            videoRef?.current.pauseAsync();
            setisPlay(false);
        } 
        else {
            videoRef?.current.playAsync();
            setisPlay(true);
        }
    }
    return (
        <Main style={{ paddingTop: 0, }}>
            <Button style={{ position: 'absolute', top: 50, left: 28, zIndex: 99, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',  width: 48, height:48, borderRadius: 100 }}>
                <ArrowLeft size={24} color={color.title} onPress={() => navigation.goBack()} />
            </Button>
            <Video
                source={video}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                ref={videoRef}
                style={{ width: '100%', height: '100%' }}
            />
            <Row style={{  marginTop: 10, paddingHorizontal: 6, paddingVertical: 6, position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: '#fff', borderRadius: 100, }}>
                <Button onPress={handlePlay}  style={{ width: 52, height: 52, }} >
                    <Row>
                        {isPlay ? 
                        <Pause size={24} color={color.title} />
                            :
                        <Play size={24} color={color.title} />
                        }
                    </Row>
                </Button>
                <Button onPress={() => {videoRef?.current.setIsMutedAsync(!isMuted); setisMuted(!isMuted)}} style={{ width: 62, height: 52, }} >
                    <Row>
                        {isMuted ? <VolumeX size={24} color={color.title} /> : <Volume1 size={24} color={color.title} />}
                    </Row>
                </Button>
            </Row>
        </Main>
    )
}