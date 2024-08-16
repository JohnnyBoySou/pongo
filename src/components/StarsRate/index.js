import { AntDesign } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Row, useTheme } from '@theme/global';

export default function StarsRate ({ stars, size = 18 }) {
    const { color } = useTheme();
    const data = Object.keys(Array.from({ length: stars }, (v, i) => i));
    const unstar = Object.keys(Array.from({ length: 5 - stars }, (v, i) => i));
    return (
        <Row>
            {data.map((item, index) => (
                <MotiView from={{ opacity: 0, rotateX: '32deg' }} animate={{ opacity: 1, rotateX: '0deg' }}>
                    <AntDesign name="star" size={size} color={color.yellow} />
                </MotiView>
            ))}
            {unstar.map((item, index) => (
                <AntDesign name="staro" size={size} color={color.yellow} />
            ))}
        </Row>
    )
}