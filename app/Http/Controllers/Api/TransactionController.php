<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller {
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    $transactions = Transaction::orderBy('created_at', 'desc')->get();

    $data = [];

    foreach ($transactions as $transaction) {
      $item = new \stdClass;

      $item->id          = $transaction->id;
      $item->date        = $transaction->date->format('F d, Y');
      $item->account     = $transaction->account;
      $item->type        = $transaction->type;
      $item->description = $transaction->description;
      $item->value       = $transaction->value;
      $data[]            = $item;
    }

    return $data;
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store() {
    $transaction = new Transaction;
    $date        = date('Y-m-d');
    // $transaction->fill($request->only($transaction->getfillable()));
    $transaction->fill(['type' => 'income', 'date' => $date, 'account' => 'A New Account', 'description' => '', 'value' => 0]);
    $transaction->save();
    return ['success' => true];
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id) {
    $transactions = Transaction::find($id);
// $name  = $leave->user->profile->first_name . ' ' . $leave->user->profile->last_name;
    $item = new \stdClass;

    $item->id          = $transactions->id;
    $item->date        = $transactions->date->format('Y-m-d');
    $item->type        = $transactions->type;
    $item->account     = $transactions->account;
    $item->description = $transactions->description;
    $item->value       = $transactions->value;

    return response()->json($item);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $transaction = Transaction::find($id);

    $transaction->fill($request->only($transaction->getFillable()));
    $transaction->save();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $transaction = Transaction::find($id);

    $transaction->delete();
    return response()->json(['success' => true]);

  }
}
