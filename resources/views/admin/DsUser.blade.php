
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>Loại sản phẩm</title>
</head>
<div class="container">
    <br>
    <div class="card">
        <div class="card-header">
            <h2>Danh sách khách hàng</h2>
        </div>
       
        <div class="card-body">
              <a style="background-color:blue;color:aliceblue;" class="btn btn-pri" href="/admin/them">Thêm mới</a>
<br><br>
       
           <table class="table"> 
            
                <thead class="thead-dark" style="background-color:gray;">
                    <tr>
                        <th>#</th>
                        <th style="width:300px">Tên khách hàng</th>
                        <th>Email</th>
                        <th>Mật khẩu</th>
                        <th>avatar</th>
                        <th>Admin</th>
                        <th>Ngày đăng ký</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                @foreach ($data as $dsUser)
        
                <tbody>
                <tr>
                       <td>{{$dsUser->id}}</td>
                       <td>{{$dsUser->name}}</td>
                       <td>{{$dsUser->email}}</td>
                       <td style="width:300px">{{$dsUser->password}}</td>
                       <td><img style="width:100px" src="/{{$dsUser->avatar}}" alt=""></td>
                       
                        <td>
                        @foreach($role as $t) 
                        @if ($t->id == $dsUser->id_role)
                        {{ $t->short_role }}
                        @endif   
                        @endforeach
                        </td>
                        <td>{{$dsUser->created_at}}</td>
            
                        <td>
                            <button  style="background-color:blue;" class="btn btn-pri"><a href="{{url('admin/capnhat',$dsUser->id)}}" style="text-decoration: none;color:white" >Sửa</a></button>
                        </td>
                        <td>
                            <button style="background-color:red;" class="btn btn-pri"><a href="{{url('admin/xoa',$dsUser->id)}}" style="text-decoration: none;color:white" onclick="return confirm('Bạn có chắc chắn muốn xóa?')" >Xóa</a></button>
                        </td>
                       
                    </tr>
            </tbody>
            @endforeach 
           </table>
           @csrf
         
          
           <div class='p-2' style="float:left">{{ $data->onEachSide(3)->links() }}  </div>
           
        </div>
      
    </div>  
</div>

