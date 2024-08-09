
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  interpolateColor,
  runOnJS,
  FadeInDown,
  FadeOutDown,
  FadeInUp,
  withTiming,
  FadeInLeft,
  FadeInRight,
  FadeOutRight,
} from "react-native-reanimated"

import { useState, useImperativeHandle, forwardRef, } from "react"
import { Column, Title, Button, } from '@theme/global';

const SideBar = forwardRef(({ children }, ref) => {
  const translateX = useSharedValue(0);
  const [isOpen, setisOpen] = useState(false);
  const MIN_HEIGHT = 0;
  const MAX_HEIGHT = 300;

  const handleClose = () => {
    translateX.value = withTiming(MIN_HEIGHT);
    setisOpen(false);
  };

  const handleExpand = () => {
    translateX.value = withTiming(MAX_HEIGHT);
    setisOpen(true);
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
      transform: [{ translateX: -translateX.value }],
      backgroundColor: '#fff',
    };
  });

  return (
    <>
      <Animated.View entering={FadeInUp} style={[{ top: 0, zIndex: 99, position: 'absolute', overflow: 'hidden', width: MAX_HEIGHT, height: '100%', }, animatedStyle]} >
        {children}
        <GestureDetector gesture={pan}>
          <Column style={{ position: 'absolute', right: 0, zIndex: 99, width: 40, height: '100%', backgroundColor: '#30303000', }} radius={100}>
          </Column>
        </GestureDetector>
      </Animated.View>
      {!isOpen &&
        <Animated.View entering={FadeInRight} exiting={FadeOutRight} style={{ backgroundColor: '#303030', width: '100%', height: '100%', top: 0, position: 'absolute', zIndex: 2, }}>
          <Button style={{width: '100%', height: '100%', backgroundColor: 'red',}} radius={4}>
            <Column></Column>
            </Button>
        </Animated.View>
      }</>
  )
});

export default SideBar