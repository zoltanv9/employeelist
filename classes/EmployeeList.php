<?php
const LIMIT = '100';

/*
    EmployeeList osztály: dolgozói adatok lekérdézése, módosítása, törlése.
    Öröklés DB osztályból.
 */


class EmployeeList extends DB
{
    //------------- dolgozói adatok lekérdezés-------------
    public function selectEmployeesData() {
        $employees = array();

        //------------- adatbázis kapcsolódás meghívása -------------
        $connect = $this->connectDB();

        //------------- adatbázis lekérdezés futtatása -------------
        $sql = "SELECT * FROM employees LIMIT " . LIMIT;
        $result = $connect->query($sql);

        //------------- adatok elmentése employees tömbbe-------------
        $idx = 0;
        while ($array = $result->fetch_assoc()) {
            $employees[$idx]['first_name'] = $array['first_name'];
            $idx ++;
        }
        return $employees;
    }

}