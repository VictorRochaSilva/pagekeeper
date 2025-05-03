<?php

namespace App\Repositories;

use App\Models\Customer;
use App\Repositories\Contracts\CustomerRepositoryInterface;

class CustomerRepository implements CustomerRepositoryInterface
{
    public function __construct(protected Customer $model) {}


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

    public function getLastInserted(): ?Customer
    {
        return $this->model->latest('id')->first();
    }
}
