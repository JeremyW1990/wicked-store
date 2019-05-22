<?php

    function error_handler($error){
        $output = [
            'success' => false,
            'error' => $error->getMessage(),
        ];
        $json_output = json_encode($output['error']);
        print $json_output;
        return null;
    }

    function startup(){
        header('Content-Type:application/json');
    }

?>