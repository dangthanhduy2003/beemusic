
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>
       Cập nhật khách hàng
    </title>
</head>
<br>
<div class="container">
    <div class="card">
        <div class="card-header">
            <h2>Cập nhật Khách hàng</h2>
        </div>
        <div class="card-body">
            <form enctype="multipart/form-data" action="{{ url('/admin/capnhat', ['id' => $user->id]) }}" method="post">
            @csrf
            <div class="form-group">
                    <label for="">Tên khách hàng</label>
                    <input type="text" name="name" class="form-control" value="{{ $user->name }}">
                </div>
                <div class="form-group">
                    <label for="">Email</label>
                    <input type="text" name="email" class="form-control" value="{{ $user->email }}">
                </div>
                <div class="form-group">
                    <label for="">Mật khẩu</label>
                    <input type="text" name="password" class="form-control" value="{{ $user->password }}">
                </div>
                <div class="form-group">
                    <label for="">Ảnh khách hàng</label>
                    <br>
                    <td><img style="width:100px" src="/{{$user->avatar}}" alt=""></td>
                    <br>
                    <img style="width:100px" src="/{{ $user->avatar }}" alt="">
                    <br>
                    <label for="avatar">Chọn ảnh mới</label>
                    <input type="file" name="avatar" class="form-control" value="" >

                </div>
                <div class="form-group">
                    <label for="">Loại khách hàng</label>
                   <select name="id_role" id="{{ $user->role }}" value="" class="form-control">
                    @foreach($role as $t) 
                   <option  value="{{$t->id}}" {{ $user->id_role == $t->id ? 'selected' : '' }}>{{$t->short_role}}</option>
                   @endforeach
                   </select>

                </div>  
                <br>
            <button name="sbm" class="btn btn-succes" type="submit" style="margin-top: 10px; background-color:green;color:white">Sửa</button>
            </form>
            @csrf
        </div>
    </div>
</div>



