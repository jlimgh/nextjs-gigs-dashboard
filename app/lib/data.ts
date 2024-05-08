import { sql } from '@vercel/postgres';
import {
  WorkerField,
  WorkersTableType,
  GigForm,
  GigsTable,
  LatestGigRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';

/* DASHBOARD */

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  const session = await auth();
  const user_id = session?.token.sub;
  noStore();
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestGigs() {
  const session = await auth();
  const user_id = session?.token.sub;
  noStore();
  try {
    const data = await sql<LatestGigRaw>`
      SELECT gigs.id, gigs.amount, gigs.title, gigs.worker_name, gigs.date, gigs.end_date, gigs.status
      FROM gigs
      JOIN users ON gigs.user_id = users.id
      WHERE gigs.user_id = ${user_id}
      ORDER BY gigs.date DESC
      LIMIT 5`;

    const latestGigs = data.rows.map((gig) => ({
      ...gig,
      amount: formatCurrency(gig.amount),
    }));
    console.log('latest gigs: ', latestGigs);
    return latestGigs;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest gigs.');
  }
}

export async function fetchCardData() {
  const session = await auth();
  const user_id = session?.token.sub;

  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const gigCountPromise = sql`SELECT COUNT(*) FROM gigs`;
    const workerCountPromise = sql`SELECT COUNT(*) FROM workers`;
    const gigStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM gigs`;

    const data = await Promise.all([
      gigCountPromise,
      workerCountPromise,
      gigStatusPromise,
    ]);

    const numberOfGigs = Number(data[0].rows[0].count ?? '0');
    const numberOfWorkers = Number(data[1].rows[0].count ?? '0');
    const totalPaidGigs = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingGigs = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfWorkers,
      numberOfGigs,
      totalPaidGigs,
      totalPendingGigs,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredGigs(
  query: string,
  currentPage: number,
) {
  const session = await auth();
  const user_id = session?.token.sub;
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log('query used: ', query)

  try {
    const gigs = await sql<GigsTable>`
      SELECT
        gigs.id,
        gigs.amount,
        gigs.date,
        gigs.end_date,
        gigs.status,
        gigs.title,
        gigs.worker_name
      FROM gigs
      WHERE
        (gigs.amount::text ILIKE ${`%${query}%`} OR
        gigs.worker_name::text ILIKE ${`%${query}%`} OR
        gigs.title::text ILIKE ${`%${query}%`} OR
        gigs.date::text ILIKE ${`%${query}%`} OR
        gigs.status ILIKE ${`%${query}%`}) AND
        gigs.user_id = ${user_id}
      ORDER BY gigs.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return gigs.rows;
  } catch (error) {
    throw new Error('Failed to fetch gigs.');
  }
}

export async function fetchGigsPages(query: string) {
  const session = await auth();
  const user_id = session?.token.sub;
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM gigs
    WHERE
      (gigs.amount::text ILIKE ${`%${query}%`} OR
      gigs.worker_name::text ILIKE ${`%${query}%`} OR
      gigs.title::text ILIKE ${`%${query}%`} OR
      gigs.date::text ILIKE ${`%${query}%`} OR
      gigs.status ILIKE ${`%${query}%`}) AND
      gigs.user_id = ${user_id}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of gigs.');
  }
}

export async function fetchGigById(id: string) {
  noStore();
  try {
    const data = await sql<GigForm>`
      SELECT
        gigs.id,
        gigs.worker_id,
        gigs.amount,
        gigs.status,
        gigs.title,
        gigs.details,
        gigs.worker_name,
        gigs.date,
        gigs.end_date
      FROM gigs
      WHERE gigs.id = ${id};
    `;

    const gig = data.rows.map((gig) => ({
      ...gig,
      // Convert amount from cents to dollars
      amount: gig.amount / 100,
    }));

    return gig[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch gig.');
  }
}

export async function fetchWorkers() {
  noStore();
  try {
    const data = await sql<WorkerField>`
      SELECT
        id,
        name
      FROM workers
      ORDER BY name ASC
    `;

    const workers = data.rows;
    return workers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all workers.');
  }
}

export async function fetchFilteredWorkers(query: string) {
  noStore();
  try {
    const data = await sql<WorkersTableType>`
		SELECT
		  workers.id,
		  workers.name,
		  workers.email,
		  workers.image_url,
		  COUNT(gigs.id) AS total_gigs,
		  SUM(CASE WHEN gigs.status = 'pending' THEN gigs.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN gigs.status = 'paid' THEN gigs.amount ELSE 0 END) AS total_paid
		FROM workers
		LEFT JOIN gigs ON workers.id = gigs.worker_id
		WHERE
		  workers.name ILIKE ${`%${query}%`} OR
        workers.email ILIKE ${`%${query}%`}
		GROUP BY workers.id, workers.name, workers.email, workers.image_url
		ORDER BY workers.name ASC
	  `;

    const workers = data.rows.map((worker) => ({
      ...worker,
      total_pending: formatCurrency(worker.total_pending),
      total_paid: formatCurrency(worker.total_paid),
    }));

    return workers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch worker table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


/* PUBLIC SITE */
const PUBLIC_ITEMS_PER_PAGE = 2;
export async function fetchPublicGigPosts(
  countyId: string,
  currentPage: number,
  regionId?: string
) {
  noStore();
  const offset = (currentPage - 1) * PUBLIC_ITEMS_PER_PAGE;

  try {
    const gigs = await sql<GigsTable>`
      SELECT
        gigs.id,
        gigs.amount,
        gigs.date,
        gigs.end_date,
        gigs.status,
        gigs.title,
        gigs.worker_name,
        gigs.county,
        gigs.region
      FROM gigs
      WHERE
        gigs.county = ${countyId} AND
        gigs.region = ${regionId}
      ORDER BY gigs.date DESC
      LIMIT ${PUBLIC_ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return gigs.rows;
  } catch (error) {
    throw new Error('Failed to fetch public gig posts.');
  }
}

export async function fetchPublicGigPostsPages(
  countyId: string,
  regionId?: string
) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM gigs
    WHERE
      gigs.county = ${countyId} AND
      (gigs.region = ${regionId})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / PUBLIC_ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of gigs.');
  }
}