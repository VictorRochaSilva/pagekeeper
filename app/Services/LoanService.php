<?php

namespace App\Services;

use App\Models\Loan;
use App\Repositories\Contracts\LoanRepositoryInterface;
use Carbon\Carbon;

class LoanService
{
    public function __construct(protected LoanRepositoryInterface $loanRepository) {}

    public function getAll()
    {
        return $this->loanRepository->all();
    }

    public function create(array $data)
    {
        $book = \App\Models\Book::findOrFail($data['book_id']);

        if (!$book->available) {
            throw new \Exception("Este livro já está emprestado.");
        }

        $loan = $this->loanRepository->create($data);

        $book->available = false;
        $book->save();

        return $loan;
    }

    public function update(int $id, array $data)
    {
        return $this->loanRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->loanRepository->delete($id);
    }

    public function returnLoan(Loan $loan): void
    {
        if ($loan->return_date) {
            throw new \Exception("Livro já foi devolvido!");
        }

        $loan->return_date = Carbon::now();
        $loan->status = 'returned';
        $loan->save();

        $book = $loan->book;
        $book->available = true;
        $book->save();
    }

    public function checkLateLoans()
    {
        $today = Carbon::now();
        $lateLoans = $this->loanRepository->all()->filter(function ($loan) use ($today) {
            return !$loan->return_date && $loan->due_date < $today;
        });

        foreach ($lateLoans as $loan) {
            $loan->status = 'overdue';
            $loan->save();
        }

        return $lateLoans;
    }
}
