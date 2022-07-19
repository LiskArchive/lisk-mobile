export const BLOCKCHAIN_APPLICATIONS_MOCK = [
	{
		name: 'Lisk',
		chainID: 'aq02qkbb35u4jdq8szo3pnsq',
		state: 'active',
		serviceURLs: ['https://service.lisk.com'],
		lastUpdated: 123456789,
		isDefault: true,
	},
	{
		name: 'Colecti',
		chainID: 'mi34vyyd12g2lkf0rza1irws',
		state: 'active',
		serviceURLs: ['https://service.colecti.com'],
		lastUpdated: 123789456,
		isDefault: false,
	},
	{
		name: 'Enevti',
		chainID: 'aq86llsb35u4syc8aet7xenf',
		state: 'active',
		serviceURLs: ['https://service.enevti.com'],
		lastUpdated: 456123789,
		isDefault: false,
	},
	{
		name: 'DoEdu',
		chainID: 'aq96eeqk77r4syc8aet9fcey',
		state: 'active',
		serviceURLs: ['https://service.doedu.com'],
		lastUpdated: 789123456,
		isDefault: false,
	},
	{
		name: 'Kalipo',
		chainID: 'aq25derd17a4syc8aet3pryt',
		state: 'active',
		serviceURLs: ['https://service.kalipo.com'],
		lastUpdated: 789456123,
		isDefault: false,
	},
	{
		name: 'Lisk DEX',
		chainID: 'dz38fkbb35u4jdq8szo3pnsq',
		state: 'active',
		serviceURLs: ['https://service.liskdex.com'],
		lastUpdated: 123456789,
		isDefault: false,
	},
];

export const MAPPED_BLOCKCHAIN_APPLICATIONS_MOCK = BLOCKCHAIN_APPLICATIONS_MOCK.reduce(
	(obj, val) => {
		obj[val.chainID] = val;
		return obj;
	},
	{},
);
