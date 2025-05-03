<?php

namespace App\Services;

use App\Repositories\Contracts\CustomerRepositoryInterface;

class CustomerService
{
    public function __construct(protected CustomerRepositoryInterface $customerRepository) {}

    public function getAll()
    {
        return $this->customerRepository->all();
    }

    public function create(array $data)
    {
        $lastUser = $this->customerRepository->getLastInserted();
        $lastId = $lastUser?->id ?? 0;

        $data['registration_number'] = 'U-' . str_pad($lastId + 1, 5, '0', STR_PAD_LEFT);

        return $this->customerRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->customerRepository->update($id, $data);
    }
    public function delete(int $id)
    {
        return $this->customerRepository->delete($id);
    }
}
