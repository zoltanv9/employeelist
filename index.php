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
    <script src="js/app.js"></script>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <section class="container py-2 mb-4">
        <h1>Dolgozói adatok</h1>
        <div class="row">
            <div class="col-lg-12">
                <!------------- dolgozói adatok tábla ---------->
                <table id=data class="table table-hover" style="font-size:large">
                    <thead class="thead-dark">
                    <tr class="show-row">
                        <td class="table-success">No.</td>
                        <td class="table-success">Családnév</td>
                        <td class="table-success">Keresztnév</td>
                        <td class="table-success">Születési dátum</td>
                        <td class="table-success">Nem</td>
                        <td class="table-success">Beosztas</td>
                        <td class="table-success">Fizetés</td>
                        <td class="table-success">Osztály</td>
                        <td class="table-success">Gombok</td>
                    </tr>
                    </thead>
                    <tbody id="my-table">
                    </tbody>
                </table>
            </div>
        </div>
    </section>

</body>
</html>