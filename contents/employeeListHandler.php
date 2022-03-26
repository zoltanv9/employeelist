<?php

    require_once('../classes/DB.php');
    require_once('../classes/EmployeeList.php');

    //------------- dolgozói lista példányosítása ----------
    $employeeList = new EmployeeList();

    //------------- request típus elmentése -------------
    $req = $_REQUEST['req'];

    //------------- dolgozói adatok lekérdezés, ha request = "select"-----------
    if ($req == "select") {
        $employees = $employeeList->selectEmployeesData();

        echo json_encode($employees);
    }

