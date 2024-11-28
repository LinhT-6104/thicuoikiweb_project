document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra đăng nhập
    isAdmin();  // Kiểm tra tài khoản

    // Đăng nhập
    let dangNhap = document.getElementById('login');
    dangNhap.addEventListener('click', function() { window.location.href = '/HTML/dangnhap.html'; });

    // Đăng xuất
    let dangXuat = document.getElementById('logout');
    dangXuat.addEventListener('click', function() {
        localStorage.removeItem('nguoihoatdong');
        window.location.href = '/index.html';
    });

    // Hiển thị tên tài khoản
    const nguoihoatdong = JSON.parse(localStorage.getItem('nguoihoatdong'));
    if (nguoihoatdong) {
        let taikhoan = document.getElementById('taikhoan');
        taikhoan.innerText = `Xin chào, ${nguoihoatdong.nameID}`;
    }

    // Thanh tìm kiếm
    const searchIcon = document.getElementById('searchIcon');
    const searchBar  = document.getElementById('search');

    // Ẩn / hiện searchBar theo user
    searchIcon.addEventListener('click', function() {
        const isSearchBarVisible = searchBar.style.display === 'flex';
        searchBar.style.display  = isSearchBarVisible ? 'none' : 'flex'; 
    });
    
    // Hiển thị theo nội dung tìm kiếm
    searchIcon.addEventListener('click', function() {
        searchPort();
    });
    searchBar.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchPort();
        }
    });   

    // Ngày tháng
    const dateDisplay = document.getElementById('date');
    dateDisplay.textContent = dateDate(); 
    
    // Tuyển sinh
    let tuyensinh = document.getElementById('tuyensinh');
    let gioithieucacnghanh = document.getElementById('gioithieucacnghanh');

    tuyensinh.addEventListener('click', function() { window.location.href = '/HTML/tuyensinh.html'; });
    gioithieucacnghanh.addEventListener('click', function() { window.location.href = '/HTML/gioithieucacnghanh.html'; });

    // admin
    // Đăng tin tuyển sinh
    let dangtints = document.getElementById('dangtints');
    dangtints.addEventListener('click', function() { window.location.href = '/HTML/dangtin.html'; });
    
    // Quản lý
    let quanlihs = document.getElementById('quanlihs');
    let quanlitk = document.getElementById('quanlitk');

    quanlihs.addEventListener('click', function() { window.location.href = '/HTML/quanlyhoso.html'; });
    quanlitk.addEventListener('click', function() { window.location.href = '/HTML/quanlytaikhoan.html'; }); 

    // user
    // Thông tin 
    let thongtinhs = document.getElementById('thongtinhs');
    thongtinhs.addEventListener('click', function() { window.location.href = '/HTML/thongtinhoso.html'; });

    // Trang chủ
    let trangchu = document.getElementById('trangchu');
    trangchu.addEventListener('click', function() { window.location.href = '/HTML/trangchu.html'; });
    
    // Liên hệ
    let cont = document.getElementById('cont');
    cont.addEventListener('click', function() { window.location.href = '/HTML/lienhe.html'; }); 

    // Hiển thị bài đăng
    hienthitatca();
});

// TODO: Tìm hiểu thêm
// Điều chỉnh thanh menu theo width
window.toggleMenu = function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Hiển thị ngày tháng
window.dateDate =  function () {
    const now = new Date();
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = dayNames[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    return `${dayName}, ${day}/${month}/${year}`;
}

// Chuyển trang
window.navigateTo = function (url) {
    window.location.href = url;
}

// Đăng nhập
window.isAdmin = function () {
    const nguoihoatdong = JSON.parse(localStorage.getItem('nguoihoatdong'));
    const dangtints = document.getElementById('dangtints');
    const quanly = document.getElementById('quanly');
    const thongtinhs = document.getElementById('thongtinhs');
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');

    // Mặc định ẩn tất cả
    if (dangtints) { dangtints.style.display = 'none'; }
    if (quanly) { quanly.style.display = 'none'; }
    if (thongtinhs) { thongtinhs.style.display = 'none'; }
    if (login) { login.style.display = 'flex'; }
    if (logout) { logout.style.display = 'none'; }
    

    if (nguoihoatdong) {
        login.style.display = 'none';
        logout.style.display = 'flex';

        if (nguoihoatdong.nameID === 'admin123') {
            dangtints.style.display = 'flex';
            quanly.style.display = 'flex';
        } else {
            thongtinhs.style.display = 'flex';
        }
    }
}

// Hiển thị bài đăng
window.hienthitatca = function () {
    let danhsachbaidang = down_local_bai_dang();
    let tintuc = document.getElementById('tintuc');
    let news = document.getElementById('news');

    if (tintuc && news) {
        tintuc.innerHTML = 'Thông báo tuyển sinh';
        news.innerHTML = '';

        danhsachbaidang.forEach((baidang, index) => {
            let khoi = themKhoi(baidang, index);
            news.appendChild(khoi);
        });
    }
}
// Thêm khối bài đăng
window.themKhoi = function (baidang, index) {
    let anhnoibat = document.createElement('img');
    anhnoibat.style.height = '200px';
    anhnoibat.style.width = '300px';
    anhnoibat.src = baidang.anhnoibat;

    let tieude = document.createElement('h3');
    tieude.innerHTML = baidang.tieude;
    tieude.style.cursor = 'pointer';
    tieude.onclick = function() {
        xem(index);
    }
    
    let mota = document.createElement('div');
    mota.innerHTML = baidang.mota;
    
    let khoitieude = document.createElement('div');
    khoitieude.appendChild(tieude);
    khoitieude.appendChild(mota);

    let khoi = document.createElement('div');
    khoi.style.display = 'flex';
    khoi.style.margin = '20px';
    khoi.style.gap = '20px'; // Tạo khoảng cách giữa các phần tử

    khoi.appendChild(anhnoibat);
    khoi.appendChild(khoitieude);

    return khoi;
}
// Xem bài đăng
window.xem = function (i) {
    localStorage.setItem('baidangchuyenhuong', i);
    window.location.href = "/HTML/tus.html";
}

// Tìm kiếm và hiển thị
window.searchPort = function () {
    let searchBar = document.getElementById('search');
    let searchTerm = searchBar.value.toLowerCase();
    
    let danhsachbaidang = down_local_bai_dang();
    let tintuc = document.getElementById('tintuc');
    let news = document.getElementById('news');

    tintuc.innerHTML = "Kết quả tìm kiếm";
    news.innerHTML = "";

    danhsachbaidang.forEach((baidang, index) => {
        if (baidang.tieude.toLowerCase().includes(searchTerm) 
        || baidang.noidung.toLowerCase().includes(searchTerm)) {
            let khoi = themKhoi(baidang, index);
            news.appendChild(khoi);
        }
    });
}

// save và down người dùng
window.down_local_user = function () {
    return JSON.parse(localStorage.getItem('nguoidung')) || [];
}
window.save_local_user = function (danhsachnguoidung) {
    localStorage.setItem('nguoidung', JSON.stringify(danhsachnguoidung));
}

// save và down bài đăng
window.down_local_bai_dang = function () {
    return JSON.parse(localStorage.getItem('baidang')) || [];
}
window.save_local_bai_dang = function (danhsachbaidang) {
    localStorage.setItem('baidang', JSON.stringify(danhsachbaidang));
}