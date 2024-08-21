import React from 'react';
import { Title, Button, useTheme, Column, Label } from '@theme/global';
import { FlatList } from 'react-native-gesture-handler';
export default function CalendarioHorizontal({ day, setday, }) {
    const { color, font, margin } = useTheme();
    console.log(day)
    const getNextTwoWeeks = () => {
        const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

        const dates = [];

        for (let i = 0; i < 14; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const dayName = weekDays[date.getDay()];

            dates.push({
                day,
                month,
                name: dayName,
            });
        }

        return dates;
    };

    const data = getNextTwoWeeks();

    return (
            <FlatList
                data={data}
                horizontal
                contentContainerStyle={{ columnGap: 12, }}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={<Column style={{ width: 16, }}></Column>}
                ListFooterComponent={<Column style={{ width: 28, }}></Column>}
                renderItem={({ item }) => (
                    <Button  ph={1} pv={1} radius={1} onPress={() => { setday({ day: item.day, month: item.month, name: item.name }) }} style={{ width: 56, height: 72, justifyContent: 'center', alignItems: 'center',  borderWidth: 1, borderStyle: 'dashed',  borderColor: '#858585', backgroundColor: day?.day == item?.day ? "#D4D4D4" : 'transparent' , }}>
                        <Column style={{  justifyContent: 'center', alignItems: 'center',  }} >
                            <Title style={{ fontFamily: font.book, }}>{item?.day}</Title>
                            <Label style={{ fontFamily: 'Voyage_Medium', fontSize: 12, lineHeight: 15, }}>{item?.name}</Label>
                        </Column>
                    </Button>
                )}
            />
    );
}


