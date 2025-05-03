<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoanStoreRequest;
use App\Models\Loan;
use App\Services\BookService;
use App\Services\CustomerService;
use App\Services\LoanService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function __construct(private LoanService $service, private CustomerService $customerService, private BookService $bookService) {}

    public function index()
    {
        $loan = $this->service->getAll();
        $customer = $this->customerService->getAll();
        $books = $this->bookService->getAll();

        return Inertia::render("loans", [
            "loans" => $loan,
            "customers" => $customer,
            "books" => $books,
        ]);
    }

    public function store(LoanStoreRequest $request)
    {
        try {
            $this->service->create($request->all());
            return redirect()->route("loans.index")->with("success", "Emprestimo cadastrado com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("loans.index")->with("error ", 'Erro ao cadastrar emprestimo!');
        }
    }

    public function update(Request $request, Loan $loan)
    {
        try {
            $this->service->update($loan->id, $request->all());
            return redirect()->route("loans.index")->with("success", "Emprestimo atualizado com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("loans.index")->with("error ", 'Erro ao atualizar emprestimo!');
        }
    }

    public function destroy(Loan $loan)
    {
        try {
            $this->service->delete($loan->id);
            return redirect()->route("loans.index")->with("success", "Emprestimo excluido com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("loans.index")->with("error ", 'Erro ao excluir emprestimo!');
        }
    }

    public function return(Loan $loan)
    {
        try {
            $this->service->returnLoan($loan);
            return redirect()->route("loans.index")->with("success", "Empréstimo finalizado com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("loans.index")->with("error", "Erro ao finalizar empréstimo!");
        }
    }
}
