import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Label, Title, Row, Button, useTheme, ButtonPrimary, LabelBT } from '@theme/global';
import TopMenu from '@components/Header/topmenu';
import { ShoppingBag, Store, Check, } from 'lucide-react-native';
import StepIndicator from 'react-native-step-indicator';
import { MaterialIcons } from '@expo/vector-icons';
import Input from '@components/Forms/input';
import { listUser, } from '@api/request/auth';
import PaymentCredito from './../school/credito';
import PaymentCreditoShop from '../../components/Payments/credito_raw';
import PaymentPix from '../../components/Payments/pix_raw';

export default function ShopPaymentScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const data = route?.params?.data;
    const [currentPage, setcurrentPage] = useState(1);

    const [entrega, setentrega] = useState(null);
    const [metodo, setmetodo] = useState(null);
    const [retirada, setretirada] = useState();


    const itm = {
        local: retirada,
        product: data,
        payment: metodo,
        delivery: entrega,
    }
    return (
        <Main>
            <Scroll>
                <TopMenu search={false} />
                <Column mv={12}>
                    <StepIndicator
                        stepCount={3}
                        customStyles={firstIndicatorStyles}
                        currentPosition={currentPage - 1}
                        onPress={(position) => { if (currentPage > position) { setcurrentPage(position + 1) } }}
                        labels={['Entrega', 'Pagamento', 'Finalização']}
                        renderStepIndicator={({ position, stepStatus, }) =>
                            <Column style={{ alignItems: 'center', backgroundColor: stepStatus === 'finished' ? color.sc.sc1 : stepStatus == 'current' ? color.sc.sc3 : stepStatus === 'unfinished' ? '#cddff7' : null, width: 56, height: 56, justifyContent: 'center', alignItems: 'center', borderRadius: 100, }}>
                                {stepStatus === 'finished' ? <Check size={18} color="#fff" /> : <Label style={{ lineHeight: 18, fontFamily: font.bold, color: stepStatus === 'current' ? "#fff" : color.sc.sc1, }} >{position + 1}</Label>}
                            </Column>
                        }
                        renderLabel={({ position, stepStatus, label }) => <Label style={{ fontSize: 12, fontFamily: font.medium, color: stepStatus === 'current' ? color.sc.sc3 : stepStatus === 'finished' ? color.sc.sc1 : color.label, }}>{label}</Label>}
                    />

                    <Column style={{ height: 20 }} />


                    {currentPage === 1 && <Column>
                        <Title align='center'>{entrega === null ? 'Como deseja receber seu pedido?' : entrega === 'Retirar' ? 'Escolha um local para retirar' : entrega === 'Receber' ? 'Esse é o seu endereço atual?' : null}</Title>
                        {entrega === null &&
                            <Row mv={20}>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                                    <Button onPress={() => { setentrega('Retirar') }} radius={1} pv={1} ph={1} style={{ backgroundColor: '#fff', marginBottom: 8, justifyContent: 'center', alignItems: 'center', width: 72, height: 72, }}>
                                        <Column>
                                            <Store size={32} color="#CDD0CF" />
                                        </Column>
                                    </Button>
                                    <Label>Retirar em loja física</Label>
                                </Column>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                                    <Button onPress={() => { setentrega('Receber') }} radius={1} pv={1} ph={1} style={{ backgroundColor: '#fff', marginBottom: 8, justifyContent: 'center', alignItems: 'center', width: 72, height: 72, }}>
                                        <Column>
                                            <ShoppingBag size={32} color="#CDD0CF" />
                                        </Column>
                                    </Button>
                                    <Label>Receber a entrega</Label>
                                </Column>
                            </Row>}

                        {entrega === 'Retirar' &&
                            <Column mv={20} mh={margin.h}>
                                {lojas?.map((loja, index) =>
                                    <Button mv={12} key={index} style={{ backgroundColor: retirada?.id == loja?.id ? color.sc.sc3 : '#fff', }} onPress={() => { setretirada(loja) }} radius={1}>
                                        <Column mv={margin.v} style={{ rowGap: 8, }}>
                                            <Label style={{ lineHeight: 18, color: retirada?.id == loja?.id ? '#fff' : color.label }}>{loja?.loja}</Label>
                                            <Label style={{ lineHeight: 18, color: retirada?.id == loja?.id ? '#fff' : color.label }}>{loja?.endereco}</Label>
                                            <Label style={{ lineHeight: 18, color: retirada?.id == loja?.id ? '#fff' : color.label }}>{loja?.horariosSemana}</Label>
                                            <Label style={{ lineHeight: 18, color: retirada?.id == loja?.id ? '#fff' : color.label }}>{loja?.horariosFeriado}</Label>
                                        </Column>
                                    </Button>
                                )}
                                <Button onPress={() => { setcurrentPage(2); }} radius={1} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: color.sc.sc3, marginVertical: 12, }}>
                                    <LabelBT color='#fff'>Próximo</LabelBT>
                                </Button>
                            </Column>
                        }

                        {entrega === 'Receber' &&
                            <Column mv={20} mh={margin.h}>
                                <Endereco />
                                <Button onPress={() => { setcurrentPage(2); setmetodo(null)}} radius={1} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: color.sc.sc3, marginVertical: 12, }}>
                                    <LabelBT color='#fff'>Próximo</LabelBT>
                                </Button>
                            </Column>
                        }
                    </Column>}


                    {currentPage === 2 && <Column>
                        <Title align='center'>{metodo === null ? 'Como deseja realizar o pagamento?' : metodo === 'Cartão' ? 'Preencha os dados do seu cartão' : metodo === 'Pix' ? 'Realize o pagamento' : null}</Title>
                        {metodo === null &&
                            <Row mv={20}>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                                    <Button radius={1} onPress={() => { setmetodo('Cartão') }}  pv={1} ph={1} style={{ backgroundColor: '#fff', marginBottom: 8, justifyContent: 'center', alignItems: 'center', width: 72, height: 72, }}>
                                        <Column>
                                            <MaterialIcons name="credit-card" size={32} color="#CDD0CF" />
                                        </Column>
                                    </Button>
                                    <Label>Cartão de crédito</Label>
                                </Column>
                                <Column style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1, }}>
                                    <Button radius={1} onPress={() => { setmetodo('Pix') }}   pv={1} ph={1} style={{ backgroundColor: '#fff', marginBottom: 8, justifyContent: 'center', alignItems: 'center', width: 72, height: 72, }}>
                                        <Column>
                                            <MaterialIcons name="pix" size={32} color="#CDD0CF" />
                                        </Column>
                                    </Button>
                                    <Label>PIX</Label>
                                </Column>
                            </Row>
                        }
                        {metodo === 'Cartão' &&
                            <Column mh={margin.h}>
                                <PaymentCreditoShop item={itm} />
                            </Column>
                        }
                        {metodo === 'Pix' &&
                            <Column mh={margin.h}>
                                <PaymentPix item={itm} />
                            </Column>}

                    </Column>}
                </Column>
            </Scroll>
        </Main>
    )
}

