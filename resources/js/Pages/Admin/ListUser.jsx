export default function ListUser({ data, role }) {
    return (
        <>
            <div className="container">
                <br />
                <div className="card">
                    <div className="card-header">
                        <h2>Danh sách khách hàng</h2>
                    </div>
                    <div className="card-body">
                        <a
                            style={{
                                backgroundColor: "blue",
                                color: "aliceblue",
                            }}
                            className="btn btn-pri"
                            href="/admin/them"
                        >
                            Thêm mới
                        </a>
                        <br />
                        <br />
                        <table className="table">
                            <thead
                                className="thead-dark"
                                style={{ backgroundColor: "gray" }}
                            >
                                <tr>
                                    <th>#</th>
                                    <th style={{ width: "300px" }}>
                                        Tên khách hàng
                                    </th>
                                    <th>Email</th>
                                    <th>Mật khẩu</th>
                                    <th>Avatar</th>
                                    <th>Admin</th>
                                    <th>Ngày đăng ký</th>
                                    <th>Sửa</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((dsUser) => (
                                    <tr key={dsUser.id}>
                                        <td>{dsUser.id}</td>
                                        <td>{dsUser.name}</td>
                                        <td>{dsUser.email}</td>
                                        <td style={{ width: "300px" }}>
                                            {dsUser.password}
                                        </td>
                                        <td>
                                            <img
                                                style={{ width: "100px" }}
                                                src={`/${dsUser.avatar}`}
                                                alt=""
                                            />
                                        </td>
                                        <td>
                                            {role
                                                .filter(
                                                    (t) =>
                                                        t.id === dsUser.id_role
                                                )
                                                .map((t) => (
                                                    <span key={t.id}>
                                                        {t.short_role}
                                                    </span>
                                                ))}
                                        </td>
                                        <td>{dsUser.created_at}</td>
                                        <td>
                                            <button
                                                style={{
                                                    backgroundColor: "blue",
                                                }}
                                                className="btn btn-pri"
                                            >
                                                <a
                                                    href={`/admin/capnhat/${dsUser.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "white",
                                                    }}
                                                >
                                                    Sửa
                                                </a>
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                style={{
                                                    backgroundColor: "red",
                                                }}
                                                className="btn btn-pri"
                                            >
                                                <a
                                                    href={`/admin/xoa/${dsUser.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "white",
                                                    }}
                                                    onClick={() => {
                                                        if (
                                                            window.confirm(
                                                                "Bạn có chắc chắn muốn xóa?"
                                                            )
                                                        ) {
                                                            // Xử lý hành động xóa tại đây
                                                        }
                                                    }}
                                                >
                                                    Xóa
                                                </a>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
