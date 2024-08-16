import { Column } from '@theme/global';
import CircularProgress from 'react-native-circular-progress-indicator';

export default function Chart({ ...props }) {
    return (
        <Column style={{ justifyContent: 'center', alignItems: 'center',  }}>
            <CircularProgress
                {...props}
                valueSuffix={'%'}
                radius={46}
                activeStrokeWidth={30}
                inActiveStrokeWidth={30}
                progressValueStyle={{ fontSize: 16, fontFamily: 'Font_Bold' }}
            />
        </Column>
    );
}
