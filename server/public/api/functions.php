<?php

    function error_handler($error){
        $output = [
            'success' => false,
            'error' => $error->getMessage(),
        ];
        $json_output = json_encode($output);
        print "<br> Error from error_handler" . $json_output . "<br>";
        return null;
    }

?>