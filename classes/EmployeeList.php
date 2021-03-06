<?php

const LIMIT_PER_PAGE = 20;


/*
    EmployeeList osztály: dolgozói adatok lekérdézése, módosítása, törlése.
    Adatbázis kapcsolódás metódus öröklése DB osztályból.
 */


class EmployeeList extends DB
{
    //------------- dolgozói adatok lekérdezése metódus-------------
    public function selectEmployeesData() {
        $employees = array();
        $connect = $this->connectDB();

        //------------- aktuális dolgozói adatok lekérdezése -------------
        $sql = "SELECT emp.emp_no, emp.first_name, emp.last_name, emp.birth_date, emp.gender, emp.hire_date, tit.title, sal.salary, dep.dept_name, curr_emp.to_date 
                    FROM employees AS emp
                    JOIN current_dept_emp AS curr_emp 
                            ON emp.emp_no = curr_emp.emp_no 
                    JOIN departments AS dep 
                        ON curr_emp.dept_no = dep.dept_no
                    JOIN salaries AS sal 
                        ON sal.emp_no = curr_emp.emp_no
                    JOIN titles AS tit 
                        ON tit.emp_no = curr_emp.emp_no
                    WHERE curr_emp.to_date = sal.to_date 
                      AND curr_emp.to_date=tit.to_date";

        //------------- csak az adott oldalszám adatait kérjük le-------------
        if($_GET['pageNumber'] > 1) {
            $start = (($_GET['pageNumber'] -1 ) * LIMIT_PER_PAGE);
            $page = $_GET['pageNumber'];
        } else {
            $start = 0;
        }
        $sql = $sql . ' LIMIT ' . $start . ', ' . LIMIT_PER_PAGE;

        $result = $connect->query($sql);

        //------------- lekérdezési eredmény feldolgozása -------------
        $idx = 0;
        while ($array = $result->fetch_assoc()) {
            $employees[$idx]['emp_no'] = $array['emp_no'];
            $employees[$idx]['first_name'] = $array['first_name'];
            $employees[$idx]['last_name'] = $array['last_name'];
            $employees[$idx]['birth_date'] = $array['birth_date'];
            $employees[$idx]['hire_date'] = $array['hire_date'];
            $employees[$idx]['title'] = $array['title'];
            $employees[$idx]['salary'] = $array['salary'];
            $employees[$idx]['dept_name'] = $array['dept_name'];
            $employees[$idx]['to_date'] = $array['to_date'];

            //------------- ha férfi dolgozó akkor dolgozó neme = "Férfi", egyébként "Nő" -------------
            $employees[$idx]['gender'] = ($array['gender']=='F') ? 'Férfi' : 'Nő';

            $idx ++;
        }

        return $employees;
    }

    //------------- dolgozói adat frissítése metódus-------------
    function updateEmployeeData () {
        $connect = $this->connectDB();

        if (isset($_POST['employeeId'])&&isset($_POST['fieldName'])&&isset($_POST['fieldValue'])) {
            $employeeId = $connect->real_escape_string($_POST['employeeId']);
            $fieldName = $connect->real_escape_string($_POST['fieldName']);
            $fieldValue = $connect->real_escape_string($_POST['fieldValue']);

            $query = "UPDATE employees SET " .$fieldName. "= ? WHERE emp_no = ?";
            $sql = $connect->prepare($query);
            $sql->bind_param("ss", $fieldValue, $employeeId);
            if (!$sql->execute()) {
            }
            else {
            }
        }

    }

    //------------- dolgozó törlése metódus-------------
    function deleteEmployee() {
        $connect = $this->connectDB();
        if (isset($_POST['employeeId'])) {
            $employeeId = $connect->real_escape_string($_POST['employeeId']);

            $query = "DELETE FROM employees WHERE emp_no = ?";
            $sql = $connect->prepare($query);
            $sql->bind_param("s", $employeeId);
            if (!$sql->execute()) {
            }
            else {
            }
        }
    }


}