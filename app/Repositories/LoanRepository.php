<?php

namespace App\Repositories;

use App\Models\Loan;
use App\Repositories\Contracts\LoanRepositoryInterface;

class LoanRepository implements LoanRepositoryInterface
{
    public function __construct(protected Loan $model) {}

    public function all()
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $genre = $this->find($id);
        $genre->update($data);
        return $genre;
    }

    public function delete(int $id)
    {
        return $this->find($id)->delete();
    }
}
