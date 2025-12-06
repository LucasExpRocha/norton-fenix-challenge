const MOCK_NORTUS_V1_DASHBOARD: Nortus.Dashboard = {
  kpisTrend: {
    labels: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    arpuTrend: {
      name: 'ARPU',
      data: [
        120000, 135000, 160000, 190000, 150000, 110000, 130000, 160000, 210000,
        250000, 300000, 340000,
      ],
    },
    conversionTrend: {
      name: 'conversão',
      data: [50, 55, 53, 58, 56, 54, 60, 59, 63, 62, 67, 70],
    },
    churnTrend: {
      name: 'churn',
      data: [5, 4.8, 5.2, 4.5, 4.7, 4.4, 4.2, 4.3, 4, 4.1, 3.9, 3.8],
    },
    retentionTrend: {
      name: 'retenção',
      data: [70, 72, 69, 75, 73, 71, 78, 76, 82, 80, 85, 88],
    },
  },
  kpisResume: {
    arpu: {
      valor: 320.5,
      variacao: 12,
    },
    conversion: {
      valor: 68.5,
      variacao: 8.2,
    },
    retention: {
      valor: 85,
      variacao: 2.5,
    },
    churn: {
      valor: 3.2,
      variacao: -1.5,
    },
  },
  segments: [
    {
      nome: 'Automóvel',
      valor: 30,
    },
    {
      nome: 'Residencial',
      valor: 25,
    },
    {
      nome: 'Viagem',
      valor: 15,
    },
    {
      nome: 'Combo resi + auto',
      valor: 20,
    },
    {
      nome: 'Profissional',
      valor: 10,
    },
  ],
  activeClients: {
    filters: {
      status: ['Todos', 'Ativo', 'Pendente', 'Inativo'],
      secureType: [
        'Todos',
        'Seguro automóvel',
        'Seguro residencial',
        'Seguro viagem',
        'Combo automóvel e residencial',
        'Seguro empresarial',
        'Seguro roubo e furto',
      ],
      locations: [
        'Todos',
        'São Paulo',
        'Rio de Janeiro',
        'Brasília',
        'Pernambuco',
        'Mato Grosso',
        'Paraíba',
      ],
    },
    data: [
      {
        id: 'C001',
        name: 'Ricardo Leite',
        email: 'ricardo@email.com',
        secureType: 'Seguro automóvel',
        monthValue: 185.9,
        status: 'Ativo',
        renewalDate: '14/12/2024',
        location: 'São Paulo',
      },
      {
        id: 'C002',
        name: 'Maria Silva',
        email: 'mariasilva@email.com',
        secureType: 'Seguro residencial',
        monthValue: 89.9,
        status: 'Ativo',
        renewalDate: '14/12/2024',
        location: 'Rio de Janeiro',
      },
      {
        id: 'C003',
        name: 'João Costa',
        email: 'costajoao@email.com',
        secureType: 'Seguro viagem',
        monthValue: 230,
        status: 'Pendente',
        renewalDate: '14/12/2024',
        location: 'Brasília',
      },
      {
        id: 'C004',
        name: 'Residencial Premium',
        email: 'rpremium@email.com',
        secureType: 'Seguro residencial',
        monthValue: 89.9,
        status: 'Ativo',
        renewalDate: '14/12/2024',
        location: 'Pernambuco',
      },
      {
        id: 'C005',
        name: 'Vida Empresarial',
        email: 'vidaempresarial@email.com',
        secureType: 'Seguro viagem',
        monthValue: 230,
        status: 'Ativo',
        renewalDate: '14/12/2024',
        location: 'Mato Grosso',
      },
      {
        id: 'C006',
        name: 'Familia Total',
        email: 'familiatotal@email.com',
        secureType: 'Combo automóvel e residencial',
        monthValue: 260,
        status: 'Ativo',
        renewalDate: '14/12/2024',
        location: 'Paraíba',
      },
    ],
  },
};

export default MOCK_NORTUS_V1_DASHBOARD;
