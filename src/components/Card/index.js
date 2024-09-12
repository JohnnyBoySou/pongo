import { Main, Scroll, Title, Row, Column, useTheme, Label, Image, Button, Loader, LabelBT, ButtonPR, ButtonPrimary } from '@theme/global';

export default function Card({ bg = '#ECEBEB', children, num = 12, service = false }) {

    return (
        <Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: -num, zIndex: 99, }}>
                <Column style={{ borderBottomRightRadius: 100, backgroundColor: bg, width: num, height: num, }} />
                {service ? <></> :
                <Column style={{ borderBottomLeftRadius: 100, backgroundColor: bg, width: num, height: num, }} />
                }
            </Row>
            <Column>
                {children}
            </Column>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: -num, zIndex: 99, }}>
                <Column style={{ borderTopRightRadius: 100, backgroundColor: bg, width: num, height: num, }} />
                <Column style={{ borderTopLeftRadius: 100, backgroundColor: bg, width: num, height: num, }} />
            </Row>
        </Column>
    )
}