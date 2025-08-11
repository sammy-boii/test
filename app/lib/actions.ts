'use server'

import { type Invoice } from './definitions'
import { z } from 'zod'
import postgres from 'postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const formSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid'])
})

const invoiceSchema = formSchema.omit({
  id: true
})

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = invoiceSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  const date = new Date().toISOString().split('T')[0]

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amount}, ${status}, ${date})
    `
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error)
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}
const updateInvoiceSchema = formSchema.omit({ id: true })

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = updateInvoiceSchema.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status')
  })

  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amount}, status = ${status}
    WHERE id = ${id}
  `
  } catch (error) {
    // Log the error to the console for now
    console.error(error)
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`
  revalidatePath('/dashboard/invoices')
}
