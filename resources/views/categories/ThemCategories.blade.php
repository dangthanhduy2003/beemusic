
<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" >
<br>
<div class="container">
    <div class="card">
        <div class="card-header">
            <h2>Thêm danh mục</h2>
        </div>
        <div class="card-body">
            <form method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="">Tên danh mục</label>
                    <input  required type="text" name="name" class="form-control"autocomplete="off">
                </div>
                <br>
            <button name="sbm" class="btn btn-succes" type="submit" style="margin-top: 10px; background-color:green;color:white">Thêm</button>
            <a style="margin-top: 10px; background-color:blue;color:white;" class="btn btn-pri" href="/categories/danhsach"> Xem danh sách</a>
            @csrf
            </form>
        </div>
    </div>
</div>
