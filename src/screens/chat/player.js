import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';

const AudioPlayer = ({ audioUri }) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackStatus, setPlaybackStatus] = useState(null);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const playSound = async () => {
        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: audioUri },
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

    return (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Text>Audio Player</Text>
            {isPlaying ? (
                <Button title="Pause" onPress={pauseSound} />
            ) : (
                <Button title="Play" onPress={playSound} />
            )}
            <Button title="Stop" onPress={stopSound} />
            {playbackStatus && (
                <Text>
                    {`Playback Position: ${Math.floor(playbackStatus.positionMillis / 1000)}s / ${Math.floor(playbackStatus.durationMillis / 1000)}s`}
                </Text>
            )}
        </View>
    );
};

export default AudioPlayer;
