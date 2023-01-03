<?php
namespace App\Repository;

use App\Model\Category;
use Illuminate\Support\Collection;

interface CategoryRepositoryInterface
{
   public function all(): Collection;

   public function checkAuth();

//    public function delete($id);

//    public function update($id, array $array);
}