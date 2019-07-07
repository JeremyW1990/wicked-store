<?php

/* 

  code for dummy data testing

  if (empty($_GET['id'])) {
    readfile('dummy-products-list.json');
  } else {
    readfile('dummy-product-details.json');
  }

  $output = file_get_contents('./dummy-products-list.json');
  print $output;

*/

  /* Set up header and error handler */
  require_once('./functions.php');
  set_exception_handler('error_handler');
  startup();

  require_once('./db_connection.php');

  /* prevent from throwing error when no 'id' */
  $id = isset($_GET['id']) ? $_GET['id'] : ''; 

  /* Guard */
  if (!empty($id) && !is_numeric($id)){
    throw new Exception ('id needs to be a number');
  }

  /* If there is no id, we fetch all the prodcuts */
  if (empty($id)) {
    $query = "SELECT  * FROM `products`";
  }
  /* 
    If there is an valid numberic id, we fetch the product with certain id 
    Join the product table with images table
  */
  else {
    $query = "
    SELECT  `p`.`id`, `p`.`name`,`p`.`image`,  `p`.`shortDescription`,  `p`.`price`,
    GROUP_CONCAT(`i`.`url`) AS `gallery`
    FROM `products` AS `p`
    LEFT JOIN `images` AS `i` 
    ON `i`.`products_id` = `p`.`id` 
    WHERE`p`.`id` = $id
    GROUP BY `i`.`products_id`";
  }

  $result = mysqli_query($conn, $query);

  /* 
    result guard
  */
  if (mysqli_errno($conn)){
    print_r(mysqli_error($conn));
  }

  if (!$result) {
    throw new Exception (mysqli_error($conn));
  };

  /* 
    If no result found, then we know it is a invalid ID
  */
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
