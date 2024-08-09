import { useState } from 'react';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import * as FileSystem from 'expo-file-system';
import { withSpring } from 'react-native-reanimated';

function useAudioRecording({ onAudioRecord, zoom }) {
    const [recording, setRecording] = useState(null);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const [recordingStatus, setRecordingStatus] = useState("idle");
    const [isRecording, setIsRecording] = useState(false);

    async function handleRecordButtonPress() {
        if (recording) {
            const audioUri = await stopRecording();
            if (audioUri) {
                console.log("Saved audio file to", audioUri);
            }
        } else {
            await startRecording();
        }
    }

    async function startRecording() {
        setIsRecording(true);
        setRecordingStatus("recording");
        setRecordedAudio(null);
        zoom.value = withSpring(1.4, { stiffness: 150, damping: 25 });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const newRecording = new Audio.Recording();
            await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            await newRecording.startAsync();
            setRecording(newRecording);
            console.log("Gravação iniciada");
        } catch (error) {
            console.error("Failed to start recording", error);
            resetRecordingState();
        }
    }

    async function stopRecording() {
        setIsRecording(false);
        zoom.value = withSpring(1.0, { stiffness: 150, damping: 25 });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        if (recordingStatus !== "recording" || !recording) return;

        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setRecordedAudio({ uri, name: `recording-${Date.now()}.m4a`, type: "audio/m4a" });
            onAudioRecord(uri);
            setRecording(null);
            setRecordingStatus("stopped");
            return uri;
        } catch (error) {
            console.error("Failed to stop recording", error);
            resetRecordingState();
        }
    }

    async function excludeRecording() {
        if (recordedAudio?.uri) {
            try {
                await FileSystem.deleteAsync(recordedAudio.uri);
                console.log("Recording deleted:", recordedAudio.uri);
            } catch (error) {
                console.error("Failed to delete recording", error);
            }
        }

        resetRecordingState();
        onAudioRecord(null);
    }

    function resetRecordingState() {
        setRecording(null);
        setRecordedAudio(null);
        setRecordingStatus("idle");
        setIsRecording(false);
    }

    return {
        handleRecordButtonPress,
        excludeRecording,
        isRecording,
        recordedAudio,
        recordingStatus,
    };
}

export default useAudioRecording;
