<?php

const LIMIT = '1000';
const MAX_DATE = "'9999-01-01'";

/*
    EmployeeList osztály: dolgozói adatok lekérdézése, módosítása, törlése.
    Öröklés DB osztályból.
 */


class EmployeeList extends DB
{
    //------------- dolgozói adatok lekérdezés-------------
    public function selectEmployeesData() {
        $employees = array();

        //------------- adatbázishoz kapcsolódás -------------
        $connect = $this->connectDB();

        //------------- aktuális dolgozói adatok lekérdezése db-ből -------------
        $sql = "SELECT emp.emp_no, emp.first_name, emp.last_name, emp.birth_date, emp.gender, tit.title, sal.salary, dep.dept_name FROM employees AS emp
                    JOIN current_dept_emp AS curr_emp ON emp.emp_no = curr_emp.emp_no 
                    JOIN departments AS dep ON curr_emp.dept_no = dep.dept_no
                    JOIN salaries AS sal ON sal.emp_no = curr_emp.emp_no
                    JOIN titles AS tit ON tit.emp_no = curr_emp.emp_no
                    WHERE curr_emp.to_date =" . MAX_DATE . " AND sal.to_date =" . MAX_DATE . " LIMIT " . LIMIT;
        $result = $connect->query($sql);

        //------------- lekérdezés eredmény feldolgozása, és visszaadása employees tömbben -------------
        $idx = 0;
        while ($array = $result->fetch_assoc()) {
            $employees[$idx]['emp_no'] = $array['emp_no'];
            $employees[$idx]['first_name'] = $array['first_name'];
            $employees[$idx]['last_name'] = $array['last_name'];
            $employees[$idx]['birth_date'] = $array['birth_date'];
            $employees[$idx]['title'] = $array['title'];
            $employees[$idx]['salary'] = $array['salary'];
            $employees[$idx]['dept_name'] = $array['dept_name'];

            //------------- dolgozó teljes neve = keresztnév + családnév -------------
            $employees[$idx]['full_name'] = $array['first_name']. " ". $array['last_name'];;

            //------------- ha férfi dolgozó akkor dolgozó neme = "Férfi", egyébként "Nő" -------------
            $employees[$idx]['gender'] = ($array['gender']=='F') ? 'Férfi' : 'Nő';

            $idx ++;
        }
        return $employees;
    }

    //------------- dolgozói adat frissítése metódus-------------
    function updateEmployeeData () {
        $connect = $this->connectDB();

        $employeeId = $connect->real_escape_string($_POST['employeeId']);
        $fieldName = $connect->real_escape_string($_POST['fieldName']);
        $fieldValue = $connect->real_escape_string($_POST['fieldValue']);

    }

    /*else if ($req == "update") {
        $employeeList->updateEmployeeData();

    }*/

}