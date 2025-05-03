<?php

namespace App\Services;

use App\Repositories\Contracts\BookRepositoryInterface;

class BookService
{
    public function __construct(protected BookRepositoryInterface $bookRepository) {}

    public function getAll()
    {
        return $this->bookRepository->all();
    }

    public function create(array $data)
    {
        $lastBook = $this->bookRepository->getLastInserted();
        $lastId = $lastBook?->id ?? 0;

        $data['registration_number'] = 'L-' . str_pad($lastId + 1, 5, '0', STR_PAD_LEFT);

        return $this->bookRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->bookRepository->update($id, $data);
    }
    public function delete(int $id)
    {
        return $this->bookRepository->delete($id);
    }
}
