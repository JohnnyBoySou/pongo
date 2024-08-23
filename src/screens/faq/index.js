import React, { useContext, useState, useEffect } from 'react';
import { Main, Scroll, Column, Row, Button, Title, Image, Label } from '@theme/global';
import { FlatList } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { TextInput, Text } from 'react-native';
import { Search } from 'lucide-react-native';
import Back from '@components/Back';
import TopMenu from '@components/Header/topmenu';
import TabBar from '@components/TabBar';

export default function FaqScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [query, setquery] = useState();
    const [loading, setloading] = useState(false);
    const [focus, setfocus] = useState(false);
    const handleSearch = () => {
    }
    return (
        <Main style={{ backgroundColor: "#ECEBEB", }}>
            <Scroll >
                <TopMenu search={false} back={false} />
                <Row style={{ marginHorizontal: margin.h, alignItems: 'center' }}>
                    <Back />
                    <Row style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <TextInput
                            value={query}
                            onChangeText={e => { setquery(e); query?.length > 3 ? handleSearch() : null }}
                            onFocus={() => setfocus(true)}
                            onBlur={() => setfocus(false)}
                            placeholder='Buscar'
                            placeholderTextColor={color.title + 60}
                            onSubmitEditing={handleSearch}
                            style={{ backgroundColor: '#fff', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, marginLeft: 12, flex: 1, fontFamily: font.medium, fontSize: 16, color: color.title, borderWidth: 2, borderColor: focus ? color.sc.sc3 : '#fff' }}
                        />
                        <Button radius={20} disabled={loading} onPress={handleSearch} ph={8} pv={8} style={{ backgroundColor: color.sc.sc3, borderRadius: 8, position: 'absolute', right: 6, }}>
                            <Search size={24} color="#fff" style={{ zIndex: 99, }} />
                        </Button>
                    </Row>
                </Row>

                <Column style={{ marginHorizontal: margin.h, marginTop: margin.h, flex: 1, marginVertical: margin.h }}>
                    <Text style={{ fontWeight: 700 }}>Como consigo alterar meu endereço depois do pedido ter sido cprocessado?</Text>
                    <Label style={{ marginTop: 8, fontSize: 13 }}>Resposta aqui</Label>
                </Column>

                <Column style={{ height: 1, backgroundColor: '#D9D9D9', width: '100%' }} />

            </Scroll>
            <TabBar />
        </Main>
    )
}



