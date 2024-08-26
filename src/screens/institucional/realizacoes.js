import React from 'react';
import { Image } from 'react-native';
import { Main, Scroll, Column, Label, Title, useTheme, } from '@theme/global';


//Components
import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';

import { useNavigation } from '@react-navigation/native';

import { FlatList } from 'react-native-gesture-handler';
import TabBar from '@components/TabBar';


export default function InstitucionalRealizacoesScreen() {
    const navigation = useNavigation();
    const { color, font, margin } = useTheme();
    const handleRegister = (item) => {
        navigation.navigate('SchoolRegister', { item: item })
    }

    return (
        <Main style={{ backgroundColor: '#ECEBEB' }}>
            <Scroll>

                <TopMenu back={false} search={false} />

                <Header title="Realizações" />

                <Column mh={margin.h}>
                    <Image source={require('@imgs/extensao-da-sua-casa.png')} style={{ width: '100%', height: 270, borderRadius: 20 }} />
                </Column>

                <Column mh={margin.h} mv={margin.h} style={{ rowGap: 12, }}>

                    <Title >Realizações</Title>

                    <Label style={{ lineHeight: 18, fontSize: 14, }}>
                        Tombado pelo Patrimônio Histórico Nacional, O Copacabana Palace é símbolo do glamour carioca.
                    </Label>

                    <Label style={{ lineHeight: 18, fontSize: 14, }}>
                        Localizado em frente à Praia de Copacabana, na cidade do Rio de Janeiro o hotel já foi eleito diversas vezes como o melhor hotel da América do Sul e os mais importantes prêmios mundiais de turismo.
                    </Label>

                    <Label style={{ lineHeight: 18, fontSize: 14, }}>
                        Pet Friendly, o Copa agora oferece nossos produtos para seus hóspedes pets!
                    </Label>
                </Column>



                <Column style={{ marginBottom: 54 }}>
                    <FlatList
                        data={images.slice(0, 4)}
                        horizontal
                        ListHeaderComponent={() => <Column style={{ width: 28, }} />}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Column style={{ position: 'relative', marginRight: 20 }}>
                                <Image source={item} style={{ width: 260, height: 300, borderRadius: 12 }} />
                            </Column>
                        )}
                    />
                </Column>

                <Column style={{ height: 50 }} />

            </Scroll>
            <TabBar />
        </Main>
    );
}

const images = [
    require('@imgs/realizacoes1.jpg'),
    require('@imgs/realizacoes2.jpg'),
    require('@imgs/realizacoes3.jpg'),
    require('@imgs/realizacoes4.jpg'),

];
