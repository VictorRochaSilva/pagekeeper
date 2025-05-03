<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Services\CustomerService;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function __construct(private CustomerService $service) {}

    public function index()
    {
        return Inertia::render("customers", [
            "customers" => $this->service->getAll(),
        ]);
    }

    public function store(CustomerStoreRequest $request)
    {
        try {
            $this->service->create($request->all());
            return redirect()->route("customers.index")->with("success", "Cliente cadastrado com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("customers.index")->with("error", 'Erro ao cadastrar cliente!');
        }
    }

    public function update(CustomerUpdateRequest $request, int $id)
    {
        try {
            $this->service->update($id, $request->all());
            return redirect()->route("customers.index")->with("success", "Cliente atualizado com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("customers.index")->with("error", "Erro ao atualizar cliente!");
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->service->delete($id);
            return redirect()->route("customers.index")->with("success", "Cliente excluido com sucesso!");
        } catch (\Throwable $th) {
            return redirect()->route("customers.index")->with("error", "Erro ao excluir cliente!");
        }
    }
}
