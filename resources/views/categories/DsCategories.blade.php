
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>Danh sách danh mục</title>
</head>
<div class="container">
    <br>
    <div class="card">
        <div class="card-header">
            <h2>Danh sách danh mục</h2>
        </div>
       
        <div class="card-body">
              <a style="background-color:blue;color:aliceblue;" class="btn btn-pri" href="/Categories/Add">Thêm mới</a>
<br><br>
       
           <table class="table"> 
            
                <thead class="thead-dark" style="background-color:gray;">
                    <tr>
                        <th>#</th>
                        <th style="width:300px">Tên danh mục</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                @foreach ($data as $ds)
        
                <tbody>
                <tr>
                       <td>{{$ds->id}}</td>
                       <td>{{$ds->name}}</td>

                        <td>
                            <button  style="background-color:blue;" class="btn btn-pri"><a href="{{url('Categories/Update',$ds->id)}}" style="text-decoration: none;color:white" >Sửa</a></button>
                        </td>
                        <td>
                            <button style="background-color:red;" class="btn btn-pri"><a href="{{url('Categories/Delete',$ds->id)}}" style="text-decoration: none;color:white" onclick="return confirm('Bạn có chắc chắn muốn xóa?')" >Xóa</a></button>
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

