document.addEventListener('DOMContentLoaded', function () {
    // Dữ liệu các tỉnh/thành và dân tộc
    const provinces = [
        "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
        "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
        "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng",
        "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
        "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh",
        "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
        "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
        "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
        "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
        "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng",
        "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
        "Thừa Thiên Huế", "Tiền Giang", "TP. Hồ Chí Minh", "Trà Vinh",
        "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
    ];

    const ethnicGroups = [
        "Ba Na", "Bố Y", "Bru - Vân Kiều", "Chăm", "Chơ Ro",
        "Chứt", "Co", "Cơ Ho", "Cờ Lao", "Cơ Tu",
        "Dao", "Ê Đê", "Giáy", "Giẻ Triêng", "Hà Nhì",
        "H'Mông", "Hoa", "Hrê", "Kháng", "Khmer",
        "Khơ Mú", "Kinh", "La Chí", "La Ha", "Lào",
        "Lô Lô", "Mạ", "Mảng", "Mường", "Ngái",
        "Nùng", "Ơ Đu", "Pà Thẻn", "Phù Lá", "Pu Péo",
        "Ra Glai", "Rơ Măm", "Sán Chay", "Sán Dìu", "Si La",
        "Tà Ôi", "Tày", "Thái", "Thổ", "Xinh Mun",
        "Xơ Đăng", "X'tiêng"
    ];

    // Đổ dữ liệu vào các dropdown
    const noiSinh = document.getElementById("noisinh");
    const danToc = document.getElementById("dantoc");
    const tinhThanh = document.getElementById("tinh_thanh_thuongtru");

    if (noiSinh) {
        provinces.forEach(province => {
            const option = document.createElement("option");
            option.value = province;
            option.textContent = province;
            noiSinh.appendChild(option);
        });
    }

    if (danToc) {
        ethnicGroups.forEach(ethnic => {
            const option = document.createElement("option");
            option.value = ethnic;
            option.textContent = ethnic;
            danToc.appendChild(option);
        });
    }

    if (tinhThanh) {
        provinces.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            tinhThanh.appendChild(option);
        });
    }

    // Thay đổi hiển thị theo giá trị dropdown
    let table = document.getElementById("bangthem");
    let xemtrangthaiduyet = document.getElementById("xemtrangthaiduyet");

    if (xemtrangthaiduyet) {
        xemtrangthaiduyet.addEventListener('change', function () {
            const trangthaiduyet = xemtrangthaiduyet.value.trim();
            // Lọc và hiển thị hồ sơ theo trạng thái đã chọn
            if (trangthaiduyet === "all") {
                themhangall();  // Hiển thị tất cả hồ sơ
            } else if (trangthaiduyet === "wait") {
                themhang("Chờ duyệt");
            } else if (trangthaiduyet === "ok") {
                themhang("Đã duyệt");
            } else if (trangthaiduyet === "bonus") {
                themhang("Yêu cầu bổ sung thông tin");
            } else {
                themhang("Không duyệt");
            }
        });
    }

    // Hiển thị danh sách hồ sơ ban đầu
    if (table) themhangall();

    // Hiển thị hồ sơ 
    function themhang(trangthai) {
        const danhsachhoso = down_local_ho_so();

        if (table) {
            table.innerHTML = "";
            if (["Chờ duyệt", "Đã duyệt", "Không duyệt"].includes(trangthai)) {
                danhsachhoso
                    .filter(hoso => hoso.trangthai === trangthai)
                    .forEach((hoso, index) => addRow(hoso, index));
            } else {
                danhsachhoso
                    .filter(hoso => hoso.trangthai.includes("bổ sung"))
                    .forEach((hoso, index) => addRow(hoso, index));
            }
        }
    }
    function themhangall() {
        if (table) {
            const danhsachhoso = down_local_ho_so();
            table.innerHTML = "";
            danhsachhoso.forEach((hoso, index) => addRow(hoso, index));
        }
    }

    // Hàm thêm từng dòng vào bảng
    function addRow(hoso, index) {
        const row = table.insertRow();
        row.innerHTML = ` 
            <td>${index + 1}</td>
            <td>HS${index + 1}</td>
            <td>${hoso.hoten}</td>
            <td>${hoso.ngaysinh}</td>
            <td>${hoso.gioitinh}</td>
            <td>${hoso.sodt}</td>
            <td>${hoso.nganh_dang_ky}</td>
            <td>${hoso.trangthai}</td>
            <td>
                <button onclick="duyet(${index})">Duyệt</button>
                <button onclick="bosung(${index})">Bổ sung</button>
                <button onclick="khongduyet(${index})">Không duyệt</button>
                <br><br>
                <button onclick="xemhs(${index})">Xem</button>
                <button onclick="xoa(${index})">Xóa</button>
            </td>`;
    }

    // Các hàm duyệt, bổ sung, không duyệt, xóa và xem hồ sơ
    window.duyet = function (index) {
        updateTrangThai(index, "Đã duyệt");
    }
    window.bosung = function (index) {
        updateTrangThai(index, "Yêu cầu bổ sung thông tin");
    }
    window.khongduyet = function (index) {
        updateTrangThai(index, "Không duyệt");
    }
    window.xoa = function (index) {
        const danhsachhoso = down_local_ho_so();
        danhsachhoso.splice(index, 1);
        save_local_ho_so(danhsachhoso);
        themhangall();
    };
    window.xemhs = function (index) {
        const danhsachhoso = down_local_ho_so();
        const hoso = danhsachhoso[index];
        localStorage.setItem('hosochuyenhuong', JSON.stringify(hoso));
        window.location.href = 'thongtinhoso.html';
    }
    // Hàm cập nhật trạng thái hồ sơ
    function updateTrangThai(index, trangthai) {
        const danhsachhoso = down_local_ho_so();
        danhsachhoso[index].trangthai = trangthai;
        save_local_ho_so(danhsachhoso);
        themhangall();
    }

    // Hàm lưu hồ sơ
    // Cập nhật và hiển thị ảnh thẻ 
    const anhTheInput = document.getElementById('anh_the');
    const anhThePreview = document.getElementById('anh_the_preview');

    // Thêm sự kiện cho input file
    anhTheInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                anhThePreview.src = e.target.result;
                anhThePreview.style.display = 'block';
            }

            reader.readAsDataURL(file);
        }
    });
    // lưu hồ sơ
    window.luuhoso = function () {
        const hoten = document.getElementById('hoten').value.trim();
        const ngaysinh = document.getElementById('ngaysinh').value.trim();
        const socccd = document.getElementById('socccd').value.trim();
        const ngaycap = document.getElementById('ngaycap').value.trim();
        const noicap = document.getElementById('noicap').value.trim();
        const gioitinh = document.getElementById('gioitinh').value.trim();
        const noisinh = document.getElementById('noisinh').value.trim();
        const dantoc = document.getElementById('dantoc').value.trim();

        const sodt = document.getElementById('sodt').value.trim();
        const sodt_nguoithan = document.getElementById('sodt_nguoithan').value.trim();
        const email = document.getElementById('email').value.trim();

        const tinh_thanh_thuongtru = document.getElementById('tinh_thanh_thuongtru').value.trim();
        const quan_huyen_thuongtru = document.getElementById('quan_huyen_thuongtru').value.trim();
        const phuong_xa_thuongtru = document.getElementById('phuong_xa_thuongtru').value.trim();
        const diachicuthe = document.getElementById('diachicuthe').value.trim();

        const tinh_thanh_lienlac = document.getElementById('tinh_thanh_lienlac').value.trim();
        const quan_huyen_lienlac = document.getElementById('quan_huyen_lienlac').value.trim();
        const phuong_xa_lienlac = document.getElementById('phuong_xa_lienlac').value.trim();
        const diachilienlac = document.getElementById('diachilienlac').value.trim();

        const truong_thpt = document.getElementById('truong_thpt').value.trim();
        const nam_totnghiep = document.getElementById('nam_totnghiep').value.trim();

        const nganh_dang_ky = document.getElementById('nganh_dang_ky').value.trim();
        const tohop_xettuyen = document.getElementById('tohop_xettuyen').value.trim();

        const doi_tuong_uu_tien = document.getElementById('doi_tuong_uu_tien').value.trim();
        const khu_vuc_uu_tien = document.getElementById('khu_vuc_uu_tien').value.trim();

        const anhTheInput = document.getElementById('anh_the');
        const anhThePreview = document.getElementById('anh_the_preview');

        // Kiểm tra tất cả trường có dữ liệu
        if (!hoten || !ngaysinh || !socccd || !ngaycap || !noicap || !gioitinh || !noisinh || !dantoc ||
            !sodt || !sodt_nguoithan || !email || !tinh_thanh_thuongtru || !quan_huyen_thuongtru || !phuong_xa_thuongtru ||
            !diachicuthe || !tinh_thanh_lienlac || !quan_huyen_lienlac || !phuong_xa_lienlac || !diachilienlac ||
            !truong_thpt || !nam_totnghiep || !nganh_dang_ky || !tohop_xettuyen) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        if (socccd.length < 12) {
            alert("Vui lòng nhập số căn cước công dân hợp lệ!");
            return;
        }
        if (sodt.length < 9) {
            alert("Vui lòng nhập số điện thoại hợp lệ!");
            return;
        }
        if (sodt_nguoithan.length < 9) {
            alert("Vui lòng nhập số điện thoại người thân hợp lệ!");
            return;
        }
        if (!isValidDate(ngaysinh)) {
            alert("Ngày sinh không hợp lệ! Vui lòng nhập ngày sinh đúng định dạng, ví dụ: 01/01/2004")
            return
        }
        if (!isValidDate(ngaycap)) {
            alert("Ngày cấp cccd không hợp lệ! Vui lòng nhập ngày cấp cccd đúng định dạng, ví dụ: 01/01/2004")
            return
        }
        if (!email.includes('@') || email.indexOf('@') === 0
            || email.indexOf('@') !== email.lastIndexOf('@')
            || email.lastIndexOf('.') < email.indexOf('@') + 2
            || email.lastIndexOf('.') === email.length - 1
            || email.includes(' ')) {
            alert("Email không hợp lệ! Vui lòng nhập email đúng định dạng, ví dụ: abc@gmail.com");
            return;
        }
        // email.indexOf('@') === 0: @ không được nằm ở đầu email.
        // email.indexOf('@') !== email.lastIndexOf('@'): Email không được chứa nhiều ký tự @.
        // email.lastIndexOf('.') < email.indexOf('@') + 2: Phải có dấu . sau @, với ít nhất 1 ký tự giữa @ và ..
        // email.lastIndexOf('.') === email.length - 1: . không được nằm ở cuối email.
        // email.includes(' '): Email không được chứa khoảng trắng.

        const hoso = {
            hoten, ngaysinh, socccd, ngaycap, noicap, gioitinh, noisinh, dantoc, sodt, sodt_nguoithan, email,
            tinh_thanh_thuongtru, quan_huyen_thuongtru, phuong_xa_thuongtru, diachicuthe,
            tinh_thanh_lienlac, quan_huyen_lienlac, phuong_xa_lienlac, diachilienlac,
            truong_thpt, nam_totnghiep, nganh_dang_ky, tohop_xettuyen, doi_tuong_uu_tien, khu_vuc_uu_tien,
            anh_the: anhThePreview.src, 
            trangthai: "Chờ duyệt"
        };

        let danhsachhoso = down_local_ho_so();
        const index = danhsachhoso.findIndex(hoso => hoso.socccd === socccd);
        if (index !== -1) {
            danhsachhoso[index] = hoso;
            alert("Cập nhật hồ sơ thành công!");
        } else {
            danhsachhoso.push(hoso);
            alert("Lưu hồ sơ thành công!");
        }

        save_local_ho_so(danhsachhoso);
        themhangall();
    }
    function isValidDate(dateStr) {
        const parts = dateStr.split('/');

        // Kiểm tra nếu không đủ 3 phần (ngày, tháng, năm)
        if (parts.length !== 3) {
            return false;
        }

        const day = Number(parts[0]);
        const month = Number(parts[1]);
        const year = Number(parts[2]);

        // Kiểm tra giá trị ngày, tháng, năm
        if (
            isNaN(day) || isNaN(month) || isNaN(year) || 
            day < 1 || day > 31 ||                      
            month < 1 || month > 12 ||                  
            year < 1900 || year > new Date().getFullYear() 
        ) {
            return false;
        }

        // Kiểm tra các tháng đặc biệt
        const daysInMonth = [31, (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (day > daysInMonth[month - 1]) {
            return false; // Ngày vượt quá số ngày tối đa của tháng
        }

        return true; // Tất cả kiểm tra đều hợp lệ
    }

    // pop-up bổ sung thông tin
    let bosungIndex = null;
    // Tạo HTML của pop-up khi cần bổ sung
    function createPopup() {
        const popupHTML = `
            <div id="popupBosung" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); justify-content: center; align-items: center; z-index: 1000;">
                <div style="background: white; padding: 20px; border-radius: 8px; width: 400px; text-align: center; position: relative;">
                    <h3>Yêu cầu bổ sung thông tin</h3>
                    <textarea id="bosungDetails" placeholder="Nhập các thông tin cần bổ sung..." rows="5" style="width: 100%; margin-top: 10px; padding: 8px;"></textarea>
                    <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                        <button id="submitBosung" style="background-color: #4CAF50; color: white; padding: 8px 15px; border: none; border-radius: 5px;">Lưu</button>
                        <button id="cancelBosung" style="background-color: #f44336; color: white; padding: 8px 15px; border: none; border-radius: 5px;">Hủy</button>
                    </div>
                </div>
            </div>
        `;
        const popupContainer = document.createElement("div");
        popupContainer.innerHTML = popupHTML;
        document.body.appendChild(popupContainer);
    }
    createPopup();
    // Hiển thị pop-up bổ sung
    window.bosung = function (index) {
        console.log("Popup bổ sung được gọi với index:", index);
        bosungIndex = index;
        document.getElementById("popupBosung").style.display = "flex";
    };
    // Đóng pop-up
    function closePopup() {
        document.getElementById("popupBosung").style.display = "none";
        document.getElementById("bosungDetails").value = "";
        bosungIndex = null;
    }
    // Ấn "Hủy" 
    document.getElementById("cancelBosung").addEventListener("click", function () {
        closePopup();
    });
    // Đóng pop-up khi nhấn ra ngoài
    document.getElementById("popupBosung").addEventListener("click", function (event) {
        if (event.target.id === "popupBosung") {
            closePopup();
        }
    });
    // Lưu thông tin bổ sung
    document.getElementById("submitBosung").addEventListener("click", function () {
        const bosungDetails = document.getElementById("bosungDetails").value.trim();
        if (bosungDetails === "") {
            alert("Vui lòng nhập thông tin cần bổ sung.");
            return;
        }

        const danhsachhoso = down_local_ho_so();
        if (bosungIndex !== null && danhsachhoso[bosungIndex]) {
            danhsachhoso[bosungIndex].trangthai = `Cần bổ sung các thông tin: ${bosungDetails}`;
            save_local_ho_so(danhsachhoso);

            // Cập nhật bảng và đóng pop-up
            closePopup();
            themhangall();
        } else {
            alert("Không tìm thấy hồ sơ cần bổ sung.");
        }
    });

    // Hiển thị thông tin đã có của thí sinh
    function fillData(hoso, taikhoan) {
        const fields = [
            { id: 'hoten', value: hoso?.hoten || taikhoan?.hoten },
            { id: 'socccd', value: hoso?.socccd || taikhoan?.cccd },
            { id: 'email', value: hoso?.email || taikhoan?.email },
            { id: 'ngaysinh', value: hoso?.ngaysinh },
            { id: 'ngaycap', value: hoso?.ngaycap },
            { id: 'noicap', value: hoso?.noicap },
            { id: 'gioitinh', value: hoso?.gioitinh },
            { id: 'noisinh', value: hoso?.noisinh },
            { id: 'dantoc', value: hoso?.dantoc },
            { id: 'sodt', value: hoso?.sodt },
            { id: 'sodt_nguoithan', value: hoso?.sodt_nguoithan },
            { id: 'tinh_thanh_thuongtru', value: hoso?.tinh_thanh_thuongtru },
            { id: 'quan_huyen_thuongtru', value: hoso?.quan_huyen_thuongtru },
            { id: 'phuong_xa_thuongtru', value: hoso?.phuong_xa_thuongtru },
            { id: 'diachicuthe', value: hoso?.diachicuthe },
            { id: 'tinh_thanh_lienlac', value: hoso?.tinh_thanh_lienlac },
            { id: 'quan_huyen_lienlac', value: hoso?.quan_huyen_lienlac },
            { id: 'phuong_xa_lienlac', value: hoso?.phuong_xa_lienlac },
            { id: 'diachilienlac', value: hoso?.diachilienlac },
            { id: 'truong_thpt', value: hoso?.truong_thpt },
            { id: 'nam_totnghiep', value: hoso?.nam_totnghiep },
            { id: 'nganh_dang_ky', value: hoso?.nganh_dang_ky },
            { id: 'tohop_xettuyen', value: hoso?.tohop_xettuyen },
            { id: 'doi_tuong_uu_tien', value: hoso?.doi_tuong_uu_tien },
            { id: 'khu_vuc_uu_tien', value: hoso?.khu_vuc_uu_tien },
            { id: 'anh_the', value: hoso?.anh_the }
        ];

        fields.forEach(field => {
            const element = document.getElementById(field.id);
            if (element) {
                if (field.id === "anh_the" && field.value) {
                    // Hiển thị ảnh thẻ nếu có
                    const imgElement = document.getElementById("anh_the_preview");
                    imgElement.src = field.value;
                    imgElement.style.display = "block"; // Hiển thị ảnh
                } else {
                    element.value = field.value || "";
                }
            }
        });

        const trangthaihs = document.getElementById('trangthaihs');
        if (trangthaihs && hoso?.trangthai) {
            trangthaihs.innerText = hoso.trangthai;
        }
    }
    function hienthithongtinhoso() {
        const nguoihoatdong = JSON.parse(localStorage.getItem('nguoihoatdong')) || null;
        const danhsachnguoidung = down_local_user();
        const danhsachhoso = down_local_ho_so();
    
        if (!nguoihoatdong) return;
    
        if (nguoihoatdong.nameID === "tkadmin") {
            const hosochuyenhuong = JSON.parse(localStorage.getItem('hosochuyenhuong')) || null;
            if (hosochuyenhuong) {
                fillData(hosochuyenhuong, null);
            }
        } else {
            const taikhoan = danhsachnguoidung.find(user => user.nameID === nguoihoatdong.nameID);
            const hosothisinh = danhsachhoso.find(hoso => hoso.socccd === taikhoan?.cccd);
    
            if (hosothisinh) {
                fillData(hosothisinh, taikhoan);
            }
        }
    }
    hienthithongtinhoso();

    // Hàm quản lý localStorage
    function down_local_ho_so() {
        return JSON.parse(localStorage.getItem('hoso')) || [];
    }

    function save_local_ho_so(danhsachhoso) {
        localStorage.setItem('hoso', JSON.stringify(danhsachhoso));
    }
});