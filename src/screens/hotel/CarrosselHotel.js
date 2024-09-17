import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
    wrapper: {
        height: 160,
        overflow: 'hidden',
        borderRadius: 20,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20, // Adiciona o borderRadius a cada slide
        overflow: 'hidden', // Garante que o conteúdo dentro do slide respeite o borderRadius
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});

export default class CarrosselHotel extends Component {

    render() {
        return (
            <Swiper style={styles.wrapper} autoplay={true}>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('@imgs/hotel1.png')}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('@imgs/hotel2.png')}
                    />
                </View>

            </Swiper>
        );
    }
}

