<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\GenreRequest;
use App\Services\GenreService;
use Inertia\Inertia;

class GenreController extends Controller
{
    public function __construct(private GenreService $service) {}

    public function index()
    {
        return Inertia::render('Genres', [
            'genres' => $this->service->getAll(),
        ]);
    }

    public function store(GenreRequest $request)
    {
        try {
            $this->service->create($request->validated());
            return redirect(route('genres.index'))->with('success', 'Gênero criado com sucesso!');
        } catch (\Throwable $th) {
            return redirect(route('genres.index'))->with('error', 'Erro ao criar gênero!');
        }
    }

    public function update(GenreRequest $request, int $id)
    {
        try {
            $this->service->update($id, $request->validated());
            return redirect(route('genres.index'))->with('success', 'Gênero atualizado com sucesso!');
        } catch (\Throwable $th) {
            return redirect(route('genres.index'))->with('error', 'Erro ao atualizar gênero!');
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->service->delete($id);
            return redirect(route('genres.index'))->with('success', 'Gênero excluido com sucesso!');
        } catch (\Throwable $th) {
            return redirect(route('genres.index'))->with('error', 'Erro ao excluir gênero!');
        }
    }
}
