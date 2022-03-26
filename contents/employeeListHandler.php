<?php

    require_once('classes/DB.php');
    require_once('classes/EmployeeList.php');

    $employeeList = new EmployeeList();

    $employees = $employeeList->selectEmployeesData();

    foreach ($employees as $x => $value) {
    ?>
        <tr>
            <td class="table-primary"><?php echo htmlentities($value['first_name']); ?>
            </td>
        </tr>
<?php
    }
    ?>
