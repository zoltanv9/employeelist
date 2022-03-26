<?php
require_once('classes/DB.php');
require_once('classes/EmployeeList.php');


$employeeList = new EmployeeList();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dolgozói adatok</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
            crossorigin="anonymous"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
            integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>

<section class="container py-2 mb-4">
    <div class="row">
        <div class="col-lg-12">
            <table class="table table-hover" style="font-size:large">
                <thead class="thead-dark">
                <tr>
                    <th>Keresztnév</th>
                </tr>
                </thead>
                <tbody>
                <?php

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
                </tbody>
            </table>
        </div>
    </div>
</section>

</body>
</html>