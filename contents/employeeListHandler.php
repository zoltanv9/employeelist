<?php

    require_once('../classes/DB.php');
    require_once('../classes/EmployeeList.php');

    //------------- dolgozói lista példányosítása ----------
    $employeeList = new EmployeeList();

    //------------- request típus elmentése -------------
    $req = $_REQUEST['req'];

    //------------- adatok lekérdezése, ha request = "fetch"-----------
    if ($req == "fetch") {
        $employees = $employeeList->selectEmployeesData();

        echo json_encode($employees);
    } elseif ($req =="update") {
        $employeeList->updateEmployeeData();
    }

