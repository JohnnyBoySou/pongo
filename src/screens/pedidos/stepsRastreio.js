import * as React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import dummyData from './data';

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 0,
    separatorFinishedColor: '#918C8B',
    separatorUnFinishedColor: '#918C8B',
    stepIndicatorFinishedColor: '#91A6C4',
    stepIndicatorUnFinishedColor: '#D9D9D9',
    stepIndicatorCurrentColor: '#91A6C4',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#ffffff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#918C8B',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: '#4aae4f',
};

export default function StepsRastreio() {
    const [currentPage, setCurrentPage] = React.useState(3);
    const viewabilityConfig = React.useRef({ itemVisiblePercentThreshold: 40 })
        .current;

    const renderPage = (rowData) => {
        const item = rowData.item;
        return (
            <View style={styles.rowItem}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
            </View>
        );
    };

    const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
        const visibleItemsCount = viewableItems.length;
        if (visibleItemsCount !== 0) {
            setCurrentPage(viewableItems[visibleItemsCount - 1].index);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    customStyles={stepIndicatorStyles}
                    stepCount={3}
                    direction="vertical"
                    currentPosition={currentPage}
                />
            </View>
            <FlatList
                style={{ flexGrow: 1 }}
                data={dummyData.data}
                renderItem={renderPage}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
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