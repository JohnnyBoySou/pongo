import React, { useContext, useState } from 'react';
import { Main, Scroll, Column, Row, Button } from '@theme/global';
import { ThemeContext } from 'styled-components/native';
import { TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import Back from '@components/Back';

export default function SearchScreen({ navigation, route }) {
    const { color, font, margin } = useContext(ThemeContext);
    const [query, setquery] = useState();
    const [loading, setloading] = useState(false);
    const [focus, setfocus] = useState(false);
    const handleSearch = () => {
    }
    return (
        <Main style={{ backgroundColor: "#fff", }}>
            <Scroll>
                <Column style={{ marginHorizontal: margin.h, marginVertical: 20, flex: 1, }}>
                    <Back />
                    <Row style={{ marginVertical: 24, justifyContent: 'center', alignItems: 'center', }}>
                        <TextInput
                            value={query}
                            onChangeText={e => { setquery(e); query?.length > 3 ? handleSearch() : null }}
                            onFocus={() => setfocus(true)}
                            onBlur={() => setfocus(false)}
                            placeholder='Buscar'
                            placeholderTextColor={color.title + 60}
                            onSubmitEditing={handleSearch}
                            style={{ backgroundColor: '#f7f7f7', borderRadius: 12, padding: 12, width: '100%', fontFamily: font.bold, fontSize: 16, color: color.secundary, borderWidth: 2, borderColor: focus ? color.primary : '#f7f7f7' }}
                        />
                        <Button radius={6} disabled={loading} onPress={handleSearch} ph={12} pv={12} style={{  backgroundColor: color.primary, borderRadius: 8, position: 'absolute', right: 6, }}>
                            <Search size={24} color="#fff" style={{ zIndex: 99, }} />
                        </Button>
                    </Row>
                </Column>
            </Scroll>
        </Main>
    )
}
