<?php

// 

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


  $id = isset($_GET['id']) ? $_GET['id'] : '';
  if (!empty($id)) { 
    if (is_numeric($id)){
      $query = "SELECT  `p`.`id`, `p`.`name`,`p`.`image`,  `p`.`shortDescription`,  `p`.`price`,
      GROUP_CONCAT(`i`.`url`) AS `gallery`
      FROM `products` AS `p`
      LEFT JOIN `images` AS `i` 
      ON `i`.`products_id` = `p`.`id` 
      WHERE`p`.`id` = $id
      GROUP BY `i`.`products_id`";
    } 
    else {
      throw new Exception ('id needs to be a number');
    }
  } 
  else {
    $query = "SELECT  * FROM `products`";
  }

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
  
  print($json_output);
?>
