import { Main, Scroll, Title, Row, Column, useTheme, Label, Image, Button, Loader, LabelBT, ButtonPR, ButtonPrimary } from '@theme/global';

export default function Card({ bg = '#ECEBEB', children }) {

    return (
        <Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: -24, zIndex: 99, }}>
                <Column style={{ borderBottomRightRadius: 100, backgroundColor: bg, width: 24, height: 24, }} />
                <Column style={{ borderBottomLeftRadius: 100, backgroundColor: bg, width: 24, height: 24, }} />
            </Row>
            <Column>
                {children}
            </Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -24, zIndex: 99, }}>
                <Column style={{ borderTopRightRadius: 100, backgroundColor: bg, width: 24, height: 24, }} />
                <Column style={{ borderTopLeftRadius: 100, backgroundColor: bg, width: 24, height: 24, }} />
            </Row>
        </Column>
    )
}