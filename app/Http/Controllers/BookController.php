<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookStoreRequest;
use App\Services\BookService;
use App\Services\GenreService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{

    public function __construct(private BookService $BookService, private GenreService $genreService) {}
    public function index()
    {
        $books = $this->BookService->getAll();

        $genres = $this->genreService->getAll();

        return Inertia::render("books", [
            "books" => $books,
            "genres" => $genres,
        ]);
    }

    public function store(BookStoreRequest $request)
    {
        try {
            $this->BookService->create($request->all());
            return redirect()->route("books.index")->with("success", "Livro cadastrado com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("books.index")->with("error", "Livro não cadastrado!");
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $this->BookService->update($id, $request->all());
            return redirect()->route("books.index")->with("success", "Livro atualizado com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("books.index")->with("error", "Livro não atualizado!");
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->BookService->delete($id);
            return redirect()->route("books.index")->with("success", "Livro excluido com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("books.index")->with("error", "Livro não excluido!");
        }
    }
}
