'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Check, Plus } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Empréstimos', href: '/loans' },
];

type Loan = {
    id: number;
    customer_id: number;
    book_id: number;
    loan_date: string;
    due_date: string;
    return_date: string | null;
    status: string;
};

type Customer = {
    id: number;
    name: string;
};

type Book = {
    id: number;
    name: string;
    genre: { id: number; name: string };
    available: boolean; // Adicionando a flag de disponibilidade
};

export default function Loans({ loans, customers, books }: { loans: Loan[]; customers: Customer[]; books: Book[] }) {
    const [createOpen, setCreateOpen] = useState(false);

    const { data, setData, post, processing, reset, errors } = useForm({
        customer_id: '',
        book_id: '',
        due_date: '',
    });

    const isFormValid = data.customer_id !== '' && data.book_id !== '' && data.due_date !== '';

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        post('/loans', {
            onSuccess: () => {
                reset();
                setCreateOpen(false);
            },
        });
    };

    const handleReturn = (loanId: number) => {
        post(`/loans/${loanId}/return`, {
            onSuccess: () => {},
        });
    };

    // Função para encontrar cliente e livro pelos seus IDs
    const getCustomerName = (id: number) => customers.find((customer) => customer.id === id)?.name || 'Cliente não encontrado';
    const getBookName = (id: number) => books.find((book) => book.id === id)?.name || 'Livro não encontrado';

    // Função para exibir o status de forma legível
    const getLoanStatus = (status: string, dueDate: string, returnDate: string | null) => {
        const today = new Date();
        const due = new Date(dueDate);

        // Se houver data de devolução, o empréstimo foi finalizado
        if (returnDate) return 'Finalizado';

        // Se o status for "overdue" e a data de hoje for após a data de devolução, está atrasado
        if (status === 'overdue' && today > due) return 'Atrasado';

        // Se o status for "borrowed", o empréstimo ainda está ativo
        if (status === 'borrowed') return 'Ativo';

        // Se o status for "returned", o empréstimo foi finalizado
        if (status === 'returned') return 'Finalizado';

        // Se o status for "pending", o empréstimo ainda está pendente
        if (status === 'pending') return 'Pendente';

        // Caso nenhum status conhecido seja encontrado
        return 'Status desconhecido';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Empréstimos" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Empréstimos</h1>
                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <Plus className="size-4" />
                                Novo Empréstimo
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Novo Empréstimo</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <Select value={data.customer_id} onValueChange={(value) => setData('customer_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um cliente" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {customers.map((c) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={data.book_id} onValueChange={(value) => setData('book_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um livro" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {books
                                            .filter((b) => b.available) // Filtra apenas os livros disponíveis
                                            .map((b) => (
                                                <SelectItem key={b.id} value={b.id.toString()}>
                                                    {b.name}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>

                                <Input type="date" value={data.due_date} onChange={(e) => setData('due_date', e.target.value)} />

                                {errors.customer_id && <p className="text-sm text-red-500">{errors.customer_id}</p>}
                                {errors.book_id && <p className="text-sm text-red-500">{errors.book_id}</p>}
                                {errors.due_date && <p className="text-sm text-red-500">{errors.due_date}</p>}

                                <Button type="submit" disabled={processing || !isFormValid}>
                                    {processing ? 'Salvando...' : 'Salvar'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {loans.length === 0 ? (
                    <div className="py-4 text-center">
                        <p className="text-lg font-medium text-gray-500">Nenhum empréstimo ainda.</p>
                    </div>
                ) : (
                    <Card className="overflow-x-auto rounded-xl border">
                        <table className="min-w-full divide-y text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Cliente</th>
                                    <th className="px-4 py-2 text-left">Livro</th>
                                    <th className="px-4 py-2 text-left">Início</th>
                                    <th className="px-4 py-2 text-left">Final</th>
                                    <th className="px-4 py-2 text-left">Devolução</th>
                                    <th className="px-4 py-2 text-left">Status</th>
                                    <th className="px-4 py-2 text-left">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((loan) => (
                                    <tr key={loan.id} className="border-t">
                                        <td className="px-4 py-2">{loan.id}</td>
                                        <td className="px-4 py-2">{getCustomerName(loan.customer_id)}</td>
                                        <td className="px-4 py-2">{getBookName(loan.book_id)}</td>
                                        <td className="px-4 py-2">{new Date(loan.loan_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{new Date(loan.due_date).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">{loan.return_date ? new Date(loan.return_date).toLocaleDateString() : '—'}</td>
                                        <td className="px-4 py-2">{getLoanStatus(loan.status, loan.due_date, loan.return_date)}</td>
                                        <td className="space-x-2 px-4 py-2">
                                            <Button
                                                onClick={() => handleReturn(loan.id)}
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-2 text-green-500"
                                                disabled={getLoanStatus(loan.status, loan.due_date, loan.return_date) === 'Finalizado'} // Desabilita se o status for "Devolvido"
                                            >
                                                {getLoanStatus(loan.status, loan.due_date, loan.return_date) === 'Finalizado' ? (
                                                    <>Devolvido</>
                                                ) : (
                                                    <>
                                                        <Check className="size-4" />
                                                        Devolver
                                                    </>
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
