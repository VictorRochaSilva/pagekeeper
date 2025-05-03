<?php

namespace App\Services;

use App\Repositories\Contracts\GenreRepositoryInterface;

class GenreService
{
    public function __construct(protected GenreRepositoryInterface $genreRepository) {}

    public function getAll()
    {
        return $this->genreRepository->all();
    }

    public function create(array $data)
    {
        return $this->genreRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->genreRepository->update($id, $data);
    }
    public function delete(int $id)
    {
        return $this->genreRepository->delete($id);
    }
}
