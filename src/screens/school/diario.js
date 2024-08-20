import React, { useState, useEffect, useRef } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme } from '@theme/global';
import InstagramStories from '@birdwingo/react-native-instagram-stories';
import { Pressable } from 'react-native';

export default function SchoolDiarioScreen({ navigation, }) {
    const { color, font, } = useTheme();
    const ref = useRef(null);
    const stories = [
        {
            id: 'user1',
            name: 'User 1',
            imgUrl: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg',
            stories: [
                { id: 'story1', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
                { id: 'story2', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
                { id: 'story3', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
                { id: 'story4', source: { uri: 'https://i.pinimg.com/564x/90/c5/ee/90c5eeb588d8d7fad288aa88a471131e.jpg' } },
            ]
        },
    ];

    const setStories = () => ref.current?.setStories(stories);
    return (
        <InstagramStories
            ref={ref}
            stories={stories}
            showName={true}
            progressColor="#ffffff90"
            progressActiveColor="#ffffff"
            modalAnimationDuration={300}
            storyAnimationDuration={300}
            animationDuration={3000}
            textStyle={{
                color: '#fff',
                fontFamily: font.medium,
            }}
            closeIconColor={'#fff'}
        />
    )
}