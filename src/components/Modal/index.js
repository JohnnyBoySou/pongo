import React, { forwardRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';

const Modal = forwardRef(({ children, bg = '#fbfbfb', snapPoints = [0.1, 300], onClose, ...props }, ref) => {
    return (
        <BottomSheet
            {...props}
            ref={ref}
            snapPoints={snapPoints}
            onClose={onClose}
            backgroundStyle={{ backgroundColor: bg, }}
            handleIndicatorStyle={{ backgroundColor: '#30303030', width: 70, height: 8, }}
        >
            <ScrollView>
                {children}
            </ScrollView>
        </BottomSheet>
    );
});

export default Modal;
