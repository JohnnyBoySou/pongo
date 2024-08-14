import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Image } from 'react-native';
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
                        source={{ uri: 'https://lh6.googleusercontent.com/VAViVE0QG6wpW2yeSzQA7tPOrNFf3hlmUrwr7mogM3oShMFGVVNPRpKFs6Sf23tL_c6tITmB5glV2WSR3O1a4Zxd4zj9o7sb39WLMpaA0n20IG3EK-JkeEvA8-OmWF6GeuLB3qwrUsDbALDzrQm27BZJqIdqTTEHXt-TTsaUKem2jwyQKWehdB8vPJtEdw' }}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://s2-g1.glbimg.com/AjCheGSkmh-QkcBw00ttWUBROtk=/0x0:1600x1200/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/n/d/zQ8s7VQtajoP3ePt9dIg/whatsapp-image-2022-07-19-at-17.40.44.jpeg' }}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://www.melhoresdestinos.com.br/wp-content/uploads/2021/04/cachorro-hotel-capa.jpg' }}
                    />
                </View>
            </Swiper>
        );
    }
}

AppRegistry.registerComponent('myproject', () => CarrosselTopo);
