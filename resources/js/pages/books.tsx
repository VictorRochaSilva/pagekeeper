'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Livros', href: '/books' },
];

type Book = {
    id: number;
    name: string;
    author: string;
    registration_number: string;
    available: boolean;
    genre_id: number;
};

type Genre = {
    id: number;
    name: string;
};

export default function Books({ books, genres }: { books: Book[]; genres: Genre[] }) {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpenId, setDeleteOpenId] = useState<number | null>(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        errors,
        processing,
        reset,
    } = useForm({
        name: '',
        author: '',
        genre_id: '',
    });

    // Função para obter o nome do gênero pelo ID
    const getGenreName = (genreId: number) => {
        const genre = genres.find((g) => g.id === genreId);
        return genre ? genre.name : 'N/A';
    };

    const isFormValid = data.name.trim().length > 0 && data.author.trim().length > 0 && data.genre_id !== '';

    // Handler para criar um novo livro
    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid) return;

        post('/books', {
            onSuccess: () => {
                reset();
                setCreateOpen(false);
            },
        });
    };

    // Handler para editar um livro existente
    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || !selectedBook) return;

        put(`/books/${selectedBook.id}`, {
            onSuccess: () => {
                reset();
                setSelectedBook(null);
                setEditOpen(false);
            },
        });
    };

    // Handler para excluir um livro
    const handleDelete = () => {
        if (!deleteOpenId) return;

        destroy(`/books/${deleteOpenId}`, {
            onSuccess: () => setDeleteOpenId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Livros" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Livros</h1>
                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setCreateOpen(true)} className="flex items-center gap-2">
                                <Plus className="size-4" />
                                Adicionar Livro
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Novo Livro</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <Input placeholder="Nome do livro" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                <Input placeholder="Autor" value={data.author} onChange={(e) => setData('author', e.target.value)} />
                                <Select value={data.genre_id} onValueChange={(value) => setData('genre_id', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione um gênero" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {genres.map((genre) => (
                                            <SelectItem key={genre.id} value={genre.id.toString()}>
                                                {genre.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                {errors.author && <p className="text-sm text-red-500">{errors.author}</p>}
                                {errors.genre_id && <p className="text-sm text-red-500">{errors.genre_id}</p>}

                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Salvando...' : 'Salvar'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {books.length === 0 ? (
                    <div className="py-4 text-center">
                        <p className="text-lg font-medium text-gray-500">Nenhum livro cadastrado</p>
                    </div>
                ) : (
                    <Card className="overflow-x-auto rounded-xl border">
                        <table className="divide-border min-w-full divide-y text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="text-muted-foreground px-4 py-2 text-left font-medium">Número de Registro</th>
                                    <th className="text-muted-foreground px-4 py-2 text-left font-medium">Nome</th>
                                    <th className="text-muted-foreground px-4 py-2 text-left font-medium">Autor</th>
                                    <th className="text-muted-foreground px-4 py-2 text-left font-medium">Gênero</th>
                                    <th className="text-muted-foreground px-4 py-2 text-left font-medium">Disponível</th>
                                    <th className="text-muted-foreground px-4 py-2 text-right font-medium">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book) => (
                                    <tr key={book.id} className="border-t">
                                        <td className="px-4 py-2">{book.registration_number}</td>
                                        <td className="px-4 py-2">{book.name}</td>
                                        <td className="px-4 py-2">{book.author}</td>
                                        <td className="px-4 py-2">{getGenreName(book.genre_id)}</td>
                                        <td className="px-4 py-2">{book.available ? 'Sim' : 'Não'}</td>
                                        <td className="px-4 py-2 text-right">
                                            <div className="flex justify-end gap-2">
                                                {/* Modal de Edição */}
                                                <Dialog
                                                    open={editOpen && selectedBook?.id === book.id}
                                                    onOpenChange={(open) => {
                                                        if (!open) {
                                                            setEditOpen(false);
                                                            setSelectedBook(null);
                                                        }
                                                    }}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => {
                                                                setSelectedBook(book);
                                                                setData({
                                                                    name: book.name,
                                                                    author: book.author,
                                                                    genre_id: book.genre_id.toString(),
                                                                });
                                                                setEditOpen(true);
                                                            }}
                                                        >
                                                            <Pencil className="size-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Editar Livro</DialogTitle>
                                                        </DialogHeader>
                                                        <form onSubmit={handleEdit} className="space-y-4">
                                                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                                            <Input value={data.author} onChange={(e) => setData('author', e.target.value)} />
                                                            <Select value={data.genre_id} onValueChange={(value) => setData('genre_id', value)}>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Selecione um gênero" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {genres.map((genre) => (
                                                                        <SelectItem key={genre.id} value={genre.id.toString()}>
                                                                            {genre.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>

                                                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                                            {errors.author && <p className="text-sm text-red-500">{errors.author}</p>}
                                                            {errors.genre_id && <p className="text-sm text-red-500">{errors.genre_id}</p>}

                                                            <Button type="submit" disabled={processing}>
                                                                {processing ? 'Atualizando...' : 'Atualizar'}
                                                            </Button>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Modal de Exclusão */}
                                                <Dialog open={deleteOpenId === book.id} onOpenChange={(open) => !open && setDeleteOpenId(null)}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="destructive" onClick={() => setDeleteOpenId(book.id)}>
                                                            <Trash2 className="size-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Confirmar Exclusão</DialogTitle>
                                                        </DialogHeader>
                                                        <p>Tem certeza que deseja excluir o livro "{book.name}"?</p>
                                                        <div className="flex justify-end gap-2 pt-4">
                                                            <Button variant="outline" onClick={() => setDeleteOpenId(null)}>
                                                                Cancelar
                                                            </Button>
                                                            <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                                                                {processing ? 'Excluindo...' : 'Excluir'}
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
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
