import React, { useState } from 'react';
import { Column, Label, Title, Row, Button, useTheme, } from '@theme/global';
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
LocaleConfig.locales['br'] = {
    monthNames: [
        'Janeiro ',
        'Fevereiro ',
        'Março',
        'Abril  ',
        'Maio ',
        'Junho ',
        'Julho ',
        'Agosto ',
        'Setembro ',
        'Outubro ',
        'Novembro ',
        'Dezembro '
    ],
    monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
    dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
    today: "Hoje"
};
LocaleConfig.defaultLocale = 'br';
export default function Calendario({ day, setday, disabled, }) {

    const INITIAL_DATE = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
    const { color, font, margin } = useTheme();

    const handleDays = (item) => {
        if(disabled)return
        if (day.includes(item)) {
            setday(day.filter((i) => i !== item));
        } else {
            setday([...day, item]);
        }
        console.log(day)
    };

    const markedDates = day?.reduce((acc, date) => {
        acc[date] = { selected: true, disableTouchEvent: true, selectedDotColor: color.blue };
        return acc;
    }, {});
    const isWeekend = (dateString) => {
        const [year, month, day] = dateString.split('-'); // Divide o dateString em ano, mês e dia
        const date = new Date(year, month - 1, day); // Criar a data corretamente (o mês em JavaScript começa em 0)
        const dayOfWeek = date.getDay(); // 0 é domingo, 6 é sábado
        return dayOfWeek === 0 || dayOfWeek === 6;
    };

    const CustomDayComponent = ({ date, marking, onPress }) => {
        const isSelected = marking?.selected;
        const isDisabled = isWeekend(date.dateString); // Verifica se é fim de semana

        return (
            <Button
                disabled={isDisabled}
                onPress={() => onPress(date.dateString)}
                pv={1}
                ph={1}
                radius={6}
                style={{
                    width: 36,
                    height: 36,
                    marginHorizontal: -3,
                    marginVertical: -3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isSelected ? color.sc.sc3 : 'white',
                }}
            >
                <Label
                    size={16}
                    color={marking?.selected ? 'white' : color.label}
                    style={{
                        fontFamily: font.medium, textDecorationLine: isDisabled ? 'line-through' : 'none',
                        textDecorationColor: color.label,
                        marginTop: 2,
                    }}
                >
                    {date.day}
                </Label>
            </Button>
        );
    };

    const renderHeader = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        console.log(date)
        return (
        <Column style={{ justifyContent: 'center', alignItems: 'center',  height: 50, }}>
                <Title style={{ fontSize: 18, lineHeight: 24, fontFamily: 'Voyage_Medium', textTransform: 'uppercase',  textAlign: 'center', }}>
                   {month} {year} 
                </Title>
        </Column>
        );
    }; const renderArrow = (direction) => (
        <Button
            pv={1}
            ph={1}
            style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color.sc.sc3,
                borderRadius: 15,
            }}
        >
            <Title style={{ color: 'white', fontSize: 18 }}>
                {direction === 'left' ? <ArrowLeft size={18} color="#fff" /> : <ArrowRight size={18} color="#fff" />}
            </Title>
        </Button>
    );

    return (
        <Column style={{ borderWidth: 1, borderColor: color.border, borderRadius: 12, marginVertical: 12, paddingBottom: 12, }}>
            <Calendar
                current={INITIAL_DATE}
                style={{ borderRadius: 16 }}
                onDayPress={day => {
                    handleDays(day.dateString);
                }}
                enableSwipeMonths={true}
                hideExtraDays={true}
                markingType={'multi-dot'}
                markedDates={markedDates}
                renderHeader={renderHeader}
                renderArrow={renderArrow}
                dayComponent={({ date, marking }) => (
                    <CustomDayComponent
                        date={date}
                        marking={marking}
                        onPress={handleDays}
                    />
                )}
            />
        </Column>
    );
}