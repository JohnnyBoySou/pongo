import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
    wrapper: {
        height: 200,
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

export default class CarrosselRotinaEscola extends Component {


    render() {
        return (
            <Swiper style={styles.wrapper} autoplay={true}>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('@imgs/day-use1.jpg')}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('@imgs/day-use2.jpg')}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('@imgs/day-use3.jpg')}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('@imgs/day-use4.jpg')}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={require('@imgs/day-use5.jpg')}
                    />
                </View>

            </Swiper>
        );
    }
}

