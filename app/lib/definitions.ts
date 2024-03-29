// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Worker = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Gig = {
  id: string;
  worker_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestGig = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestGigRaw = Omit<LatestGig, 'amount'> & {
  amount: number;
};

export type GigsTable = {
  id: string;
  worker_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type WorkersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_gigs: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedWorkersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_gigs: number;
  total_pending: string;
  total_paid: string;
};

export type WorkerField = {
  id: string;
  name: string;
};

export type GigForm = {
  id: string;
  worker_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
