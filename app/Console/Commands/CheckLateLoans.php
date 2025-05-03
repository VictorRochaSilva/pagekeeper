<?php

namespace App\Console\Commands;

use App\Services\LoanService;
use Illuminate\Console\Command;

class CheckLateLoans extends Command
{
    protected $signature = 'loans:check-late';
    protected $description = 'Verifica os livros que estão em atraso e atualiza seu status.';

    protected LoanService $loanService;

    public function __construct(LoanService $loanService)
    {
        parent::__construct();
        $this->loanService = $loanService;
    }

    public function handle()
    {
        // Chamando o método de verificação de empréstimos atrasados
        $this->loanService->checkLateLoans();

        $this->info('Verificação de empréstimos atrasados concluída.');
    }
}
