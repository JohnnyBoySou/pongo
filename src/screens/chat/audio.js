import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import Animated, { withSpring, ZoomIn, ZoomOut, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { Check, Mic, MicOff, Trash } from 'lucide-react-native';
import * as FileSystem from 'expo-file-system';
import { Column, Button, useTheme } from '@theme/global';

const AudioRecord = ({ onAudioRecord }) => {
    const { color } = useTheme();
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [isRecording, setIsRecording] = useState(false);

    async function startRecording() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        try {
            const perm = await Audio.requestPermissionsAsync();
            if (perm.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                onAudioRecord(null);
                setIsRecording(true);
                const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                setRecording(recording);
            }
        } catch (err) { }
    }

    async function stopRecording() {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setRecording(undefined);
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        let allRecordings = [...recordings];
        onAudioRecord(recording.getURI());
        setRecordings(allRecordings);
    }



    function clearRecordings() {
        setIsRecording(false);
        setRecordings([])
    }

    //Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    return (
        <Column>
            {isRecording &&
                <Animated.View entering={SlideInRight.springify().damping(20).stiffness(100)} exiting={SlideOutRight.springify().damping(20).stiffness(100)} style={{ position: 'absolute', zIndex: -2, bottom: 80, }}>
                    <Button onPress={clearRecordings} bg={color.red} ph={12} pv={12} radius={12}>
                        <Trash size={18} color="#FFF" />
                    </Button>
                </Animated.View>
            }
            <Animated.View style={{ width: 46, height: 46, backgroundColor: color.sc.sc3, borderRadius: 100, }}>
                <Button onPress={isRecording ? stopRecording : startRecording} ph={0} pv={0} style={{ justifyContent: 'center', alignItems: 'center', width: 46, height: 46 }}>
                    <Animated.View entering={ZoomIn} exiting={ZoomOut}>
                        {isRecording ? <Check size={22} color="#fff" /> : <Mic size={22} color="#fff" />}
                    </Animated.View>
                </Button>
            </Animated.View>
        </Column>

    );
};

export default AudioRecord;


/*
 const zoom = useSharedValue(1);
    const translateY = useSharedValue(0);
    const bgColor = useSharedValue(color.sc.sc3);

    const SWIPE_THRESHOLD = -60;
    const MAX_TRANSLATE_Y = -80;

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { scale: zoom.value },
        ],
        backgroundColor: bgColor.value,
        borderRadius: 100,
    }));

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateY.value = Math.min(event.translationY, 0);
            if (translateY.value < MAX_TRANSLATE_Y) {
                translateY.value = MAX_TRANSLATE_Y;
                bgColor.value = color.red;
                zoom.value = withSpring(0.8, { stiffness: 150, damping: 25 });
            } else {
                bgColor.value = color.sc.sc3;
            }
        })
        .onEnd(() => {
            if (translateY.value < SWIPE_THRESHOLD) {
                bgColor.value = color.red;
                runOnJS(excludeRecording)();
            }
            translateY.value = withSpring(0, { stiffness: 150, damping: 25 });
            zoom.value = withSpring(1, { stiffness: 150, damping: 25 });
            bgColor.value = color.sc.sc3;
        });
*/