export default function Header({ auth }) {
    if (auth) {
        return <span>Đã đăng nhập</span>;
    } else {
        return <span>Chưa đăng nhập</span>;
    }
}
