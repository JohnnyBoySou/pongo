export const single_service = {
    id: 1,
    name: 'Banho',
    data_compra: '12/06/2024 às 14:23',
    previsao_agendamento: '14/06/2024',
    horario_agendamento: '14:30',
    previsao_conclusao: '15:30',
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
    value_total: 'R$ 300,00',
    status: 'Conclúido', 
    item: 2,
    id_service: 'banho',
    tutor: {
        name: 'Maria',
        endereco: 'Rua dos bobos, 0',
    },
    processo: [
        {
            date: '14/06/2024 15:30',
            label: 'Serviço concluído.'
        },
        {
            date: '14/06/2024 14:23',
            label: 'Serviço em processo.'
        },
        {
            date: '12/06/2024 14:30',
            label: 'Pagamento aprovado, serviço agendado'
        },
        {
            date: '12/06/2024 14:23',
            label: 'Pedido criado, aguardando pagamento.'
        },
    ]
}