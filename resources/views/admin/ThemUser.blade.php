
<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" >
<br>
<div class="container">
    <div class="card">
        <div class="card-header">
            <h2>Thêm khách hàng</h2>
        </div>
        <div class="card-body">
            <form method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="">Tên khách hàng</label>
                    <input  required type="text" name="name" class="form-control"autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="">Email</label>
                    <input  required type="email" name="email" class="form-control"autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="">Mật khẩu</label>
                    <input  required type="password" name="password" class="form-control"autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="">Ảnh</label>
                    <input type="file" name="avatar" value="vui lòng nhập đường dẫn" class="form-control">
                </div>
                <div class="form-group">
                    <label for="">Loại tài khoản</label>
                   <select name="id_role" id=""class="form-control">
                   @foreach($role as $t)
                    <option value="{{$t->id}}">{{$t->short_role}}</option>
                    @endforeach
                   </select>
                </div>
                <br>
             
            <button name="sbm" class="btn btn-succes" type="submit" style="margin-top: 10px; background-color:green;color:white">Thêm</button>
            <a style="margin-top: 10px; background-color:blue;color:white;" class="btn btn-pri" href="/admin/danhsach"> Xem danh sách</a>
            @csrf
            </form>
        </div>
    </div>
</div>
