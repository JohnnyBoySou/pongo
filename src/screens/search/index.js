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
        <Main style={{ backgroundColor: "#ECEBEB", }}>
            <Scroll>
                <Row style={{ marginHorizontal: margin.h, flex: 1, alignItems: 'center' }}>
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
                            style={{ backgroundColor: '#fff', borderRadius: 12, padding: 12, marginLeft: 12, flex: 1, fontFamily: font.bold, fontSize: 16, color: color.secundary, borderWidth: 2, borderColor: focus ? color.sc.sc3 : '#fff' }}
                        />
                        <Button radius={6} disabled={loading} onPress={handleSearch} ph={12} pv={12} style={{ backgroundColor: color.sc.sc3, borderRadius: 8, position: 'absolute', right: 0 }}>
                            <Search size={24} color="#fff" style={{ zIndex: 99, }} />
                        </Button>
                    </Row>
                </Row>
            </Scroll>
        </Main>
    )
}
