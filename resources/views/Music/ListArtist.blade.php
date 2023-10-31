
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>Danh sách bài hát</title>
</head>
<div class="container">
    <br>
    <div class="card">
        <div class="card-header">
            <h2>Danh sách bài hát</h2>
        </div>
       
        <div class="card-body">
              <a style="background-color:blue;color:aliceblue;" class="btn btn-pri" href="/music/add">Thêm mới</a>
<br><br>
       
           <table class="table"> 
            
                <thead class="thead-dark" style="background-color:gray;">
                    <tr>
                        <th>#</th>
                        <th style="width:300px">Tên bài hát</th>
                        <th style="width:300px">Âm thanh</th>
                        <th style="width:300px">Tóm tắt</th>
                        <th style="width:300px">Lượt nghe</th>
                        <th style="width:300px">Lời bài hát</th>
                        <th>Sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                @foreach ($data as $list)
        
                <tbody>
                <tr>
                       <td>{{$list->id}}</td>
                       <td>{{$list->name}}</td>
                       <td>@if($list->link_file)
                <div>
                <audio controls>
                <source src="{{ asset($list->link_file) }}" type="audio/mpeg">
                Trình duyệt của bạn không hỗ trợ phát audio.
                </audio>
                </div>
                @else
                <p>Không tìm thấy file âm thanh.</p>
                @endif</td>
                       <td>{{$list->thumbnail}}</td>
                       <td>{{$list->view}}</td>
                       <td>{{$list->lyrics}}</td>

                        <td>
                            <button  style="background-color:blue;" class="btn btn-pri"><a href="{{url('Music/Update',$list->id)}}" style="text-decoration: none;color:white" >Sửa</a></button>
                        </td>
                        <td>
                            <button style="background-color:red;" class="btn btn-pri"><a href="{{url('Music/Delete',$list->id)}}" style="text-decoration: none;color:white" onclick="return confirm('Bạn có chắc chắn muốn xóa?')" >Xóa</a></button>
                        </td>
                       
                    </tr>
            </tbody>
            @endforeach 
           </table>
           @csrf
        
           
        </div>
      
    </div>  
</div>

