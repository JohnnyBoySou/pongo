import React, { useState, useEffect } from 'react';
import { Main, Scroll, Column, Loader, useTheme, } from '@theme/global';

import TabBar from '@components/TabBar';
import { singleService } from '@api/request/services';
import CardProduct from './cardProduct';

export default function ProductSingleScreen({ navigation, route }) {
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

    return (
        <Main style={{ backgroundColor: '#ECEBEB', paddingTop: 0, }}>
            <Scroll>
                {loading ? <Column mv={150}><Loader size={32} /></Column> : data ? <CardProduct item={data} navigation={navigation} service={service} /> : null}
            </Scroll>
            <TabBar />
        </Main >
    )
}

