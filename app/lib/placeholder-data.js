// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442b',
    name: 'Jefferson Lim',
    email: 'jefflim.dev@gmail.com',
    password: '123456',
  },
];

const workers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/workers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/workers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/workers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/workers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/workers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/workers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/workers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/workers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/workers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/workers/balazs-orban.png',
  },
];

const gigs = [
  {
    worker_id: workers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
    user_id: users[0].id,
    title: 'title 1',
    details: 'details',
    end_date: '2024-10-4',
    worker_name: 'Bob'
  },
  {
    worker_id: workers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
    user_id: users[0].id,
    title: 'title 2',
    details: 'details',
    end_date: '2024-10-5',
    worker_name: 'Ann'
  },
  {
    worker_id: workers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
    user_id: users[0].id,
    title: 'title 3',
    details: 'details',
    end_date: '2024-10-6',
    worker_name: 'Sue'
  },
  {
    worker_id: workers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
    user_id: users[0].id,
    title: 'title 4',
    details: 'details',
    end_date: '2024-10-7',
    worker_name: 'Juorge'
  },
  {
    worker_id: workers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
    user_id: users[0].id,
    title: 'title 4',
    details: 'details',
    end_date: '2024-10-10',
    worker_name: 'George'
  },
  {
    worker_id: workers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
    user_id: users[0].id,
    title: 'title 5',
    details: 'details',
    end_date: '2024-10-8',
    worker_name: 'Jazz'
  },
  {
    worker_id: workers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
    user_id: users[0].id,
    title: 'title 6',
    details: 'details',
    end_date: '2024-10-11',
    worker_name: 'Jasmine'
  },
  {
    worker_id: workers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
    user_id: users[1].id,
    title: 'title 1',
    details: 'details',
    end_date: '2024-10-4',
    worker_name: 'Fred'
  },
  {
    worker_id: workers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
    user_id: users[1].id,
    title: 'title 2',
    details: 'details',
    end_date: '2024-10-5',
    worker_name: 'Frank'
  },
  {
    worker_id: workers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
    user_id: users[1].id,
    title: 'title 3',
    details: 'details',
    end_date: '2024-10-6',
    worker_name: 'Will'
  },
  {
    worker_id: workers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
    user_id: users[1].id,
    title: 'title 4',
    details: 'details',
    end_date: '2024-10-7',
    worker_name: 'Maddie'
  },
  {
    worker_id: workers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
    user_id: users[1].id,
    title: 'title 5',
    details: 'details',
    end_date: '2024-10-7',
    worker_name: 'Susan'
  },
  {
    worker_id: workers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
    user_id: users[1].id,
    title: 'title 6',
    details: 'details',
    end_date: '2024-10-8',
    worker_name: 'Pablo'
  }
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  workers,
  gigs,
  revenue,
};
