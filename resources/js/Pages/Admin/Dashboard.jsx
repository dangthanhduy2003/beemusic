import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth }) {
    // Truy cập tên người dùng từ đối tượng auth.user
    const userName = auth.user.name;

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-cyan-400 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                Xin chào, <span style={{ color: '#ffffff' }}>{userName}!</span> Bạn đã đăng nhập.
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
