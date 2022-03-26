<?php

/*
    EmployeeList osztály: dolgozói adatok lekérdézése, módosítása, törlése.
    Öröklés DB osztályból.
 */
class EmployeeList extends DB

{
    //------------- dolgozói adatok lekérdezése -------------
    public function selectEmployeesData() {

        //------------- adatbázishoz kapcsolódás -------------
        $connect = $this->connectDB();

        $sql = "SELECT * FROM employees LIMIT 100";
        $result = $connect->query($sql);
        $idx = 0;
        while ($array = $result->fetch_assoc()) {
            $employees[$idx]['first_name'] = $array['first_name'];
            $idx ++;
        }
        return $employees;
    }

}