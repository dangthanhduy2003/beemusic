
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <title>
       Cập nhật bài hát
    </title>
</head>
<br>
<div class="container">
    <div class="card">
        <div class="card-header">
            <h2>Cập nhật bài hát</h2>
        </div>
        <div class="card-body">
            <form enctype="multipart/form-data" action="{{ url('/Music/Update', ['id' => $music->id]) }}" method="post">
            @csrf
            <div class="form-group">
                    <label for="">Tên bài hát</label>
                    <input type="text" name="name" class="form-control" value="{{ $music->name }}">
                </div>
                <div class="form-group">
                    <label for="">Âm thanh bài hát</label>
                    <input type="file" name="link_file" class="form-control" value="{{ $music->link_file }}">
                </div>
                <div class="form-group">
                    <label for="">Tóm tắt</label>
                    <input type="text" name="thumbnail" class="form-control" value="{{ $music->thumbnail }}">
                </div>
                <div class="form-group">
                    <label for="">Lời bài hát</label>
                    <input type="text" name="lyrics" class="form-control" value="{{ $music->lyrics }}">
                </div>
                <div class="form-group">
                <label for="id_categories">Chọn danh mục:</label><br>
                @foreach($categories as $category)
               <input type="checkbox" id="category_{{ $category->id }}" name="id_categories[]" value="{{ $category->id }}"
                @if(in_array($category->id, $selectedCategories)) checked @endif>
               <label for="category_{{ $category->id }}">{{ $category->name }}</label><br>
               @endforeach
               </div>



                <br>
            <button name="sbm" class="btn btn-succes" type="submit" style="margin-top: 10px; background-color:green;color:white">Sửa</button>
            </form>
            @csrf
        </div>
    </div>
</div>



