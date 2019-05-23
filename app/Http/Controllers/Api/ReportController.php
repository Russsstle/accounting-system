<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Transaction;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;

class ReportController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    if (request()->query('year') || request()->query('month')) {
      return [
        'expense' => Transaction::where('type', 'expense')->total(request()->query('year'), request()->query('month')),
        'income'  => Transaction::where('type', 'income')->total(request()->query('year'), request()->query('month'))
      ];
    } else {
      $expense = 0;
      $income  = 0;

      $months = CarbonPeriod::create(Transaction::where('type', 'expense')->oldest('date')->first()->date, '1 month', 'now');
      foreach ($months as $month) {
        $expense += Transaction::where('type', 'expense')->total($month->format('Y'), $month->format('m'));
        $income += Transaction::where('type', 'income')->total($month->format('Y'), $month->format('m'));
      }

      return [
        'expense' => $expense,
        'income'  => $income
      ];
    }
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    //
  }
}
