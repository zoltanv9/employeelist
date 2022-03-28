<?php

    require_once('../classes/DB.php');
    require_once('../classes/EmployeeList.php');

    //------------- dolgozói lista példányosítása ----------
    $employeeList = new EmployeeList();

    //------------- kérés típus elmentése -------------
    $req = $_REQUEST['req'];

    /*
        adatok lekérdezése, ha req = "fetch"
        adatok frissítése, ha req = "update"
        dolgozó törlése, ha req = "delete"
    */
    if ($req == "fetch") {
        $employees = $employeeList->selectEmployeesData();
        echo json_encode($employees);
    } elseif ($req == "update") {
        $employeeList->updateEmployeeData();
    } elseif ($req == "delete") {
        $employeeList->deleteEmployee();
    }

