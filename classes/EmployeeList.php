<?php
const LIMIT = '100';

/*
    EmployeeList osztály: dolgozói adatok lekérdézése, módosítása, törlése.
    Öröklés DB osztályból.
 */


class EmployeeList extends DB
{
    //------------- dolgozói adatok lekérdezés metódus-------------
    public function selectEmployeesData() {
        $employees = array();

        //------------- adatbázishoz kapcsolódás -------------
        $connect = $this->connectDB();

        //------------- adatbázisból adatok lekérdezése -------------
        $sql = "SELECT * FROM employees LIMIT " . LIMIT;
        $result = $connect->query($sql);

        //------------- adatok elmentés employees tömbbe-------------
        $idx = 0;
        while ($array = $result->fetch_assoc()) {
            $employees[$idx]['first_name'] = $array['first_name'];
            $idx ++;
        }
        return $employees;
    }

}