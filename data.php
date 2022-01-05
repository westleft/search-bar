<?php

$value = $_GET['search'];

class Connection
{
  public PDO $pdo;

  public function __construct()
  {
    $servername = "localhost";
    $dbname = "library";
    $username = "root";
    $password = "root";
    try {
      $this->pdo = new PDO("mysql:host = $servername; dbname=$dbname", $username, $password);
      // set the PDO error mode to exception
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //   echo "Connection success";
    } catch (PDOException $e) {
      echo "Connection failed: " . $e->getMessage();
    }
  }

  public function getData($value)
  {
    if($value == ''){
        return;
    }
    // $mysqlRequest = "SELECT * FROM library ORDER BY title DESC";
    $mysqlRequest = "SELECT distinct(title) " . "FROM library WHERE title LIKE('" . $value . "%')ORDER BY title";
    $statement = $this->pdo->prepare($mysqlRequest);
    $statement->execute();

    return $statement->fetchAll(PDO::FETCH_ASSOC);
    echo $statement;
  }
}

$c = new Connection();
$products = $c->getData($value);

// echo '<pre>', print_r($products), '</pre>';

$a = json_encode($products);
echo $a;
return $a;