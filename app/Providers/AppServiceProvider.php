<?php

namespace App\Providers;


use App\Repositories\Contracts\CustomerRepositoryInterface;
use App\Repositories\Contracts\GenreRepositoryInterface;
use App\Repositories\Contracts\BookRepositoryInterface;
use App\Repositories\Contracts\LoanRepositoryInterface;
use App\Repositories\CustomerRepository;
use App\Repositories\GenreRepository;
use App\Repositories\BookRepository;
use App\Repositories\LoanRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(GenreRepositoryInterface::class, GenreRepository::class);
        $this->app->bind(CustomerRepositoryInterface::class, CustomerRepository::class);
        $this->app->bind(BookRepositoryInterface::class, BookRepository::class);
        $this->app->bind(LoanRepositoryInterface::class, LoanRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
