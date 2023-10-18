
<link rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" >
<br>
<div class="container">
    <div class="card">
        <div class="card-header">
            <h2>Thêm bài hát</h2>
        </div>
        <div class="card-body">
            <form method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="">Tên bài hát</label>
                    <input  required type="text" name="name" class="form-control"autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="">Tóm tắt</label>
                    <input  required type="text" name="thumbnail" class="form-control"autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="">Lời bài hát</label>
                    <textarea  name="lyrics" class="form-control" required></textarea>
                </div>
                <div class="form-group">
                    <label for="">Tải bài hát lên</label>
                    <input type="file" name="link_file" value="vui lòng nhập đường dẫn" class="form-control">
                </div>
                <div class="form-group">
                <label for="id_categories">Chọn danh mục:</label><br>
    @foreach($Categories as $category)
        <input type="checkbox" id="category_{{ $category->id }}" name="id_categories[]" value="{{ $category->id }}">
        <label for="category_{{ $category->id }}">{{ $category->name }}</label><br>
    @endforeach
                </div>
                <br>
             
            <button name="sbm" class="btn btn-succes" type="submit" style="margin-top: 10px; background-color:green;color:white">Thêm</button>
            <a style="margin-top: 10px; background-color:blue;color:white;" class="btn btn-pri" href="/Music/List"> Xem danh sách</a>
            @csrf
            </form>
        </div>
    </div>
</div>