const Endereco = ({ }) => {
    const [bairro, setbairro] = useState('....');
    const [cidade, setcidade] = useState('.....');
    const [cep, setcep] = useState('.....-...');
    const [complemento, setcomplemento] = useState('.....');
    const [rua, setrua] = useState('...');
    const [estado, setestado] = useState('..');

    useEffect(() => {
        const fecthData = async () => {
            try {
                const res = await listUser();
                setestado(res.estado);
                setrua(res.rua);
                setcep(res.cep);
                setbairro(res.bairro);
                setcidade(res.cidade);
                setcomplemento(res.complemento);
            } catch (error) {
                console.log(error)
            }
        }
        fecthData();
    }, []);

    return (
        <Column>
            <Input
                label="Estado *"
                placeholder="Estado"
                value={estado}
                setValue={setestado}
            />
            <Column style={{ height: 16, }} />
            <Input
                label="Cidade *"
                placeholder="Cidade"
                value={cidade}
                setValue={setcidade}
            />
            <Column style={{ height: 16, }} />
            <Input
                label="Bairro *"
                placeholder="Bairro"
                value={bairro}
                setValue={setbairro}
            />
            <Column style={{ height: 16, }} />
            <Input
                label="Rua *"
                placeholder="Rua"
                value={rua}
                setValue={setrua}
            />
            <Column style={{ height: 16, }} />
            <Input
                label="Complemento *"
                placeholder="Complemento"
                value={complemento}
                setValue={setcomplemento}
            />
            <Column style={{ height: 16, }} />
            <Input
                label="CEP *"
                placeholder="Código postal"
                value={cep}
                setValue={setcep}
                mask="CEP"
            />

        </Column>
    )
}


const lojas = [
    {
        id: 2,
        local: "Vila Nova Conceição",
        loja: "Villa PONGO",
        endereco: "Av. Antônio Joaquim de Moura Andrade, 80 - Vila Nova Conceição, São Paulo - SP, 04507-000",
        horariosSemana: "Segunda a Sábado das 09h às 20:00h",
        horariosFeriado: "Domingos e Feriados Fechado",
        lat: "-23.5870897",
        long: "-46.6649326,20z",
    },
];

//MODIFICAR CORES VERDE DA PONGO, TEXTO MESMA COR PARA TODOS

const firstIndicatorStyles = {
    stepIndicatorSize: 30,
    stepStrokeWidth: 0,
    currentStepIndicatorSize: 30,
    currentStepStrokeWidth: 0,

    separatorStrokeWidth: 3,

    separatorFinishedColor: '#778428',
    separatorUnFinishedColor: '#c3cfe3',
};