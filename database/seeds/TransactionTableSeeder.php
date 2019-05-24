<?php

use App\Transaction;
use Illuminate\Database\Seeder;

class TransactionTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    $company              = new Transaction;
    $company->title       = 'Invested';
    $company->type        = 'income';
    $company->date        = '2018-01-30';
    $company->account     = 'BDO';
    $company->description = 'the description';
    $company->value       = '2123';
    $company->save();
    $company              = new Transaction;
    $company->title       = 'Service Income';
    $company->type        = 'income';
    $company->date        = '2018-01-30';
    $company->account     = 'BDO';
    $company->description = 'the description';
    $company->value       = '21010';
    $company->save();
    $company              = new Transaction;
    $company->title       = 'Electric Bill';
    $company->type        = 'expense';
    $company->date        = '2018-01-30';
    $company->account     = 'BDO';
    $company->description = 'the description';
    $company->value       = '21220';
    $company->save();
    $company              = new Transaction;
    $company->title       = 'Rent';
    $company->type        = 'expense';
    $company->date        = '2018-01-30';
    $company->account     = 'BDO';
    $company->description = 'the description';
    $company->value       = '24440';
    $company->save();
  }
}
