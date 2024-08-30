import React from 'react';
import { Image, Text } from 'react-native';
import { Main, Scroll, Column, Label, Row, useTheme, Title } from '@theme/global';

import Header from '@components/Header';
import TopMenu from '@components/Header/topmenu';

import { BadgeCheck, GraduationCap } from 'lucide-react-native';

import TabBar from '@components/TabBar';




export default function VeterinarioScreen() {

    const { color, font, margin } = useTheme();



    return (
        <Main style={{ backgroundColor: '#FFFFFF' }}>
            <Scroll>
                <TopMenu search={false} back={false} />

                <Header title="VET VILLA PONGO" />

                <Column mv={margin.v} style={{ marginLeft: margin.h }}>
                    <Image source={require('@imgs/vet1.png')} style={{ width: '100%', height: 180, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} />
                </Column>

                <Column mh={margin.h}>

                    <Title style={{ textAlign: 'center', color: '#918C8B', fontSize: 18, paddingVertical: 6, fontWeight: 700, lineHeight: 22 }}>VET VILLA PONGO </Title>

                    { /* <Button style={{ width: '100%', backgroundColor: color.pr.pr2, marginTop: 12 }}>
                        <Label style={{ textAlign: 'center', color: color.title }}>Contratar Day Use</Label>
                    </Button> */ }
                </Column>

                <Column mh={margin.h} mv={margin.v}>



                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Ter um Pet, a posse responsável dele, inclui o acompanhamento de médico veterinário para atender tanto uma emergência quanto a rotina clínica dos animais.</Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Alem disso, o médico veterinário é muito importante para a saúde pública, pois estabelece a profilaxia das doenças de animais transmissiveis ao homem. </Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Nossos profissionais tem a responsabilidade de orientar e explicar o cotidiano e a rotina de cada animal cuidando adequadamente suas necessidades individuais e particularidades, de com acordo com idade e espécie. </Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Faz parte do protocolo dos nossos veterinários, todos os exames preventivos de rotina, vacinações, vermifugaçoes e cuidado com o controle de ectoparasitas (carrapatos e pulgas). </Label>
                    <Label style={{ fontSize: 14, marginBottom: 8 }}>Entendemos que a medicina veterinária é a melhor fonte de informação sobre a saúde do seu animal de estimação, portanto, o hábito de trazer seu Pet para visitas regulares com nossos veterinários não só garante a saúde dele como também a saúde de sua família. </Label>

                    <Title style={{ textAlign: 'center', color: '#918C8B', fontSize: 18, paddingVertical: 18, fontWeight: 700, lineHeight: 22 }}>NOSSOS PROFISSIONAIS</Title>

                    <Label style={{ fontSize: 16, marginBottom: 4, fontWeight: 700, color: color.sc.sc3 }}>Danielle L. Urenha </Label>
                    <Label style={{ fontSize: 14, marginBottom: 4, }}>Médica Veterinária</Label>
                    <Label style={{ fontSize: 14, marginBottom: 4, }}>CMRV-SP 39.808 </Label>

                    <Row style={{ paddingVertical: 8 }}>
                        <GraduationCap size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Bacharel em Medicina Veterinaria  </Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <GraduationCap size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Pós graduada em Anestesiologia   </Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <GraduationCap size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Pós graduada em Nutrição   </Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <GraduationCap size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Pós graduanda em Cirurgia e de Tecidos Moles</Label>
                    </Row>

                    <Column style={{ width: '100%', backgroundColor: color.sc.sc3, height: 1, marginVertical: 12 }} />

                    <Label style={{ fontSize: 16, marginBottom: 4, fontWeight: 700, color: color.sc.sc3 }}>Marianna Nogara  </Label>
                    <Label style={{ fontSize: 14, marginBottom: 4, }}>Médica Veterinária</Label>
                    <Label style={{ fontSize: 14, marginBottom: 4 }}>CMRV-SP 51.904 </Label>

                    <Row style={{ paddingVertical: 8 }}>
                        <GraduationCap size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Pós graduada em Fisioterapia e Reabilitação   </Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <GraduationCap size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Certificada para realização de Ozonioterapia </Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <GraduationCap size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Certificada para realização de Viscum Album - Homeopatia </Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <GraduationCap size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Certificada para realização de Kinesio Taping</Label>
                    </Row>

                </Column>

                <Column mv={margin.v} style={{ marginRight: margin.h }}>
                    <Image source={require('@imgs/vet2.png')} style={{ width: '100%', height: 180, borderTopRightRadius: 20, borderBottomRightRadius: 20 }} />
                </Column>

                <Column mh={margin.h} mv={margin.v}>
                    <Title style={{ textAlign: 'center', color: '#918C8B', fontSize: 18, paddingVertical: 16, fontWeight: 700, lineHeight: 22 }}>Na VILLA PONGO você encontrará:</Title>

                    <Row style={{ paddingVertical: 8 }}>

                        <BadgeCheck size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>
                            Atendimento Clinico Veterinário  </Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <BadgeCheck size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Atendimento Nutricional </Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <BadgeCheck size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Reabilitação</Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <BadgeCheck size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Fisioterapia</Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <BadgeCheck size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Ozônio Terapia</Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <BadgeCheck size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Homeopatia</Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <BadgeCheck size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Aplicação de Vacinas</Label>
                    </Row>

                    <Row style={{ paddingVertical: 8 }}>
                        <BadgeCheck size={14} color={color.sc.sc1} />
                        <Label style={{ fontSize: 14, marginLeft: 8 }}>Exames Laboratoriais </Label>
                    </Row>
                </Column>



                <Column style={{ height: 80 }} />

                { /* <Column mh={margin.h} mv={margin.v}>
                    <Button style={{ width: '100%', backgroundColor: color.pr.pr2 }}>
                        <Text style={{ textAlign: 'center', color: color.title }}>Contratar Day Use</Text>
                    </Button>
                </Column> */ }




            </Scroll>
            <TabBar />
        </Main>
    );
}