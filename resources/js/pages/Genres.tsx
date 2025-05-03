'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Gêneros', href: '/genres' },
];

export default function Genres({ genres }: { genres: { id: number; name: string }[] }) {
    const [selectedGenre, setSelectedGenre] = useState<{ id: number; name: string } | null>(null);
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
    });

    const isNameValid = data.name.trim().length > 0;

    // Handler para criar um gênero
    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isNameValid) return;

        post('/genres', {
            onSuccess: () => {
                reset();
                setCreateOpen(false);
            },
        });
    };

    // Handler para editar um gênero
    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isNameValid || !selectedGenre) return;

        put(`/genres/${selectedGenre.id}`, {
            onSuccess: () => {
                reset();
                setSelectedGenre(null);
                setEditOpen(false);
            },
        });
    };

    // Handler para excluir um gênero
    const handleDelete = () => {
        if (!deleteOpenId) return;

        destroy(`/genres/${deleteOpenId}`, {
            onSuccess: () => setDeleteOpenId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gêneros" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Gêneros</h1>
                    <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setCreateOpen(true)} className="flex items-center gap-2">
                                <Plus className="size-4" />
                                Criar Gênero
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Novo Gênero</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreate} className="space-y-4">
                                <Input placeholder="Nome do gênero" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Criando...' : 'Criar'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {genres.length === 0 ? (
                    <div className="py-4 text-center">
                        <p className="text-lg font-medium text-gray-500">Nenhum gênero cadastrado</p>
                    </div>
                ) : (
                    <Card className="overflow-x-auto rounded-xl border">
                        <table className="divide-border min-w-full divide-y text-sm">
                            <thead className="bg-muted">
                                <tr>
                                    <th className="text-muted-foreground px-4 py-2 text-left font-medium">ID</th>
                                    <th className="text-muted-foreground px-4 py-2 text-left font-medium">Nome</th>
                                    <th className="text-muted-foreground px-4 py-2 text-right font-medium">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {genres.map((genre) => (
                                    <tr key={genre.id} className="border-t">
                                        <td className="px-4 py-2">{genre.id}</td>
                                        <td className="px-4 py-2">{genre.name}</td>
                                        <td className="px-4 py-2 text-right">
                                            <div className="flex justify-end gap-2">
                                                {/* Modal de Edição */}
                                                <Dialog
                                                    open={editOpen && selectedGenre?.id === genre.id}
                                                    onOpenChange={(open) => {
                                                        if (!open) {
                                                            setEditOpen(false);
                                                            setSelectedGenre(null);
                                                        }
                                                    }}
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => {
                                                                setSelectedGenre(genre);
                                                                setData('name', genre.name);
                                                                setEditOpen(true);
                                                            }}
                                                        >
                                                            <Pencil className="size-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Editar Gênero</DialogTitle>
                                                        </DialogHeader>
                                                        <form onSubmit={handleEdit} className="space-y-4">
                                                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                                            <Button type="submit" disabled={processing}>
                                                                {processing ? 'Atualizando...' : 'Atualizar'}
                                                            </Button>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>

                                                {/* Modal de Exclusão */}
                                                <Dialog open={deleteOpenId === genre.id} onOpenChange={(open) => !open && setDeleteOpenId(null)}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="destructive" onClick={() => setDeleteOpenId(genre.id)}>
                                                            <Trash2 className="size-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Confirmar Exclusão</DialogTitle>
                                                        </DialogHeader>
                                                        <p>Tem certeza que deseja excluir o gênero "{genre.name}"?</p>
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
