<?php

// header('Content-Type: application/json');

// if (empty($_GET['id'])) {
//   readfile('dummy-products-list.json');
// } else {
//   readfile('dummy-product-details.json');
// }



  // $output = file_get_contents('./dummy-products-list.json');
  // print $output;

  require_once('./functions.php');
  set_exception_handler('error_handler');
  startup();

  require_once('./db_connection.php');

  $whereClause = '';
  if (!empty($_GET['id'])) {
    if (is_numeric($_GET['id'])){
      $whereClause = "WHERE `id`=" . $_GET['id'];
    } 
    else {
      throw new Exception ('id needs to be a number');
    }
  };

  $query = "SELECT * FROM `products`" . $whereClause;
  $result = mysqli_query($conn, $query);

  if (!$result) {
    throw new Exception (mysqli_error($conn));
  };
  if( mysqli_num_rows($result) === 0){
    throw new Exception ("Invalid ID : $id");
  };

  $output = [];
  while ($row = mysqli_fetch_assoc($result)) {
    $output[] = $row;
  }

  
  $json_output = json_encode($output);
  
  print_r($json_output);
?>
