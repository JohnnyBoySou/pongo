export const servicesData = [
    
    {
        name: 'Grooming',
        label: 'Tempo de duração',
        id: 2,
        img: require('@imgs/grooming.png'),
        screen: 'dadosgroomings',
        type: 'grooming',
        itens: [
            {
                name: 'Banho M',
                id: 80,
            },
            {
                name: 'Banho P',
                id: 79,
            }
        ]
    },
    {
        name: 'Escola',
        label: 'Tempo de duração',
        id: 3,
        img:  require('@imgs/escola.png'),
        screen: 'dadosescolapacotes',
        type: 'escola_pacote'
    },
    {
        name: 'Veterinario',
        label: 'Tempo de duração',
        id: 3,
        img:  require('@imgs/vet.png'),
        screen: 'dadosvet',
        type: 'vet',
        itens: [ 
        ]
    },
    {
        name: 'Hotel',
        label: 'Tempo de duração',
        id: 3,
        img:  require('@imgs/hotel.png'),
        screen: 'dadospethospitalities ',
        type: 'hospitalitie'
    },

]

//['dadosgroomings', 'dadoscreche', 'dadosescolapacotes', 'dadospethospitalities', 'dadosvet']



/*
{
        name: 'Creche',
        time: 'Tempo de duração',
        id: 2,
        img: require('@imgs/btn-solicitar-visita.png'),
        screen: 'dadoscreche',
        type: 'creche'
    },
{
"criado_em": "2024-08-12 09:55:09", 
"entrada": "2024-08-16 15:30:00", 
"id": 9, "id_pet_pet": 39, 
"id_service": 80, 
"item": 1, 
"name": "Banho M", 
"payment": {"type": "", "vezes": 1}, 
"pet": {"id": 39, "img": "https://app.aocto.com//admin/imagens/pets/pets/1722341440_Imagem_do_.jpg", "name": "Thomas"}, 
"status": null, 
"value": 105, 
"value_total": 105}
*/