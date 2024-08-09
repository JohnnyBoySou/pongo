
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
} from "react-native-reanimated"

import { useState, useImperativeHandle, forwardRef, } from "react"
import { Column, Title } from '@theme/global';

const TopSheet = forwardRef(({ min, max, valueMin, valueMax }, ref) => {
  const height = useSharedValue(valueMin);

  const MIN_HEIGHT = valueMin;
  const MAX_HEIGHT = valueMax; 

  const [currentStatus, setCurrentStatus] = useState('min');

  const handleClose = () => {
    height.value = withTiming(MIN_HEIGHT);
    setCurrentStatus('min');
  };

  const handleExpand = () => {
    height.value = withSpring(MAX_HEIGHT);
    setCurrentStatus('max');
  };

  useImperativeHandle(ref, () => ({
    close: handleClose,
    expand: handleExpand,
  }));



  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + height.value;

      if (offsetDelta < MIN_HEIGHT) {
        height.value = MIN_HEIGHT;
      } else {
        height.value = offsetDelta;
      }
    })
    .onEnd(() => {
      const currentHeight = height.value;
      if (currentHeight < (MIN_HEIGHT + MAX_HEIGHT) / 2) {
        height.value = withTiming(MIN_HEIGHT);
        runOnJS(setCurrentStatus)('min')
        
      } else {
        height.value = withSpring(MAX_HEIGHT);
        runOnJS(setCurrentStatus)('max')
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      height.value,
      [MIN_HEIGHT, MAX_HEIGHT],
      ['#FFFFFF', '#FFFFFF']
    );
    return {
      height: height.value,
      backgroundColor: "#FFFFFF",
    };
  });


  return (
    <Animated.View entering={FadeInUp} style={[{ width: '100%', top: 0, zIndex: 99, borderBottomLeftRadius: 18, borderBottomRightRadius: 18, position: 'absolute', overflow: 'hidden', }, animatedStyle]} >
      {currentStatus === 'min' &&
        <Animated.View entering={FadeInUp} exiting={FadeOutDown} style={{ paddingHorizontal: 28, paddingTop: 10, }}>
          {min}
        </Animated.View>}
      {currentStatus === 'max' &&
        <Animated.View entering={FadeInDown} exiting={FadeOutDown} style={{ paddingHorizontal: 28, paddingTop: 10, }}>
          {max}
        </Animated.View>}
      <GestureDetector gesture={pan}>
        <Column pv={12} style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 99, }}>
          <Column style={{ width: 80, height: 8, backgroundColor: "#30303070", alignSelf: 'center', borderRadius: 100, }} />
        </Column>
      </GestureDetector>
    </Animated.View>
  )
});

export default TopSheet