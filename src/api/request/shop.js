import axios from 'axios';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

const getHeaders = async () => {
    const token = await getToken();
    return {
        Authorization: `Bearer ${token}`,
    };
};

const handleError = (error) => {
    const err = JSON.parse(error.request.response);
    throw new Error(err.message);
};
const apiRequest = async (url, method = 'get', data = null) => {
    const BASE_URL = await getBaseURL();
    const config = {
        method,
        url: `${BASE_URL}${url}`,
        headers: await getHeaders(),
    };
    if (data) {
        config.data = data;
    }
    try {
        const res = await axios(config);
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const listProducts = (page = 1, filter) => {
    return data;
   // return apiRequest(`/products?page=${page}`);
};

export const singleProduct = (id, tipo) => {
    return single.find((item) => item.id === id);
   // return apiRequest(`/servico-single/${id}/${tipo}`);
};

export const listProductsCategory = (id) => {
    const data = single.filter((item) =>
        item.categories.some((category) => category.id === id)
    );
    return data;
    //return single.filter((item) => item.categories.id === id);
}

const data = [
    {
        id: 1,
        img: 'https://pongo.com.br/cdn/shop/files/WhatsAppImage2023-09-15at11.21.55_483ef734-aa3c-49b8-b693-552f493285a1.jpg?v=1694788420',
        name: 'JOGO AMERICANO LINHO OFF WHITE',
        price: 'R$ 130,00',
        old_price: 'R$ 170,00',
        descont_percent: '25%',
        categories: {
            name: 'JOGO AMERICANO',
            id: 1,
        }
    },
    {
        id: 2,
        img: 'https://pongo.com.br/cdn/shop/files/LinhaSteelSite31.jpg?v=1708305942',
        name: 'CAMA GOLDEN',
        price: 'R$ 1.870,00',
        old_price: null,
        descont_percent: null,
        categories: [
            {
                name: 'CAMA',
                id: 1,
            },
        ]
    },
    {
        id: 3,
        img: 'https://pongo.com.br/cdn/shop/files/AND02233copy.jpg?v=1706578311',
        name: 'CAMA RET WOOD',
        price: 'R$ 1.625,00',
        old_price: null,
        descont_percent: null,
        categories: [
            {
                name: 'CAMA',
                id: 1,
            },
        ]
    },
    {
        id: 4,
        img: 'https://pongo.com.br/cdn/shop/files/AND02366copy.jpg?v=1708125038',
        name: 'CESTO BRINQUEDO NATURAL',
        price: 'R$ 675,00',
        old_price: null,
        descont_percent: null,
        categories: [
            {
                name: 'BRINQUEDO',
                id: 7,
            },
        ]
    },
]

const single = [
    {
        id: 1,
        img: 'https://pongo.com.br/cdn/shop/files/WhatsAppImage2023-09-15at11.21.55_483ef734-aa3c-49b8-b693-552f493285a1.jpg?v=1694788420',
        imgs: ['https://pongo.com.br/cdn/shop/files/WhatsAppImage2023-09-15at11.21.55_483ef734-aa3c-49b8-b693-552f493285a1.jpg?v=1694788420','https://pongo.com.br/cdn/shop/files/AND02114copy_e768428b-04ac-4b31-bae6-24a7bd55a692.jpg?v=1694789725','https://pongo.com.br/cdn/shop/files/WhatsAppImage2023-09-15at11.21.34_eac216c3-cf58-48ac-9e2c-5b70a8691faf.jpg?v=1694789725'],
        name: 'JOGO AMERICANO LINHO OFF WHITE',
        price: 'R$ 130,00',
        old_price: 'R$ 170,00',
        descont_percent: '25%',
        desc: 'Higiene e praticidade para o seu dia a dia! Para apoiar os comedouros do seu mascote, o Jogo Americano é feito em linho, forrado por plástico PVC evitando que fique sujo e molhado. * Produto feito artesanalmente podendo haver pequenas variações de medidas.',
        colors: ['#000', '#fff', '#f00'],
        size: ['P', 'M', 'G'],
        categories: [
            {
                name: 'CAMA',
                id: 1,
            },
            {
                name: 'CÃO',
                id: 2,
            },
            {
                name: 'GATO',
                id: 3,
            },
            {
                name: 'LINHA STEEL',
                id: 4,
            },
        ]
    },
    {
        id: 2,
        img: 'https://pongo.com.br/cdn/shop/files/LinhaSteelSite31.jpg?v=1708305942',
        imgs: ['https://pongo.com.br/cdn/shop/files/LinhaSteelSite31.jpg?v=1708305942','https://pongo.com.br/cdn/shop/files/LinhaSteelSite30.jpg?v=1708305942', 'https://pongo.com.br/cdn/shop/files/LinhaSteelSite29.jpg?v=1708305673'],
        name: 'CAMA GOLDEN',
        price: 'R$ 1.870,00',
        old_price: '',
        descont_percent: '',
        desc: 'A cama do seu mascote agora fará parte da decoração da sua casa! A Cama Golden é feita a mão, de serralheria dourada e almofada com capa em tecido Tweed com tramas de fios dourados e prateados. • Produto feito artesanalmente podendo haver pequenas variações de medidas.  MEDIDA EXTERNA U • 70cm Largura 1 50crn Profundidade 22cm Altura  MEDIDA INTERNA U - 68cm Largura 49cm Profundidade I Scm Altura  (Ideal para pet de pequeno porte) TIPO DE MATERIAL  Externo - Estrutura Ferro Trefilado I Pintura Eletrostática Dourada Fosca  Externo - Colchão Capa Tecido Tweed Off White com detalhes em prata e dourado  Composição: Poliester Algodão  Interno - Enchimento Tecido 100% Impermeável  Composição: 100% PVC',
        colors: null,
        size: null,
        categories: [
            {
                name: 'CAMA',
                id: 1,
            },
            {
                name: 'CÃO',
                id: 2,
            },
            {
                name: 'GATO',
                id: 3,
            },
            {
                name: 'LINHA STEEL',
                id: 4,
            },
        ]
    },
    {
        id: 3,
        img: 'https://pongo.com.br/cdn/shop/files/AND02233copy.jpg?v=1706578311',
        imgs: ['https://pongo.com.br/cdn/shop/files/AND02233copy.jpg?v=1706578311','https://pongo.com.br/cdn/shop/files/AND02231copy.jpg?v=1706578311', 'https://pongo.com.br/cdn/shop/files/AND02233copy.jpg?v=1706578311'],
        name: 'CAMA RET WOOD',
        price: 'R$ 1.625,00',
        old_price: null,
        descont_percent: null,
        desc: 'A cama do seu mascote, na decoração da sua casa! Feita em madeira de reflorestamento e com produção ecologicamente correta, a Cama Ret Wood tem palhinha de fibra de papel e almofada com capa em tecido Linho Off White. O colchão é revestido por tecido 100% impermeável, impossibilitando fungos e mal odor na espuma! • Produto feito artesanalmente podendo haver pequenas variações de medidas. MEDIDA EXTERNA P - 60cm Largura 1 40cm Profundidade 1 25.5cm Altura MEDIDA INTERNA P - 5Scm Largura 1 3Scm Profundidade 1 20cm Altura (Ideal para pet de pequeno porte e minis) (Para outras medidas, por gentileza entrar em contato 11.97666.9249) TIPO DE MATERIAL Externo - Estrutura Madeira Caxeta I Palha Fibra de Papel Externo - Colchão Capa Tecido Linho Off White Composição: 100% Poliéster Interno - Enchimento Tecido 100% Impermeável Composição: 100% PVC',
        colors: null,
        size: null,
        categories: [
            {
                name: 'CAMA',
                id: 1,
            },
            {
                name: 'CÃO',
                id: 2,
            },
            {
                name: 'GATO',
                id: 3,
            },
            {
                name: 'LINHA WOOD',
                id: 4,
            },
        ]
    },
    {
        id: 4,
        img: 'https://pongo.com.br/cdn/shop/files/AND02366copy.jpg?v=1708125038',
        imgs: ['https://pongo.com.br/cdn/shop/files/AND02366copy.jpg?v=1708125038', 'https://pongo.com.br/cdn/shop/files/AND02362copy.jpg?v=1708125016', 'https://pongo.com.br/cdn/shop/files/AND02379copy.jpg?v=1708125016'],
        name: 'CESTO BRINQUEDO NATURAL',
        price: 'R$ 675,00',
        old_price: null,
        descont_percent: null,
        desc: 'Chega de bagunça! O Cesto de Brinquedo Natural, é feito em Rattan Natural, com duas aberturas na parte de cima! Ideal para guardar brinquedos e manter a casa organizada com estilo! MEDIDAS - 33crn Largura 2()cm Profundidade 1 18cm Altura TIPO DE MATERIAL estrutura Rattan Natural',
        colors: null,
        size: null,
        categories: [
            {
                name: 'BRINQUEDO',
                id: 7,
            },
            {
                name: 'CÃO',
                id: 2,
            },
            {
                name: 'GATO',
                id: 3,
            },
            {
                name: 'NATURAL',
                id: 8,
            },
        ]
    },
]