export const servicos = [
    {
        id: 1,
        name: 'Banho',
        data_compra: '12/06/2024 às 14:23',
        previsao_agendamento: '14/06/2024',
        payment: {
            type: 'Crédito',
            vezes: 1,
        },
        pets: [
            {
                name: 'Aufredo',
                id: 1,
                img: '',
            }, {
                name: 'Pitoco',
                img: '',
                id: 2,
            }
        ],
        value: 'R$ 150,00', 
        value_total: 'R$ 300,00', // 2 items: R$150,00
        status: 'Processando', //['Processando', 'Concluído', 'Cancelado', 'Reembolso]
        item: 2, // 2 items: R$150,00, um para cada pet
        id_service: 'banho',
    },
    {
        id: 2,
        name: 'Tosa',
        data_compra: '12/06/2024 às 15:23',
        previsao_agendamento: '14/06/2024',
        payment: {
            type: 'Pix',
            vezes: 1,
        },
        pets: [
            {
                name: 'Aufredo',
                id: 1,
                img: '',
            },
        ],
        value: 'R$ 100,00', 
        value_total: 'R$ 100,00', // 1 item: R$100,00
        status: 'Concluído', //['Processando', 'Concluído', 'Cancelado', 'Reembolso]
        item: 1, // 1 items: R$100,00,
        id_service: 'tosa',
    },
]