

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>
       Cập nhật danh mục
    </title>
</head>
<br>
<div class="container">
    <div class="card">
        <div class="card-header">
            <h2>Cập nhật danh mục</h2>
        </div>
        <div class="card-body">
        <form enctype="multipart/form-data" action="{{ url('/Categories/Update', ['id' => $categories->id]) }}" method="post">
            @csrf
            <div class="form-group">
                    <label for="">Tên Danh mục</label>
                    <input type="text" name="name" class="form-control" value="{{ $categories->name }}">
                </div>

                <br>
            <button name="sbm" class="btn btn-succes" type="submit" style="margin-top: 10px; background-color:green;color:white">Sửa</button>
            </form>
            @csrf
           
        </div>
    </div>
</div>



