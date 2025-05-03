<?php

namespace App\Providers;

use App\Console\Commands\CheckLateLoans;
use Illuminate\Support\ServiceProvider;

class ConsoleServiceProvider extends ServiceProvider
{
    public function register()
    {
        // Registrar comandos
        $this->commands([
            CheckLateLoans::class,
        ]);
    }

    public function boot()
    {
        // Agendar a execução do comando
        if ($this->app->runningInConsole()) {
            $this->scheduleTasks();
        }
    }

    protected function scheduleTasks()
    {
        $schedule = $this->app->make(\Illuminate\Console\Scheduling\Schedule::class);

        // Agendando o comando para rodar diariamente
        $schedule->command('loans:check-late')->daily();
    }
}
