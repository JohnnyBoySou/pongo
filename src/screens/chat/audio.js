import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import { View, Text, } from 'react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, withSpring, withTiming, useAnimatedStyle, runOnJS, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { Mic, MicOff, Trash } from 'lucide-react-native';
import * as FileSystem from 'expo-file-system';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, SCREEN_WIDTH, SCREEN_HEIGHT, Image } from '@theme/global';

const AudioRecord = ({ onAudioRecord }) => {
    const { color } = useTheme();
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(null);
    const [recordingStatus, setRecordingStatus] = useState("idle");
    const [audioPermission, setAudioPermission] = useState(null);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [status, setstatus] = useState();
    const [seconds, setSeconds] = useState(0);
    const [showTrash, setshowTrash] = useState(false);


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
            runOnJS(setshowTrash)(false);
        });


    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRecording]);

    useEffect(() => {
        async function getPermission() {
            const permission = await Audio.requestPermissionsAsync();
            console.log("Permission Granted: " + permission.granted);
            setAudioPermission(permission.granted);
        }

        getPermission();
        return () => {
            if (recording) {
                stopRecording();
            }
        };
    }, []);


    async function handleRecordButtonPress() {
        setRecordedAudio(null);
        setRecording(null);
        if (recording) {
          const audioUri = await stopRecording(recording);
          if (audioUri) {
            console.log("Saved audio file to", savedUri);
          }
        } else {
          await startRecording();
        }
      }

    async function startRecording() {
        setIsRecording(true);

        setRecording(null);
        setRecordedAudio(null);
        setSeconds(0);
        setshowTrash(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        zoom.value = withSpring(1.4, { stiffness: 150, damping: 25 });
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const newRecording = new Audio.Recording();
            console.log("Gravação iniciada");
            await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await newRecording.startAsync();
            setRecording(newRecording);
            setRecordingStatus("recording");
            setstatus("Gravando");
        } catch (error) {
            console.error("Failed to start recording", error);
            setIsRecording(false);
        }
    }

    async function stopRecording() {
        setIsRecording(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        zoom.value = withSpring(1.0, { stiffness: 150, damping: 25 });
        try {
            if (recording && recordingStatus === "recording") {
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();

                onAudioRecord(uri);
                setRecordedAudio({
                    uri,
                    name: `recording-${Date.now()}.m4a`,
                    type: "audio/m4a",
                });

                setRecording(null);
                setRecordingStatus("stopped");
                return uri;
            }
        } catch (error) {
            console.error("Failed to stop recording", error);
        }
    }

    async function excludeRecording() {
        stopRecording();
        onAudioRecord(null);

        if (recordedAudio?.uri) {
            try {
                await FileSystem.deleteAsync(recordedAudio.uri);
                console.log("Recording deleted:", recordedAudio.uri);

            } catch (error) {
                console.error("Failed to delete recording", error);
            }
        }
        setRecordedAudio(null);
        setRecording(null);
        setRecordingStatus("idle");
        setSeconds(0);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isRecording && (
                <Animated.View entering={ZoomIn} exiting={ZoomOut} style={{ position: 'absolute', bottom: 80, backgroundColor: color.red + 20, paddingHorizontal: 10, paddingVertical: 12, borderRadius: 12 }}>
                    <Trash size={24} color={color.red} />
                </Animated.View>
            )}
            <Animated.View style={[{ width: 46, height: 46 }, rStyle]}>
                <GestureDetector gesture={panGesture}>
                    <Button onPress={handleRecordButtonPress} ph={0} pv={0} style={{ justifyContent: 'center', alignItems: 'center', width: 46, height: 46 }}>
                        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
                            {recordingStatus !== "recording" ? <Mic size={22} color="#fff" /> : <MicOff size={22} color="#fff" />}
                        </Animated.View>
                    </Button>
                </GestureDetector>
            </Animated.View>
        </GestureHandlerRootView>
    );
};

export default AudioRecord;