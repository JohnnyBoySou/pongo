import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Image } from 'react-native';
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

export default class CarrosselTopo extends Component {


    render() {
        return (
            <Swiper style={styles.wrapper} autoplay={true}>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://caninablog.wordpress.com/wp-content/uploads/2013/10/dia-das-bruxas-pet_escola_075-1.jpg' }}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://www.decao.com.br/adestramento-de-cao/imagens/daycare-para-caes-de-raca.jpg' }}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://www.decao.com.br/adestramento-de-cao/imagens/quanto-custa-escola-para-caes.jpg' }}
                    />
                </View>
            </Swiper>
        );
    }
}

AppRegistry.registerComponent('myproject', () => CarrosselTopo);
