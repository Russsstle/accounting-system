<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model {
  /**
   * @var array
   */
  protected $fillable = [
    'title', 'date', 'account', 'description', 'value', 'type'
  ];

  /**
   * @var array
   */
  protected $dates = ['date'];

  /**
   * @var array
   */
  protected $casts = [
    'value' => 'float'
  ];

  /**
   * @param $query
   * @param $year
   * @param null $month
   * @return mixed
   */
  public function scopeTotal($query, $year = null, $month = null) {
    $query->whereYear('date', $year ?? date('Y'));

    if ($month) {
      $query->whereMonth('date', $month ?? date('m'));
    }

    return $query->sum('value');
  }
}
