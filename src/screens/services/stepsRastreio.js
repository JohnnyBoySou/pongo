import * as React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import dummyData from './data';

import { Column } from '@theme/global';

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 5,
    stepStrokeCurrentColor: '#ebebeb',
    stepStrokeWidth: 5,
    stepStrokeUnFinishedColor: '#ebebeb',
    separatorFinishedColor: '#918C8B',
    separatorUnFinishedColor: '#918C8B',
    stepIndicatorUnFinishedColor: '#D9D9D9',
    stepIndicatorCurrentColor: '#91A6C4',
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 12,
    stepIndicatorLabelCurrentColor: '#ffffff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#918C8B',
    labelColor: '#666666',
    labelSize: 12,
};

export default function StepsRastreioServico() {
    const renderPage = (rowData) => {
        const item = rowData.item;
        return (
            <View style={styles.rowItem}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
            </View>
        );
    };


    return (
        <View style={styles.container}>
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    stepCount={3}
                    direction="vertical"
                    renderStepIndicator={() => <Column></Column>}
                    currentPosition={0}
                />
            <FlatList
                style={{ flexGrow: 1 }}
                data={dummyData.data.reverse()}
                renderItem={renderPage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    stepIndicator: {
        marginVertical: 0,
        paddingHorizontal: 0,
    },
    rowItem: {
        flex: 3,
        paddingVertical: 20,
    },
    title: {
        flex: 1,
        fontSize: 13,
        color: '#434343',
        paddingVertical: 6,
        fontWeight: '500',
        marginLeft: 12
    },
    body: {
        flex: 1,
        fontSize: 12,
        color: '#858585',
        lineHeight: 12,
        marginRight: 8,
        marginLeft: 12
    },
});