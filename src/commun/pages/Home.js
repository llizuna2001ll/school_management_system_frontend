import AdminHome from "../../admin/pages/AdminHome";
import StudentHome from "../../user/pages/StudentHome";

function Home() {
    const role = localStorage.getItem("authority");

    if (role === "ROLE_ADMIN") {
        return (
            <>
                <AdminHome/>
            </>
        )
    } else if (role === "ROLE_STUDENT") {
        return (
            <>
                <StudentHome/>
            </>
        )
    }
}

export default Home;