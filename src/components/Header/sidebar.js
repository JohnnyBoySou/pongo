import { GestureDetector, Gesture, ScrollView } from "react-native-gesture-handler"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  FadeInUp,
  withTiming,
} from "react-native-reanimated"

import { useState, useImperativeHandle, forwardRef, useEffect, } from "react"
import { Column, SCREEN_HEIGHT, SCREEN_WIDTH } from '@theme/global';

const SideBar = forwardRef(({ children }, ref) => {
  const MIN_HEIGHT = 0;
  const MAX_HEIGHT = -SCREEN_WIDTH;
  
  const translateX = useSharedValue(MAX_HEIGHT);
  const handleClose = () => {
    translateX.value = withTiming(MIN_HEIGHT);
  };
  const handleExpand = () => {
    translateX.value = withTiming(MAX_HEIGHT);
  };
  useImperativeHandle(ref, () => ({
    close: handleClose,
    expand: handleExpand,
  }));

  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value = Math.max(- event.translationX, 0);
    })
    .onEnd(() => {
      const currentHeight = translateX.value;
      if (currentHeight > MAX_HEIGHT / 2) {
        runOnJS(handleExpand)();
      } else {
        runOnJS(handleClose)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      backgroundColor: '#fff',
    };
  });

  return (
      <Animated.View style={[{ top: 0, bottom: 0, zIndex: 99,  position: 'absolute', width: SCREEN_WIDTH, height: '100%', overflow: 'hidden', paddingHorizontal: 28, }, animatedStyle]} >
        {children}
      </Animated.View>
      )
});


/*  {!isOpen &&
        <Animated.View entering={FadeInRight} exiting={FadeOutRight} style={{ backgroundColor: '#303030', width: '100%', height: '100%', top: 0, position: 'absolute', zIndex: 2, }}>
          <Button style={{width: '100%', height: '100%', backgroundColor: 'red',}} radius={4}>
            <Column></Column>
            </Button>
        </Animated.View>
      } <GestureDetector gesture={pan}>
          <Column style={{ position: 'absolute', right: 0, zIndex: 99, width: 40, height: '100%', backgroundColor: '#30303000', }} radius={100}>
          </Column>
        </GestureDetector>
*/
export default SideBar