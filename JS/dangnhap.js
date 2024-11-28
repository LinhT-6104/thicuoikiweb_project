function dangnhaptk() {
    const nameID = document.getElementById('nameID').value.trim();
    const pass = document.getElementById('pass').value.trim();

    if (nameID.trim() === "" || pass.trim() === "") {
        alert('Vui lòng nhập tên đăng nhập và mật khẩu');
        return;
    }

    const danhsachnguoidung = down_local_user();
    const nguoihoatdong = { nameID, pass };

    if (nameID === 'admin123' && pass === 'admin123'){
        localStorage.setItem('nguoihoatdong', JSON.stringify(nguoihoatdong))
        alert('Quản trị viên đăng nhập thành công!');
        console.log('Chuyển hướng đến trang chủ cho quản trị viên');
        window.location.href = '/HTML/trangchu.html';
    }
    else{
        const user = danhsachnguoidung.find(user => user.nameID === nameID && user.pass === pass);
        if (user) {
            localStorage.setItem('nguoihoatdong', JSON.stringify(user));
            alert('Đăng nhập thành công!');
            console.log('Chuyển hướng đến trang chủ cho người dùng');
            window.location.href = '/HTML/trangchu.html';
        } else {
            alert('Sai tài khoản hoặc mật khẩu!');
        }
    }
}

// Thêm sự kiện ấn enter để đăng nhập
const nameID = document.getElementById('nameID');
const pass = document.getElementById('pass');

function clickEnter(event) {
    if (event.key === 'Enter') {
        dangnhaptk();
    }
}
nameID.addEventListener('keyup', clickEnter);
pass.addEventListener('keyup', clickEnter);