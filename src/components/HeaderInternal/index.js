import React from 'react';
import { ArrowLeft } from 'lucide-react-native';
import { Menu } from 'lucide-react-native';
import { Column, Row, Title } from '@theme/global';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components/native';
import { Pressable, Image, StyleSheet } from 'react-native';

const HeaderInternal = () => {
    const { color, margin } = React.useContext(ThemeContext);
    const navigation = useNavigation();

    return (
        <Row style={styles.headerRow(margin.h)}>
            <Pressable onPress={() => { navigation.goBack() }} style={styles.iconButton}>
                <Menu color="#434343" />
            </Pressable>

            <Pressable onPress={() => { navigation.goBack() }} style={styles.profileButton}>
                <Image
                    source={{ uri: 'https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                    style={styles.profileImage}
                />
            </Pressable>
        </Row>
    );
};

const styles = StyleSheet.create({
    headerRow: (horizontalPadding) => ({
        paddingHorizontal: horizontalPadding,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    }),
    iconButton: {
        backgroundColor: 'transparent',
        width: 42,
        height: 28,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileButton: {
        width: 42,
        height: 42,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 42,
        height: 42,
        borderRadius: 21, // Metade do valor do width/height para garantir que seja circular
    },
});

export default HeaderInternal;
