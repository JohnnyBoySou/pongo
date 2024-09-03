import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Loader, useTheme, } from '@theme/global';

import TabBar from '@components/TabBar';
import CardEscola from './cardEscola';

import { singleService } from '@api/request/services';
import CardGrooming from './cardGrooming';
import CardVet from './cardVet';
import CardHotel from './cardHotel';

export default function ServiceSingleScreen({ navigation, route }) {
    const { color, font, margin } = useTheme();
    const id = route.params.id
    const service = route.params.service


    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            try {
                const res = await singleService(id, service?.type)
                setdata(res)
            } catch (error) {
                console.log(error)
            }
            setloading(false)
        }
        fetchData()
    }, [])

    const Card = () => {
        switch (service?.name) {
            case 'Escola':
                return <CardEscola item={data} navigation={navigation} service={service} />
                break;
            case 'Grooming':
                return <CardGrooming item={data} navigation={navigation} service={service} />
                break;
            case 'Veterinario':
                return <CardVet item={data} navigation={navigation} service={service} />
                break;
            case 'Hotel':
                return <CardHotel item={data} navigation={navigation} service={service} />
                break;
            default:
                return <Column />
                break;
        }
    }

    return (
        <Main style={{ backgroundColor: '#ECEBEB', paddingTop: 0, }}>
            <Scroll>
                {loading ? <Column mv={150}><Loader size={32} /></Column> : data ? <Card /> : null}
            </Scroll>
            <TabBar />
        </Main >
    )
}

